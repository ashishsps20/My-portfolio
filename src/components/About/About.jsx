import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/resumeData';

const { about, personal } = portfolioData;

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

function TerminalCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const lines = about.terminal;

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const cmd = lines[lineIdx].cmd;

    if (charIdx < cmd.length) {
      const t = setTimeout(() => {
        setTyped(cmd.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShowOutput(true);
        setTimeout(() => {
          setShowOutput(false);
          setTyped('');
          setCharIdx(0);
          setLineIdx(i => i + 1);
        }, 1400);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines]);

  return (
    <div className="terminal-window" style={{ padding: 0 }}>
      <div className="terminal-header">
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: 10, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {personal.name.toLowerCase().replace(' ', '-')} ~ terminal
        </span>
      </div>

      <div style={{ padding: '16px 20px', minHeight: 200 }}>
        {/* Previous completed lines */}
        {lines.slice(0, lineIdx).map((line, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
              <span className="terminal-prompt">❯ </span>
              <span className="terminal-cmd">{line.cmd}</span>
            </div>
            <div style={{
              fontSize: '0.82rem', lineHeight: 1.6,
              color: 'var(--accent-cyan)', paddingLeft: 16,
            }}>
              {line.output}
            </div>
          </div>
        ))}

        {/* Current line */}
        {lineIdx < lines.length && (
          <div>
            <div style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
              <span className="terminal-prompt">❯ </span>
              <span className="terminal-cmd">{typed}</span>
              <span style={{
                display: 'inline-block', width: 6, height: '0.9rem',
                background: 'var(--accent-green)', marginLeft: 1,
                animation: 'typing-cursor 0.8s infinite',
                verticalAlign: 'text-bottom',
              }} />
            </div>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: '0.82rem', lineHeight: 1.6,
                  color: 'var(--accent-cyan)', paddingLeft: 16,
                }}
              >
                {lines[lineIdx].output}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Get to Know Me</p>
          <h2 id="about-heading" className="section-title">About Me</h2>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem', marginTop: '3rem', alignItems: 'start',
        }}>
          {/* Left — text */}
          <div>
            <SectionReveal delay={0.1}>
              <p style={{
                fontSize: '1.05rem', color: 'var(--text-secondary)',
                lineHeight: 1.9, marginBottom: '1.5rem',
              }}>
                I'm <strong style={{ color: 'var(--text-primary)' }}>{personal.name}</strong>,
                a {personal.title} passionate about crafting software that's not just functional,
                but truly elegant. I believe great software emerges from the intersection of
                clean architecture, thoughtful UX, and continuous learning.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p style={{
                fontSize: '1rem', color: 'var(--text-muted)',
                lineHeight: 1.9, marginBottom: '2rem',
              }}>
                I thrive in environments where I can solve complex problems and build things from
                the ground up. Whether it's designing scalable APIs, crafting responsive UIs, or
                optimizing algorithms — I bring the same level of precision and care to every layer
                of the stack.
              </p>
            </SectionReveal>

            {/* Stats grid */}
            <SectionReveal delay={0.3}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16, marginBottom: '2rem',
              }}>
                {about.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="glass-card glow-border"
                    style={{ padding: '16px 20px' }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div style={{
                      fontSize: '1.6rem', fontWeight: 800,
                      background: 'var(--gradient-text)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      marginBottom: 4,
                    }}>
                      {h.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {h.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            {/* Interest chips */}
            <SectionReveal delay={0.4}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 500 }}>
                Current Interests
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['System Design', 'AI/ML', 'Open Source', 'Cloud Architecture', 'DSA', 'Web3'].map(tag => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right — terminal */}
          <SectionReveal delay={0.2}>
            <TerminalCard />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
