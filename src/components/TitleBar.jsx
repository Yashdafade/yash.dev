import React from 'react';
import { Menu, Search, Minimize2, Maximize2, X } from 'lucide-react';

export default function TitleBar({ isSidebarOpen, setSidebarOpen }) {
  return (
    <div className="h-10 md:h-8 bg-[#1e1e1e] flex items-center justify-between px-2 select-none border-b border-[#2d2d2d] shrink-0 z-50">
      <div className="flex items-center space-x-2 ml-1 md:ml-2">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-1 hover:bg-gray-700 rounded text-gray-400 transition-colors"
        >
          <Menu size={18} />
        </button>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
          className="w-4 h-4"
          alt="VS Code"
        />
        <span className="text-xs text-gray-400 font-medium hidden sm:inline">Yash Dafade — Portfolio</span>
      </div>

      {/* Fake Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:flex items-center justify-center">
        <div className="bg-[#2d2d2d] rounded text-gray-400 text-xs py-1 px-20 border border-[#3e3e42] flex items-center">
          <Search size={10} className="mr-2" />
          yash-portfolio
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <div className="p-1 hover:bg-gray-700 rounded hidden md:block cursor-pointer transition-colors"><Minimize2 size={12} className="text-gray-400" /></div>
        <div className="p-1 hover:bg-gray-700 rounded hidden md:block cursor-pointer transition-colors"><Maximize2 size={12} className="text-gray-400" /></div>
        <div className="p-1 hover:bg-red-600 rounded group cursor-pointer transition-colors"><X size={12} className="text-gray-400 group-hover:text-white" /></div>
      </div>
    </div>
  );
}
