import React from 'react';
import { MessageCircle } from 'lucide-react';
import { brandConfig } from '../config/brand';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={brandConfig.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with London concierge"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border border-emerald-400/40"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
      <MessageCircle className="w-5 h-5 text-white" />
      <span className="text-xs font-semibold tracking-wide hidden sm:inline">
        WhatsApp Concierge
      </span>
    </a>
  );
};
