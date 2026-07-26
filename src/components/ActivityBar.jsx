import React from 'react';
import { Files, Bot } from 'lucide-react';

export default function ActivityBar({ sidebarMode, setSidebarMode, isSidebarOpen, setSidebarOpen }) {

  return (
    <div className="w-12 bg-[#333333] hidden md:flex flex-col justify-between items-center py-3 border-r border-[#1e1e1e] z-30 shrink-0">
      <div className="flex flex-col gap-6 items-center">

        {/* Files */}
        <div className="relative">
          <Files
            size={24}
            className={`cursor-pointer transition-colors ${sidebarMode === 'files' && isSidebarOpen ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => { setSidebarMode('files'); setSidebarOpen(!isSidebarOpen); }}
          />
        </div>

          {/* AI Chat */}
        <div className="relative">
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(168,85,247,0.6)] z-20"></span>
          <Bot
            size={24}
            className={`cursor-pointer transition-colors ${sidebarMode === 'chat' ? 'text-purple-400' : 'text-gray-500 hover:text-purple-400'}`}
            onClick={() => setSidebarMode('chat')}
          />
        </div>

      </div>

      {/* Bottom spacer */}
      <div></div>
    </div>
  );
}
