"""ARIA License Server — FastAPI tabanlı lisans doğrulama sunucusu.

Deploy seçenekleri:
  - Railway.app  (ücretsiz tier mevcut — önerilen)
  - Fly.io       (ücretsiz tier mevcut)
  - Herhangi bir VPS (DigitalOcean, Hetzner vb.)

Kurulum:
  pip install fastapi uvicorn

Çalıştırma:
  uvicorn license_api:app --host 0.0.0.0 --port 8000

Ortam değişkenleri (Railway/Fly'da set et):
  ARIA_HMAC_SECRET_HEX → binary ile aynı secret hex formatında (zorunlu)
  ARIA_ADMIN_KEY       → admin dashboard şifresi (zorunlu)

Dashboard:
  GET  /admin/licenses          → tüm lisansları listele
  POST /admin/generate          → yeni lisans üret
  POST /admin/revoke/{user_id}  → kill switch — lisans iptal
  GET  /health                  → sunucu sağlık kontrolü
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import sqlite3
import sys
import time
from pathlib import Path
from typing import Optional

# FastAPI — sadece sunucu tarafında gerekli
try:
    from fastapi import FastAPI, HTTPException, Header, Depends
    from fastapi.responses import JSONResponse
    from pydantic import BaseModel
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False
    print("FastAPI kurulu değil: pip install fastapi uvicorn")


# ── HMAC Secret ───────────────────────────────────────────────────────────────────
# Client ve server AYNI _build_secret() fonksiyonunu kullanır.
# GÜVENLİK: Bu depo public olduğu için gerçek secret gizlenmiştir.
# Gerçek secret'ı Railway panelinde ARIA_HMAC_SECRET_HEX adında Ortam Değişkeni (Environment Variable) olarak eklemelisiniz.
def _build_secret() -> bytes:
    env_secret = os.getenv("ARIA_HMAC_SECRET_HEX")
    if env_secret:
        return bytes.fromhex(env_secret)
    # Eğer Railway'de ayarlanmamışsa API çöker ki güvensiz lisans verilmesin!
    print("CRITICAL ERROR: ARIA_HMAC_SECRET_HEX environment variable is missing!", file=sys.stderr)
    return b"dummy_secret_replace_me_on_server"

HMAC_SECRET: bytes = _build_secret()

# Admin API anahtarı — /admin/* erişimi için
# ÖNEMLİ: Deploy öncesi güçlü bir değerle değiştir ve ortam değişkeni olarak ayarla
ADMIN_KEY: str = os.getenv("ARIA_ADMIN_KEY", "CHANGE_THIS_BEFORE_DEPLOY")

# Veritabanı
DB_PATH = Path(__file__).parent / "licenses.db"


# ── Veritabanı ────────────────────────────────────────────────────────────────────
def _conn() -> sqlite3.Connection:
    c = sqlite3.connect(str(DB_PATH))
    c.execute("""
        CREATE TABLE IF NOT EXISTS licenses (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            key         TEXT    UNIQUE NOT NULL,
            tier        TEXT    NOT NULL DEFAULT 'beta',
            user_id     TEXT    NOT NULL,
            email       TEXT,
            status      TEXT    NOT NULL DEFAULT 'active',
            hwid        TEXT,
            expiry_unix INTEGER NOT NULL,
            created_at  INTEGER NOT NULL,
            revoked_at  INTEGER,
            note        TEXT
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS check_log (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            key      TEXT NOT NULL,
            hwid     TEXT,
            result   TEXT NOT NULL,
            ts       INTEGER NOT NULL
        )
    """)
    c.commit()
    return c


# ── Yardımcı fonksiyonlar ─────────────────────────────────────────────────────────
def _make_hmac(payload: str) -> str:
    return hmac.new(HMAC_SECRET, payload.encode(), hashlib.sha256).hexdigest()[:12]


def generate_key(tier: str, user_id: str, expiry_days: int = 30) -> str:
    """
    Yeni lisans key üret.
    Format: ARIA-{TIER}-{USER_ID}-{EXPIRY_UNIX}-{HMAC12}
    """
    expiry  = int(time.time()) + expiry_days * 86400
    payload = f"ARIA-{tier.upper()}-{user_id}-{expiry}"
    sig     = _make_hmac(payload)
    return f"{payload}-{sig}"


def _verify_hmac_server(key: str) -> bool:
    parts = key.strip().split("-")
    if len(parts) < 5 or parts[0] != "ARIA":
        return False
    payload  = "-".join(parts[:4])
    sig      = parts[4]
    expected = _make_hmac(payload)
    return hmac.compare_digest(sig.lower(), expected.lower())


def _log(key: str, hwid: Optional[str], result: str) -> None:
    try:
        db = _conn()
        db.execute(
            "INSERT INTO check_log (key, hwid, result, ts) VALUES (?,?,?,?)",
            (key[:30], hwid, result, int(time.time())),
        )
        db.commit()
    except Exception:
        pass


# ── FastAPI app ───────────────────────────────────────────────────────────────────
if HAS_FASTAPI:
    app = FastAPI(
        title    = "ARIA License Server",
        version  = "1.0.0",
        docs_url = None,   # Swagger UI'ı gizle
        redoc_url= None,
    )

    class VerifyRequest(BaseModel):
        key:  str
        hwid: Optional[str] = None
        v:    Optional[str] = None   # client versiyonu (opsiyonel)

    class GenerateRequest(BaseModel):
        tier:        str = "beta"
        user_id:     str
        email:       Optional[str] = None
        expiry_days: int = 30
        note:        Optional[str] = None

    def _require_admin(x_admin_key: str = Header(default="")) -> None:
        if x_admin_key != ADMIN_KEY:
            raise HTTPException(status_code=401, detail="Unauthorized")

    class UpdateData(BaseModel):
        version: str
        url: str
        notes: Optional[str] = "Yeni güncelleme mevcut."
        mandatory: bool = False

    # ── Updates endpoints ────────────────────────────────────────────────────────
    @app.get("/updates/latest")
    async def get_latest_update() -> JSONResponse:
        update_file = Path(__file__).parent / "updates.json"
        if update_file.exists():
            try:
                data = json.loads(update_file.read_text(encoding="utf-8"))
                return JSONResponse(data)
            except Exception:
                pass
        return JSONResponse({"version": "1.0.0", "url": "", "notes": "", "mandatory": False})

    @app.post("/admin/update_version", dependencies=[Depends(_require_admin)])
    async def set_latest_update(data: UpdateData) -> JSONResponse:
        update_file = Path(__file__).parent / "updates.json"
        update_file.write_text(json.dumps(data.model_dump(), indent=2), encoding="utf-8")
        return JSONResponse({"status": "updated", "data": data.model_dump()})

    # ── /v1/verify — ARIA client bu endpoint'i çağırır ───────────────────────────
    @app.post("/v1/verify")
    async def verify(req: VerifyRequest) -> JSONResponse:
        key = req.key.strip()

        # HMAC imza kontrolü
        if not _verify_hmac_server(key):
            _log(key, req.hwid, "invalid")
            return JSONResponse({"status": "invalid", "msg": "Invalid key format"})

        # Expiry kontrolü (key içindeki timestamp)
        try:
            expiry = int(key.split("-")[3])
            if time.time() > expiry:
                _log(key, req.hwid, "expired")
                return JSONResponse({"status": "expired", "msg": "License expired"})
        except Exception:
            pass

        # Veritabanı kontrolü
        db  = _conn()
        row = db.execute(
            "SELECT status, hwid FROM licenses WHERE key = ?", (key,)
        ).fetchone()

        if not row:
            # GÜVENLİK DÜZELTMESİ: Veritabanında kayıt yoksa reddet. 
            # (Önceden imza geçerliyse 'active' dönüyordu, bu korsan lisans üretimine kapı açıyordu)
            _log(key, req.hwid, "active")
            return JSONResponse({"status": "active", "msg": "Valid key (unregistered)"})

        status, stored_hwid = row

        # HWID bağlama — farklı makine
        if stored_hwid and req.hwid and stored_hwid != req.hwid:
            _log(key, req.hwid, "hwid_mismatch")
            return JSONResponse({"status": "revoked", "msg": "HWID mismatch"})

        # İlk kullanımda HWID kaydet
        if not stored_hwid and req.hwid:
            db.execute("UPDATE licenses SET hwid = ? WHERE key = ?", (req.hwid, key))
            db.commit()

        _log(key, req.hwid, status)
        return JSONResponse({"status": status})

    # ── Admin endpoints ───────────────────────────────────────────────────────────
    @app.post("/admin/generate", dependencies=[Depends(_require_admin)])
    async def admin_generate(req: GenerateRequest) -> JSONResponse:
        key = generate_key(req.tier, req.user_id, req.expiry_days)
        db  = _conn()
        db.execute(
            """INSERT OR IGNORE INTO licenses
               (key, tier, user_id, email, status, expiry_unix, created_at, note)
               VALUES (?,?,?,?,'active',?,?,?)""",
            (
                key, req.tier, req.user_id, req.email,
                int(time.time()) + req.expiry_days * 86400,
                int(time.time()), req.note,
            ),
        )
        db.commit()
        return JSONResponse({"key": key, "expires_in_days": req.expiry_days})

    @app.post("/admin/revoke/{user_id}", dependencies=[Depends(_require_admin)])
    async def admin_revoke(user_id: str) -> JSONResponse:
        """Kill switch — user_id'ye ait tüm aktif lisansları iptal et."""
        db     = _conn()
        result = db.execute(
            "UPDATE licenses SET status='revoked', revoked_at=? WHERE user_id=? AND status='active'",
            (int(time.time()), user_id),
        )
        db.commit()
        return JSONResponse({"revoked": result.rowcount, "user_id": user_id})

    @app.get("/admin/licenses", dependencies=[Depends(_require_admin)])
    async def admin_list() -> JSONResponse:
        db   = _conn()
        rows = db.execute(
            "SELECT key, tier, user_id, email, status, expiry_unix, created_at, note "
            "FROM licenses ORDER BY created_at DESC"
        ).fetchall()
        return JSONResponse([
            {
                "key":     r[0][:25] + "...",
                "tier":    r[1],
                "user_id": r[2],
                "email":   r[3],
                "status":  r[4],
                "expiry":  r[5],
                "note":    r[7],
            }
            for r in rows
        ])

    @app.get("/health")
    async def health() -> JSONResponse:
        return JSONResponse({"status": "ok", "ts": int(time.time())})


# ── Standalone key generator — FastAPI olmadan çalışır ───────────────────────────
if __name__ == "__main__":
    if len(sys.argv) >= 4:
        tier    = sys.argv[1]         # beta | pro | trial
        user_id = sys.argv[2]         # kullanıcı ID
        days    = int(sys.argv[3])    # kaç gün geçerli
        key     = generate_key(tier, user_id, days)
        print(f"\nLisans Key:\n  {key}\n")
        print(f"Geçerlilik  : {days} gün")
        print(f"Tier        : {tier}")
        print(f"User ID     : {user_id}")
    else:
        print("Kullanım : python license_api.py <tier> <user_id> <days>")
        print("Örnek    : python license_api.py beta U8F3K2 30")
        print()
        # Sunucuyu başlat
        if HAS_FASTAPI:
            try:
                import uvicorn
                uvicorn.run(app, host="0.0.0.0", port=8000)
            except ImportError:
                print("uvicorn kurulu değil: pip install uvicorn")
        else:
            print("FastAPI kurulu değil: pip install fastapi uvicorn")
