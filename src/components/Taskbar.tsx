import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Terminal as TerminalIcon, 
  Folder, 
  Settings, 
  Globe 
} from 'lucide-react';
import { AppId, WindowState } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface TaskbarProps {
  windows: WindowState[];
  onToggleWindow: (id: AppId) => void;
  activeApp: AppId | null;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, onToggleWindow, activeApp }) => {
  const apps = [
    { id: 'chatbot', icon: <MessageSquare size={20} />, label: 'Chat' },
    { id: 'image-analyzer', icon: <ImageIcon size={20} />, label: 'Vision' },
    { id: 'terminal', icon: <TerminalIcon size={20} />, label: 'Terminal' },
    { id: 'files', icon: <Folder size={20} />, label: 'Files' },
    { id: 'browser', icon: <Globe size={20} />, label: 'Browser' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 h-14 glass rounded-2xl px-2 flex items-center gap-1 z-[9999]">
      {apps.map((app) => {
        const window = windows.find(w => w.id === app.id);
        const isOpen = window?.isOpen;
        const isMinimized = window?.isMinimized;
        const isActive = activeApp === app.id;

        return (
          <button
            key={app.id}
            onClick={() => onToggleWindow(app.id as AppId)}
            className={cn(
              "relative p-3 rounded-xl transition-all duration-200 group",
              isActive ? "bg-white/20" : "hover:bg-white/10"
            )}
            title={app.label}
          >
            <div className={cn(
              "transition-transform group-hover:scale-110",
              isOpen && !isMinimized ? "text-white" : "text-white/60"
            )}>
              {app.icon}
            </div>
            
            {/* Indicators */}
            {isOpen && (
              <div className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all",
                isActive ? "bg-white w-3" : "bg-white/40"
              )} />
            )}

            {/* Tooltip (Custom) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10">
              {app.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};
