import { motion } from 'framer-motion';
import { Mail, Code2 } from 'lucide-react';
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

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <GithubIcon size={18} />, href: personal.github, label: 'GitHub' },
    { icon: <LinkedinIcon size={18} />, href: personal.linkedin, label: 'LinkedIn' },
    { icon: <Mail size={18} />, href: `mailto:${personal.email}`, label: 'Email' },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 2rem',
        position: 'relative',
      }}
      role="contentinfo"
    >
      {/* Subtle glow top line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent-blue), var(--accent-violet), transparent)',
      }} />

      <div className="section-container">
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: 24,
        }}>
          {/* Left */}
          <div>
            <motion.button
              onClick={scrollTop}
              style={{
                fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="gradient-text">{personal.name}</span>
            </motion.button>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Turning ideas into software. ✨
            </p>
          </div>

          {/* Center — socials */}
          <div style={{ display: 'flex', gap: 12 }}>
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.1 }}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-blue-light)';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Right */}
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Code2 size={14} /> Designed & Built by{' '}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{personal.name}</span>
            {' '}· {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
