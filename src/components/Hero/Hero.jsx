import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronDown, Download, ArrowRight, ExternalLink } from 'lucide-react';

// SVG icons for platforms not in this lucide-react version
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
import { portfolioData } from '../../data/resumeData';

const { personal, skills } = portfolioData;

// Build the code object dynamically from resume data
const codeLines = [
  { type: 'keyword', text: 'const', after: ' developer = {' },
  { type: 'property', indent: 1, key: 'name', value: `"${personal.name}"` },
  { type: 'property', indent: 1, key: 'passion', value: '"Building Great Software"' },
  { type: 'property', indent: 1, key: 'stack', value: `[${skills.languages.slice(0, 3).map(s => `"${s.name}"`).join(', ')}]` },
  { type: 'property', indent: 1, key: 'frontend', value: `[${skills.frontend.slice(0, 2).map(s => `"${s.name}"`).join(', ')}]` },
  { type: 'property', indent: 1, key: 'backend', value: `[${skills.backend.slice(0, 2).map(s => `"${s.name}"`).join(', ')}]` },
  { type: 'property', indent: 1, key: 'mindset', value: '"Always Learning 🚀"' },
  { type: 'bracket', text: '};' },
];

function CodeWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(v => {
        if (v >= codeLines.length) { clearInterval(timer); return v; }
        return v + 1;
      });
    }, 180);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="hero-code-window"
      style={{ animation: 'float 6s ease-in-out infinite', width: '100%', maxWidth: 480 }}
      initial={{ opacity: 0, y: 30, rotateY: -5 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Title bar */}
      <div className="code-window-titlebar">
        <div className="window-dot" style={{ background: '#ff5f56' }} />
        <div className="window-dot" style={{ background: '#febc2e' }} />
        <div className="window-dot" style={{ background: '#27c93f' }} />
        <span style={{
          marginLeft: 'auto', fontSize: '0.72rem',
          color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'
        }}>
          developer.js
        </span>
      </div>

      {/* Code content */}
      <div style={{ padding: '16px 0 20px', minHeight: 200 }}>
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            className="code-line"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ paddingLeft: line.indent ? `${20 + line.indent * 20}px` : undefined }}
          >
            {line.type === 'keyword' && (
              <>
                <span className="syntax-keyword">const</span>
                <span className="syntax-variable"> developer</span>
                <span className="syntax-bracket"> = {'{'}</span>
              </>
            )}
            {line.type === 'property' && (
              <>
                <span className="syntax-property">{line.key}</span>
                <span className="syntax-punctuation">: </span>
                <span className="syntax-string">{line.value}</span>
                <span className="syntax-punctuation">,</span>
              </>
            )}
            {line.type === 'bracket' && (
              <span className="syntax-bracket">{line.text}</span>
            )}
          </motion.div>
        ))}
        {/* Cursor blink */}
        {visibleLines < codeLines.length && (
          <div className="code-line" style={{ paddingLeft: 20 }}>
            <span style={{
              display: 'inline-block', width: 8, height: '1rem',
              background: 'var(--accent-blue)',
              animation: 'typing-cursor 0.8s infinite',
              verticalAlign: 'text-bottom',
            }} />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{
        padding: '6px 16px',
        borderTop: '1px solid var(--border)',
        background: 'rgba(59,130,246,0.06)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--text-muted)',
      }}>
        <span>JavaScript • UTF-8</span>
        <span style={{ color: 'var(--accent-green)' }}>● Ready</span>
      </div>
    </motion.div>
  );
}

function TypedRoles() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');
  const roles = personal.roles;

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx < role.length) {
      timeout = setTimeout(() => {
        setText(role.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 60);
    } else if (!deleting && charIdx === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(role.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles]);

  return (
    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
      {text}
      <span style={{ animation: 'typing-cursor 0.8s infinite', opacity: 1 }}>|</span>
    </span>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero-section" aria-label="Introduction">
      <div className="section-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          minHeight: '80vh',
          paddingTop: '2rem',
        }}>

          {/* Left — Text */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Status badge */}
            <motion.div variants={item}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 20,
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontSize: '0.8rem', fontWeight: 500,
                color: 'var(--accent-green)',
                marginBottom: '1.5rem',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent-green)',
                  animation: 'pulse-glow 2s infinite',
                  boxShadow: '0 0 6px var(--accent-green)',
                }} />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} style={{
              fontSize: '1.1rem', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', marginBottom: '0.5rem',
            }}>
              Hi there 👋, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 variants={item} style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 1.05, marginBottom: '1rem',
            }}>
              <span className="gradient-text">{personal.name}</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div variants={item} style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              marginBottom: '1.5rem', minHeight: '2.2rem',
            }}>
              <TypedRoles />
            </motion.div>

            {/* Summary */}
            <motion.p variants={item} style={{
              fontSize: '1.05rem', color: 'var(--text-muted)',
              maxWidth: 480, lineHeight: 1.8, marginBottom: '2rem',
            }}>
              {personal.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '2.5rem' }}>
              <button className="btn-primary" onClick={scrollToProjects}>
                View Projects <ArrowRight size={16} />
              </button>
              <a
                href={personal.resumePDF}
                download
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <Download size={16} /> Resume
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <button className="btn-secondary" onClick={scrollToContact}>
                <Mail size={16} /> Contact
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} style={{ display: 'flex', gap: 16 }}>
              {[
                { href: personal.linkedin, icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
                { href: personal.github, icon: <GithubIcon size={18} />, label: 'GitHub' },
                { href: `mailto:${personal.email}`, icon: <Mail size={18} />, label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    color: 'var(--text-muted)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.color = 'var(--accent-blue-light)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Code window */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CodeWindow />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute', bottom: '-3rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, color: 'var(--text-muted)', fontSize: '0.75rem',
            cursor: 'pointer',
          }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
