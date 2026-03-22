import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'NebulaOS [Version 1.0.42]',
    '(c) 2026 Nebula Systems. All rights reserved.',
    '',
    'Type "help" for a list of commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = 'Available commands: help, clear, whoami, date, version, sysinfo, echo [text]';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        response = 'nebula_user_01';
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'version':
        response = 'NebulaOS v1.0.42-stable (Kernel 5.15.0-nebula)';
        break;
      case 'sysinfo':
        response = 'CPU: Quantum Core X8\nRAM: 128GB Virtual\nUptime: 4h 12m\nNetwork: Connected (Neural Link)';
        break;
      default:
        if (trimmed.startsWith('echo ')) {
          response = cmd.slice(5);
        } else if (trimmed === '') {
          response = '';
        } else {
          response = `Command not found: ${trimmed}`;
        }
    }

    setHistory(prev => [...prev, `> ${cmd}`, response, '']);
  };

  return (
    <div 
      className="h-full bg-black/90 font-mono text-emerald-500 p-4 overflow-auto selection:bg-emerald-500/30"
      ref={scrollRef}
    >
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap min-h-[1.2em]">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <ChevronRight size={16} className="shrink-0" />
        <input
          type="text"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setInput('');
            }
          }}
          className="flex-1 bg-transparent border-none outline-none text-emerald-500 font-mono"
        />
      </div>
    </div>
  );
};
