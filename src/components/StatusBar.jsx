import React from 'react';
import { GitGraph, X } from 'lucide-react';

export default function StatusBar() {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs z-20 font-sans select-none shrink-0 rounded-b-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">
          <GitGraph size={12} />
          <span className="hidden md:inline">main*</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">
          <X size={12} className="rounded-full bg-red-400/20 text-red-200 p-[1px]" />
          <span>0</span>
          <span className="text-yellow-200 ml-1">0</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="hidden md:inline">Backend: Online</span>
        </div>
        <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">Prettier</span>
      </div>
    </div>
  );
}
