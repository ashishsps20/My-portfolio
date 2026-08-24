import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/resumeData';

const { skills } = portfolioData;

const categories = [
  { key: 'languages',    label: 'Languages',    color: '#3B82F6' },
  { key: 'frontend',     label: 'Frontend',     color: '#8B5CF6' },
  { key: 'backend',      label: 'Backend',      color: '#06B6D4' },
  { key: 'databases',    label: 'Databases',    color: '#10B981' },
  { key: 'tools',        label: 'Dev Tools',    color: '#F59E0B' },
  { key: 'fundamentals', label: 'CS Fundamentals', color: '#EC4899' },
];

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

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');
  const activeCategory = categories.find(c => c.key === activeTab);
  const activeSkills = skills[activeTab] || [];

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Technical Arsenal</p>
          <h2 id="skills-heading" className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle" style={{ marginTop: 0 }}>
            A curated set of technologies I work with regularly — grouped by domain.
          </p>
        </SectionReveal>

        {/* Category tabs */}
        <SectionReveal delay={0.1}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '2.5rem', marginBottom: '2rem',
          }}>
            {categories.map(cat => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  style={{
                    padding: '8px 20px', borderRadius: 24,
                    fontSize: '0.875rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: isActive ? `${cat.color}18` : 'var(--bg-card)',
                    color: isActive ? cat.color : 'var(--text-muted)',
                    border: isActive ? `1px solid ${cat.color}50` : '1px solid var(--border)',
                  }}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 16,
            }}
          >
            {activeSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontSize: '2rem', marginBottom: 10,
                  filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.3))',
                }}>
                  {skill.icon}
                </div>
                <div style={{
                  fontSize: '0.875rem', fontWeight: 600,
                  color: 'var(--text-primary)', marginBottom: 4, position: 'relative', zIndex: 1,
                }}>
                  {skill.name}
                </div>
                <div style={{
                  width: 24, height: 2, borderRadius: 1,
                  background: activeCategory.color,
                  margin: '0 auto',
                  opacity: 0.7,
                }} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills overview strip */}
        <SectionReveal delay={0.3}>
          <div style={{
            marginTop: '3rem', padding: '1.5rem 2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              All Technologies at a Glance
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Object.values(skills).flat().map((skill, i) => (
                <motion.span
                  key={`${skill.name}-${i}`}
                  className="tech-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                >
                  {skill.icon} {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
