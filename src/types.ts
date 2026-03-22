export type AppId = 'chatbot' | 'image-analyzer' | 'terminal' | 'files' | 'settings' | 'browser';

export interface WindowState {
  id: AppId;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface DesktopIcon {
  id: AppId;
  label: string;
  icon: React.ReactNode;
}
