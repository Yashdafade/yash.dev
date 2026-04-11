import React from 'react';

export default function TerminalPanel({ terminalLogs, isMobile }) {
  return (
    <div className={`bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col shrink-0 ${isMobile ? 'h-28' : 'h-36'}`}>
      <div className="flex items-center px-4 h-8 gap-6 text-[10px] md:text-[11px] text-gray-400 border-b border-[#252526] uppercase font-bold tracking-wide overflow-x-auto">
        <span className="text-white border-b border-white py-1 whitespace-nowrap">Terminal</span>
        <span className="whitespace-nowrap">Output</span>
        <span className="whitespace-nowrap hidden md:inline">Debug Console</span>
      </div>
      <div className="p-2 font-mono text-sm text-gray-300 overflow-y-auto flex-1">
        {terminalLogs.map((log, i) => (
          <div key={i} className={`whitespace-nowrap text-[10px] md:text-xs leading-4 md:leading-5 ${log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
            {log.type === 'success' && <span className="mr-2">➜</span>}
            {log.text}
          </div>
        ))}
        <span className="terminal-cursor ml-1 mt-1"></span>
      </div>
    </div>
  );
}
