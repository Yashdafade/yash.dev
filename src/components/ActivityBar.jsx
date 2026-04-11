import React from 'react';
import { Files, Search, GitGraph, Bug, UserCircle, Settings } from 'lucide-react';

export default function ActivityBar({ activeSidebarIndex, isSidebarOpen, setActiveSidebarIndex, setSidebarOpen }) {
  return (
    <div className="w-12 bg-[#333333] hidden md:flex flex-col justify-between items-center py-3 border-r border-[#1e1e1e] z-30 shrink-0">
      <div className="flex flex-col gap-5">
        <Files
          size={24}
          className={`cursor-pointer transition-colors ${activeSidebarIndex === 0 && isSidebarOpen ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => { setActiveSidebarIndex(0); setSidebarOpen(!isSidebarOpen); }}
        />
        <Search size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
        <GitGraph size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
        <Bug size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
      </div>

      <div className="flex flex-col gap-5 mb-2 items-center">
        {/* User Profile — Beacon + Popup */}
        <div className="relative group">
          <div className="relative cursor-pointer">
            <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-75"></span>
            <UserCircle size={26} className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#333333] z-20"></div>
          </div>

          {/* Invisible bridge */}
          <div className="absolute left-full top-0 h-full w-4 bg-transparent"></div>

          {/* Popup */}
          <div className="absolute left-10 bottom-0 w-72 bg-[#252526] border border-black shadow-2xl rounded-lg p-0 z-50 overflow-hidden text-sm hidden group-hover:block popup-enter">
            <div className="bg-[#1f2428] p-4 border-b border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_10px_rgba(37,99,235,0.5)]">YD</div>
                <div>
                  <div className="font-bold text-white">Yash Dafade</div>
                  <div className="text-xs text-gray-400">yashdafade93@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Target Role</div>
                <div className="text-blue-400 font-semibold text-base">Backend Developer</div>
                <div className="text-xs text-gray-400 mt-0.5">Microservices • Cloud Native • AI</div>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  Available for Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        <Settings size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
      </div>
    </div>
  );
}
