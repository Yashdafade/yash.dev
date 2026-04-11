import React from 'react';

const renderInline = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="text-green-400 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={idx}>{part}</span>;
  });
};

export default function MarkdownPreview({ content }) {
  const lines = content.split('\n');
  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto font-sans text-gray-300 pb-20 content-enter">
      {lines.map((line, i) => {
        if (line.startsWith('# '))
          return <h1 key={i} className="text-2xl md:text-3xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## '))
          return <h2 key={i} className="text-xl md:text-2xl font-bold text-blue-400 mt-6 mb-3">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### '))
          return <h3 key={i} className="text-lg md:text-xl font-bold text-white mt-5 mb-2">{line.replace('### ', '')}</h3>;
        if (line.startsWith('> '))
          return (
            <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4 bg-gray-800/30 p-3 rounded-r text-sm md:text-base">
              {line.replace('> ', '')}
            </blockquote>
          );
        if (line.startsWith('- ')) {
          const text = line.replace('- ', '');
          return (
            <li key={i} className="ml-4 my-1.5 text-sm md:text-base list-disc text-gray-300 leading-relaxed">
              {renderInline(text)}
            </li>
          );
        }
        return <p key={i} className="min-h-[1.5em] text-sm md:text-base leading-relaxed">{renderInline(line)}</p>;
      })}
    </div>
  );
}
