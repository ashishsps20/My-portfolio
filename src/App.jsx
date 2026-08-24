import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedBackground from './components/Background/AnimatedBackground';
import CustomCursor from './components/Cursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Achievements from './components/Achievements/Achievements';
import CodingProfiles from './components/CodingProfiles/CodingProfiles';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import TerminalWidget from './components/Terminal/Terminal';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return activeSection;
}

export default function App() {
  const activeSection = useActiveSection();

  return (
    <ThemeProvider>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Global UI */}
        <AnimatedBackground />
        <CustomCursor />
        <ScrollProgress />

        {/* Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Main content */}
        <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <CodingProfiles />
          <Achievements />
          <Contact />
        </main>

        {/* Footer */}
        <footer style={{ position: 'relative', zIndex: 1 }}>
          <Footer />
        </footer>

        {/* Floating terminal */}
        <TerminalWidget />
      </div>
    </ThemeProvider>
  );
}
