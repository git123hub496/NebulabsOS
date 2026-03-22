import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Terminal as TerminalIcon, 
  Folder, 
  Settings as SettingsIcon, 
  Globe,
  Wifi,
  Battery,
  Volume2,
  Search
} from 'lucide-react';
import { AppId, WindowState } from './types';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { ChatBot } from './components/apps/ChatBot';
import { ImageAnalyzer } from './components/apps/ImageAnalyzer';
import { Terminal } from './components/apps/Terminal';
import { Files } from './components/apps/Files';
import { Settings } from './components/apps/Settings';
import { Browser } from './components/apps/Browser';
import { cn } from './lib/utils';

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'chatbot', title: 'Nebula AI', icon: <MessageSquare size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'image-analyzer', title: 'Visual Intelligence', icon: <ImageIcon size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'files', title: 'File Explorer', icon: <Folder size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'browser', title: 'Nebula Browser', icon: <Globe size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'settings', title: 'Settings', icon: <SettingsIcon size={16} />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
  ]);

  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleFocus = useCallback((id: AppId) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
    setActiveApp(id);
  }, [maxZIndex]);

  const handleToggleWindow = useCallback((id: AppId) => {
    const window = windows.find(w => w.id === id);
    if (!window) return;

    if (window.isOpen) {
      if (window.isMinimized || activeApp !== id) {
        handleFocus(id);
      } else {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveApp(null);
      }
    } else {
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ } : w));
      setActiveApp(id);
    }
  }, [windows, activeApp, maxZIndex, handleFocus]);

  const handleClose = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const handleMinimize = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveApp(null);
  }, []);

  const handleMaximize = useCallback((id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const desktopIcons = [
    { id: 'chatbot', label: 'Nebula AI', icon: <MessageSquare size={32} />, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'image-analyzer', label: 'Vision', icon: <ImageIcon size={32} />, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={32} />, color: 'bg-gray-500/20 text-gray-400' },
    { id: 'files', label: 'Files', icon: <Folder size={32} />, color: 'bg-amber-500/20 text-amber-400' },
    { id: 'browser', label: 'Browser', icon: <Globe size={32} />, color: 'bg-blue-500/20 text-blue-400' },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/nebula1/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60 blur-[2px] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 glass-dark border-b border-white/5 flex items-center justify-between px-4 z-[9999] text-[11px] font-medium tracking-tight text-white/70">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            NebulaOS
          </span>
          <div className="flex items-center gap-3 ml-4">
            <span className="hover:text-white cursor-pointer transition-colors">File</span>
            <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
            <span className="hover:text-white cursor-pointer transition-colors">View</span>
            <span className="hover:text-white cursor-pointer transition-colors">Go</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wifi size={14} />
            <Volume2 size={14} />
            <Battery size={14} className="rotate-90" />
          </div>
          <div className="flex items-center gap-2">
            <Search size={14} />
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 pt-12 p-6 z-10 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 w-fit">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => handleToggleWindow(icon.id as AppId)}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-all group w-24"
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
              icon.color
            )}>
              {icon.icon}
            </div>
            <span className="text-[11px] font-medium text-white/90 text-center drop-shadow-md">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {windows.map((w) => (
            <div key={w.id} className="pointer-events-auto">
              <Window
                title={w.title}
                icon={w.icon}
                isOpen={w.isOpen}
                isMinimized={w.isMinimized}
                isMaximized={w.isMaximized}
                zIndex={w.zIndex}
                onClose={() => handleClose(w.id)}
                onMinimize={() => handleMinimize(w.id)}
                onMaximize={() => handleMaximize(w.id)}
                onFocus={() => handleFocus(w.id)}
              >
                {w.id === 'chatbot' && <ChatBot />}
                {w.id === 'image-analyzer' && <ImageAnalyzer />}
                {w.id === 'terminal' && <Terminal />}
                {w.id === 'files' && <Files />}
                {w.id === 'settings' && <Settings />}
                {w.id === 'browser' && <Browser />}
              </Window>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <Taskbar 
        windows={windows} 
        onToggleWindow={handleToggleWindow} 
        activeApp={activeApp}
      />
    </div>
  );
}

