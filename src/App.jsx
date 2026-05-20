import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Zap, Shield, Cpu, Layers, Workflow, Terminal, Code2, MoveRight } from 'lucide-react';

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
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, 150]);
  const opacityHero = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  
  const yImage1 = useTransform(smoothProgress, [0.3, 0.6], [100, -100]);
  const yImage2 = useTransform(smoothProgress, [0.4, 0.7], [150, -150]);

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
      <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20 z-10">
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

      {/* Interface Showcase - Parallax Images */}
      <section className="py-32 px-6 relative z-10 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-4">Arc / Linear Aesthetic</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-6">Designed to Disappear</h3>
              <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                No tabs. No browser windows. Just a frictionless layer of intelligence resting on top of your OS.
              </p>
            </FadeIn>
          </div>

          <div className="relative h-[800px] flex items-center justify-center">
            {/* Panel Mode Image */}
            <motion.div 
              style={{ y: yImage1 }}
              className="absolute left-0 md:left-[10%] top-20 z-20 w-full max-w-[400px]"
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
              className="absolute right-0 md:right-[5%] bottom-20 z-30 w-full max-w-[600px]"
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

      {/* Bento Grid - The 7 Stones Harmonized */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-16">The 7 Stones, Harmonized.</h2>
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
                Not a web wrapper. Native integration to control apps, read local files, and automate workflows seamlessly.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="glass p-8 rounded-2xl h-full">
              <Cpu className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">THE ARC</h3>
              <p className="text-zinc-400">
                Persistent narrative memory. ARIA remembers your projects, your preferences, and context from 3 months ago.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="md:col-span-2 glass p-8 rounded-2xl border-indigo-500/20 relative overflow-hidden h-full">
              <Terminal className="w-10 h-10 text-indigo-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Streaming Acoustic Feedback</h3>
              <p className="text-zinc-400 text-lg relative z-10 max-w-xl">
                We eliminated the silence. Neural Text-to-Speech now operates on a sentence-by-sentence streaming pipeline. As the UI renders text, the voice speaks instantly.
              </p>
              <div className="absolute -right-10 -bottom-10 opacity-5">
                <Zap className="w-64 h-64 text-indigo-500" />
              </div>
            </FadeIn>
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
