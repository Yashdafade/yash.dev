import React from 'react';

export default function SyntaxHighlighter({ content }) {
  const highlight = (text) => {
    if (!text) return "";
    const placeholders = [];

    let result = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1. Extract triple-quoted docstrings first
    result = result.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (match) => {
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#6a9955;font-style:italic">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 2. Extract comments
    result = result.replace(/(\/\/.*$|#(?!.*=).*$)/gm, (match) => {
      if (match.startsWith('__PH')) return match;
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#6a9955">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 3. Extract strings
    result = result.replace(/(".*?"|'.*?'|`.*?`)/g, (match) => {
      if (match.startsWith('__PH')) return match;
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#ce9178">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 4. Keywords
    result = result.replace(
      /\b(const|let|var|function|return|import|export|default|class|if|else|for|while|await|async|def|from|self|None|True|False|true|false|null|undefined|interface|type|string|number|boolean|void|extends|implements|new|this|super|yield|try|catch|finally|throw|of|in|as|is|with)\b/g,
      '<span style="color:#569cd6">$1</span>'
    );

    // 5. Types / Decorators
    result = result.replace(
      /\b(React|FC|Array|Promise|Map|Set|Date|RegExp|Error|Object|String|Number|Boolean|console|window|document|Math|JSON)\b/g,
      '<span style="color:#4ec9b0">$1</span>'
    );

    // 6. Function calls
    result = result.replace(
      /\b([a-zA-Z_]\w*)\s*\(/g,
      '<span style="color:#dcdcaa">$1</span>('
    );

    // 7. Numbers
    result = result.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span style="color:#b5cea8">$1</span>'
    );

    // 8. Brackets
    result = result.replace(
      /([{}[\]])/g,
      '<span style="color:#ffd700">$1</span>'
    );

    // 9. Re-insert placeholders
    placeholders.forEach((ph, idx) => {
      result = result.replace(`__PH${idx}__`, ph);
    });

    return result;
  };

  const lines = content.split('\n');

  return (
    <pre className="font-mono text-xs md:text-sm leading-6 overflow-auto h-full pb-20 content-enter">
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/[0.03] transition-colors">
            <span className="inline-block w-12 text-right pr-4 text-gray-600 select-none shrink-0 text-xs leading-6">
              {i + 1}
            </span>
            <span dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }} />
          </div>
        ))}
      </code>
    </pre>
  );
}
