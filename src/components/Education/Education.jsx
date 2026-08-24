import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Star, BookOpen } from 'lucide-react';
import { portfolioData } from '../../data/resumeData';

const { education } = portfolioData;

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

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">Academic Background</p>
          <h2 id="education-heading" className="section-title">Education</h2>
        </SectionReveal>

        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {education.map((edu, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <motion.div
                className="glass-card glow-border"
                style={{ padding: '28px 32px' }}
                whileHover={{ y: -4 }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '20px', alignItems: 'start',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-blue)', flexShrink: 0,
                  }}>
                    <GraduationCap size={24} />
                  </div>

                  <div>
                    {/* Degree */}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 4 }}>
                      {edu.degree}
                    </h3>

                    {/* Meta */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--accent-blue-light)', fontWeight: 500 }}>
                        <BookOpen size={14} /> {edu.institution}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <Calendar size={14} /> {edu.year}
                      </span>
                      {edu.cgpa && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                          <Star size={14} /> CGPA: {edu.cgpa}
                        </span>
                      )}
                    </div>

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                          Relevant Coursework
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {edu.coursework.map(course => (
                            <span key={course} className="tech-badge" style={{ fontSize: '0.75rem' }}>
                              {course}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
