import React from 'react';
import { X } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export default function EditorTabs({ openFiles, activeFile, onFileClick, onCloseFile }) {
  return (
    <div className="flex bg-[#252526] h-9 overflow-x-auto shrink-0">
      {openFiles.map((file, index) => (
        <div
          key={file}
          onClick={() => onFileClick(file)}
          className={`tab-enter group flex items-center px-3 cursor-pointer text-[13px] border-r border-[#1e1e1e] min-w-[120px] max-w-[200px] justify-between transition-colors ${activeFile === file ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]'}`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center truncate">
            <span className="mr-2 opacity-80">{RESUME_DATA[file]?.icon}</span>
            <span className="truncate">{file}</span>
          </div>
          <X
            size={14}
            className={`ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-[1px] transition-opacity ${activeFile === file ? 'opacity-100' : ''}`}
            onClick={(e) => { e.stopPropagation(); onCloseFile(file); }}
          />
        </div>
      ))}
    </div>
  );
}
