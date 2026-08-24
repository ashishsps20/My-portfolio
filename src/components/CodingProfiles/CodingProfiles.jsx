import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/resumeData';

const { codingProfiles } = portfolioData;

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

export default function CodingProfiles() {
  if (!codingProfiles || codingProfiles.length === 0) return null;

  return (
    <section id="coding-profiles" aria-labelledby="coding-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Competitive Programming</p>
          <h2 id="coding-heading" className="section-title">Coding Profiles</h2>
          <p className="section-subtitle">
            Where I practice, compete, and sharpen my problem-solving skills.
          </p>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20, marginTop: '3rem',
        }}>
          {codingProfiles.map((profile, i) => (
            <motion.a
              key={profile.platform}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: profile.color + '40' }}
              style={{
                padding: '24px 20px', textDecoration: 'none',
                display: 'block',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              aria-label={`${profile.platform} profile — ${profile.stats}`}
            >
              {/* Icon & platform */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${profile.color}15`,
                  border: `1px solid ${profile.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem',
                }}>
                  {profile.icon}
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
                {profile.platform}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                @{profile.handle}
              </p>

              {/* Stats */}
              <div style={{
                padding: '8px 12px', borderRadius: 8,
                background: `${profile.color}08`,
                border: `1px solid ${profile.color}20`,
              }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: profile.color, marginBottom: 2 }}>
                  {profile.stats}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {profile.detail}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
