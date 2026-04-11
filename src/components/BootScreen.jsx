import React from 'react';

export default function BootScreen() {
  return (
    <div className="h-screen w-full bg-[#1e1e1e] flex flex-col items-center justify-center text-gray-400 font-sans">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <div className="font-mono text-sm mb-2">Initializing Development Environment...</div>
      <div className="text-xs text-gray-600">Loading: Skills, Projects, Timeline, Contact...</div>
      <div className="mt-8 flex gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500/60"
            style={{ animation: `fadeIn 0.5s ease ${i * 0.15}s both` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
