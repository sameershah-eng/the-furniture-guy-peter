import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const GlobalToast: React.FC = () => {
  const { toastMessage, clearToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-black/95 text-white border border-[#FF7A00]/60 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md w-[90vw] sm:w-auto">
      <CheckCircle className="w-5 h-5 text-[#FF7A00] shrink-0" />
      <span className="text-xs font-medium text-white flex-1">{toastMessage}</span>
      <button
        onClick={clearToast}
        aria-label="Dismiss message"
        className="text-white/40 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
