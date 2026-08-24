import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { portfolioData } from '../../data/resumeData';

const { personal } = portfolioData;

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function SectionReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactInfo() {
  const infos = [
    {
      icon: <Mail size={18} />, label: 'Email', value: personal.email,
      href: `mailto:${personal.email}`, color: '#3B82F6',
    },
    {
      icon: <LinkedinIcon size={18} />, label: 'LinkedIn', value: 'Connect with me',
      href: personal.linkedin, color: '#0A66C2',
    },
    {
      icon: <GithubIcon size={18} />, label: 'GitHub', value: `@${personal.github.split('/').pop()}`,
      href: personal.github, color: '#8B5CF6',
    },
    {
      icon: <MapPin size={18} />, label: 'Location', value: personal.location,
      href: null, color: '#10B981',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {infos.map(info => (
        <motion.div
          key={info.label}
          className="glass-card glow-border"
          whileHover={{ x: 6 }}
          style={{ padding: '16px 20px' }}
        >
          {info.href ? (
            <a
              href={info.href}
              target={info.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${info.color}12`,
                border: `1px solid ${info.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: info.color, flexShrink: 0,
              }}>
                {info.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{info.value}</div>
              </div>
              <ExternalLink size={14} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
            </a>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${info.color}12`,
                border: `1px solid ${info.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: info.color, flexShrink: 0,
              }}>
                {info.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{info.value}</div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message is too short (min 20 chars)';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const inputStyle = (field) => ({
    borderColor: errors[field] ? 'rgba(239,68,68,0.5)' : undefined,
    boxShadow: errors[field] ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined,
  });

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: '40px 32px', textAlign: 'center',
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <CheckCircle size={48} style={{ color: 'var(--accent-green)', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Your email client should have opened. If not, email me directly at{' '}
          <a href={`mailto:${personal.email}`} style={{ color: 'var(--accent-blue-light)' }}>
            {personal.email}
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label htmlFor="contact-name" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>
            Your Name *
          </label>
          <input
            id="contact-name"
            className="form-input"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            style={inputStyle('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: 4 }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>
            Email Address *
          </label>
          <input
            id="contact-email"
            className="form-input"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={inputStyle('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: 4 }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>
            Message *
          </label>
          <textarea
            id="contact-message"
            className="form-input"
            rows={5}
            placeholder="Tell me about your project or opportunity..."
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: 4 }}>{errors.message}</p>}
        </div>

        <motion.button
          type="submit"
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ justifyContent: 'center', width: '100%' }}
        >
          <Send size={16} /> Send Message
        </motion.button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Get In Touch</p>
          <h2 id="contact-heading" className="section-title">
            Let's Build Something Together.
          </h2>
          <p className="section-subtitle">
            Whether you have a project in mind, an opportunity to share, or just want to connect —
            my inbox is always open.
          </p>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem', marginTop: '3rem',
        }}>
          <SectionReveal delay={0.1}>
            <ContactInfo />
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Send a Message</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                I typically respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
