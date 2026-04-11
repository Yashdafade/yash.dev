import React from 'react';
import { Braces, Server, Monitor, Brain, Database, Cloud, Wrench } from 'lucide-react';
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

const SkillCategory = ({ label }) => (
  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{label}</span>
);

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

          {/* Backend */}
          <AnimatedCard delay={0}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-blue-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Server size={20} className="text-blue-400" />
                </div>
                <h2 className="text-base font-bold text-white">Backend Engineering</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Core" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="blue">Node.js</SkillTag>
                    <SkillTag color="blue">Express.js</SkillTag>
                    <SkillTag color="yellow">Python</SkillTag>
                    <SkillTag color="green">FastAPI</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Architecture" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="gray">Microservices</SkillTag>
                    <SkillTag color="gray">REST APIs</SkillTag>
                    <SkillTag color="gray">Event-Driven</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Auth" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="cyan">JWT</SkillTag>
                    <SkillTag color="cyan">RBAC</SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Frontend */}
          <AnimatedCard delay={80}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-cyan-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Monitor size={20} className="text-cyan-400" />
                </div>
                <h2 className="text-base font-bold text-white">Frontend Development</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Frameworks" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="cyan">React</SkillTag>
                    <SkillTag color="cyan">Next.js</SkillTag>
                    <SkillTag color="purple">Vite</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Styling" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="blue">Tailwind CSS</SkillTag>
                    <SkillTag color="gray">Vanilla CSS</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Libraries" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="green">Three.js</SkillTag>
                    <SkillTag color="orange">TipTap Editor</SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* AI/ML */}
          <AnimatedCard delay={160}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-purple-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Brain size={20} className="text-purple-400" />
                </div>
                <h2 className="text-base font-bold text-white">AI & Machine Learning</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Computer Vision" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="purple">InsightFace</SkillTag>
                    <SkillTag color="blue">OpenCV</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="LLM Integration" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="green">OpenAI APIs</SkillTag>
                    <SkillTag color="orange">LangChain</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Voice AI" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="cyan">Deepgram</SkillTag>
                    <SkillTag color="pink">LiveKit</SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Database */}
          <AnimatedCard delay={240}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-green-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Database size={20} className="text-green-400" />
                </div>
                <h2 className="text-base font-bold text-white">Database & Storage</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Relational" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="blue">MySQL</SkillTag>
                    <SkillTag color="green">PostgreSQL</SkillTag>
                    <SkillTag color="green">Supabase</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="NoSQL" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="green">MongoDB</SkillTag>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Query optimization, indexing, aggregation pipelines
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* DevOps */}
          <AnimatedCard delay={320}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-orange-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Cloud size={20} className="text-orange-400" />
                </div>
                <h2 className="text-base font-bold text-white">DevOps & Cloud</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Containers" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="blue">Docker</SkillTag>
                    <SkillTag color="blue">Docker Compose</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="CI/CD & Cloud" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="gray">GitHub Actions</SkillTag>
                    <SkillTag color="orange">AWS</SkillTag>
                    <SkillTag color="gray">Vercel</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Servers" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="green">Nginx</SkillTag>
                    <SkillTag color="green">Caddy</SkillTag>
                    <SkillTag color="gray">Ubuntu</SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Tools */}
          <AnimatedCard delay={400}>
            <div className="card-hover bg-[#1f2428] border border-gray-700/60 rounded-lg p-5 hover:border-pink-500/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Wrench size={20} className="text-pink-400" />
                </div>
                <h2 className="text-base font-bold text-white">Tools & Workflow</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <SkillCategory label="Development" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="orange">Git</SkillTag>
                    <SkillTag color="blue">VS Code</SkillTag>
                    <SkillTag color="orange">Postman</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="Automation" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="blue">Power Automate</SkillTag>
                    <SkillTag color="yellow">Python Scripting</SkillTag>
                    <SkillTag color="green">VBA Macros</SkillTag>
                  </div>
                </div>
                <div>
                  <SkillCategory label="OS" />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <SkillTag color="gray">Linux (Ubuntu)</SkillTag>
                    <SkillTag color="gray">Windows</SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </div>
  );
}
