import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, Zap } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '12', label: 'Happy Clients' },
  { value: '∞', label: 'Cups of Coffee' },
];

const focusAreas = [
  { icon: Code2, title: 'Frontend', desc: 'React, TypeScript, and Tailwind for interfaces that feel instant and intuitive.' },
  { icon: Server, title: 'Backend', desc: 'Node.js and edge functions powering APIs that scale gracefully.' },
  { icon: Database, title: 'Database', desc: 'PostgreSQL and Supabase for reliable, well-modeled data layers.' },
  { icon: Zap, title: 'Performance', desc: 'Lighthouse-first mindset: fast loads, smooth interactions, zero jank.' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 bg-slate-950 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">About</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">A bit about me</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a full-stack developer based in San Francisco who loves building products that
              people actually enjoy using. My sweet spot is the intersection of thoughtful design
              and solid engineering — interfaces that look great and stay fast under real load.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Over the years I've shipped everything from solo side projects to production apps
              serving thousands of users. I care about accessibility, performance budgets, and
              writing code that the next developer (often me) can understand six months later.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-teal-500/30 transition-colors duration-300">
                <p className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{s.value}</p>
                <p className="text-slate-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Focus areas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((f) => (
              <div key={f.title} className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300">
                <f.icon className="text-teal-400 mb-4" size={28} />
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
