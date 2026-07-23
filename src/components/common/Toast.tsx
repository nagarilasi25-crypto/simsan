import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSantri } from '../../contexts/SantriContext';

export const Toast: React.FC = () => {
  const { toast } = useSantri();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-950 text-emerald-100 border-emerald-700/50',
    error: 'bg-rose-950 text-rose-100 border-rose-700/50',
    info: 'bg-sky-950 text-sky-100 border-sky-700/50',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 border rounded-xl shadow-2xl backdrop-blur-md transition-all animate-bounce-short">
      <div className={`flex items-center gap-3 ${bgColors[toast.type]} px-4 py-3 rounded-xl border`}>
        {icons[toast.type]}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
