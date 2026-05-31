import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Cpu, Layers, Workflow, Terminal, Code2, MoveRight, 
  Link as LinkIcon, FileCode2, Globe, FileText, Sunrise, Calendar, 
  CheckCircle2, Clock, Search, Eye, Lock, Volume2, Download, Check, 
  Sparkles, Key, HardDrive, RefreshCw, AlertTriangle, Users, ChevronRight, Play, Pause, SkipForward
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState('TR'); // 'TR' or 'EN'
  const [activePersona, setActivePersona] = useState('dev');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteResult, setPaletteResult] = useState('default');
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseStatus, setLicenseStatus] = useState('idle'); // idle, checking, success, error
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const [spotifyProgress, setSpotifyProgress] = useState(35);

  // Localization strings
  const t = {
    TR: {
      navSubtitle: "Bilişsel Mimari • v3.0 Kararlı",
      navContact: "İletişime Geç",
      navGetLicense: "Lisans Anahtarı Al",
      heroBadge: "KİŞİSEL YAPAY ZEKA İŞLETİM SİSTEMİ KATMANI",
      heroTitle1: "OS'iniz Sizi Bilir.",
      heroTitle2: "ARIA Sizi Hatırlar.",
      heroDesc: "Sıradan chatbotların ve basit komut paletlerinin ötesine geçin. ARIA v3, alışkanlıklarınızı öğrenen, gizliliğinizi yerel olarak koruyan ve siz söylemeden harekete geçen otonom bir yapay zeka ortam katmanıdır.",
      ctaStart: "Hemen Lisans Al",
      ctaDemo: "Simülatörü Dene",
      simTitle: "Etkileşimli Alt+Space Komut Paleti Simülatörü",
      simDesc: "Aşağıdaki butonlara tıklayarak ARIA v3'ün <50ms anlık yanıt hızını ve masaüstü entegrasyon yeteneklerini web üzerinde test edin:",
      simBtnLauncher: "Uygulama Çalıştırıcı",
      simBtnSpotify: "Spotify Entegrasyonu",
      simBtnCoder: "Yazılımcı Ajanı",
      simBtnWindow: "Pencere Düzeni",
      simBtnCalc: "Hızlı Hesaplama",
      simPlaceholder: "Bir komut yazın veya yukarıdan seçin...",
      simFastResponse: "Hızlı Yanıt (Fast Path)",
      simLLMResponse: "Bilişsel Zeka Yanıtı (LLM)",
      simLatency: "Gecikme Süresi",
      archTitle: "Spagetti Koddan Bilişsel Mimariye",
      archDesc: "ARIA v3, v2.x'teki tek parça god-class (tüm işi üstlenen) mimarisini tamamen parçalayarak bağımsız, yüksek performanslı motorlara böldü.",
      archLegacy: "Eski Monolitik Yapı (v2.2.x)",
      archNew: "Yeni Bilişsel Mimari (v3.0.0)",
      archLegItem1: "God Class — agent.py (Streaming + Trim + Prompts hepsi bir yerde)",
      archLegItem2: "Dump Alanı — bridge.py (Routing + streaming + UI slotları karışık)",
      archLegItem3: "FAISS Sadece RAM (Her açılışta 2-5 saniye cold-start gecikmesi)",
      archNewItem1: "Cognitive Engine (Planner, Fast Path, Tool Executor, Stream Coordinator)",
      archNewItem2: "Context Engine (FTS5 Türkçe Hafıza, Disk Önbellekli FAISS, Profil Yöneticisi)",
      archNewItem3: "Auth Broker & Permission Gate (OS düzeyinde token şifreleme ve izin kapısı)",
      personaTitle: "Kişisel Onboarding Profilleri",
      personaDesc: "ARIA v3 ilk açılışta seçtiğiniz mesleki kimliğe göre hafıza modelini, kısayollarını ve sistem prompt dilini otomatik olarak yapılandırır.",
      privacyTitle: "Gizlilik & Yerel Güvenlik Kalesi",
      privacyDesc: "ARIA, verilerinizi asla kendi sunucularına aktarmaz. Tüm entegrasyon şifreleriniz ve konuşma geçmişiniz tamamen sizin kontrolünüzdedir.",
      privGate: "5 Durumlu İzin Kapısı",
      privGateDesc: "Ekran görüntüsü, dosya yazma veya shell komutları için her zaman, oturumda bir kez sor veya tamamen engelle.",
      privVault: "OS-Level Token Şifreleme",
      privVaultDesc: "API anahtarlarınız ve Spotify token'larınız Windows Credential Manager & DPAPI ile doğrudan Windows oturumunuza kilitlenir.",
      nightShiftTitle: "Night Shift v2 — Siz Uyurken O Çalışsın",
      nightShiftDesc: "Sınırsız Pro sürümünde ARIA, uykuda olduğunuz zaman diliminde karmaşık araştırma, kodlama ve dokümantasyon görevlerini tamamen otonom olarak yürütür.",
      pricingTitle: "Yatırım Getirisi Net Ticari Paketler",
      pricingDesc: "ARIA bir açık kaynak projesi değildir; iş akışınızı uçuracak, kararlılık garantili ve profesyonel destekli ticari bir üründür.",
      pricingBYOK: "BYOK (Kendi Anahtarını Getir) Modeli",
      pricingBYOKDesc: "Kendi OpenAI, Anthropic, Gemini veya local Ollama anahtarlarınızı bağlayarak yapay zeka maliyetlerinizi tamamen sıfıra indirebilirsiniz.",
      freeTier: "Deneme (Free)",
      proTier: "Profesyonel (Pro)",
      teamTier: "Ekip (Team)",
      freeLimit: "Temel Özellikler",
      proLimit: "Gelişmiş Bilişsel Güç",
      teamLimit: "Kurumsal İşbirliği",
      buyNow: "Satın Al / Deneme Başlat",
      licenseModalTitle: "ARIA v3 Lisans Aktivasyon Sihirbazı",
      licenseModalDesc: "ARIA v3 Desktop uygulamasını indirdikten sonra size verilen lisans anahtarını girerek tam sürümü aktif edebilirsiniz. Test etmek için aşağıdaki butona basıp mock anahtarı deneyin.",
      licenseMockBtn: "Örnek Pro Key Ekle",
      licenseVerifyBtn: "Lisansı Doğrula (ECDSA)",
      licenseSuccessMsg: "Tebrikler! ARIA v3 Pro Lisansınız ECDSA imzasıyla başarıyla doğrulandı. Kişisel AI OS hazır!",
      licenseErrorMsg: "Hata: Geçersiz lisans anahtarı. Lütfen tekrar deneyin.",
    },
    EN: {
      navSubtitle: "Cognitive Architecture • v3.0 Stable",
      navContact: "Contact Support",
      navGetLicense: "Get License Key",
      heroBadge: "PERSONAL AI OPERATING SYSTEM LAYER",
      heroTitle1: "Your OS Knows You.",
      heroTitle2: "ARIA Remembers You.",
      heroDesc: "Go beyond generic chatbots and basic launchers. ARIA v3 is a proprietary, ambient intelligence layer that learns your preferences, secures your privacy locally, and acts pro-actively without you having to ask.",
      ctaStart: "Get License Now",
      ctaDemo: "Try Simulator",
      simTitle: "Interactive Alt+Space Command Palette Simulator",
      simDesc: "Click the buttons below to test ARIA v3's <50ms instant response latency and native OS integration capabilities directly on the web:",
      simBtnLauncher: "App Launcher",
      simBtnSpotify: "Spotify Integration",
      simBtnCoder: "Coder Specialist",
      simBtnWindow: "Window Grid",
      simBtnCalc: "Instant Calculation",
      simPlaceholder: "Type a command or select one above...",
      simFastResponse: "Fast Path Response",
      simLLMResponse: "Cognitive AI Response (LLM)",
      simLatency: "Latency Check",
      archTitle: "From Spaghetti Code to Cognitive Architecture",
      archDesc: "ARIA v3 shatters the monolithic god-classes (agent.py and bridge.py) of v2.x into clean, decoupled, high-performance engines.",
      archLegacy: "Legacy Monolithic Architecture (v2.2.x)",
      archNew: "New Cognitive Architecture (v3.0.0)",
      archLegItem1: "God Class — agent.py (Streaming + Trim + Prompts tightly coupled)",
      archLegItem2: "Dump Area — bridge.py (Routing + streaming + UI slots mixed)",
      archLegItem3: "RAM-only FAISS (2-5 seconds cold-start latency on every launch)",
      archNewItem1: "Cognitive Engine (Planner, Fast Path, Tool Executor, Stream Coordinator)",
      archNewItem2: "Context Engine (FTS5 Memory, Disk-cached FAISS, Profile Manager)",
      archNewItem3: "Auth Broker & Permission Gate (OS-level token encryption and safety gate)",
      personaTitle: "Onboarding Personas",
      personaDesc: "ARIA v3 automatically configures its memory models, short-keys, and system prompts based on the professional profile selected during startup.",
      privacyTitle: "Gizlilik & Yerel Güvenlik Kalesi",
      privacyDesc: "ARIA never uploads your raw interaction data to remote servers. All your credentials and history logs stay encrypted on your hard drive.",
      privGate: "5-State Permission Gate",
      privGateDesc: "Choose to Always Allow, Ask Every Time, Ask Once per Session, or Deny screen capture, file write, and shell executions.",
      privVault: "OS-Level Token Security",
      privVaultDesc: "API keys and OAuth tokens are stored inside Windows Credential Manager & DPAPI, securely locked to your Windows user session.",
      nightShiftTitle: "Night Shift v2 — Autonomous Off-Hours Execution",
      nightShiftDesc: "In the unlimited Pro tier, ARIA coordinates multi-step research, coding, and audit tasks autonomously while you are asleep.",
      pricingTitle: "ROI-Focused Commercial Tiers",
      pricingDesc: "ARIA is a proprietary commercial product built with extreme stability, secure OTA updates, and 24/7 priority support.",
      pricingBYOK: "BYOK (Bring Your Own Key) Model",
      pricingBYOKDesc: "Connect your own OpenAI, Anthropic, Gemini, or local Ollama keys to completely zero out your AI API expenses.",
      freeTier: "Free Trial",
      proTier: "Professional (Pro)",
      teamTier: "Team / Enterprise",
      freeLimit: "Essential Features",
      proLimit: "Advanced Cognitive Power",
      teamLimit: "Corporate Collaboration",
      buyNow: "Purchase License / Start Trial",
      licenseModalTitle: "ARIA v3 License Activation Wizard",
      licenseModalDesc: "Enter the secure license key provided to you after downloading ARIA v3. Click the button below to paste a mock key and test the ECDSA verification flow.",
      licenseMockBtn: "Load Sample Pro Key",
      licenseVerifyBtn: "Verify License (ECDSA)",
      licenseSuccessMsg: "Success! Your ARIA v3 Pro License has been securely validated via ECDSA. Personal AI OS initialized!",
      licenseErrorMsg: "Error: Invalid license key format. Please try again.",
    }
  };

  // Simulates command outputs
  const handleSimCommand = (cmdType) => {
    if (cmdType === 'launcher') {
      setPaletteQuery('ch');
      setPaletteResult('launcher');
    } else if (cmdType === 'spotify') {
      setPaletteQuery('spotify');
      setPaletteResult('spotify');
    } else if (cmdType === 'coder') {
      setPaletteQuery('/code generate rest api');
      setPaletteResult('coder');
    } else if (cmdType === 'window') {
      setPaletteQuery('>snap-left');
      setPaletteResult('window');
    } else if (cmdType === 'calc') {
      setPaletteQuery('256 * 4 / 2');
      setPaletteResult('calc');
    }
  };

  // Simulated Spotify progression
  useEffect(() => {
    let interval;
    if (spotifyPlaying) {
      interval = setInterval(() => {
        setSpotifyProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [spotifyPlaying]);

  // Handle mock license verification
  const handleVerifyLicense = () => {
    setLicenseStatus('checking');
    setTimeout(() => {
      if (licenseKey.trim().toUpperCase() === 'ARIA-V3-PRO-KEY') {
        setLicenseStatus('success');
      } else {
        setLicenseStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-purple-500/30 overflow-hidden relative">
      
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none noise z-0" />
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-purple-950/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-0 right-1/4 translate-x-1/2 w-[700px] h-[500px] bg-indigo-950/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-900/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center glow-purple-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.25em] text-sm">ARIA v3</span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-tight">{t[lang].navSubtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(l => l === 'TR' ? 'EN' : 'TR')}
              className="text-xs font-mono font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              {lang}
            </button>
            <button 
              onClick={() => {
                setLicenseKey('');
                setLicenseStatus('idle');
                setShowLicenseModal(true);
              }}
              className="hidden md:inline-flex text-xs font-mono font-bold text-zinc-400 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
            >
              {t[lang].navGetLicense}
            </button>
            <button 
              onClick={() => {
                setLicenseKey('');
                setLicenseStatus('idle');
                setShowLicenseModal(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg glow-purple-sm hover:scale-[1.03] cursor-pointer"
            >
              {t[lang].ctaStart}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-28 pb-16 z-10">
        <div className="text-center max-w-5xl mx-auto relative">
          
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] md:text-xs font-mono text-purple-300 mb-6 border border-purple-500/20 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse glow-purple-sm" />
              {t[lang].heroBadge}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.95] select-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600 font-light block mb-2">{t[lang].heroTitle1}</span>
              <span className="text-white text-glow-purple">{t[lang].heroTitle2}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base md:text-xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              {t[lang].heroDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setShowLicenseModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-xl glow-purple hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                {t[lang].buyNow}
              </button>
              <a 
                href="#simulator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-zinc-300 font-semibold border border-white/10 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-400" />
                {t[lang].ctaDemo}
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Interactive Command Palette Simulator */}
      <section id="simulator" className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].simTitle}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t[lang].simDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Commands Left Panel */}
            <div className="lg:col-span-4 space-y-3">
              <FadeIn delay={0.1} className="flex flex-col gap-2">
                <button 
                  onClick={() => handleSimCommand('launcher')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${paletteResult === 'launcher' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-sm">{t[lang].simBtnLauncher}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">"ch"</span>
                </button>

                <button 
                  onClick={() => handleSimCommand('spotify')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${paletteResult === 'spotify' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-4 h-4 text-green-400" />
                    <span className="font-mono text-sm">{t[lang].simBtnSpotify}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">"spotify"</span>
                </button>

                <button 
                  onClick={() => handleSimCommand('coder')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${paletteResult === 'coder' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-sm">{t[lang].simBtnCoder}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">"/code"</span>
                </button>

                <button 
                  onClick={() => handleSimCommand('window')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${paletteResult === 'window' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <Workflow className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-sm">{t[lang].simBtnWindow}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">"&gt;snap-left"</span>
                </button>

                <button 
                  onClick={() => handleSimCommand('calc')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${paletteResult === 'calc' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-pink-400" />
                    <span className="font-mono text-sm">{t[lang].simBtnCalc}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">"256 * 4 / 2"</span>
                </button>
              </FadeIn>
            </div>

            {/* Command Palette Visualizer Screen */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.2} className="glass rounded-2xl border-white/10 overflow-hidden glow-purple shadow-2xl relative">
                
                {/* Window header */}
                <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex items-center justify-between font-mono text-[11px] text-zinc-500 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/30" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/30" />
                    <span className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <span>ARIA — Alt+Space Command Surface</span>
                  <span className="text-purple-400">Stable v3.0.0</span>
                </div>

                {/* Input Bar */}
                <div className="p-4 bg-zinc-950/60 border-b border-white/5 flex items-center gap-3 relative">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <input 
                    type="text" 
                    readOnly
                    value={paletteQuery} 
                    placeholder={t[lang].simPlaceholder}
                    className="bg-transparent border-0 outline-none text-base w-full text-zinc-100 font-mono"
                  />
                  <div className="flex items-center gap-1">
                    <kbd className="text-[10px] bg-zinc-900 border border-white/10 px-2 py-0.5 rounded text-zinc-500">Esc</kbd>
                    <kbd className="text-[10px] bg-purple-600 px-2 py-0.5 rounded text-white font-mono">Enter</kbd>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="p-6 min-h-[280px] bg-zinc-950/40 relative font-mono text-sm leading-relaxed overflow-y-auto">
                  <AnimatePresence mode="wait">
                    
                    {paletteResult === 'default' && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="text-zinc-500 space-y-4"
                      >
                        <div>&gt; System initialized. Alt+Space is bound to global hotkey.</div>
                        <div className="text-purple-400/70">💡 Press one of the trigger buttons on the left or type your command to run simulations.</div>
                        <div className="grid grid-cols-2 gap-4 pt-6">
                          <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
                            <div className="font-bold text-zinc-300 mb-1">⚡ Fast Path</div>
                            <div className="text-xs">Math, time, system snaps are solved instantly in &lt;15ms without querying LLMs.</div>
                          </div>
                          <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
                            <div className="font-bold text-zinc-300 mb-1">🔐 Privacy Gate</div>
                            <div className="text-xs">Token storage locked to Windows DPAPI encryption. No cloud leaks.</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paletteResult === 'launcher' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs text-purple-400 border-b border-white/5 pb-2">
                          <span>{t[lang].simFastResponse} (&lt;20ms app index)</span>
                          <span>3 MATCHES FOUND</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 bg-purple-600/10 border border-purple-500/30 rounded-xl flex items-center justify-between text-zinc-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5 text-purple-400 font-bold">VS</div>
                              <div>
                                <div className="font-bold text-sm">Visual Studio Code</div>
                                <div className="text-[10px] text-zinc-500">C:\Program Files\Microsoft VS Code\Code.exe</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="p-3 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center justify-between text-zinc-400">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5 text-zinc-500 font-bold">Ch</div>
                              <div>
                                <div className="font-bold text-sm">Google Chrome</div>
                                <div className="text-[10px] text-zinc-500">C:\Program Files\Google\Chrome\Application\chrome.exe</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-600" />
                          </div>
                          <div className="p-3 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center justify-between text-zinc-400">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5 text-green-400 font-bold">Sp</div>
                              <div>
                                <div className="font-bold text-sm">Spotify</div>
                                <div className="text-[10px] text-zinc-500">C:\Users\User\AppData\Roaming\Spotify\Spotify.exe</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-600" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paletteResult === 'spotify' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs text-green-400 border-b border-white/5 pb-2">
                          <span>🎵 Spotify Broker Connection (PKCE OAuth Verified)</span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse glow-green-sm" />
                            Premium Connected
                          </span>
                        </div>
                        <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-2xl flex items-center gap-5 relative overflow-hidden">
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-green-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-lg relative shrink-0">
                            <Sparkles className="w-8 h-8 text-green-400 animate-pulse-glow" />
                          </div>
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="truncate font-bold text-zinc-100 text-base">Cognitive Flow (Synapse Sessions)</div>
                            <div className="text-zinc-400 text-xs truncate">ARIA v3 Soundtrack Edition</div>
                            <div className="space-y-1">
                              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 transition-all" style={{ width: `${spotifyProgress}%` }} />
                              </div>
                              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                <span>0:{spotifyProgress < 10 ? '0' : ''}{spotifyProgress}</span>
                                <span>2:45</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <button 
                              onClick={() => setSpotifyPlaying(!spotifyPlaying)}
                              className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 text-zinc-950 flex items-center justify-center transition-all cursor-pointer"
                            >
                              {spotifyPlaying ? <Pause className="w-4 h-4 fill-zinc-950" /> : <Play className="w-4 h-4 fill-zinc-950 translate-x-0.5" />}
                            </button>
                            <button className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-all cursor-pointer">
                              <SkipForward className="w-3.5 h-3.5 fill-zinc-300" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paletteResult === 'coder' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs text-indigo-400 border-b border-white/5 pb-2">
                          <span>🧠 Coder Specialist Active (Streaming Context Builder)</span>
                          <span>TTFT: 240ms</span>
                        </div>
                        <div className="p-4 bg-zinc-950 border border-white/5 rounded-xl text-zinc-300 overflow-x-auto text-[11px] font-mono whitespace-pre-wrap select-text leading-relaxed">
                          <span className="text-purple-400">from</span> core.cognitive.engine <span className="text-purple-400">import</span> CognitiveEngine
                          <br /><span className="text-purple-400">from</span> core.observability.logger <span className="text-purple-400">import</span> get_logger
                          <br /><br />log = get_logger(<span className="text-green-300">"coder_agent"</span>)
                          <br /><br /><span className="text-blue-300">async def</span> <span className="text-yellow-300">generate_api_response</span>(context: dict) -&gt; dict:
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># Cognitive Fast Path check</span>
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-yellow-300">check_fast_path</span>(context[<span className="text-green-300">"prompt"</span>]):
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log.info(<span className="text-green-300">"Fast Path matched"</span>)
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-300">execute_fast_path</span>(context[<span className="text-green-300">"prompt"</span>])
                        </div>
                      </motion.div>
                    )}

                    {paletteResult === 'window' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs text-cyan-400 border-b border-white/5 pb-2">
                          <span>⚡ Window Manager snap-left execution</span>
                          <span>COMPLETED (0ms CPU)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 h-32 items-center">
                          <div className="h-full bg-cyan-500/10 border border-cyan-500/40 rounded-xl flex items-center justify-center font-bold text-cyan-300 shadow-inner glow-purple-sm">
                            Active App (Left Grid Snap)
                          </div>
                          <div className="h-full bg-zinc-900/30 border border-white/5 rounded-xl flex items-center justify-center text-zinc-600">
                            Desktop Grid Right
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paletteResult === 'calc' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs text-pink-400 border-b border-white/5 pb-2">
                          <span>⚡ Fast Path calculation (No LLM API cost, local asteval sandbox)</span>
                          <span>LATENCY: 8ms</span>
                        </div>
                        <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center justify-between">
                          <span className="text-zinc-500">Expression:</span>
                          <span className="font-bold text-zinc-300 text-lg">256 * 4 / 2</span>
                        </div>
                        <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-between glow-purple-sm">
                          <span className="text-pink-400 font-bold">Result:</span>
                          <span className="font-bold text-white text-xl">512</span>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Simulated metadata footer */}
                <div className="bg-zinc-900/80 px-4 py-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500 select-none">
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Turkish FTS5 SQLite active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{t[lang].simLatency}: <strong className="text-purple-400">{paletteResult === 'coder' ? '240ms' : paletteResult === 'default' ? '-' : '< 15ms'}</strong></span>
                    <span>OTA ECDSA active</span>
                  </div>
                </div>

              </FadeIn>
            </div>

          </div>

        </div>
      </section>

      {/* The Legacy vs The Evolution */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* The Monolith (Legacy) */}
            <div>
              <FadeIn>
                <h2 className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-4">v2.2.2 LEGACY AUDIT</h2>
                <h3 className="text-4xl font-bold mb-6 text-zinc-400">{t[lang].archTitle}</h3>
                <p className="text-zinc-500 text-base leading-relaxed mb-8">
                  {t[lang].archDesc}
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="glass p-6 rounded-2xl border-red-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Layers className="w-32 h-32" /></div>
                <div className="text-xs font-mono text-zinc-500 mb-4 font-bold tracking-widest text-red-400/60 uppercase">{t[lang].archLegacy}</div>
                <div className="space-y-3 font-mono text-xs text-zinc-500 relative z-10">
                  <div className="p-3 bg-zinc-900/80 rounded-xl border border-red-950/20 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <span>{t[lang].archLegItem1}</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 rounded-xl border border-red-950/20 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <span>{t[lang].archLegItem2}</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 rounded-xl border border-red-950/20 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <span>{t[lang].archLegItem3}</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* The Cognitive Engine (v3.0) */}
            <div>
              <FadeIn delay={0.3}>
                <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">v3.0.0 COGNITIVE</h2>
                <h3 className="text-4xl font-bold mb-6 text-white text-glow-purple">Engine Abstraction</h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-8">
                  God classes were eliminated. ARIA v3 splits its brain into isolated threads. Fast Path bypasses heavy LLM calls completely, while the Context Engine feeds vector search models in parallel.
                </p>
              </FadeIn>

              <FadeIn delay={0.5} className="gradient-border p-6 relative overflow-hidden glow-purple">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-32 h-32 text-purple-500" /></div>
                <div className="text-xs font-mono text-zinc-300 mb-4 font-bold tracking-widest text-purple-400 uppercase">{t[lang].archNew}</div>
                <div className="space-y-3 font-mono text-xs text-zinc-300 relative z-10">
                  <div className="p-3 bg-purple-950/15 border border-purple-500/20 rounded-xl flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 glow-purple-sm" />
                    <span>{t[lang].archNewItem1}</span>
                  </div>
                  <div className="p-3 bg-purple-950/15 border border-purple-500/20 rounded-xl flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 glow-purple-sm" />
                    <span>{t[lang].archNewItem2}</span>
                  </div>
                  <div className="p-3 bg-purple-950/15 border border-purple-500/20 rounded-xl flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 glow-purple-sm" />
                    <span>{t[lang].archNewItem3}</span>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Onboarding Personas Hub */}
      <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].personaTitle}</h2>
              <h3 className="text-4xl font-bold mb-6">Persona-Based System Optimization</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t[lang].personaDesc}
              </p>
            </FadeIn>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              { id: 'dev', label: '🧑‍💻 Developer', color: 'text-purple-400' },
              { id: 'writer', label: '✍️ Writer / Editor', color: 'text-pink-400' },
              { id: 'pro', label: '📊 Professional', color: 'text-cyan-400' },
              { id: 'student', label: '🎓 Student / Researcher', color: 'text-indigo-400' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActivePersona(tab.id)}
                className={`px-5 py-3 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${activePersona === tab.id ? 'bg-purple-950/20 border-purple-500/40 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Persona details */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activePersona === 'dev' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="glass p-8 rounded-2xl border-white/10 grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="font-bold text-xl text-purple-400">Developer Cognitive Engine</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Optimized for low-latency coding support, terminal command sandboxing, and index tracking of code repositories. Instantly hooks workspace files for local context builders.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
                      <div>🛠️ Shell Sandbox Gate</div>
                      <div>📂 Workspace RAG Indexing</div>
                      <div>💬 Alt+Space &gt; Coding Specialist</div>
                      <div>🛡️ DPAPI Local Vault</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs text-zinc-500">
                    <div className="text-purple-400 font-bold">Fast-Keys Config:</div>
                    <div>• Alt+Space &gt; open terminal</div>
                    <div>• ;sign &gt; git signature</div>
                    <div>• ;code &gt; auto-doc template</div>
                  </div>
                </motion.div>
              )}

              {activePersona === 'writer' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="glass p-8 rounded-2xl border-white/10 grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="font-bold text-xl text-pink-400">Writer & Content Specialist</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Tailored memory indexers prioritize document formats, copywriting templates, and contextual vocabulary. Integrates deeply with clipboard actions to suggest rewriting, summarizing, and translating text snippets instantly.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
                      <div>✍️ Snippets & Text Expander</div>
                      <div>📚 Unlimited Episodic Memory</div>
                      <div>🔗 Context-aware Clipboard FAB</div>
                      <div>🌍 Native Localization Engine</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs text-zinc-500">
                    <div className="text-pink-400 font-bold">Fast-Keys Config:</div>
                    <div>• ;mail &gt; standard signature</div>
                    <div>• ;tarih &gt; dynamic date-time</div>
                    <div>• ;blog &gt; post outline structure</div>
                  </div>
                </motion.div>
              )}

              {activePersona === 'pro' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="glass p-8 rounded-2xl border-white/10 grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="font-bold text-xl text-cyan-400">Corporate & Professional Dashboard</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Forces ARIA's background schedulers to prioritize calendar syncing, briefing alerts, and email summaries. Proactive rules automatically pause background Spotify queues when corporate meetings are about to start.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
                      <div>🌅 Automated Morning Briefing</div>
                      <div>📅 Meeting Prep Notifications</div>
                      <div>🎵 Spotify Premium Control</div>
                      <div>🔒 Windows Credential Vault</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs text-zinc-500">
                    <div className="text-cyan-400 font-bold">Fast-Keys Config:</div>
                    <div>• Alt+Space &gt; today's briefing</div>
                    <div>• ;zoomin &gt; open meeting link</div>
                    <div>• ;todo &gt; append custom task</div>
                  </div>
                </motion.div>
              )}

              {activePersona === 'student' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="glass p-8 rounded-2xl border-white/10 grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="font-bold text-xl text-indigo-400">Research & Academic Assistant</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Optimizes FTS5 local search indices and FAISS cache weights for PDF search, book cataloging, and web-page indexing. Perfect for synthesizing broad topics, citing files, and cross-referencing notes.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
                      <div>🔍 Bounded Filesystem Scan</div>
                      <div>🧠 Hybrid Memory (FAISS + FTS5)</div>
                      <div>💻 Offline Local Ollama Support</div>
                      <div>📋 Automatic Source Referencing</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs text-zinc-500">
                    <div className="text-indigo-400 font-bold">Fast-Keys Config:</div>
                    <div>• Alt+Space &gt; search files</div>
                    <div>• ;cite &gt; paste last citation</div>
                    <div>• ;note &gt; open scratch notes</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Security & Privacy Hub */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <FadeIn>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 glow-purple-sm">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-4xl font-bold mb-4">{t[lang].privacyTitle}</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {t[lang].privacyDesc}
                </p>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={0.2} className="glass p-5 rounded-xl border-white/5 flex items-start gap-4">
                  <Eye className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-200">{t[lang].privGate}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{t[lang].privGateDesc}</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3} className="glass p-5 rounded-xl border-purple-500/20 flex items-start gap-4 glow-purple-sm">
                  <Key className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-200">{t[lang].privVault}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{t[lang].privVaultDesc}</p>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Simulated Settings / Privacy GUI Mockup */}
            <div className="relative">
              <FadeIn delay={0.4} className="glass rounded-2xl border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-zinc-900/60 px-4 py-3 border-b border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>ARIA — Settings & Privacy Center</span>
                  <span className="text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Locally Encrypted</span>
                </div>
                <div className="p-6 bg-zinc-950/40 space-y-5 text-xs font-mono">
                  
                  <div className="space-y-2">
                    <div className="text-purple-400 font-bold uppercase tracking-wider text-[10px]">Permission Matrices</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center p-2.5 bg-zinc-900/50 rounded border border-white/5">
                        <span>shell.execute (Komut Çalıştırma)</span>
                        <span className="text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded bg-yellow-500/5 text-[10px]">ASK EVERY TIME</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-900/50 rounded border border-white/5">
                        <span>file.read (Dosya Okuma)</span>
                        <span className="text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded bg-purple-500/5 text-[10px]">SESSION ONCE</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-900/50 rounded border border-white/5">
                        <span>screen.capture (Ekran Görüntüsü)</span>
                        <span className="text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded bg-yellow-500/5 text-[10px]">ASK EVERY TIME</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-purple-400 font-bold uppercase tracking-wider text-[10px]">DPAPI Token Vault</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center p-2.5 bg-zinc-900/80 rounded border border-green-500/20">
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> Spotify OAuth Access Token</span>
                        <span className="text-green-500 text-[10px]">SECURED IN WINDOWS CREDENTIALS</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-900/80 rounded border border-green-500/20">
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> OpenAI BYOK API Key</span>
                        <span className="text-green-500 text-[10px]">LOCKED TO WINDOWS HWID</span>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>

        </div>
      </section>

      {/* Night Shift v2 Progress Board */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].nightShiftTitle}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t[lang].nightShiftDesc}
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2} className="glass p-6 md:p-8 rounded-2xl border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><RefreshCw className="w-48 h-48 text-purple-500 animate-spin" style={{ animationDuration: '40s' }} /></div>
              
              {/* Task Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-4 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center glow-purple-sm">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-200">Task #412 — ARIA v3 Competitor Audit</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Autonomous Execution • Scheduled at 03:00 AM</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono border border-green-500/30 px-3 py-1 rounded bg-green-500/10 text-green-400 w-fit shrink-0">COMPLETED & VERIFIED</span>
              </div>

              {/* Steps Progress */}
              <div className="space-y-4 font-mono text-xs">
                
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-300">1. Expand & Plan Task</div>
                    <div className="text-[10px] text-zinc-500">Decoupled Planner calculated O(n) execution path. Generated 4 sub-steps.</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-300">2. Parallel Web Search & Scraping</div>
                    <div className="text-[10px] text-zinc-500">Queried web indices for "personal ai os developments". Compiled 7 sources.</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-300">3. Write Analysis to Workspace</div>
                    <div className="text-[10px] text-zinc-500">File writer generated C:\Users\User\Documents\Reports\audit_results.md</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-300">4. Final Verification Check</div>
                    <div className="text-[10px] text-zinc-500">Decoupled verification script verified file hash integrity. Completed.</div>
                  </div>
                </div>

              </div>

            </FadeIn>
          </div>

        </div>
      </section>

      {/* Commercial Subscription Pricing Grid */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].pricingTitle}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t[lang].pricingDesc}
              </p>
            </FadeIn>
          </div>

          {/* BYOK Spotlight banner */}
          <FadeIn delay={0.1} className="max-w-4xl mx-auto mb-16">
            <div className="gradient-border p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 glow-purple">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Cpu className="w-32 h-32 text-purple-500" /></div>
              <div className="space-y-2 text-center md:text-left relative z-10">
                <h4 className="font-bold text-lg text-purple-300 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse-glow" />
                  {t[lang].pricingBYOK}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                  {t[lang].pricingBYOKDesc}
                </p>
              </div>
              <span className="text-xs font-mono bg-purple-600 px-4 py-2 rounded-xl text-white font-bold shrink-0 shadow-lg glow-purple-sm">UNLIMITED BYOK / OLLAMA</span>
            </div>
          </FadeIn>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free Tier */}
            <FadeIn delay={0.2} className="glass p-8 rounded-2xl border-white/5 flex flex-col justify-between h-full relative">
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-zinc-500 text-sm font-bold tracking-widest uppercase">{t[lang].freeTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$0</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Start instantly, no credit card required</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-300 text-[10px] uppercase tracking-wider">{t[lang].freeLimit}</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 30 Daily AI Messages (Cloud)</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited BYOK Messages</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited Local Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> App Launcher & File Search</div>
                  <div className="flex items-center gap-2 text-zinc-600"><AlertTriangle className="w-4 h-4 text-zinc-800" /> 7-Day Context Memory Only</div>
                  <div className="flex items-center gap-2 text-zinc-600"><AlertTriangle className="w-4 h-4 text-zinc-800" /> Basic Permission Gate</div>
                </div>
              </div>

              <button 
                onClick={() => setShowLicenseModal(true)}
                className="mt-8 w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer"
              >
                Start Free Trial
              </button>
            </FadeIn>

            {/* Pro Tier */}
            <FadeIn delay={0.3} className="glass p-8 rounded-2xl border-purple-500/30 flex flex-col justify-between h-full relative glow-purple shadow-xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-600 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest text-white uppercase shadow-md glow-purple-sm">POPULAR</div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-purple-400 text-sm font-bold tracking-widest uppercase">{t[lang].proTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$8<span className="text-sm font-light text-zinc-500">/mo</span></div>
                  <div className="text-[10px] text-zinc-500 mt-1">Unlock deep persistent memory as a value layer</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="font-bold text-purple-400 text-[10px] uppercase tracking-wider">{t[lang].proLimit}</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited BYOK & Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> ~500 Cloud AI Credits/mo</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 1-Year Persistent Context</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Full Proactive Suggestion Engine</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited Night Shift Tasks</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Secure Cross-Device Sync</div>
                </div>
              </div>

              <button 
                onClick={() => setShowLicenseModal(true)}
                className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all text-xs font-mono shadow-md glow-purple-sm cursor-pointer"
              >
                Get Pro License
              </button>
            </FadeIn>

            {/* Team Tier */}
            <FadeIn delay={0.4} className="glass p-8 rounded-2xl border-white/5 flex flex-col justify-between h-full relative">
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-zinc-500 text-sm font-bold tracking-widest uppercase">{t[lang].teamTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$15<span className="text-sm font-light text-zinc-500">/user/mo</span></div>
                  <div className="text-[10px] text-zinc-500 mt-1">Minimum 3 users, enterprise integrations</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-300 text-[10px] uppercase tracking-wider">{t[lang].teamLimit}</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Everything in Pro Tier</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Shared Team Context Space</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Collaborative Skill Library</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Corporate SLA 4h Support</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Team Administration Dashboard</div>
                </div>
              </div>

              <button 
                onClick={() => setShowLicenseModal(true)}
                className="mt-8 w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer"
              >
                Contact Enterprise
              </button>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-8 glow-purple-sm">
              <Code2 className="w-10 h-10 text-purple-400 animate-pulse-glow" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Alt + Space.</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Whisper your intent. Let the cognitive engines orchestrate your desktop securely.
            </p>
            
            <button 
              onClick={() => {
                setLicenseKey('');
                setLicenseStatus('idle');
                setShowLicenseModal(true);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:glow-purple shadow-xl glow-purple-sm cursor-pointer"
            >
              Start Free Trial Now
              <MoveRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-xs border-t border-white/5 font-mono">
        <p>© 2026 Synapse Labs. All rights reserved. ARIA and its cognitive systems are commercial trade secrets protected by native hardware licensing.</p>
      </footer>

      {/* Activation / Pricing Mock Modal */}
      <AnimatePresence>
        {showLicenseModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 15 }}
              className="glass max-w-lg w-full rounded-2xl border-white/10 overflow-hidden glow-purple shadow-2xl relative"
            >
              
              {/* Modal header */}
              <div className="bg-zinc-900/80 px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-bold text-sm text-zinc-200">{t[lang].licenseModalTitle}</span>
                <button 
                  onClick={() => setShowLicenseModal(false)}
                  className="text-zinc-500 hover:text-white transition-all text-xs font-mono cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-5">
                <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                  {t[lang].licenseModalDesc}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>LICENSE_KEY_INPUT</span>
                    <button 
                      onClick={() => setLicenseKey('ARIA-V3-PRO-KEY')}
                      className="text-purple-400 hover:underline cursor-pointer"
                    >
                      {t[lang].licenseMockBtn}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none text-sm font-mono text-zinc-100 placeholder:text-zinc-700 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {licenseStatus === 'checking' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="p-3 bg-purple-500/5 border border-purple-500/20 text-purple-400 text-xs font-mono rounded-xl flex items-center gap-2 justify-center"
                    >
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Performing ECDSA cryptographical signature validation check...
                    </motion.div>
                  )}

                  {licenseStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono rounded-xl flex items-start gap-2.5 shadow-inner"
                    >
                      <Check className="w-5 h-5 shrink-0" />
                      <span>{t[lang].licenseSuccessMsg}</span>
                    </motion.div>
                  )}

                  {licenseStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 text-xs font-mono rounded-xl flex items-center gap-2 justify-center"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      {t[lang].licenseErrorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={handleVerifyLicense}
                  disabled={!licenseKey.trim() || licenseStatus === 'checking' || licenseStatus === 'success'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-zinc-900 disabled:to-zinc-900 disabled:text-zinc-600 font-bold transition-all text-xs font-mono shadow-md glow-purple-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  {t[lang].licenseVerifyBtn}
                </button>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
