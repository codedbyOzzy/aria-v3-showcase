import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Cpu, Layers, Workflow, Terminal, Code2, MoveRight, 
  Link as LinkIcon, FileCode2, Globe, FileText, Sunrise, Calendar, 
  CheckCircle2, Clock, Search, Eye, Lock, Volume2, Download, Check, 
  Sparkles, Key, HardDrive, RefreshCw, AlertTriangle, Users, ChevronRight, 
  Play, Pause, SkipForward, HelpCircle, ArrowRightLeft, DollarSign, Settings
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
  
  // Interactive Desktop Simulator Canvas States
  const [activeWidget, setActiveWidget] = useState('bar'); // 'bar', 'panel', 'fab', 'toast'
  const [simQuery, setSimQuery] = useState('');
  const [simResult, setSimResult] = useState('idle');
  const [simPanelTab, setSimPanelTab] = useState('briefing'); // 'briefing', 'spotify', 'night'
  const [simSpotifyPlaying, setSimSpotifyPlaying] = useState(false);
  const [simSpotifyProgress, setSimSpotifyProgress] = useState(42);

  // Technical Architecture Hub States
  const [activeArchTab, setActiveArchTab] = useState('threading'); // 'threading', 'memory', 'pkce'
  const [threadingState, setThreadingState] = useState('idle'); // 'idle', 'planning', 'parallel', 'complete'
  
  // Onboarding Wizard States
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1: Lang, 2: Persona, 3: Consents, 4: License
  const [wizardLang, setWizardLang] = useState('TR');
  const [wizardPersona, setWizardPersona] = useState('developer');
  const [wizardConsents, setWizardConsents] = useState({
    clipboard: true,
    active_window: true,
    file_repeats: false,
    spotify: true
  });
  const [wizardLicenseKey, setWizardLicenseKey] = useState('');
  const [wizardLicenseStatus, setWizardLicenseStatus] = useState('idle'); // idle, loading, success, error

  // Night Shift Live Console States
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);

  // BYOK Savings Calculator States
  const [apiRequests, setApiRequests] = useState(150); // Daily API requests

  // Dictionary translations
  const t = {
    TR: {
      brandSub: "Bilişsel Masaüstü Yapay Zekası",
      navContact: "Lisans Desteği",
      navVerify: "Lisans Aktifleştir",
      badgeTitle: "BİLİŞSEL KATMAN • TİCARİ MASAÜSTÜ ÜRÜNÜ",
      heroTagline1: "İşletim Sisteminiz Sizi Görür.",
      heroTagline2: "ARIA Sizi Hatırlar.",
      heroIntro: "ARIA v3 bir açık kaynak kodu veya chat kutusu değildir. Windows DPAPI şifrelemesi, 5 durumlu izin mekanizması ve yerel bilişsel motorlarıyla masaüstünüzü siz söylemeden yöneten, lisanslı ve profesyonel bir Ambient Intelligence (Ortam Zekası) katmanıdır.",
      btnGetLicense: "Lisans Satın Al / Aktifleştir",
      btnStartWizard: "Kurulum Sihirbazını Dene",
      desktopTitle: "Omnipresent AI OS Katmanı Simülatörü",
      desktopDesc: "ARIA v3 asistanınız, OS'inizle tam entegre çalışır. Aşağıdaki kontrol panelini kullanarak asistanın masaüstündeki 4 farklı yüzünü ve tepkilerini anlık olarak deneyimleyin:",
      widgetBar: "Alt+Space Komut Paleti",
      widgetPanel: "Bilişsel Kontrol Paneli",
      widgetFab: "Clipboard Suggestion FAB",
      widgetToast: "Proaktif Suggestion Toast",
      simRunBtn: "Sorguyu Çalıştır",
      simFast: "Hızlı Yanıt (Fast Path)",
      simLLM: "LLM Bilişsel Zeka",
      archTitle: "Derin Bilişsel Mühendislik Diyagramları",
      archDesc: "ARIA v3'ün monolitik spagetti sınıflardan tamamen arındırılarak bağımsız motorlarla tasarlanan ticari yapısını yakından inceleyin:",
      archTabThreading: "Eşzamanlı Bilişsel Akış",
      archTabMemory: "Yerel Hibrit Bellek Şeması",
      archTabPkce: "PKCE & DPAPI Güvenlik Sekansı",
      wizardTitle: "ARIA v3 Onboarding Sihirbazı",
      wizardDesc: "Desktop uygulamasındaki ilk açılış ve ECDSA lisans kontrol deneyimini interaktif olarak tamamlayın:",
      pricingTitle: "Yatırım Getirisi Net Ticari Paketler",
      pricingDesc: "AI API maliyetlerini tamamen size bırakan BYOK altyapısı ve platform değeriyle kurgulanan profesyonel ürün paketleri.",
      calcTitle: "BYOK (Kendi Anahtarını Getir) Tasarruf Hesaplayıcı",
      calcDesc: "Abonelik modellerine servet ödemek yerine, kendi API anahtarlarınızı (OpenAI, Anthropic, Gemini, Groq, Ollama) bağlayarak elde edeceğiniz aylık net tasarrufu hesaplayın:",
      dailyRequests: "Günlük Yapay Zeka İstek Adedi",
      estCostChat: "Düz Chatbot Aboneliği (Aylık)",
      estCostAria: "ARIA Platform Ücreti + Kendi API Maliyetiniz",
      estSavings: "Aylık Net Finansal Tasarrufunuz",
      consoleTitle: "Night Shift v2 — Otonom Konsol Akışı",
      consoleDesc: "Siz bilgisayar başında değilken ARIA'nın arka planda yürüttüğü otonom görevlerin gerçek zamanlı `structlog` (yapılandırılmış JSON) günlük akışını izleyin:",
      startConsole: "Otonom Görevi Başlat",
      bentoTitle: "Bilişsel Katman Yetenek Matrisi",
      bentoDesc: "ARIA v3'ün kapalı kodlu, güvenlik ve hız öncelikli mühendislik detayları.",
    },
    EN: {
      brandSub: "Cognitive Desktop AI Layer",
      navContact: "License Support",
      navVerify: "Activate License",
      badgeTitle: "COGNITIVE LAYER • COMMERCIAL DESKTOP PRODUCT",
      heroTagline1: "Your OS Sees You.",
      heroTagline2: "ARIA Remembers You.",
      heroIntro: "ARIA v3 is not an open-source script or a basic chat box. It is a highly optimized, licensed Ambient Intelligence layer featuring Windows DPAPI security, a 5-state Permission Gate, and parallel cognitive engines running locally.",
      btnGetLicense: "Purchase / Activate License",
      btnStartWizard: "Try Onboarding Wizard",
      desktopTitle: "Omnipresent AI OS Layer Simulator",
      desktopDesc: "ARIA v3 operates seamlessly with your OS. Use the control panel below to interact with the 4 distinct layout faces of ARIA directly on the desktop canvas:",
      widgetBar: "Alt+Space Command Palette",
      widgetPanel: "Cognitive Control Panel",
      widgetFab: "Clipboard Suggestion FAB",
      widgetToast: "Proactive Suggestion Toast",
      simRunBtn: "Execute Command",
      simFast: "Instant (Fast Path)",
      simLLM: "LLM Cognitive AI",
      archTitle: "Deep Cognitive Engineering Visuals",
      archDesc: "Explore the proprietary, decoupled architecture of ARIA v3 built from the ground up for extreme concurrency and zero data leaks:",
      archTabThreading: "Parallel Cognitive Threading",
      archTabMemory: "Local Hybrid Memory Schema",
      archTabPkce: "PKCE & DPAPI Security Sequence",
      wizardTitle: "ARIA v3 Onboarding Wizard",
      wizardDesc: "Simulate the native desktop app installation flow and ECDSA license verification process interactively:",
      pricingTitle: "ROI-Focused Commercial Tiers",
      pricingDesc: "Professional licensing tiers built around platform value, local deep memory persistence, and full BYOK cost flexibility.",
      calcTitle: "BYOK (Bring Your Own Key) Savings Calculator",
      calcDesc: "Calculate your estimated monthly savings by connecting your own API keys (OpenAI, Anthropic, Gemini, Groq, Ollama) instead of paying flat $20 subscription fees:",
      dailyRequests: "Daily AI Prompts/Requests",
      estCostChat: "Standard Chatbot Subscription",
      estCostAria: "ARIA Platform Fee + Your Direct API Cost",
      estSavings: "Net Monthly Financial Savings",
      consoleTitle: "Night Shift v2 — Autonomous Console Stream",
      consoleDesc: "Watch the real-time structured logging (`structlog` formatted JSON lines) generated by ARIA as it executes background tasks autonomously:",
      startConsole: "Trigger Autonomous Night Job",
      bentoTitle: "Capabilities Bento Matrix",
      bentoDesc: "Under the hood details of ARIA's secure, performance-first proprietary desktop software.",
    }
  };

  // Simulating Spotify player tick
  useEffect(() => {
    let interval;
    if (simSpotifyPlaying) {
      interval = setInterval(() => {
        setSimSpotifyProgress(p => (p >= 100 ? 0 : p + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simSpotifyPlaying]);

  // Simulated Threading animation triggers
  const triggerThreadingSimulation = () => {
    setThreadingState('planning');
    setTimeout(() => {
      setThreadingState('parallel');
      setTimeout(() => {
        setThreadingState('complete');
      }, 2000);
    }, 1200);
  };

  // Onboarding License activation
  const handleVerifyLicense = () => {
    setWizardLicenseStatus('loading');
    setTimeout(() => {
      if (wizardLicenseKey.trim().toUpperCase() === 'ARIA-V3-PRO-KEY') {
        setWizardLicenseStatus('success');
      } else {
        setWizardLicenseStatus('error');
      }
    }, 1500);
  };

  // Structured logger simulation for Night Shift v2
  const runConsoleSimulation = () => {
    if (isConsoleRunning) return;
    setIsConsoleRunning(true);
    setConsoleLogs([]);
    
    const logs = [
      { t: "03:00:01", lvl: "INFO", ev: "night_shift.start_job", job: "Audit Report Generation", detail: "Night Shift v2 initialized." },
      { t: "03:00:02", lvl: "INFO", ev: "planner.analyze_complexity", query: "Audit competitors, write report, delete temp logs", complexity: "HIGH" },
      { t: "03:00:03", lvl: "WARNING", ev: "safe_tools.filter_unsafe", action: "file_delete", status: "BLOCKED", detail: "Destructive file deletion is restricted in Night Shift. Requiring wakeup." },
      { t: "03:00:05", lvl: "INFO", ev: "web_search.execute", query: "personal ai os trends 2026", ttft_ms: 142 },
      { t: "03:00:08", lvl: "INFO", ev: "agent.coder.stream_report", target_file: "reports/competitor_audit.md", lines: 148 },
      { t: "03:00:11", lvl: "INFO", ev: "verifier.checksum_verify", file: "reports/competitor_audit.md", hash: "SHA256:abc123def", status: "SUCCESS" },
      { t: "03:00:13", lvl: "SUCCESS", ev: "night_shift.complete_job", status: "DONE", elapsed_sec: 12.4 }
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, JSON.stringify(log)]);
        if (index === logs.length - 1) {
          setIsConsoleRunning(false);
        }
      }, index * 1200);
    });
  };

  // Cost calculator math
  const calculateCosts = () => {
    const tokensPerRequest = 1800; // avg prompt + response
    const avgTokenCost = 0.0000025; // average cost per token in BYOK (mix of fast and deep models)
    const directApiCost = apiRequests * 30 * tokensPerRequest * avgTokenCost;
    
    const standardCost = 20; // ChatGPT Plus / Copilot Pro
    const ariaCost = 8 + directApiCost; // Pro platform fee + direct token cost
    const savings = Math.max(0, standardCost - ariaCost);

    return {
      apiCost: directApiCost.toFixed(2),
      standardCost: standardCost.toFixed(2),
      ariaCost: ariaCost.toFixed(2),
      savings: savings.toFixed(2)
    };
  };

  const costs = calculateCosts();

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-purple-500/30 overflow-hidden relative noise-overlay">
      
      {/* Visual background grid pattern */}
      <div className="grid-overlay" />

      {/* Top gradient blur rings */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-900/10 to-indigo-900/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-950/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/15 to-indigo-500/15 border border-purple-500/25 flex items-center justify-center glow-purple-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.25em] text-sm">ARIA v3</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-tight uppercase">{t[lang].brandSub}</span>
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
                setWizardStep(4);
                setWizardLicenseStatus('idle');
                setWizardLicenseKey('');
                setShowWizard(true);
              }}
              className="hidden md:inline-flex text-xs font-mono font-bold text-zinc-400 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
            >
              {t[lang].navVerify}
            </button>
            <button 
              onClick={() => {
                setWizardStep(1);
                setWizardLicenseStatus('idle');
                setWizardLicenseKey('');
                setShowWizard(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg glow-purple-sm hover:scale-[1.03] cursor-pointer"
            >
              {t[lang].btnStartWizard}
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
              {t[lang].badgeTitle}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9] select-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600 font-light block mb-2">{t[lang].heroTagline1}</span>
              <span className="text-white text-glow-purple">{t[lang].heroTagline2}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base md:text-lg text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              {t[lang].heroIntro}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-xl glow-purple hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Key className="w-5 h-5" />
                {t[lang].btnGetLicense}
              </button>
              <a 
                href="#desktop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-zinc-300 font-bold border border-white/10 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-400" />
                {t[lang].desktopTitle.split(" ")[0]} Simulator
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Desktop Simulator Canvas */}
      <section id="desktop" className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].desktopTitle}</h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t[lang].desktopDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Widget Toggles Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-3">
              {[
                { id: 'bar', label: t[lang].widgetBar, shortcut: 'Alt+Space', color: 'text-purple-400' },
                { id: 'panel', label: t[lang].widgetPanel, shortcut: 'Tab', color: 'text-indigo-400' },
                { id: 'fab', label: t[lang].widgetFab, shortcut: 'Clipboard Copied', color: 'text-green-400' },
                { id: 'toast', label: t[lang].widgetToast, shortcut: 'Proactive Alert', color: 'text-yellow-400' }
              ].map(widget => (
                <button
                  key={widget.id}
                  onClick={() => {
                    setActiveWidget(widget.id);
                    if (widget.id === 'bar') {
                      setSimQuery('ch');
                      setSimResult('launcher');
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${activeWidget === widget.id ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-purple-400 ${activeWidget === widget.id ? 'animate-pulse' : 'opacity-30'}`} />
                    <span className="font-mono text-xs font-bold">{widget.label}</span>
                  </div>
                  <span className="text-[9px] font-mono opacity-50 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">{widget.shortcut}</span>
                </button>
              ))}
            </div>

            {/* Desktop Workspace Render Canvas */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.2} className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 glow-purple shadow-2xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black select-none">
                
                {/* Simulated Desktop Wallpaper background assets */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5 z-0" />
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full z-0" />
                
                {/* Simulated Menu Bar / Taskbar (Windows Mock) */}
                <div className="absolute bottom-0 w-full bg-zinc-950/80 px-4 py-2.5 border-t border-white/5 z-20 flex items-center justify-between font-mono text-[10px] text-zinc-600">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded bg-purple-500/30" />
                    <span>Windows 11 Client</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-400" /> DPAPI Encrypted</span>
                    <span>18:13 PM</span>
                  </div>
                </div>

                {/* Simulated Widgets inside Canvas */}
                <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between">
                  
                  <AnimatePresence mode="wait">
                    
                    {/* Floating Alt+Space Bar Widget */}
                    {activeWidget === 'bar' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg mx-auto glass rounded-xl border-white/10 overflow-hidden shadow-2xl mt-12"
                      >
                        <div className="p-3 bg-zinc-950/80 border-b border-white/5 flex items-center gap-3">
                          <Search className="w-4 h-4 text-purple-400" />
                          <input 
                            type="text" 
                            readOnly
                            value={simQuery} 
                            placeholder="Type 'ch' to search apps or '2+2'..."
                            className="bg-transparent text-xs font-mono outline-none border-none text-zinc-300 w-full"
                          />
                          <div className="text-[9px] bg-purple-600 px-2 py-0.5 rounded text-white font-mono">Alt+Space</div>
                        </div>
                        <div className="p-4 bg-zinc-950/50 min-h-[140px] font-mono text-[11px] leading-relaxed">
                          {simResult === 'launcher' ? (
                            <div className="space-y-2">
                              <div className="text-purple-400 text-[10px] uppercase font-bold tracking-wider mb-2">Fast App Launcher (&lt;20ms RAM Index)</div>
                              <div className="p-2.5 bg-purple-950/15 border border-purple-500/25 rounded-lg flex items-center justify-between text-zinc-200">
                                <span>🚀 Visual Studio Code</span>
                                <span className="opacity-50 text-[9px]">C:\Program Files\VS Code\Code.exe</span>
                              </div>
                              <div className="p-2.5 bg-zinc-900/40 border border-white/5 rounded-lg flex items-center justify-between text-zinc-500">
                                <span>🌐 Google Chrome</span>
                                <span className="opacity-50 text-[9px]">C:\Program Files\Chrome.exe</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-zinc-500 space-y-2">
                              <div>&gt; Summons instantly.</div>
                              <div className="text-purple-400/60">💡 Click the button below to simulate running "ch":</div>
                              <button 
                                onClick={() => {
                                  setSimQuery('ch');
                                  setSimResult('launcher');
                                }}
                                className="bg-purple-600/10 border border-purple-500/30 px-3 py-1 rounded text-purple-300 text-[10px] hover:bg-purple-600/20 cursor-pointer transition-all"
                              >
                                Run "ch" Simulation
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* sliding cognitive Panel Widget */}
                    {activeWidget === 'panel' && (
                      <motion.div 
                        initial={{ opacity: 0, x: 100 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 100 }}
                        className="absolute right-0 top-0 bottom-12 w-80 glass border-l border-white/10 h-[calc(100%-44px)] overflow-hidden flex flex-col justify-between"
                      >
                        {/* Panel Header */}
                        <div className="p-4 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-purple-400" /> Bilişsel Kontrol Paneli</span>
                          <span className="opacity-50 font-mono">v3.0</span>
                        </div>

                        {/* Tabs */}
                        <div className="grid grid-cols-3 border-b border-white/5 text-[9px] font-mono text-zinc-500 text-center">
                          {['briefing', 'spotify', 'night'].map(tab => (
                            <button
                              key={tab}
                              onClick={() => setSimPanelTab(tab)}
                              className={`py-2 cursor-pointer uppercase ${simPanelTab === tab ? 'border-b border-purple-500 text-purple-400 bg-white/5' : 'hover:text-zinc-300'}`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 flex-1 overflow-y-auto text-[11px] font-mono text-zinc-400 leading-relaxed space-y-3">
                          {simPanelTab === 'briefing' && (
                            <div className="space-y-2">
                              <div className="text-purple-300 font-bold flex items-center gap-1.5"><Sunrise className="w-4 h-4 text-purple-400" /> Sabah Özeti (Morning Briefing)</div>
                              <div className="bg-zinc-950/50 p-2.5 rounded border border-white/5 text-[10px]">
                                <div className="text-zinc-500 font-bold">Takvim:</div>
                                <div>• 09:30 - ARIA v3 Sprint Review</div>
                                <div className="text-zinc-500 font-bold mt-2">Öğrenilen Tercihler:</div>
                                <div>• Spotify çalma listesi 'Deep Focus' öneriliyor.</div>
                              </div>
                            </div>
                          )}

                          {simPanelTab === 'spotify' && (
                            <div className="space-y-3 pt-3">
                              <div className="w-16 h-16 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto shadow-inner">
                                <Sparkles className="w-6 h-6 text-green-400 animate-pulse-glow" />
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-zinc-200 truncate">Cognitive Soundtrack</div>
                                <div className="text-[10px] text-zinc-500">Synapse Audio Labs</div>
                              </div>
                              <div className="space-y-1">
                                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 transition-all" style={{ width: `${simSpotifyProgress}%` }} />
                                </div>
                                <div className="flex justify-between text-[9px] text-zinc-600">
                                  <span>0:{simSpotifyProgress}</span>
                                  <span>2:30</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-3">
                                <button 
                                  onClick={() => setSimSpotifyPlaying(!simSpotifyPlaying)}
                                  className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 text-zinc-950 flex items-center justify-center transition-all cursor-pointer"
                                >
                                  {simSpotifyPlaying ? <Pause className="w-3.5 h-3.5 fill-zinc-950" /> : <Play className="w-3.5 h-3.5 fill-zinc-950 translate-x-0.5" />}
                                </button>
                                <button className="w-6 h-6 rounded-full bg-zinc-900 text-zinc-400 flex items-center justify-center border border-white/5 cursor-pointer">
                                  <SkipForward className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}

                          {simPanelTab === 'night' && (
                            <div className="space-y-2">
                              <div className="text-purple-300 font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-purple-400" /> Night Shift v2 Durumu</div>
                              <div className="bg-zinc-950/50 p-2.5 rounded border border-white/5 text-[10px] space-y-1.5">
                                <div className="flex justify-between"><span>Durum:</span><span className="text-green-400">BEKLEMEDE</span></div>
                                <div className="flex justify-between"><span>Son Görev:</span><span className="text-zinc-400">Competitor Audit</span></div>
                                <div className="flex justify-between"><span>Maliyet (BYOK):</span><span className="text-purple-400">~$0.002</span></div>
                              </div>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    )}

                    {/* Floating suggestion FAB Widget */}
                    {activeWidget === 'fab' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-sm mx-auto bg-zinc-950/90 border border-white/10 rounded-2xl shadow-2xl p-4 mt-20"
                      >
                        <div className="text-[10px] font-mono text-zinc-500 mb-2 border-b border-white/5 pb-1 flex items-center justify-between">
                          <span>📋 Pano Algılandı (Clipboard Watch)</span>
                          <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> Live</span>
                        </div>
                        <div className="bg-zinc-900/60 p-2.5 rounded border border-white/5 font-mono text-[10px] text-zinc-400 truncate mb-4 select-text">
                          def verify_ecdsa_license(key): # code copied
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-purple-600/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono rounded-lg hover:bg-purple-600/20 cursor-pointer flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" /> 🐛 Debug Code
                          </button>
                          <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-mono rounded-lg hover:bg-white/10 cursor-pointer flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> 📖 Explain
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Proactive Notification Toast Widget */}
                    {activeWidget === 'toast' && (
                      <motion.div 
                        initial={{ opacity: 0, x: -100, y: 50 }} 
                        animate={{ opacity: 1, x: 0, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-16 left-6 max-w-sm glass border border-purple-500/30 rounded-2xl shadow-2xl p-4 glow-purple-sm"
                      >
                        <div className="flex items-start gap-3 font-mono text-[11px]">
                          <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 glow-purple-sm">
                            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse-glow" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-bold text-zinc-200">Proaktif Bilişsel Öneri</div>
                            <p className="text-zinc-500 text-[10px] leading-relaxed">
                              Takvime göre 10 dakika sonra toplantınız başlıyor. Spotify ses düzeyini kısayım ve toplantı notlarını açayım mı?
                            </p>
                            <div className="flex gap-2 pt-1">
                              <button className="px-2.5 py-1 bg-purple-600 text-white rounded text-[9px] font-bold cursor-pointer">Evet, Uygula</button>
                              <button className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-500 rounded text-[9px] hover:text-zinc-300 cursor-pointer">Yoksay</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </FadeIn>
            </div>

          </div>

        </div>
      </section>

      {/* Tech Architecture Visualizer Hub */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].archTitle}</h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t[lang].archDesc}
              </p>
            </FadeIn>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Tab Header */}
            <div className="flex items-center justify-center border-b border-white/5 text-xs font-mono text-zinc-500">
              {[
                { id: 'threading', label: t[lang].archTabThreading },
                { id: 'memory', label: t[lang].archTabMemory },
                { id: 'pkce', label: t[lang].archTabPkce }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveArchTab(tab.id)}
                  className={`px-6 py-3 border-b-2 cursor-pointer transition-all ${activeArchTab === tab.id ? 'border-purple-500 text-purple-400 font-bold bg-purple-950/5' : 'border-transparent hover:text-zinc-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="glass p-6 md:p-8 rounded-2xl border-white/10 min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {activeArchTab === 'threading' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/5 pb-4 mb-4 gap-3">
                      <div className="font-mono text-xs text-purple-300 font-bold">Cognitive Thread Scheduler Animation</div>
                      <button 
                        onClick={triggerThreadingSimulation}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-mono font-bold rounded-lg transition-all glow-purple-sm cursor-pointer"
                      >
                        Process Simulated Input
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[11px] text-center">
                      <div className={`p-4 rounded-xl border transition-all ${threadingState === 'planning' ? 'bg-purple-950/20 border-purple-500 glow-purple-sm text-white' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}>
                        <div className="font-bold text-xs mb-1">1. Planner</div>
                        <div>Complexity check</div>
                      </div>

                      <div className={`p-4 rounded-xl border transition-all ${threadingState === 'parallel' ? 'bg-purple-950/20 border-purple-500 glow-purple-sm text-white' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}>
                        <div className="font-bold text-xs mb-1">2. Fast Path</div>
                        <div>Non-LLM &lt;15ms check</div>
                      </div>

                      <div className={`p-4 rounded-xl border transition-all ${threadingState === 'parallel' ? 'bg-purple-950/20 border-purple-500 glow-purple-sm text-white' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}>
                        <div className="font-bold text-xs mb-1">3. Tool Executor</div>
                        <div>Parallel sandbox running</div>
                      </div>

                      <div className={`p-4 rounded-xl border transition-all ${threadingState === 'complete' ? 'bg-green-950/20 border-green-500 glow-green-sm text-white' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}>
                        <div className="font-bold text-xs mb-1">4. Stream Coordinator</div>
                        <div>Sentence TTS & UI dispatch</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeArchTab === 'memory' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="grid md:grid-cols-2 gap-6 font-mono text-[11px]"
                  >
                    <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="text-purple-400 font-bold text-xs border-b border-white/5 pb-1">SQLite FTS5 (Turkish Tokenizer Fixed)</div>
                      <div className="text-zinc-500 leading-relaxed select-text">
                        CREATE VIRTUAL TABLE conversations USING fts5(
                        <br />&nbsp;&nbsp;id,
                        <br />&nbsp;&nbsp;timestamp,
                        <br />&nbsp;&nbsp;role,
                        <br />&nbsp;&nbsp;content,
                        <br />&nbsp;&nbsp;tokenize="unicode61 remove_diacritics 1"
                        <br />);
                        <br /><br />
                        <span className="text-green-400"># Türkçe aramalar sıfır kayıpla anında listelenir.</span>
                      </div>
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="text-purple-400 font-bold text-xs border-b border-white/5 pb-1">FAISS Persistence System</div>
                      <div className="text-zinc-500 leading-relaxed select-text">
                        class EpisodicMemory:
                        <br />&nbsp;&nbsp;def __init__(self):
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;self.cache_path = "episodic/faiss.bin"
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;self.index = self.load_disk_cache()
                        <br /><br />
                        <span className="text-green-400"># Cold-start indexing load falls from 5s to &lt;100ms.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeArchTab === 'pkce' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-4 font-mono text-xs text-zinc-400"
                  >
                    <div className="flex justify-between text-purple-400 font-bold border-b border-white/5 pb-2">
                      <span>PKCE OAuth Handshake & Windows Credentials Sequence</span>
                      <span>SECURED</span>
                    </div>

                    <div className="space-y-3 pt-2 text-[11px] leading-relaxed">
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <strong>PKCE Generation:</strong> Generates code_verifier & challenge dynamically. No client_secret is exposed in the compiled binary.</div>
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <strong>Auth callback redirect:</strong> Local HTTP server listens on port 57832. Automatically fetches the authorization code.</div>
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <strong>DPAPI CryptProtectData:</strong> Encrypts the returned OAuth tokens using standard Windows login credential hashes. Locked directly to user HWID.</div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Night Shift Live Console */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <FadeIn>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center glow-purple-sm">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-4xl font-bold mb-4">{t[lang].consoleTitle}</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {t[lang].consoleDesc}
                </p>
                <button 
                  onClick={runConsoleSimulation}
                  disabled={isConsoleRunning}
                  className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-zinc-900 disabled:to-zinc-900 disabled:text-zinc-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-mono font-bold rounded-xl shadow-lg glow-purple-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  {isConsoleRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {t[lang].startConsole}
                </button>
              </FadeIn>
            </div>

            {/* Live Terminal Log visualizer */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} className="glass rounded-2xl border-white/10 overflow-hidden shadow-2xl relative">
                
                {/* Console header */}
                <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span>Night Shift v2 Console Output</span>
                  <span>APPDATA/logs/</span>
                </div>

                {/* Console screen logs */}
                <div className="p-4 bg-zinc-950 min-h-[250px] font-mono text-[10px] text-zinc-500 leading-relaxed overflow-y-auto space-y-1.5 h-80">
                  {consoleLogs.length === 0 ? (
                    <div className="text-zinc-700 italic">&gt; Console idle. Waiting to trigger otonom job...</div>
                  ) : (
                    consoleLogs.map((log, index) => {
                      const logObj = JSON.parse(log);
                      const isErr = logObj.lvl === 'WARNING';
                      const isSuccess = logObj.lvl === 'SUCCESS';
                      return (
                        <div key={index} className="flex gap-2 items-start border-b border-white/5 pb-1">
                          <span className="text-zinc-700 shrink-0 select-none">[{logObj.t}]</span>
                          <span className={`font-bold shrink-0 select-none ${isErr ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-purple-400'}`}>
                            {logObj.lvl}
                          </span>
                          <span className="text-zinc-400 font-bold shrink-0 select-none">[{logObj.ev}]:</span>
                          <span className="text-zinc-500 select-text">{logObj.job || logObj.detail || logObj.query || logObj.file || logObj.status}</span>
                        </div>
                      );
                    })
                  )}
                </div>

              </FadeIn>
            </div>

          </div>

        </div>
      </section>

      {/* BYOK Savings Calculator */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].calcTitle}</h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t[lang].calcDesc}
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto glass p-8 rounded-2xl border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><DollarSign className="w-48 h-48 text-purple-500" /></div>
            
            {/* Input Slider */}
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="text-zinc-400 font-bold">{t[lang].dailyRequests}</span>
                <span className="text-purple-400 font-extrabold text-lg">{apiRequests} Prompts/Day</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                value={apiRequests}
                onChange={(e) => setApiRequests(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                <span>10 prompts (Light)</span>
                <span>250 prompts (Average developer)</span>
                <span>500 prompts (Extreme power-user)</span>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Calculations outputs */}
            <div className="grid sm:grid-cols-3 gap-6 font-mono text-center">
              
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">{t[lang].estCostChat}</div>
                <div className="text-2xl font-extrabold text-zinc-400">${costs.standardCost}</div>
              </div>

              <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">{t[lang].estCostAria}</div>
                <div className="text-2xl font-extrabold text-purple-400">${costs.ariaCost}</div>
                <div className="text-[9px] text-zinc-600 mt-1">Includes $8 platform fee</div>
              </div>

              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 glow-purple-sm">
                <div className="text-[10px] text-purple-400 uppercase font-bold tracking-wider mb-2">{t[lang].estSavings}</div>
                <div className="text-2xl font-extrabold text-white text-glow-purple">${costs.savings}</div>
                <div className="text-[9px] text-green-400 mt-1">Direct ROI Benefit</div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Bento Grid Matrix */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].bentoTitle}</h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t[lang].bentoDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* FTS5 Turkish */}
            <FadeIn delay={0.1} className="glass p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <HardDrive className="w-8 h-8 text-purple-400" />
                <h4 className="font-bold text-sm text-zinc-200">Turkish FTS5 Tokenizer Fix</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Resolves Turkish character indexing bugs natively (`remove_diacritics 1`), ensuring local sqlite search works seamlessly on all database columns.
                </p>
              </div>
              <span className="text-[9px] font-mono opacity-50 bg-zinc-900 px-2 py-0.5 rounded border border-white/10 w-fit mt-4">SQLite virtual table</span>
            </FadeIn>

            {/* Bounded scan fallback */}
            <FadeIn delay={0.2} className="glass p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <Workflow className="w-8 h-8 text-purple-400" />
                <h4 className="font-bold text-sm text-zinc-200">4-Layer File Search Fallback</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Queries Windows Indexing &rarr; Everything SDK &rarr; Local Workspace DB &rarr; Bounded Filesystem Scan. Fails gracefully in under 50ms.
                </p>
              </div>
              <span className="text-[9px] font-mono opacity-50 bg-zinc-900 px-2 py-0.5 rounded border border-white/10 w-fit mt-4">File systems</span>
            </FadeIn>

            {/* Acoustic Waves */}
            <FadeIn delay={0.3} className="glass p-6 rounded-2xl border-purple-500/20 flex flex-col justify-between glow-purple-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Volume2 className="w-8 h-8 text-purple-400" />
                  <div className="flex gap-0.5 h-6 items-center select-none">
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                  </div>
                </div>
                <h4 className="font-bold text-sm text-zinc-200">Sentence-by-Sentence TTS</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Synchronizes Neural Text-to-Speech audio waves dynamically as text tokens are streamed to the layout, avoiding traditional generation lag.
                </p>
              </div>
              <span className="text-[9px] font-mono text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/20 w-fit mt-4">Acoustic Engine</span>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].pricingTitle}</h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t[lang].pricingDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free */}
            <FadeIn delay={0.1} className="glass p-8 rounded-2xl border-white/5 flex flex-col justify-between h-full relative">
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-zinc-500 text-xs font-bold tracking-widest uppercase">{t[lang].freeTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$0</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Start instantly, no credit card required</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-300 text-[10px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 30 Daily AI messages (Cloud)</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited BYOK Messages</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited Local Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> App Launcher & File Search</div>
                  <div className="flex items-center gap-2 text-zinc-600"><AlertTriangle className="w-4 h-4 text-zinc-800" /> 7-Day Context Memory Depth</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-8 w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer text-center"
              >
                Start Free Trial
              </button>
            </FadeIn>

            {/* Pro */}
            <FadeIn delay={0.2} className="glass p-8 rounded-2xl border-purple-500/30 flex flex-col justify-between h-full relative glow-purple shadow-xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-600 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest text-white uppercase shadow-md glow-purple-sm">POPULAR</div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-purple-400 text-xs font-bold tracking-widest uppercase">{t[lang].proTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$8<span className="text-sm font-light text-zinc-500">/mo</span></div>
                  <div className="text-[10px] text-zinc-500 mt-1">Unlock deep persistent memory value layer</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="font-bold text-purple-400 text-[10px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited BYOK & Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> ~500 Cloud AI requests/mo</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 1-Year Persistent Memory</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Full Proactive Suggestion Engine</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited Night Shift Tasks</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all text-xs font-mono shadow-md glow-purple-sm cursor-pointer text-center"
              >
                Get Pro License
              </button>
            </FadeIn>

            {/* Team */}
            <FadeIn delay={0.3} className="glass p-8 rounded-2xl border-white/5 flex flex-col justify-between h-full relative">
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-zinc-500 text-xs font-bold tracking-widest uppercase">{t[lang].teamTier}</h4>
                  <div className="text-4xl font-extrabold mt-3">$15<span className="text-sm font-light text-zinc-500">/user/mo</span></div>
                  <div className="text-[10px] text-zinc-500 mt-1">Minimum 3 users, collaborative modules</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3 text-xs text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-300 text-[10px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Everything in Pro Tier</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Shared Team Context Space</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Shared Skill Libraries</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Corporate SLA Support</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-8 w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer text-center"
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
              <Cpu className="w-10 h-10 text-purple-400 animate-pulse-glow" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Alt + Space.</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Whisper your intent. Let the decoupled cognitive engines manage your desktop securely.
            </p>
            
            <button 
              onClick={() => {
                setWizardStep(1);
                setWizardLicenseStatus('idle');
                setWizardLicenseKey('');
                setShowWizard(true);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:glow-purple shadow-xl glow-purple-sm cursor-pointer"
            >
              Start Onboarding Wizard
              <MoveRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-xs border-t border-white/5 font-mono">
        <p>© 2026 Synapse Labs. All rights reserved. ARIA and its cognitive systems are commercial trade secrets protected by native hardware licensing.</p>
      </footer>

      {/* Interactive Onboarding Wizard / License Activation Modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 15 }}
              className="glass max-w-lg w-full rounded-2xl border-white/10 overflow-hidden glow-purple shadow-2xl relative"
            >
              
              {/* Modal Header */}
              <div className="bg-zinc-900/80 px-5 py-4 border-b border-white/5 flex items-center justify-between font-mono">
                <span className="font-bold text-sm text-zinc-200">{t[lang].wizardTitle}</span>
                <button 
                  onClick={() => setShowWizard(false)}
                  className="text-zinc-500 hover:text-white transition-all text-xs cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="grid grid-cols-4 bg-zinc-950/60 text-[9px] font-mono text-zinc-500 text-center border-b border-white/5">
                {[
                  { step: 1, label: '1. LOCALE' },
                  { step: 2, label: '2. PERSONA' },
                  { step: 3, label: '3. PRIVACY' },
                  { step: 4, label: '4. LICENSE' }
                ].map(item => (
                  <div 
                    key={item.step}
                    className={`py-2 ${wizardStep === item.step ? 'bg-purple-950/20 text-purple-400 font-bold border-b border-purple-500' : ''}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-6 min-h-[250px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Locale Selection */}
                  {wizardStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 15 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-4"
                    >
                      <div className="text-xs font-mono text-zinc-400">Choose your system language for ARIA prompt parameters & UI localization:</div>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setWizardLang('TR')}
                          className={`p-4 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${wizardLang === 'TR' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                        >
                          🇹🇷 Türkçe (Turkish)
                        </button>
                        <button 
                          onClick={() => setWizardLang('EN')}
                          className={`p-4 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${wizardLang === 'EN' ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                        >
                          🇺🇸 English (US)
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Persona Picker */}
                  {wizardStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 15 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-3"
                    >
                      <div className="text-xs font-mono text-zinc-400">Select your professional profile to optimize cognitive context structures:</div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'developer', label: '🧑‍💻 Developer', desc: 'Low-latency code & shell integration' },
                          { id: 'writer', label: '✍️ Writer', desc: 'Snippets & text rewriting priority' },
                          { id: 'pro', label: '📊 Professional', desc: 'Briefings & calendar triggers' },
                          { id: 'student', label: '🎓 Student', desc: 'FAISS research & filesystem indexing' }
                        ].map(persona => (
                          <button
                            key={persona.id}
                            onClick={() => setWizardPersona(persona.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${wizardPersona === persona.id ? 'bg-purple-950/20 border-purple-500/50 text-white glow-purple-sm' : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:bg-zinc-900'}`}
                          >
                            <div className="font-mono text-xs font-bold text-zinc-200">{persona.label}</div>
                            <div className="text-[9px] text-zinc-500 mt-1 leading-tight">{persona.desc}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Consent Manager */}
                  {wizardStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 15 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-3 font-mono text-xs text-zinc-400"
                    >
                      <div className="border-b border-white/5 pb-2 mb-2 font-bold text-purple-400">Opt-in Proactive Privacy settings (Local processing only):</div>
                      {[
                        { id: 'clipboard', label: 'Monitor Pano (Clipboard monitor)' },
                        { id: 'active_window', label: 'Active Window Tracking (Toplantı takibi)' },
                        { id: 'file_repeats', label: 'File repeat alerts (Sık açılan dosyalar)' },
                        { id: 'spotify', label: 'Pause Spotify on incoming meetings' }
                      ].map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2.5 bg-zinc-900/50 rounded border border-white/5">
                          <span>{item.label}</span>
                          <input 
                            type="checkbox" 
                            checked={wizardConsents[item.id]} 
                            onChange={() => setWizardConsents(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                            className="w-4 h-4 cursor-pointer accent-purple-500"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 4: License Verification */}
                  {wizardStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 15 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-4 font-mono text-xs text-zinc-400"
                    >
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span>ECDSA Cryptographic Key Check</span>
                        <button 
                          onClick={() => setWizardLicenseKey('ARIA-V3-PRO-KEY')}
                          className="text-purple-400 hover:underline cursor-pointer"
                        >
                          Load Sample Pro Key
                        </button>
                      </div>
                      
                      <input 
                        type="text" 
                        value={wizardLicenseKey}
                        onChange={(e) => setWizardLicenseKey(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none text-zinc-100 placeholder:text-zinc-700 text-center tracking-widest text-sm focus:border-purple-500/50"
                      />

                      <AnimatePresence mode="wait">
                        {wizardLicenseStatus === 'loading' && (
                          <motion.div className="p-3 bg-purple-500/5 border border-purple-500/20 text-purple-400 rounded-xl flex items-center gap-2 justify-center text-[10px]">
                            <RefreshCw className="w-4 h-4 animate-spin" /> Verifying ECDSA credentials check...
                          </motion.div>
                        )}

                        {wizardLicenseStatus === 'success' && (
                          <motion.div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl flex items-start gap-2.5 shadow-inner text-[10px]">
                            <Check className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>License Verified! Your ARIA v3 Pro features are unlocked locally. Ready to Alt+Space!</span>
                          </motion.div>
                        )}

                        {wizardLicenseStatus === 'error' && (
                          <motion.div className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2 justify-center text-[10px]">
                            <AlertTriangle className="w-4 h-4" /> Error: Invalid license signature check failed.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={handleVerifyLicense}
                        disabled={!wizardLicenseKey.trim() || wizardLicenseStatus === 'loading' || wizardLicenseStatus === 'success'}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-zinc-900 disabled:to-zinc-900 disabled:text-zinc-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg glow-purple-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Key className="w-4 h-4" /> Verify License
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Wizard Navigation Footer */}
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6">
                  <button
                    disabled={wizardStep === 1}
                    onClick={() => setWizardStep(s => Math.max(1, s - 1))}
                    className="px-4 py-2 rounded border border-white/5 bg-zinc-900/40 text-zinc-400 disabled:opacity-30 text-[10px] font-mono cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    disabled={wizardStep === 4 && wizardLicenseStatus !== 'success'}
                    onClick={() => {
                      if (wizardStep === 4) {
                        setShowWizard(false);
                      } else {
                        setWizardStep(s => Math.min(4, s + 1));
                      }
                    }}
                    className="px-4 py-2 rounded bg-purple-600 text-white text-[10px] font-mono font-bold shadow glow-purple-sm hover:bg-purple-500 disabled:opacity-30 cursor-pointer"
                  >
                    {wizardStep === 4 ? 'CLOSE WIZARD' : 'CONTINUE'}
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
