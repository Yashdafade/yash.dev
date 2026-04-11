import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export default function Sidebar({ isMobile, isSidebarOpen, setSidebarOpen, activeFile, onFileClick }) {
  return (
    <div className={`
      ${isMobile ? 'absolute top-0 bottom-0 left-0 z-40 w-64 shadow-2xl transition-transform duration-300 ease-in-out' : 'relative w-64 transition-all duration-300'}
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:-translate-x-0 md:hidden'}
      bg-[#252526] flex flex-col border-r border-[#1e1e1e] shrink-0
    `}>
      <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-500 uppercase">
        <span>Explorer</span>
        <div className="flex gap-2 cursor-pointer hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
          <MoreHorizontal size={14} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-1 py-1 flex items-center text-xs font-bold text-gray-300 cursor-pointer hover:bg-[#2a2d2e] transition-colors">
          <ChevronDown size={14} className="mr-1" />
          YASH_PORTFOLIO
        </div>
        <div className="mt-0">
          {Object.keys(RESUME_DATA).map((file, index) => (
            <div
              key={file}
              onClick={() => onFileClick(file)}
              className={`flex items-center px-4 py-1.5 cursor-pointer text-[13px] hover:bg-[#2a2d2e] transition-colors border-l-2 ${activeFile === file ? 'bg-[#37373d] text-white border-blue-400' : 'text-gray-400 border-transparent'}`}
              style={{ animation: `slideInFromBottom 0.3s ease ${index * 60}ms both` }}
            >
              <span className="mr-2">{RESUME_DATA[file].icon}</span>
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
