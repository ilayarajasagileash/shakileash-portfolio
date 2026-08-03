import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('submitting');

    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-slate-900 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Let's work together</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            Have a project in mind or just want to say hi? Drop me a message and I'll get back to you within a day or two.
          </p>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-4 p-5 bg-slate-950/50 rounded-xl border border-slate-800">
                <Mail className="text-teal-400 mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <a href="mailto:hello@alexrivera.dev" className="text-white hover:text-teal-400 transition-colors">
                    hello@alexrivera.dev
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-slate-950/50 rounded-xl border border-slate-800">
                <MapPin className="text-teal-400 mt-0.5 shrink-0" size={20} />
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-white">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-slate-300 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-slate-300 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-slate-300 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-teal-400 text-sm">
                  <CheckCircle2 size={18} />
                  Message sent! I'll be in touch soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={18} />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
