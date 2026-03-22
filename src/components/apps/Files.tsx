import React, { useState } from 'react';
import { Folder, File, ChevronRight, Search, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
}

export const Files: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState(['Home']);
  
  const files: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '2026-03-21' },
    { name: 'Pictures', type: 'folder', modified: '2026-03-20' },
    { name: 'Projects', type: 'folder', modified: '2026-03-19' },
    { name: 'System', type: 'folder', modified: '2026-01-01' },
    { name: 'nebula_core.sys', type: 'file', size: '1.2 GB', modified: '2026-03-21' },
    { name: 'user_config.json', type: 'file', size: '4 KB', modified: '2026-03-22' },
    { name: 'neural_map.dat', type: 'file', size: '850 MB', modified: '2026-03-15' },
    { name: 'readme.txt', type: 'file', size: '12 KB', modified: '2026-03-22' },
  ];

  return (
    <div className="flex flex-col h-full bg-black/40">
      {/* Toolbar */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/5">
        <div className="flex items-center gap-2 text-xs text-white/60">
          {currentPath.map((p, i) => (
            <React.Fragment key={i}>
              <span className="hover:text-white cursor-pointer transition-colors">{p}</span>
              {i < currentPath.length - 1 && <ChevronRight size={12} />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-2 py-1 text-xs focus:outline-none focus:border-white/20"
            />
          </div>
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1 rounded", view === 'grid' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60")}
            >
              <LayoutGrid size={14} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1 rounded", view === 'list' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60")}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {view === 'grid' ? (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {files.map((file, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 cursor-pointer group transition-all"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                  file.type === 'folder' ? "bg-indigo-500/20 text-indigo-400" : "bg-emerald-500/20 text-emerald-400"
                )}>
                  {file.type === 'folder' ? <Folder size={24} /> : <File size={24} />}
                </div>
                <span className="text-[10px] text-white/80 text-center truncate w-full px-1">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="font-medium py-2 px-4">Name</th>
                <th className="font-medium py-2 px-4">Size</th>
                <th className="font-medium py-2 px-4">Modified</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, i) => (
                <tr key={i} className="hover:bg-white/5 group cursor-pointer border-b border-white/5 last:border-0 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <span className={file.type === 'folder' ? "text-indigo-400" : "text-emerald-400"}>
                      {file.type === 'folder' ? <Folder size={16} /> : <File size={16} />}
                    </span>
                    <span className="text-white/80 group-hover:text-white">{file.name}</span>
                  </td>
                  <td className="py-3 px-4 text-white/40">{file.size || '--'}</td>
                  <td className="py-3 px-4 text-white/40">{file.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
