import { useEffect, useRef, useState } from 'react';
import { supabase, type Skill } from '@/lib/supabase';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Component: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⚛</span>,
  FileCode: ({ size, className }) => <span style={{ fontSize: size }} className={className}>TS</span>,
  Palette: ({ size, className }) => <span style={{ fontSize: size }} className={className}>🎨</span>,
  Braces: ({ size, className }) => <span style={{ fontSize: size }} className={className}>{'{}'}</span>,
  Server: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⬡</span>,
  Database: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⛁</span>,
  Cloud: ({ size, className }) => <span style={{ fontSize: size }} className={className}>☁</span>,
  Network: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⇄</span>,
  GitBranch: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⎇</span>,
  Container: ({ size, className }) => <span style={{ fontSize: size }} className={className}>▦</span>,
  Figma: ({ size, className }) => <span style={{ fontSize: size }} className={className}>✦</span>,
  Zap: ({ size, className }) => <span style={{ fontSize: size }} className={className}>⚡</span>,
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    supabase
      .from('skills')
      .select('*')
      .order('display_order')
      .then(({ data, error }) => {
        if (error || !data) setError(true);
        else setSkills(data);
      });
  }, []);

  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <section ref={ref} id="skills" className="py-24 md:py-32 bg-slate-900 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Technologies I work with</h2>

          {error ? (
            <p className="text-slate-400">Couldn't load skills right now. Please try again later.</p>
          ) : (
            <div className="space-y-16">
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat}>
                    <h3 className="text-xl font-semibold text-slate-200 mb-8">{cat}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catSkills.map((skill) => {
                        const Icon = skill.icon ? iconMap[skill.icon] : null;
                        return (
                          <div key={skill.id} className="p-6 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-teal-500/30 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              {Icon && <Icon size={24} className="text-teal-400" />}
                              <h4 className="text-white font-medium">{skill.name}</h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: visible ? `${skill.proficiency}%` : '0%' }}
                                />
                              </div>
                              <span className="text-xs text-slate-400 font-mono w-9 text-right">{skill.proficiency}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
