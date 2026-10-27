import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#111111] border-2 border-white/10 flex items-center justify-center hard-shadow">
          <span className="font-serif italic text-3xl text-[#FF7A00]">404</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Piece Not Found</h1>
        <p className="text-sm text-white/60">
          The collection or room you are seeking may have moved to our archive or requires a direct bespoke inquiry.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow hover:brightness-110"
          >
            <Home className="w-4 h-4" />
            <span>Return to Flagship Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
