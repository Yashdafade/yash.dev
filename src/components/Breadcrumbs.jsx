import React from 'react';
import { ChevronRight, Code2, Columns } from 'lucide-react';

export default function Breadcrumbs({ activeFile, isPreviewMode, onToggleMode }) {
  return (
    <div className="h-8 bg-[#1e1e1e] flex items-center px-4 text-xs text-gray-500 border-b border-[#2d2d2d] justify-between shrink-0">
      <div className="flex items-center">
        <span>src</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-300 truncate max-w-[150px]">{activeFile || 'Welcome'}</span>
      </div>

      {activeFile && (
        <div className="flex gap-1">
          <button
            onClick={onToggleMode}
            className={`p-1 rounded hover:bg-gray-700 transition-colors ${isPreviewMode ? 'text-white' : 'text-gray-500'}`}
            title={isPreviewMode ? "Show Code" : "Show Preview"}
          >
            {isPreviewMode ? <Code2 size={14} /> : <Columns size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
