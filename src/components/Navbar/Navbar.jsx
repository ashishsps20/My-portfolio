import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            aria-label="Go to home"
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 700, color: 'white',
                fontFamily: 'var(--font-mono)',
              }}
            >
              &lt;/&gt;
            </div>
            <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Dev</span>
              <span style={{ color: 'var(--text-muted)' }}>Portfolio</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                    color: isActive ? 'var(--accent-blue-light)' : 'var(--text-muted)',
                    border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.target.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.target.style.color = 'var(--text-muted)';
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 36, height: 36,
                borderRadius: 8,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark'
                ? <Sun size={16} />
                : <Moon size={16} />
              }
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 36, height: 36,
                borderRadius: 8,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 260, zIndex: 1000,
                background: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border)',
                padding: '80px 20px 20px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 8,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textAlign: 'left',
                      background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                      color: isActive ? 'var(--accent-blue-light)' : 'var(--text-secondary)',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
