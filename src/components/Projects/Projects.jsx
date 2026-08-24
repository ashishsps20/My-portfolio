import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
import { portfolioData } from '../../data/resumeData';

const { projects } = portfolioData;

function SectionReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Abstract code visual for project cards
function ProjectVisual({ color, name }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${color}12 0%, transparent 60%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: 20,
    }}>
      {/* Code lines decoration */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        color: `${color}80`, lineHeight: 1.8, width: '100%',
      }}>
        {['import { useState } from "react";',
          `const ${name.replace(/\s/g, '')} = () => {`,
          '  const [data, setData] = useState([]);',
          '  useEffect(() => {',
          '    fetchData().then(setData);',
          '  }, []);',
          '  return <Dashboard data={data} />;',
          '};',
        ].map((line, i) => (
          <div key={i} style={{ opacity: 0.6 + (i % 3) * 0.15 }}>
            <span style={{ color: `${color}40`, marginRight: 12, userSelect: 'none' }}>{i + 1}</span>
            {line}
          </div>
        ))}
      </div>

      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
      }} />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                fontSize: '0.75rem', fontWeight: 600,
                color: project.color, marginBottom: 8,
              }}>
                {project.tech[0]}
              </div>
              <h3 id="modal-title" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
                {project.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0,
              }}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px' }}>
            {/* Overview */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
              {project.description}
            </p>

            {/* Problem & Solution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { label: '🔍 Problem', text: project.problem, bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)' },
                { label: '✅ Solution', text: project.solution, bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '14px 16px', borderRadius: 'var(--radius-md)',
                  background: item.bg, border: `1px solid ${item.border}`,
                }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Features */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Key Features
            </h4>
            <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <ChevronRight size={14} style={{ color: project.color, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Tech Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {project.tech.map(t => (
                <span
                  key={t}
                  className="tech-badge"
                  style={{ borderColor: `${project.color}30`, color: project.color, background: `${project.color}10` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <GithubIcon size={16} /> View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.name} project details`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(project); }}
      style={{ cursor: 'pointer' }}
    >
      {/* Visual */}
      <div
        className="project-card-visual"
        style={{ borderBottom: `1px solid ${project.color}20` }}
      >
        <ProjectVisual color={project.color} name={project.name} />
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            padding: '3px 10px', borderRadius: 20,
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.25)',
            fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-blue-light)',
          }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px' }}>
        {/* Name & tagline */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
          {project.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: project.color, fontWeight: 500, marginBottom: 10 }}>
          {project.tagline}
        </p>
        <p style={{
          fontSize: '0.875rem', color: 'var(--text-muted)',
          lineHeight: 1.7, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="tech-badge"
              style={{ fontSize: '0.7rem' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge" style={{ fontSize: '0.7rem' }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer links */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 14, borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label={`${project.name} GitHub`}
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label={`${project.name} live demo`}
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.78rem', color: project.color, fontWeight: 500,
          }}>
            View Details <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <SectionReveal>
          <p className="section-label">What I've Built</p>
          <h2 id="projects-heading" className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects I've built — each solving a real problem with thoughtful engineering.
          </p>
        </SectionReveal>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24, marginTop: '3rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
