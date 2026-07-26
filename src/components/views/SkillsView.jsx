import React from 'react';
import { Braces, Server, Monitor, Brain, Database, Cloud, Shield, Code, BookOpen } from 'lucide-react';
import AnimatedCard from '../AnimatedCard';

const SkillTag = ({ children, color = 'gray' }) => {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    green: 'bg-green-500/10 text-green-300 border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    pink: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    red: 'bg-red-500/10 text-red-300 border-red-500/20',
    gray: 'bg-gray-700/50 text-gray-300 border-gray-600/30',
  };
  return (
    <span className={`skill-tag inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${colorMap[color]}`}>
      {children}
    </span>
  );
};

export default function SkillsView() {
  return (
    <div className="flex flex-col h-full font-sans text-gray-300">
      <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Braces className="text-yellow-400" /> Technical Capabilities
        </h1>
        <p className="text-xs text-gray-500 mt-1">Hover over tags to interact</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">

          <AnimatedCard delay={0}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-blue-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Server size={20} className="text-blue-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Backend</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="blue">Node.js</SkillTag>
                  <SkillTag color="blue">Express.js</SkillTag>
                  <SkillTag color="yellow">Python (FastAPI)</SkillTag>
                  <SkillTag color="blue">REST APIs</SkillTag>
                  <SkillTag color="gray">Microservices</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={80}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-purple-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Brain size={20} className="text-purple-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">AI / LLM</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="purple">LLM API Integration</SkillTag>
                  <SkillTag color="green">RAG Pipelines</SkillTag>
                  <SkillTag color="blue">Embedding-Based Retrieval</SkillTag>
                  <SkillTag color="yellow">Prompt Engineering</SkillTag>
                  <SkillTag color="orange">QLoRA Fine-Tuning</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={160}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-green-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Database size={20} className="text-green-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Databases</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="green">PostgreSQL</SkillTag>
                  <SkillTag color="green">MongoDB</SkillTag>
                  <SkillTag color="blue">MySQL</SkillTag>
                  <SkillTag color="red">MS SQL Server</SkillTag>
                  <SkillTag color="red">Oracle</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={240}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-red-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Shield size={20} className="text-red-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Auth & Security</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="red">JWT</SkillTag>
                  <SkillTag color="red">RBAC</SkillTag>
                  <SkillTag color="yellow">Input Validation</SkillTag>
                  <SkillTag color="red">AES-256-GCM Encryption</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={320}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-orange-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Cloud size={20} className="text-orange-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Cloud & DevOps</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="blue">Docker</SkillTag>
                  <SkillTag color="gray">GitHub Actions (CI/CD)</SkillTag>
                  <SkillTag color="green">Linux</SkillTag>
                  <SkillTag color="green">Nginx</SkillTag>
                  <SkillTag color="orange">Hostinger VPS</SkillTag>
                  <SkillTag color="blue">Render</SkillTag>
                  <SkillTag color="orange">AWS Fundamentals</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-yellow-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Code size={20} className="text-yellow-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Languages</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="yellow">JavaScript (ES6+)</SkillTag>
                  <SkillTag color="blue">TypeScript</SkillTag>
                  <SkillTag color="yellow">Python</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={480}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-cyan-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Monitor size={20} className="text-cyan-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Frontend</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="cyan">React.js</SkillTag>
                  <SkillTag color="blue">Tailwind CSS</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={560}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-pink-500/50 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <BookOpen size={20} className="text-pink-400" />
                  </div>
                  <h2 className="text-base font-bold text-white">Practices</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillTag color="pink">System Design</SkillTag>
                  <SkillTag color="pink">SOLID Principles</SkillTag>
                  <SkillTag color="pink">Clean Code</SkillTag>
                  <SkillTag color="orange">Git</SkillTag>
                  <SkillTag color="blue">Agile</SkillTag>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </div>
  );
}
