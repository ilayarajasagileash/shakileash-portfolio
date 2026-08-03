import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Full-Stack Developer</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Alex Rivera
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            I craft fast, accessible web applications with thoughtful design and clean architecture — from pixel to database.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-slate-600 hover:border-teal-400 text-slate-200 hover:text-teal-400 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
              <Linkedin size={22} />
            </a>
            <a href="mailto:hello@alexrivera.dev" aria-label="Email"
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-teal-400 transition-colors animate-bounce" aria-label="Scroll down">
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
