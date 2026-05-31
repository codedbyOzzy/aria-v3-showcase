import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Cpu, Layers, Workflow, Terminal, Code2, MoveRight, 
  Link as LinkIcon, FileCode2, Globe, FileText, Sunrise, Calendar, 
  CheckCircle2, Clock, Search, Eye, Lock, Volume2, Download, Check, 
  Sparkles, Key, HardDrive, RefreshCw, AlertTriangle, Users, ChevronRight, 
  Play, Pause, SkipForward, ArrowRightLeft, DollarSign, Settings, Minimize2, Maximize2
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState('TR'); // 'TR' or 'EN'
  
  // Interactive Desktop Simulator Canvas States
  const [activeWidget, setActiveWidget] = useState('bar'); 
  const [simQuery, setSimQuery] = useState('');
  const [simResult, setSimResult] = useState('idle');
  const [simPanelTab, setSimPanelTab] = useState('briefing'); 
  const [simSpotifyPlaying, setSimSpotifyPlaying] = useState(false);
  const [simSpotifyProgress, setSimSpotifyProgress] = useState(42);

  // Technical Architecture Hub States
  const [activeArchTab, setActiveArchTab] = useState('threading'); 
  const [threadingState, setThreadingState] = useState('idle'); 
  
  // Onboarding Wizard States
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); 
  const [wizardLang, setWizardLang] = useState('TR');
  const [wizardPersona, setWizardPersona] = useState('developer');
  const [wizardConsents, setWizardConsents] = useState({
    clipboard: true,
    active_window: true,
    file_repeats: false,
    spotify: true
  });
  const [wizardLicenseKey, setWizardLicenseKey] = useState('');
  const [wizardLicenseStatus, setWizardLicenseStatus] = useState('idle'); 

  // Night Shift Live Console States
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);

  // BYOK Savings Calculator States
  const [apiRequests, setApiRequests] = useState(150); 

  // Dictionary translations
  const t = {
    TR: {
      brandSub: "BİLİŞSEL MASAÜSTÜ SİSTEMİ",
      navContact: "Destek",
      navVerify: "Lisans Doğrula",
      badgeTitle: "ARIA v3.0 KARARLI SÜRÜM",
      heroTagline1: "OS'iniz Sizi Görür.",
      heroTagline2: "ARIA Sizi Hatırlar.",
      heroIntro: "Açık kaynak karmaşasından uzak, kapalı kaynak kodlu ticari bir yapay zeka OS katmanı. ARIA v3, Windows DPAPI şifrelemesi ve 5 durumlu izin protokolleriyle donatılmış, yerel kararlılık sunan profesyonel bir masaüstü ürünüdür.",
      btnGetLicense: "Lisans Doğrula / Satın Al",
      btnStartWizard: "Sihirbazı Başlat",
      desktopTitle: "Çevresel AI OS Katmanı Simülatörü",
      desktopDesc: "ARIA v3, işletim sisteminizin üzerinde görünmez bir katman olarak çalışır. Aşağıdaki simülatör paneliyle asistanın 4 masaüstü modunu anlık deneyimleyin:",
      widgetBar: "Alt+Space Komut Paleti",
      widgetPanel: "Bilişsel Kontrol Paneli",
      widgetFab: "Clipboard Suggestion FAB",
      widgetToast: "Proaktif Suggestion Toast",
      simRunBtn: "Sorgula",
      simFast: "Fast Path Yanıtı",
      simLLM: "LLM Bilişsel Zeka",
      archTitle: "Derin Bilişsel Mühendislik Şemaları",
      archDesc: "God class karmaşalarından arındırılmış, Apple/Raycast tarzı izole ve yüksek performanslı motor mimarisi:",
      archTabThreading: "Eşzamanlı Bilişsel Akış",
      archTabMemory: "Yerel Hibrit Bellek Şeması",
      archTabPkce: "PKCE & DPAPI Güvenlik Sekansı",
      wizardTitle: "ARIA v3 Onboarding Sihirbazı",
      wizardDesc: "Desktop uygulamasındaki ilk kurulum ve ECDSA lisans kontrol sürecini interaktif olarak tamamlayın:",
      pricingTitle: "Yatırım Getirisi Net Ticari Paketler",
      pricingDesc: "AI API maliyetlerini tamamen size bırakan BYOK altyapısı ve platform değeriyle kurgulanan profesyonel ürün paketleri.",
      calcTitle: "BYOK (Kendi Anahtarını Getir) Tasarruf Hesaplayıcı",
      calcDesc: "Abonelik modellerine servet ödemek yerine, kendi API anahtarlarınızı (OpenAI, Anthropic, Gemini, Groq, Ollama) bağlayarak elde edeceğiniz aylık net tasarrufu hesaplayın:",
      dailyRequests: "Günlük Yapay Zeka İstek Adedi",
      estCostChat: "Düz Chatbot Aboneliği (Aylık)",
      estCostAria: "ARIA Platform Ücreti + Kendi API Maliyetiniz",
      estSavings: "Aylık Net Finansal Tasarrufunuz",
      consoleTitle: "Night Shift v2 — Otonom Konsol Akışı",
      consoleDesc: "Siz bilgisayar başında değilken ARIA'nın arka planda yürüttüğü otonom görevlerin gerçek zamanlı structlog (JSON) günlük akışını izleyin:",
      startConsole: "Otonom Görevi Tetikle",
      bentoTitle: "Bilişsel Yetenek Matrisi",
      bentoDesc: "ARIA v3'ün kapalı kodlu, güvenlik ve hız öncelikli mühendislik detayları.",
    },
    EN: {
      brandSub: "COGNITIVE DESKTOP SYSTEM",
      navContact: "Support",
      navVerify: "Verify License",
      badgeTitle: "ARIA v3.0 STABLE RELEASE",
      heroTagline1: "Your OS Sees You.",
      heroTagline2: "ARIA Remembers You.",
      heroIntro: "A commercial AI OS layer designed with extreme performance and zero open-source complexity. ARIA v3 secures credentials locally via Windows DPAPI and routes tasks using a granular 5-state Permission Gate.",
      btnGetLicense: "Verify / Buy License",
      btnStartWizard: "Start Onboarding Wizard",
      desktopTitle: "Omnipresent AI OS Layer Simulator",
      desktopDesc: "ARIA v3 operates seamlessly with your OS. Use the control panel below to interact with the 4 distinct layout faces of ARIA directly on the desktop canvas:",
      widgetBar: "Alt+Space Command Palette",
      widgetPanel: "Cognitive Control Panel",
      widgetFab: "Clipboard Suggestion FAB",
      widgetToast: "Proactive Suggestion Toast",
      simRunBtn: "Query System",
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
      consoleDesc: "Watch the real-time structured logging (structlog formatted JSON lines) generated by ARIA as it executes background tasks autonomously:",
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
    const tokensPerRequest = 1800; 
    const avgTokenCost = 0.0000025; 
    const directApiCost = apiRequests * 30 * tokensPerRequest * avgTokenCost;
    
    const standardCost = 20; 
    const ariaCost = 8 + directApiCost; 
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
    <div className="bg-zinc-950 min-h-screen text-zinc-300 font-sans selection:bg-purple-500/20 overflow-hidden relative">
      
      {/* Tiny precise dot grid background texture */}
      <div className="dot-grid" />

      {/* Faint elegant radial lights curtain */}
      <div className="light-curtain" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-zinc-950 text-xs shadow">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-xs text-white font-mono">ARIA v3</span>
              <span className="text-[8px] text-zinc-500 font-mono tracking-wider uppercase">{t[lang].brandSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(l => l === 'TR' ? 'EN' : 'TR')}
              className="text-xs font-mono font-bold bg-zinc-900/60 hover:bg-zinc-800 px-3 py-1.5 rounded border border-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              {lang}
            </button>
            <button 
              onClick={() => {
                setWizardStep(4);
                setWizardLicenseStatus('idle');
                setWizardLicenseKey('');
                setShowWizard(true);
              }}
              className="hidden md:inline-flex text-xs font-mono font-bold text-zinc-500 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
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
              className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-mono font-bold px-4 py-2 rounded transition-all duration-200 cursor-pointer shadow-md"
            >
              {t[lang].btnStartWizard}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-28 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto relative">
          
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900/80 text-[10px] font-mono text-zinc-400 mb-6 border border-white/5 uppercase tracking-widest shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 indicator-active" />
              {t[lang].badgeTitle}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] select-none text-metallic">
              {t[lang].heroTagline1}
              <br />
              {t[lang].heroTagline2}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-sm md:text-base text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
              {t[lang].heroIntro}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-white hover:bg-zinc-100 text-zinc-950 font-bold transition-all duration-150 cursor-pointer text-xs shadow-lg"
              >
                <Key className="w-4 h-4" />
                {t[lang].btnGetLicense}
              </button>
              <a 
                href="#desktop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 font-bold border border-white/5 transition-all cursor-pointer text-xs"
              >
                <Play className="w-3.5 h-3.5 text-zinc-400" />
                {t[lang].desktopTitle.split(" ")[0]} Simulator
              </a>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Desktop Simulator Canvas */}
      <section id="desktop" className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].desktopTitle}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t[lang].desktopDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Widget Toggles Panel (Raycast Sidebar style) */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-2">
              {[
                { id: 'bar', label: t[lang].widgetBar, shortcut: 'Alt+Space' },
                { id: 'panel', label: t[lang].widgetPanel, shortcut: 'Tab' },
                { id: 'fab', label: t[lang].widgetFab, shortcut: 'Clipboard' },
                { id: 'toast', label: t[lang].widgetToast, shortcut: 'Alert' }
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
                  className={`w-full text-left p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${activeWidget === widget.id ? 'bg-zinc-900 border-white/10 text-white font-bold' : 'bg-zinc-950/20 border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeWidget === widget.id ? 'bg-purple-400 indicator-active' : 'bg-zinc-700'}`} />
                    <span>{widget.label}</span>
                  </div>
                  <span className="text-[8px] opacity-60 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/5">{widget.shortcut}</span>
                </button>
              ))}
            </div>

            {/* Desktop Workspace Render Canvas (Macbook Screen Mock style) */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.2} className="relative h-[420px] rounded-xl overflow-hidden border border-white/5 bg-zinc-950 select-none shadow-2xl">
                
                {/* Simulated Desktop minimal wall */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.02),_transparent)] z-0" />
                
                {/* Simulated Status Bar */}
                <div className="absolute bottom-0 w-full bg-zinc-900/60 px-4 py-2 border-t border-white/5 z-20 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded bg-zinc-700" />
                    <span>macOS Client</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-zinc-400" /> DPAPI Encrypted</span>
                    <span>18:13 PM</span>
                  </div>
                </div>

                {/* Simulated Widgets inside Canvas */}
                <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between">
                  
                  <AnimatePresence mode="wait">
                    
                    {/* Floating Alt+Space Bar Widget */}
                    {activeWidget === 'bar' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: -10 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="w-full max-w-md mx-auto raycast-panel rounded-lg shadow-2xl mt-12"
                      >
                        <div className="p-3 bg-zinc-950/80 border-b border-white/5 flex items-center gap-3">
                          <Search className="w-4 h-4 text-zinc-400" />
                          <input 
                            type="text" 
                            readOnly
                            value={simQuery} 
                            placeholder="Type 'ch' to search apps..."
                            className="bg-transparent text-xs font-mono outline-none border-none text-zinc-300 w-full placeholder:text-zinc-600"
                          />
                          <div className="flex gap-1 shrink-0 select-none">
                            <kbd className="text-[8px] bg-zinc-900 border border-white/5 px-1 rounded text-zinc-500">Alt</kbd>
                            <kbd className="text-[8px] bg-zinc-900 border border-white/5 px-1 rounded text-zinc-500">Space</kbd>
                          </div>
                        </div>
                        <div className="p-3.5 bg-zinc-950/40 min-h-[120px] font-mono text-[10px] leading-relaxed">
                          {simResult === 'launcher' ? (
                            <div className="space-y-1.5">
                              <div className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider mb-2">Fast App Launcher (&lt;20ms RAM Index)</div>
                              <div className="p-2 bg-zinc-900/60 border border-white/5 rounded flex items-center justify-between text-zinc-300">
                                <span>🚀 Visual Studio Code</span>
                                <span className="opacity-40 text-[8px]">/Applications/VSCode.app</span>
                              </div>
                              <div className="p-2 bg-zinc-950/40 border border-white/5 rounded flex items-center justify-between text-zinc-600">
                                <span>🌐 Google Chrome</span>
                                <span className="opacity-40 text-[8px]">/Applications/Chrome.app</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-zinc-500 space-y-2">
                              <div>&gt; Summons instantly.</div>
                              <div className="text-zinc-600">💡 Click below to simulate running "ch" launcher:</div>
                              <button 
                                onClick={() => {
                                  setSimQuery('ch');
                                  setSimResult('launcher');
                                }}
                                className="bg-zinc-900 border border-white/5 px-3 py-1 rounded text-zinc-400 text-[9px] hover:text-white cursor-pointer transition-all"
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
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute right-0 top-0 bottom-8 w-72 raycast-panel h-[calc(100%-33px)] overflow-hidden flex flex-col justify-between"
                      >
                        {/* Panel Header */}
                        <div className="p-3 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between font-mono text-[9px] text-zinc-400">
                          <span className="flex items-center gap-1.5"><Layers className="w-3 h-3 text-zinc-400" /> COGNITIVE PANEL</span>
                          <span className="opacity-40 font-mono text-[8px]">v3.0</span>
                        </div>

                        {/* Tabs */}
                        <div className="grid grid-cols-3 border-b border-white/5 text-[8px] font-mono text-zinc-500 text-center select-none">
                          {['briefing', 'spotify', 'night'].map(tab => (
                            <button
                              key={tab}
                              onClick={() => setSimPanelTab(tab)}
                              className={`py-1.5 cursor-pointer uppercase ${simPanelTab === tab ? 'border-b border-zinc-400 text-white bg-white/5' : 'hover:text-zinc-300'}`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-3 flex-1 overflow-y-auto text-[10px] font-mono text-zinc-400 leading-relaxed space-y-3">
                          {simPanelTab === 'briefing' && (
                            <div className="space-y-2">
                              <div className="text-zinc-200 font-bold flex items-center gap-1"><Sunrise className="w-3.5 h-3.5 text-zinc-400" /> Morning Briefing</div>
                              <div className="bg-zinc-950/50 p-2 rounded border border-white/5 text-[9px]">
                                <div className="text-zinc-600 font-bold">Schedule:</div>
                                <div>• 09:30 - ARIA v3 Sprint Review</div>
                                <div className="text-zinc-600 font-bold mt-1.5">Muted Learnings:</div>
                                <div>• Playlists 'Deep Focus' is suggested.</div>
                              </div>
                            </div>
                          )}

                          {simPanelTab === 'spotify' && (
                            <div className="space-y-3 pt-2">
                              <div className="w-12 h-12 rounded bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto shadow-inner">
                                <Sparkles className="w-5 h-5 text-zinc-400 animate-pulse-glow" />
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-zinc-200 truncate">Cognitive Soundtrack</div>
                                <div className="text-[9px] text-zinc-500">Synapse Audio Labs</div>
                              </div>
                              <div className="space-y-1">
                                <div className="h-0.5 bg-zinc-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-zinc-400 transition-all" style={{ width: `${simSpotifyProgress}%` }} />
                                </div>
                                <div className="flex justify-between text-[8px] text-zinc-600">
                                  <span>0:{simSpotifyProgress}</span>
                                  <span>2:30</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => setSimSpotifyPlaying(!simSpotifyPlaying)}
                                  className="w-7 h-7 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 flex items-center justify-center transition-all cursor-pointer"
                                >
                                  {simSpotifyPlaying ? <Pause className="w-3 h-3 fill-zinc-950" /> : <Play className="w-3 h-3 fill-zinc-950 translate-x-0.5" />}
                                </button>
                                <button className="w-6 h-6 rounded-full bg-zinc-950 border border-white/5 text-zinc-400 flex items-center justify-center transition-all cursor-pointer">
                                  <SkipForward className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          )}

                          {simPanelTab === 'night' && (
                            <div className="space-y-2">
                              <div className="text-zinc-200 font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-400" /> Night Shift v2</div>
                              <div className="bg-zinc-950/50 p-2 rounded border border-white/5 text-[9px] space-y-1.5">
                                <div className="flex justify-between"><span>Status:</span><span className="text-zinc-500">WAITING</span></div>
                                <div className="flex justify-between"><span>Last Job:</span><span className="text-zinc-400 truncate max-w-[120px]">Competitor Audit</span></div>
                                <div className="flex justify-between"><span>Savings (BYOK):</span><span className="text-zinc-300">~$0.002</span></div>
                              </div>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    )}

                    {/* Floating suggestion FAB Widget */}
                    {activeWidget === 'fab' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-xs mx-auto raycast-panel rounded-lg shadow-2xl p-3.5 mt-20"
                      >
                        <div className="text-[9px] font-mono text-zinc-500 mb-2 border-b border-white/5 pb-1 flex items-center justify-between">
                          <span>📋 PANO ALGILANDI (Clipboard Watch)</span>
                        </div>
                        <div className="bg-zinc-950/60 p-2 rounded border border-white/5 font-mono text-[9px] text-zinc-500 truncate mb-3 select-text">
                          def verify_ecdsa_license(key): # code copied
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-white text-[9px] font-mono rounded hover:bg-zinc-800 cursor-pointer flex items-center gap-1.5">
                            <Code2 className="w-3 h-3 text-purple-400" /> 🐛 Debug
                          </button>
                          <button className="px-2.5 py-1 bg-zinc-950 border border-white/5 text-zinc-400 text-[9px] font-mono rounded hover:text-white cursor-pointer flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-zinc-500" /> Explain
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Proactive Notification Toast Widget */}
                    {activeWidget === 'toast' && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30, y: 15 }} 
                        animate={{ opacity: 1, x: 0, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-12 left-6 max-w-xs raycast-panel rounded-lg shadow-2xl p-3.5"
                      >
                        <div className="flex items-start gap-3 font-mono text-[10px]">
                          <div className="w-7 h-7 rounded bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse-glow" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-bold text-zinc-300">Proactive Suggestion</div>
                            <p className="text-zinc-500 text-[9px] leading-relaxed">
                              Toplantınız başlamak üzere. Spotify sesini kısayım ve toplantı notlarını açayım mı?
                            </p>
                            <div className="flex gap-1.5 pt-1">
                              <button className="px-2 py-0.5 bg-white text-zinc-950 rounded text-[8px] font-bold cursor-pointer">Uygula</button>
                              <button className="px-2 py-0.5 bg-zinc-900 border border-white/5 text-zinc-500 rounded text-[8px] hover:text-zinc-300 cursor-pointer">Yoksay</button>
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
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].archTitle}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t[lang].archDesc}
              </p>
            </FadeIn>
          </div>

          <div className="space-y-6">
            
            {/* Tab Header */}
            <div className="flex items-center justify-center border-b border-white/5 text-[10px] font-mono text-zinc-500">
              {[
                { id: 'threading', label: t[lang].archTabThreading },
                { id: 'memory', label: t[lang].archTabMemory },
                { id: 'pkce', label: t[lang].archTabPkce }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveArchTab(tab.id)}
                  className={`px-5 py-2.5 border-b cursor-pointer transition-all ${activeArchTab === tab.id ? 'border-zinc-400 text-white font-bold bg-white/5' : 'border-transparent hover:text-zinc-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="raycast-panel p-6 rounded-xl min-h-[260px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {activeArchTab === 'threading' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/5 pb-3 mb-3 gap-2">
                      <div className="font-mono text-[10px] text-zinc-400 font-bold">Cognitive Thread Scheduler Path</div>
                      <button 
                        onClick={triggerThreadingSimulation}
                        className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white text-[10px] font-mono font-bold rounded transition-all cursor-pointer"
                      >
                        Process Simulated Input
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[10px] text-center">
                      <div className={`p-3.5 rounded border transition-all ${threadingState === 'planning' ? 'bg-zinc-900 border-white/10 text-white font-bold' : 'bg-zinc-950/20 border-white/5 text-zinc-600'}`}>
                        <div className="font-bold text-[11px] mb-1">1. Planner</div>
                        <div>Complexity check</div>
                      </div>

                      <div className={`p-3.5 rounded border transition-all ${threadingState === 'parallel' ? 'bg-zinc-900 border-white/10 text-white font-bold' : 'bg-zinc-950/20 border-white/5 text-zinc-600'}`}>
                        <div className="font-bold text-[11px] mb-1">2. Fast Path</div>
                        <div>Non-LLM &lt;15ms check</div>
                      </div>

                      <div className={`p-3.5 rounded border transition-all ${threadingState === 'parallel' ? 'bg-zinc-900 border-white/10 text-white font-bold' : 'bg-zinc-950/20 border-white/5 text-zinc-600'}`}>
                        <div className="font-bold text-[11px] mb-1">3. Tool Executor</div>
                        <div>Parallel sandbox running</div>
                      </div>

                      <div className={`p-3.5 rounded border transition-all ${threadingState === 'complete' ? 'bg-zinc-900 border-green-500/30 text-green-400 font-bold' : 'bg-zinc-950/20 border-white/5 text-zinc-600'}`}>
                        <div className="font-bold text-[11px] mb-1">4. Stream Coordinator</div>
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
                    className="grid md:grid-cols-2 gap-4 font-mono text-[10px]"
                  >
                    <div className="bg-zinc-950/80 p-3.5 rounded border border-white/5 space-y-2">
                      <div className="text-zinc-400 font-bold text-[11px] border-b border-white/5 pb-1">SQLite FTS5 (Turkish Tokenizer Fixed)</div>
                      <div className="text-zinc-600 leading-relaxed select-text">
                        CREATE VIRTUAL TABLE conversations USING fts5(
                        <br />&nbsp;&nbsp;id,
                        <br />&nbsp;&nbsp;timestamp,
                        <br />&nbsp;&nbsp;role,
                        <br />&nbsp;&nbsp;content,
                        <br />&nbsp;&nbsp;tokenize="unicode61 remove_diacritics 1"
                        <br />);
                      </div>
                    </div>

                    <div className="bg-zinc-950/80 p-3.5 rounded border border-white/5 space-y-2">
                      <div className="text-zinc-400 font-bold text-[11px] border-b border-white/5 pb-1">FAISS Persistence System</div>
                      <div className="text-zinc-600 leading-relaxed select-text">
                        class EpisodicMemory:
                        <br />&nbsp;&nbsp;def __init__(self):
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;self.cache_path = "episodic/faiss.bin"
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;self.index = self.load_disk_cache()
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeArchTab === 'pkce' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-3 font-mono text-[11px] text-zinc-500"
                  >
                    <div className="flex justify-between text-zinc-300 font-bold border-b border-white/5 pb-2">
                      <span>PKCE OAuth Handshake & Windows Credentials Sequence</span>
                      <span className="text-zinc-500">SECURED</span>
                    </div>

                    <div className="space-y-2 pt-1 leading-relaxed">
                      <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-zinc-500" /> <strong>PKCE Generation:</strong> Generates code_verifier & challenge dynamically. No client_secret in binary.</div>
                      <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-zinc-500" /> <strong>Auth callback redirect:</strong> Local HTTP server listens on port 57832. Fetches authorization code.</div>
                      <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-zinc-500" /> <strong>DPAPI CryptProtectData:</strong> Encrypts returned OAuth tokens using Windows session hashes.</div>
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
        <div className="max-w-5xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <FadeIn>
                <div className="w-10 h-10 rounded bg-zinc-900 border border-white/5 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">{t[lang].consoleTitle}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t[lang].consoleDesc}
                </p>
                <button 
                  onClick={runConsoleSimulation}
                  disabled={isConsoleRunning}
                  className="px-5 py-3 bg-white hover:bg-zinc-100 disabled:bg-zinc-900 disabled:text-zinc-600 text-zinc-950 text-xs font-mono font-bold rounded shadow transition-all cursor-pointer flex items-center gap-2"
                >
                  {isConsoleRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  {t[lang].startConsole}
                </button>
              </FadeIn>
            </div>

            {/* Live Terminal Log visualizer */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} className="raycast-panel rounded-xl overflow-hidden shadow-2xl relative">
                
                {/* Console header */}
                <div className="bg-zinc-900/60 px-4 py-2 border-b border-white/5 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                    <span>Night Shift v2 Console Output</span>
                  </div>
                  <span>APPDATA/logs/</span>
                </div>

                {/* Console screen logs */}
                <div className="p-4 bg-zinc-950 min-h-[220px] font-mono text-[9px] text-zinc-600 leading-relaxed overflow-y-auto space-y-1 h-64">
                  {consoleLogs.length === 0 ? (
                    <div className="text-zinc-800 italic">&gt; Console idle. Waiting to trigger otonom job...</div>
                  ) : (
                    consoleLogs.map((log, index) => {
                      const logObj = JSON.parse(log);
                      const isErr = logObj.lvl === 'WARNING';
                      const isSuccess = logObj.lvl === 'SUCCESS';
                      return (
                        <div key={index} className="flex gap-2 items-start border-b border-white/5 pb-1">
                          <span className="text-zinc-800 shrink-0 select-none">[{logObj.t}]</span>
                          <span className={`font-bold shrink-0 select-none ${isErr ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-zinc-400'}`}>
                            {logObj.lvl}
                          </span>
                          <span className="text-zinc-500 font-bold shrink-0 select-none">[{logObj.ev}]:</span>
                          <span className="text-zinc-600 select-text">{logObj.job || logObj.detail || logObj.query || logObj.file || logObj.status}</span>
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
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].calcTitle}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t[lang].calcDesc}
              </p>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto raycast-panel p-6 md:p-8 rounded-xl shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Input Slider */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-zinc-400 font-bold">{t[lang].dailyRequests}</span>
                <span className="text-white font-extrabold text-sm">{apiRequests} Prompts/Day</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                value={apiRequests}
                onChange={(e) => setApiRequests(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                <span>10 prompts (Light)</span>
                <span>250 prompts (Average developer)</span>
                <span>500 prompts (Extreme power-user)</span>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Calculations outputs */}
            <div className="grid sm:grid-cols-3 gap-4 font-mono text-center text-xs">
              
              <div className="p-3 bg-zinc-950 rounded border border-white/5">
                <div className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1.5">{t[lang].estCostChat}</div>
                <div className="text-lg font-extrabold text-zinc-500">${costs.standardCost}</div>
              </div>

              <div className="p-3 bg-zinc-950 rounded border border-white/5">
                <div className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1.5">{t[lang].estCostAria}</div>
                <div className="text-lg font-extrabold text-zinc-300">${costs.ariaCost}</div>
                <div className="text-[8px] text-zinc-600 mt-1">Includes $8 platform fee</div>
              </div>

              <div className="p-3 bg-white/5 rounded border border-zinc-700/40">
                <div className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider mb-1.5">{t[lang].estSavings}</div>
                <div className="text-lg font-extrabold text-white">${costs.savings}</div>
                <div className="text-[8px] text-zinc-500 mt-1">Direct ROI Benefit</div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Bento Grid Matrix */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].bentoTitle}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t[lang].bentoDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            
            {/* FTS5 Turkish */}
            <FadeIn delay={0.1} className="raycast-panel p-5 rounded-lg flex flex-col justify-between">
              <div className="space-y-3">
                <HardDrive className="w-6 h-6 text-zinc-400" />
                <h4 className="font-bold text-xs text-white">Turkish FTS5 Tokenizer Fix</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Resolves Turkish character indexing bugs natively (`remove_diacritics 1`), ensuring local sqlite search works seamlessly.
                </p>
              </div>
              <span className="text-[8px] font-mono opacity-50 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5 w-fit mt-4">SQLite virtual table</span>
            </FadeIn>

            {/* Bounded scan fallback */}
            <FadeIn delay={0.2} className="raycast-panel p-5 rounded-lg flex flex-col justify-between">
              <div className="space-y-3">
                <Workflow className="w-6 h-6 text-zinc-400" />
                <h4 className="font-bold text-xs text-white">4-Layer File Search Fallback</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Queries Windows Indexing &rarr; Everything SDK &rarr; Local Workspace DB &rarr; Bounded Filesystem Scan. Fails in &lt;50ms.
                </p>
              </div>
              <span className="text-[8px] font-mono opacity-50 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5 w-fit mt-4">File systems</span>
            </FadeIn>

            {/* Acoustic Waves */}
            <FadeIn delay={0.3} className="raycast-panel p-5 rounded-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Volume2 className="w-6 h-6 text-zinc-400" />
                  <div className="flex gap-0.5 h-4 items-center select-none">
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                    <span className="soundwave-bar" />
                  </div>
                </div>
                <h4 className="font-bold text-xs text-white">Sentence-by-Sentence TTS</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Synchronizes Neural Text-to-Speech audio waves dynamically as text tokens are streamed to the layout.
                </p>
              </div>
              <span className="text-[8px] font-mono opacity-50 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5 w-fit mt-4">Acoustic Engine</span>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4">{t[lang].pricingTitle}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t[lang].pricingDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Free */}
            <FadeIn delay={0.1} className="raycast-panel p-6 rounded-lg flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div>
                  <h4 className="font-mono text-zinc-500 text-[10px] font-bold tracking-wider uppercase">{t[lang].freeTier}</h4>
                  <div className="text-3xl font-extrabold mt-2 text-white">$0</div>
                  <div className="text-[9px] text-zinc-500 mt-1">Start instantly, no credit card required</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-2.5 text-[11px] text-zinc-500 font-mono">
                  <div className="font-bold text-zinc-400 text-[9px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> 30 Daily AI messages (Cloud)</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Unlimited BYOK Messages</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Unlimited Local Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> App Launcher & File Search</div>
                  <div className="flex items-center gap-2 text-zinc-700"><AlertTriangle className="w-3.5 h-3.5 text-zinc-800" /> 7-Day Context Memory Depth</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-6 w-full py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer text-center"
              >
                Start Free Trial
              </button>
            </FadeIn>

            {/* Pro */}
            <FadeIn delay={0.2} className="raycast-panel-strong p-6 rounded-lg flex flex-col justify-between h-full relative shadow-xl">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-white text-zinc-950 px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest uppercase shadow">POPULAR</div>
              
              <div className="space-y-5">
                <div>
                  <h4 className="font-mono text-zinc-300 text-[10px] font-bold tracking-wider uppercase">{t[lang].proTier}</h4>
                  <div className="text-3xl font-extrabold mt-2 text-white">$8<span className="text-xs font-light text-zinc-500">/mo</span></div>
                  <div className="text-[9px] text-zinc-500 mt-1">Unlock deep persistent memory value layer</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-2.5 text-[11px] text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-300 text-[9px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-white" /> Unlimited BYOK & Ollama</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-white" /> ~500 Cloud AI requests/mo</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-white" /> 1-Year Persistent Memory</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-white" /> Full Proactive Suggestion Engine</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-white" /> Unlimited Night Shift Tasks</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-6 w-full py-2.5 rounded bg-white hover:bg-zinc-100 text-zinc-950 font-bold transition-all text-xs font-mono cursor-pointer text-center"
              >
                Get Pro License
              </button>
            </FadeIn>

            {/* Team */}
            <FadeIn delay={0.3} className="raycast-panel p-6 rounded-lg flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div>
                  <h4 className="font-mono text-zinc-500 text-[10px] font-bold tracking-wider uppercase">{t[lang].teamTier}</h4>
                  <div className="text-3xl font-extrabold mt-2 text-white">$15<span className="text-xs font-light text-zinc-500">/user/mo</span></div>
                  <div className="text-[9px] text-zinc-500 mt-1">Minimum 3 users, collaborative modules</div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-2.5 text-[11px] text-zinc-500 font-mono">
                  <div className="font-bold text-zinc-400 text-[9px] uppercase tracking-wider">Features Included:</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Everything in Pro Tier</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Shared Team Context Space</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Shared Skill Libraries</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-zinc-400" /> Corporate SLA Support</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setWizardStep(4);
                  setWizardLicenseStatus('idle');
                  setWizardLicenseKey('');
                  setShowWizard(true);
                }}
                className="mt-6 w-full py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold transition-all text-xs font-mono border border-white/5 cursor-pointer text-center"
              >
                Contact Enterprise
              </button>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="w-12 h-12 rounded bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-5 h-5 text-zinc-400 animate-pulse-glow" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white select-none">Alt + Space.</h2>
            <p className="text-base text-zinc-500 mb-10 max-w-xl mx-auto font-light">
              Whisper your intent. Let the decoupled cognitive engines manage your desktop securely.
            </p>
            
            <button 
              onClick={() => {
                setWizardStep(1);
                setWizardLicenseStatus('idle');
                setWizardLicenseKey('');
                setShowWizard(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white hover:bg-zinc-100 text-zinc-950 font-bold transition-all duration-200 cursor-pointer text-xs"
            >
              Start Onboarding Wizard
              <MoveRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-[10px] border-t border-white/5 font-mono">
        <p>© 2026 Synapse Labs. All rights reserved. ARIA and its cognitive systems are commercial trade secrets protected by native hardware licensing.</p>
      </footer>

      {/* Interactive Onboarding Wizard / License Activation Modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.98, y: 10 }}
              className="raycast-panel-strong max-w-md w-full rounded-lg border border-white/10 overflow-hidden shadow-2xl relative"
            >
              
              {/* Modal Header */}
              <div className="bg-zinc-900/60 px-5 py-3 border-b border-white/5 flex items-center justify-between font-mono">
                <span className="font-bold text-xs text-zinc-200">{t[lang].wizardTitle}</span>
                <button 
                  onClick={() => setShowWizard(false)}
                  className="text-zinc-500 hover:text-white transition-all text-xs cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="grid grid-cols-4 bg-zinc-950/60 text-[8px] font-mono text-zinc-500 text-center border-b border-white/5 select-none">
                {[
                  { step: 1, label: '1. LOCALE' },
                  { step: 2, label: '2. PERSONA' },
                  { step: 3, label: '3. PRIVACY' },
                  { step: 4, label: '4. LICENSE' }
                ].map(item => (
                  <div 
                    key={item.step}
                    className={`py-2 ${wizardStep === item.step ? 'bg-zinc-900 text-white font-bold border-b border-zinc-400' : ''}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-5 min-h-[220px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Locale Selection */}
                  {wizardStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div className="text-[11px] font-mono text-zinc-500">Choose your system language for ARIA prompt parameters & UI localization:</div>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setWizardLang('TR')}
                          className={`p-3 rounded border text-xs font-mono font-bold transition-all cursor-pointer ${wizardLang === 'TR' ? 'bg-zinc-900 border-white/10 text-white' : 'bg-zinc-950/40 border-white/5 text-zinc-600 hover:text-zinc-400'}`}
                        >
                          🇹🇷 Türkçe (Turkish)
                        </button>
                        <button 
                          onClick={() => setWizardLang('EN')}
                          className={`p-3 rounded border text-xs font-mono font-bold transition-all cursor-pointer ${wizardLang === 'EN' ? 'bg-zinc-900 border-white/10 text-white' : 'bg-zinc-950/40 border-white/5 text-zinc-600 hover:text-zinc-400'}`}
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
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <div className="text-[11px] font-mono text-zinc-500">Select your professional profile to optimize cognitive context structures:</div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'developer', label: '🧑‍💻 Developer', desc: 'Low-latency code & shell integration' },
                          { id: 'writer', label: '✍️ Writer', desc: 'Snippets & text rewriting priority' },
                          { id: 'pro', label: '📊 Professional', desc: 'Briefings & calendar triggers' },
                          { id: 'student', label: '🎓 Student', desc: 'FAISS research & filesystem indexing' }
                        ].map(persona => (
                          <button
                            key={persona.id}
                            onClick={() => setWizardPersona(persona.id)}
                            className={`p-2.5 rounded border text-left transition-all cursor-pointer ${wizardPersona === persona.id ? 'bg-zinc-900 border-white/10 text-white' : 'bg-zinc-950/40 border-white/5 text-zinc-600 hover:bg-zinc-900'}`}
                          >
                            <div className="font-mono text-xs font-bold text-zinc-300">{persona.label}</div>
                            <div className="text-[8px] text-zinc-500 mt-1 leading-tight">{persona.desc}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Consent Manager */}
                  {wizardStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-2.5 font-mono text-[11px] text-zinc-500"
                    >
                      <div className="border-b border-white/5 pb-2 mb-2 font-bold text-zinc-400">Opt-in Proactive Privacy settings (Local processing only):</div>
                      {[
                        { id: 'clipboard', label: 'Monitor Pano (Clipboard monitor)' },
                        { id: 'active_window', label: 'Active Window Tracking' },
                        { id: 'file_repeats', label: 'File repeat alerts' },
                        { id: 'spotify', label: 'Pause Spotify on incoming meetings' }
                      ].map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-white/5">
                          <span>{item.label}</span>
                          <input 
                            type="checkbox" 
                            checked={wizardConsents[item.id]} 
                            onChange={() => setWizardConsents(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                            className="w-3.5 h-3.5 cursor-pointer accent-white"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 4: License Verification */}
                  {wizardStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4 font-mono text-xs text-zinc-500"
                    >
                      <div className="flex justify-between items-center text-[9px] text-zinc-600 select-none">
                        <span>ECDSA Cryptographic Key Check</span>
                        <button 
                          onClick={() => setWizardLicenseKey('ARIA-V3-PRO-KEY')}
                          className="text-white hover:underline cursor-pointer"
                        >
                          Load Sample Pro Key
                        </button>
                      </div>
                      
                      <input 
                        type="text" 
                        value={wizardLicenseKey}
                        onChange={(e) => setWizardLicenseKey(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full bg-zinc-950/60 border border-white/10 rounded px-4 py-2.5 outline-none text-zinc-300 placeholder:text-zinc-800 text-center tracking-widest text-xs focus:border-zinc-700"
                      />

                      <AnimatePresence mode="wait">
                        {wizardLicenseStatus === 'loading' && (
                          <motion.div className="p-2.5 bg-zinc-900 border border-white/5 text-zinc-400 rounded flex items-center gap-2 justify-center text-[9px]">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying ECDSA credentials check...
                          </motion.div>
                        )}

                        {wizardLicenseStatus === 'success' && (
                          <motion.div className="p-2.5 bg-zinc-900 border border-white/5 text-zinc-300 rounded flex items-start gap-2 shadow-inner text-[9px]">
                            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />
                            <span>License Verified! Your ARIA v3 Pro features are unlocked locally. Ready to Alt+Space!</span>
                          </motion.div>
                        )}

                        {wizardLicenseStatus === 'error' && (
                          <motion.div className="p-2.5 bg-red-950/10 border border-red-900/20 text-red-400 rounded flex items-center gap-2 justify-center text-[9px]">
                            <AlertTriangle className="w-3.5 h-3.5" /> Error: Invalid license signature check failed.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={handleVerifyLicense}
                        disabled={!wizardLicenseKey.trim() || wizardLicenseStatus === 'loading' || wizardLicenseStatus === 'success'}
                        className="w-full py-3 bg-white disabled:bg-zinc-900 disabled:text-zinc-700 text-zinc-950 font-bold rounded shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-mono"
                      >
                        <Key className="w-3.5 h-3.5" /> Verify License
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Wizard Navigation Footer */}
                <div className="flex justify-between items-center border-t border-white/5 pt-3.5 mt-5 font-mono text-[9px]">
                  <button
                    disabled={wizardStep === 1}
                    onClick={() => setWizardStep(s => Math.max(1, s - 1))}
                    className="px-3 py-1.5 rounded border border-white/5 bg-zinc-900/40 text-zinc-500 disabled:opacity-30 cursor-pointer"
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
                    className="px-3 py-1.5 rounded bg-white text-zinc-950 font-bold shadow hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
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
