import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Zap, Shield, Cpu, Layers, Workflow, Terminal, Code2, MoveRight, Link as LinkIcon, FileCode2, Globe, FileText, Sunrise, Calendar, CheckCircle2, Clock } from 'lucide-react';

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax values
  const yHero = useTransform(smoothProgress, [0, 0.15], [0, 150]);
  const opacityHero = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  
  const yImage1 = useTransform(smoothProgress, [0.15, 0.4], [100, -100]);
  const yImage2 = useTransform(smoothProgress, [0.2, 0.5], [150, -150]);

  return (
    <div ref={containerRef} className="bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none noise z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center glow-indigo-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-glow" />
            </div>
            <span className="font-bold tracking-[0.2em] text-sm">ARIA</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono text-zinc-400">
            <span className="hidden md:inline-block">v2.0 Cognitive Core</span>
            <a href="https://github.com/codedbyOzzy/ProjectFridaySynapse" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center px-4 pt-20 z-10">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="text-center max-w-5xl mx-auto relative"
        >
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-indigo-300 mb-8 border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              SYSTEM INITIALIZED
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 to-zinc-800">FRIDAY</span>
              <br />
              <span className="text-white text-glow">EVOLVED.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              The era of the assistant is over.<br/>
              Meet your <span className="text-white font-medium">Personal AI Operating System.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <motion.div className="animate-float">
              <ChevronDown className="w-8 h-8 text-zinc-500 mx-auto opacity-50" />
            </motion.div>
          </FadeIn>
        </motion.div>
      </section>

      {/* The Legacy vs The Evolution */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* FRIDAY Problem */}
            <div>
              <FadeIn>
                <h2 className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-4">The Legacy Bottleneck</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">The Cognitive Burden</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  FRIDAY was a cognitive laboratory. A 7-stone architecture connected by a massive event bus. But intelligence is useless if it's slow. The sequential hops created an unbearable latency cascade.
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="glass p-6 rounded-2xl border-red-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Layers className="w-32 h-32" /></div>
                <div className="space-y-4 font-mono text-sm text-zinc-500 relative z-10">
                  <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-zinc-800">
                    <span>User Spoke</span> <span className="text-red-400/50">+2.0s</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-zinc-800">
                    <span>BrainCore Dispatch</span> <span className="text-red-400/50">+500ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-zinc-800">
                    <span>EchoStone Memory Search</span> <span className="text-red-400/50">+3.0s</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-red-500/20 text-red-400 flex justify-between font-bold">
                    <span>Total Latency</span>
                    <span>10s - 30s</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ARIA Solution */}
            <div>
              <FadeIn delay={0.3}>
                <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-4">The Evolution</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Orchestral Harmony</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  We shattered the event chains. ARIA unifies the 7-stone intelligence into a direct, parallel asynchronous pipeline. The stones no longer wait in queues; they sing simultaneously.
                </p>
              </FadeIn>

              <FadeIn delay={0.5} className="gradient-border p-6 relative overflow-hidden glow-indigo-sm">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-32 h-32 text-indigo-500" /></div>
                <div className="space-y-4 font-mono text-sm text-zinc-300 relative z-10">
                  <div className="flex justify-between items-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <span className="text-indigo-300">InputEngine</span>
                    <MoveRight className="w-4 h-4 text-indigo-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex flex-col items-center justify-center text-center h-24">
                      <span className="text-indigo-300 font-bold">MemoryEngine</span>
                      <span className="text-[10px] text-zinc-500 mt-1">Parallel Vector Search</span>
                    </div>
                    <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex flex-col items-center justify-center text-center h-24">
                      <span className="text-indigo-300 font-bold">AgentCore</span>
                      <span className="text-[10px] text-zinc-500 mt-1">Inline Routing</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <span className="text-indigo-300">OutputBus (Stream UI + TTS)</span>
                    <Zap className="w-4 h-4 text-indigo-400" />
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-indigo-500/30 text-indigo-400 flex justify-between font-bold text-lg">
                    <span>First Token Latency</span>
                    <span>&lt;1.2s</span>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* The Interaction Paradigm & UI Showcase */}
      <section className="py-32 px-6 relative z-10 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-4">The Interaction Paradigm</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-6">Spotlight meets Jarvis.</h3>
              <p className="text-zinc-400 text-xl leading-relaxed">
                Three layers. One seamless experience. ARIA is designed to disappear, offering a frictionless layer of intelligence resting quietly on top of your OS.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24 relative z-40">
            <FadeIn delay={0.1} className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <h4 className="font-bold mb-2">Ambient Mode</h4>
              <p className="text-sm text-zinc-400">Resting in your system tray. Constantly aware, quietly processing background tasks.</p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="glass p-6 rounded-2xl text-center border-indigo-500/30 glow-indigo-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 border border-indigo-500/50">
                <div className="font-mono text-xs text-indigo-300">Alt+Space</div>
              </div>
              <h4 className="font-bold mb-2">Bar Mode</h4>
              <p className="text-sm text-zinc-400">Instant access. Fast queries, quick actions, zero friction. Appears instantly on command.</p>
            </FadeIn>

            <FadeIn delay={0.3} className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                <div className="font-mono text-xs text-zinc-300">Tab</div>
              </div>
              <h4 className="font-bold mb-2">Panel Mode</h4>
              <p className="text-sm text-zinc-400">Expands for deep work. Access your daily brief, manage background tasks, and review persistent chat history.</p>
            </FadeIn>
          </div>

          <div className="relative h-[900px] flex items-center justify-center -mt-20">
            {/* Panel Mode Image */}
            <motion.div 
              style={{ y: yImage1 }}
              className="absolute left-0 md:left-[5%] top-40 z-20 w-full max-w-[450px]"
            >
              <FadeIn direction="right">
                <div className="rounded-2xl overflow-hidden border border-white/10 glow-indigo shadow-2xl">
                  <img src="/aria-showcase/aria-panel.png" alt="ARIA Panel Mode" className="w-full h-auto" />
                </div>
              </FadeIn>
            </motion.div>

            {/* Bar Mode Image */}
            <motion.div 
              style={{ y: yImage2 }}
              className="absolute right-0 md:right-[5%] bottom-40 z-30 w-full max-w-[650px]"
            >
              <FadeIn direction="left" delay={0.2}>
                <div className="rounded-2xl overflow-hidden border border-white/10 glow-indigo shadow-2xl">
                  <img src="/aria-showcase/aria-bar.png" alt="ARIA Bar Mode" className="w-full h-auto" />
                </div>
              </FadeIn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Context-Aware Intelligence */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <FadeIn>
                <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-4">Clipboard Intelligence</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Context-Aware Action Chips</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  ARIA monitors your clipboard silently. When you hit <code className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Alt+Space</code>, it already knows what you're looking at and suggests instant actions. No typing required.
                </p>
              </FadeIn>
            </div>

            <div className="space-y-6">
              <FadeIn delay={0.1} className="glass p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                  <LinkIcon className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-zinc-500 mb-2">URL in Clipboard</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full cursor-pointer hover:bg-indigo-500/30 transition-colors">🔗 Summarize</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-full cursor-pointer hover:bg-white/10 transition-colors">🔍 Research</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="glass p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                  <FileCode2 className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-zinc-500 mb-2">Code in Clipboard</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full cursor-pointer hover:bg-indigo-500/30 transition-colors">🐛 Debug</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-full cursor-pointer hover:bg-white/10 transition-colors">📖 Explain</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-full cursor-pointer hover:bg-white/10 transition-colors">✨ Improve</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} className="glass p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                  <FileText className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-zinc-500 mb-2">Text in Clipboard</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full cursor-pointer hover:bg-indigo-500/30 transition-colors">📝 Rewrite</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs rounded-full cursor-pointer hover:bg-white/10 transition-colors">🌍 Translate</span>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid - The 7 Stones Harmonized */}
      <section className="py-32 px-6 relative z-10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">The Capabilities Matrix.</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1} className="md:col-span-2 gradient-border p-8 h-full">
              <Shield className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-white">Bring Your Own Key (BYOK)</h3>
              <p className="text-zinc-400 text-lg">
                Your data, your budget, your rules. Connect OpenAI, Anthropic, Gemini, Groq, or run completely private with local Ollama models. The intelligence layer is agnostic.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="glass p-8 rounded-2xl h-full">
              <Workflow className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Desktop Control</h3>
              <p className="text-zinc-400">
                Native integration to control apps, read local files, and automate workflows seamlessly.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="glass p-8 rounded-2xl h-full">
              <Sunrise className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Morning Briefings</h3>
              <p className="text-zinc-400">
                Automated context. Every morning, ARIA analyzes your calendar, emails, and past tasks to deliver a perfect daily brief.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="md:col-span-2 glass p-8 rounded-2xl border-indigo-500/20 relative overflow-hidden h-full">
              <Terminal className="w-10 h-10 text-indigo-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Streaming Acoustic Feedback</h3>
              <p className="text-zinc-400 text-lg relative z-10 max-w-xl">
                We eliminated the silence. Neural Text-to-Speech operates on a sentence-by-sentence pipeline. As the UI renders text, the voice speaks instantly.
              </p>
              <div className="absolute -right-10 -bottom-10 opacity-5">
                <Zap className="w-64 h-64 text-indigo-500" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Point of No Return */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-4">Metrics of Success</h2>
              <h3 className="text-4xl md:text-5xl font-bold">The Path to No Return</h3>
            </FadeIn>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {/* 30 Seconds */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <FadeIn className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-2 text-white">The First 30 Seconds</h4>
                <p className="text-zinc-400">Install the app, enter your API key, hit <code className="text-xs bg-black/50 px-1 rounded">Alt+Space</code>, type "hello". The 1.2-second instant response hooks you immediately.</p>
              </FadeIn>
            </div>

            {/* 5 Minutes */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Workflow className="w-4 h-4 text-indigo-400" />
              </div>
              <FadeIn delay={0.2} className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-2 text-white">The First 5 Minutes</h4>
                <p className="text-zinc-400">You drag and drop a file, schedule a background task, and use context chips. The fluidity and animations feel perfectly native.</p>
              </FadeIn>
            </div>

            {/* 1 Week */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <FadeIn delay={0.3} className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-2 text-white">The First Week</h4>
                <p className="text-zinc-400">ARIA remembers your name, learns your preferences, and generates flawless morning briefings. You wonder how you lived without it.</p>
              </FadeIn>
            </div>

            {/* No Return */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-indigo-500/50 bg-indigo-500/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 glow-indigo-sm">
                <CheckCircle2 className="w-4 h-4 text-indigo-300" />
              </div>
              <FadeIn delay={0.4} className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] gradient-border p-6 rounded-2xl glow-indigo-sm">
                <h4 className="font-bold text-xl mb-2 text-white">The Point of No Return</h4>
                <p className="text-zinc-400">You sit at another computer and feel handicapped. The desire for portability begins. ARIA is now indispensable.</p>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-8 glow-indigo-sm">
              <Code2 className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Alt + Space.</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Whisper your intent. Let the orchestra handle the rest. Welcome to the future of personal computing.
            </p>
            
            <a href="https://github.com/codedbyOzzy/ProjectFridaySynapse" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:glow-indigo">
              Explore the Architecture
              <MoveRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-white/5 font-mono">
        <p>Built for the future by Ozzy. 2026</p>
      </footer>
    </div>
  );
}
