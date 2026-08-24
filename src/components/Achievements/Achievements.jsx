import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/resumeData';

const { achievements } = portfolioData;

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

const categoryColors = {
  'Competitive Programming': { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)', text: '#FBBF24' },
  'Hackathon':               { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', text: '#60A5FA' },
  'Certification':           { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34D399' },
  'Open Source':             { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: '#A78BFA' },
};

export default function Achievements() {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" aria-labelledby="achievements-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Recognition & Milestones</p>
          <h2 id="achievements-heading" className="section-title">Achievements</h2>
          <p className="section-subtitle">
            Highlights from competitions, certifications, and open source contributions.
          </p>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20, marginTop: '3rem',
        }}>
          {achievements.map((a, i) => {
            const colors = categoryColors[a.category] || categoryColors['Certification'];
            return (
              <motion.div
                key={a.id}
                className="glass-card glow-border"
                style={{ padding: '24px' }}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                {/* Icon + Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: colors.bg, border: `1px solid ${colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {a.icon}
                  </div>
                  <div style={{
                    padding: '3px 10px', borderRadius: 20,
                    background: colors.bg, border: `1px solid ${colors.border}`,
                    fontSize: '0.7rem', fontWeight: 600, color: colors.text,
                  }}>
                    {a.category}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {a.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
                  {a.description}
                </p>

                {/* Year */}
                <div style={{ fontSize: '0.75rem', color: colors.text, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {a.year}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
