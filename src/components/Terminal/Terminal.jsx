import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus } from 'lucide-react';

const COMMANDS = {
  help: {
    output: [
      'Available commands:',
      '  about      — Learn about me',
      '  skills     — View my tech stack',
      '  projects   — Browse my projects',
      '  contact    — Get in touch',
      '  clear      — Clear terminal',
    ],
  },
  about: {
    output: ['Navigating to About section...'],
    action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }),
  },
  skills: {
    output: ['Navigating to Skills section...'],
    action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }),
  },
  projects: {
    output: ['Navigating to Projects section...'],
    action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }),
  },
  contact: {
    output: ['Navigating to Contact section...'],
    action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
  },
  clear: { output: [], clear: true },
};

export default function TerminalWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', lines: ['Welcome! Type "help" to see available commands.'] },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newEntry = { type: 'input', text: cmd };

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      setCmdHistory(h => [cmd, ...h]);
      setHistIdx(-1);
      return;
    }

    const command = COMMANDS[cmd];
    const outputLines = command
      ? command.output
      : [`Command not found: ${cmd}. Type "help" for available commands.`];

    setHistory(h => [...h, newEntry, { type: 'output', lines: outputLines }]);
    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    if (command?.action) {
      setTimeout(command.action, 300);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] || '');
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 500,
          width: 48, height: 48, borderRadius: 12,
          background: 'var(--gradient-primary)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
        }}
        whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(59,130,246,0.5)' }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(o => !o)}
        aria-label="Open interactive terminal"
        title="Open terminal (try typing 'help')"
      >
        <TerminalIcon size={20} />
      </motion.button>

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="floating-terminal"
            style={{
              bottom: 84, right: 24,
              background: 'rgba(13,17,23,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '8px 12px', background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: 8, fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flex: 1 }}>
                portfolio ~ interactive terminal
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                aria-label="Close terminal"
              >
                <X size={12} />
              </button>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              style={{
                padding: '12px 14px',
                overflowY: 'auto', maxHeight: 200,
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.7,
              }}
            >
              {history.map((item, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  {item.type === 'input' && (
                    <div>
                      <span style={{ color: '#27c93f' }}>❯ </span>
                      <span style={{ color: '#f9fafb' }}>{item.text}</span>
                    </div>
                  )}
                  {item.type === 'output' && item.lines.map((line, j) => (
                    <div key={j} style={{ color: '#06b6d4', paddingLeft: 12 }}>{line}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ color: '#27c93f', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem', caretColor: 'var(--accent-blue)',
                }}
                placeholder="type a command..."
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
