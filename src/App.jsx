import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Cpu, Zap, Lock, Code2, ArrowRight } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </div>
            <span className="font-bold tracking-widest text-sm">ARIA</span>
          </div>
          <div className="text-xs text-zinc-400 font-mono">v2.0 Architecture</div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[800px] h-[800px] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-indigo-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            System Online
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">FRIDAY</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">is now </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">ARIA.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Asistanlık çağı kapandı. Kişisel Yapay Zeka İşletim Sistemi (Personal AI OS) çağı başlıyor.
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-zinc-500 animate-bounce" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* The Evolution Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Bilişsel Mimarinin Evrimi</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* FRIDAY */}
            <FadeIn delay={0.2} className="glass-panel p-8 rounded-2xl border-red-500/10 bg-red-950/10">
              <h3 className="text-2xl font-semibold mb-2 text-zinc-300">FRIDAY Synapse (v1.x)</h3>
              <p className="text-zinc-500 mb-6 font-mono text-sm">Event Bus Gecikme Zinciri</p>
              
              <div className="space-y-3 font-mono text-xs text-zinc-400">
                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">VoiceStone.USER_SPOKE</div>
                <div className="flex justify-center"><ChevronDown className="w-4 h-4 text-zinc-600" /></div>
                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">BrainCore Dispatch</div>
                <div className="flex justify-center"><ChevronDown className="w-4 h-4 text-zinc-600" /></div>
                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">EchoStone.REQUEST_CONTEXT</div>
                <div className="flex justify-center"><ChevronDown className="w-4 h-4 text-zinc-600" /></div>
                <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800">SafeBrainRouter &rarr; Brain</div>
                
                <div className="mt-6 pt-6 border-t border-red-500/20 text-red-400 font-bold flex justify-between">
                  <span>İlk Yanıt:</span>
                  <span>10.0s - 30.0s</span>
                </div>
              </div>
            </FadeIn>

            {/* ARIA */}
            <FadeIn delay={0.4} className="glass-panel p-8 rounded-2xl border-indigo-500/20 bg-indigo-950/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-32 h-32 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">ARIA Core (v2.x)</h3>
              <p className="text-indigo-300/80 mb-6 font-mono text-sm">Harmonize Paralel Async Pipeline</p>
              
              <div className="space-y-4 font-mono text-xs text-zinc-300 relative z-10">
                <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/30 flex justify-between items-center">
                  <span>InputEngine</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/30 text-center">MemoryEngine<br/><span className="text-[10px] text-zinc-500">(Paralel Arama)</span></div>
                  <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/30 text-center">AgentCore<br/><span className="text-[10px] text-zinc-500">(Inline Route)</span></div>
                </div>

                <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/30 flex justify-between items-center">
                  <span>OutputBus (Stream UI + TTS)</span>
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                
                <div className="mt-6 pt-6 border-t border-indigo-500/30 text-indigo-400 font-bold flex justify-between text-base">
                  <span>İlk Yanıt:</span>
                  <span>&lt;1.2s</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1} className="glass-panel p-8 rounded-2xl">
              <Zap className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Sıfır Gecikme</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Event bus atlamaları tarihe karıştı. Doğrudan async pipeline ile kognitif taşlar artık paralel şarkı söylüyor.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="glass-panel p-8 rounded-2xl">
              <Cpu className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">7-Stone Armonisi</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                FRIDAY'in devasa bilişsel zekası, THE ARC ve SPECTRE modülleri eksiksiz olarak ARIA'nın çekirdeğinde birleşti.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="glass-panel p-8 rounded-2xl">
              <Lock className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Tam Kontrol (BYOK)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                OpenAI, Anthropic, Gemini, Groq veya yerel Ollama. Kendi API anahtarınızı getirin, gizliliğinizi koruyun.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-8">
              <Code2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Alt+Space. Orkestrayı Dinleyin.</h2>
            <p className="text-lg text-zinc-400 mb-12 leading-relaxed">
              Operada Arya (Aria), arkada kusursuz bir orkestra çalışırken sahnede pürüzsüz bir solo performans sergilenen o muazzam andır. 
              FRIDAY bizim çok sesli orkestramızdı. ARIA ise onun ulaştığı kusursuz armoni.
            </p>
            
            <a href="https://github.com/codedbyOzzy/ProjectFridaySynapse" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200">
              Mimarinin Kökenini İnceleyin
              <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-white/5">
        <p>Built for the future by Ozzy. 2026</p>
      </footer>
    </div>
  );
}

export default App;
