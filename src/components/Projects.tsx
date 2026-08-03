import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { supabase, type Project } from '@/lib/supabase';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('display_order')
      .then(({ data, error }) => {
        if (error || !data) setError(true);
        else setProjects(data);
      });
  }, []);

  return (
    <section ref={ref} id="projects" className="py-24 md:py-32 bg-slate-950 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Projects</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Things I've built</h2>
          <p className="text-slate-400 mb-16 max-w-2xl">A selection of projects that show how I approach design, architecture, and shipping.</p>

          {error ? (
            <p className="text-slate-400">Couldn't load projects right now. Please try again later.</p>
          ) : projects.length === 0 ? (
            <p className="text-slate-400">No projects yet — check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <article
                  key={project.id}
                  className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Github size={48} />
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-teal-500/90 text-slate-950 text-xs font-semibold rounded-full backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-teal-400 transition-colors"
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-teal-400 transition-colors"
                        >
                          <Github size={16} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
