import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">Alex Rivera</p>
            <p className="text-slate-500 text-sm mt-1">Full-Stack Developer · San Francisco</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@alexrivera.dev" aria-label="Email"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href="#home" aria-label="Back to top"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <ArrowUp size={20} />
            </a>
          </div>
        </div>

        <p className="text-slate-600 text-sm text-center mt-8">
          © {new Date().getFullYear()} Alex Rivera. Built with React, Supabase, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
