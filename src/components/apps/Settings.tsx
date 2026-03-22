import React from 'react';
import { Settings as SettingsIcon, Monitor, Shield, Cpu, Bell, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Settings: React.FC = () => {
  const sections = [
    { icon: <Monitor size={18} />, label: 'Display', desc: 'Wallpaper, themes, resolution' },
    { icon: <User size={18} />, label: 'Account', desc: 'Profile, neural link, security' },
    { icon: <Bell size={18} />, label: 'Notifications', desc: 'Alerts, system messages' },
    { icon: <Shield size={18} />, label: 'Privacy', desc: 'Data access, encryption' },
    { icon: <Cpu size={18} />, label: 'System', desc: 'Storage, performance, updates' },
  ];

  return (
    <div className="flex h-full bg-black/40">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-white/5 p-4 space-y-1">
        <h2 className="text-lg font-medium text-white/90 px-2 mb-4 flex items-center gap-2">
          <SettingsIcon size={20} className="text-indigo-400" />
          Settings
        </h2>
        {sections.map((s, i) => (
          <button 
            key={i}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
              i === 0 ? "bg-indigo-600 text-white" : "text-white/60 hover:bg-white/5 hover:text-white/80"
            )}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-medium text-white/90">Display Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-dark p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Dark Mode</p>
                    <p className="text-xs text-white/40">Always active in NebulaOS</p>
                  </div>
                  <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Transparency</p>
                    <p className="text-xs text-white/40">Glassmorphism effects</p>
                  </div>
                  <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="glass-dark p-4 rounded-xl space-y-4">
                <p className="text-sm font-medium text-white/90">Wallpaper</p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i}
                      className={cn(
                        "aspect-video rounded-lg border-2 border-white/10 cursor-pointer hover:border-indigo-500/50 transition-all overflow-hidden",
                        i === 1 ? "border-indigo-500" : ""
                      )}
                    >
                      <img 
                        src={`https://picsum.photos/seed/nebula${i}/400/225`} 
                        alt="Wallpaper" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-medium text-white/90">System Information</h3>
            <div className="glass-dark p-4 rounded-xl space-y-2 font-mono text-xs text-white/60">
              <div className="flex justify-between">
                <span>OS Name</span>
                <span className="text-white/90">NebulaOS</span>
              </div>
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-white/90">1.0.42-stable</span>
              </div>
              <div className="flex justify-between">
                <span>Kernel</span>
                <span className="text-white/90">5.15.0-nebula</span>
              </div>
              <div className="flex justify-between">
                <span>Neural Core</span>
                <span className="text-white/90">Active (Gemini 3.1)</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
