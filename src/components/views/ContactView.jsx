import React from 'react';
import { Send, Mail, Github, Linkedin, ExternalLink, MapPin, Server, Brain, Database, GitBranch, Container } from 'lucide-react';
import AnimatedCard from '../AnimatedCard';

const ContactLink = ({ href, icon: Icon, label, sublabel, color, delay = 0 }) => {
  const colorMap = {
    blue: 'hover:border-blue-500/50 hover:bg-blue-500/5',
    green: 'hover:border-green-500/50 hover:bg-green-500/5',
    purple: 'hover:border-purple-500/50 hover:bg-purple-500/5',
    cyan: 'hover:border-cyan-500/50 hover:bg-cyan-500/5',
  };
  return (
    <AnimatedCard delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`card-hover flex items-center gap-4 bg-[#1f2428] border border-gray-700/60 rounded-lg p-4 transition-all ${colorMap[color]} group`}
      >
        <div className="w-10 h-10 rounded-lg bg-gray-700/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">{label}</div>
          <div className="text-xs text-gray-500 truncate">{sublabel}</div>
        </div>
        <ExternalLink size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0" />
      </a>
    </AnimatedCard>
  );
};

export default function ContactView() {
  return (
    <div className="flex flex-col h-full font-sans text-gray-300">
      <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Send className="text-green-400" /> Get In Touch
        </h1>
        <p className="text-xs text-gray-500 mt-1">Open to Data Engineering, DBA & Backend roles</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6 pb-10">

          {/* Status Beacon */}
          <AnimatedCard delay={0}>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-40"></div>
              </div>
              <div>
                <p className="text-green-400 font-semibold text-sm">Actively Interviewing</p>
                <p className="text-xs text-gray-400 mt-0.5">Data Engineer • DBA • Backend Developer</p>
              </div>
            </div>
          </AnimatedCard>

          {/* Location */}
          <AnimatedCard delay={80}>
            <div className="flex items-center gap-2 text-sm text-gray-400 px-1">
              <MapPin size={14} className="text-gray-500" />
              <span>Pune, India · Open to Remote / Hybrid / Relocation</span>
            </div>
          </AnimatedCard>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ContactLink
              href="mailto:yashdafade93@gmail.com"
              icon={Mail}
              label="Email"
              sublabel="yashdafade93@gmail.com"
              color="blue"
              delay={160}
            />
            <ContactLink
              href="https://github.com/Yashdafade"
              icon={Github}
              label="GitHub"
              sublabel="github.com/Yashdafade"
              color="green"
              delay={240}
            />
            <ContactLink
              href="https://www.linkedin.com/in/yash-dafade-992ab2209/"
              icon={Linkedin}
              label="LinkedIn"
              sublabel="linkedin.com/in/yash-dafade-992ab2209"
              color="purple"
              delay={320}
            />
          </div>

          {/* Interests */}
          <AnimatedCard delay={400}>
            <div className="bg-[#1f2428] border border-gray-700/60 rounded-lg overflow-hidden">
              <div className="px-5 pt-4 pb-3 border-b border-gray-700/40">
                <h3 className="text-sm font-bold text-white">Areas of Interest</h3>
              </div>
              <div className="p-4">
                {[
                  { label: "Database Administration (Oracle, MS SQL Server)", icon: Database, desc: "Backup & recovery, performance tuning, query optimization" },
                  { label: "Data Engineering & ETL Pipelines", icon: GitBranch, desc: "Data modeling, SQL scripting, reporting automation" },
                  { label: "Backend API Development & Microservices", icon: Server, desc: "REST APIs, Node.js, FastAPI, system design" },
                  { label: "AI Integration & LLMs", icon: Brain, desc: "RAG, embeddings, prompt engineering" },
                  { label: "Containerized Deployments & DevOps", icon: Container, desc: "Docker, CI/CD, Linux, cloud infra" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-700/20 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-700/30 flex items-center justify-center shrink-0">
                      <item.icon size={15} className="text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-300">{item.label}</div>
                      <div className="text-[11px] text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </div>
  );
}
