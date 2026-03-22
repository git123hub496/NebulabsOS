import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface WindowProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      drag={!isMaximized}
      dragMomentum={false}
      onPointerDown={onFocus}
      className={cn(
        "absolute glass-dark rounded-xl shadow-2xl overflow-hidden flex flex-col",
        isMaximized ? "inset-0 rounded-none" : "w-[800px] h-[600px] top-20 left-40"
      )}
      style={{ zIndex }}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 cursor-default select-none"
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/70">{icon}</span>
          <span className="text-sm font-medium text-white/90">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          >
            {isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-black/20">
        {children}
      </div>
    </motion.div>
  );
};
