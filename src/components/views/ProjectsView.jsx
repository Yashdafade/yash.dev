import React from 'react';
import { Briefcase, Layers, Zap, Github, ExternalLink, Cpu, MessageSquare } from 'lucide-react';
import AnimatedCard from '../AnimatedCard';

const ProjectCard = ({ title, status, statusColor, gradient, description, stack, metrics, github, live, delay = 0 }) => {
  const statusStyles = {
    green: 'bg-green-900/50 text-green-400 border-green-700/50',
    blue: 'bg-blue-900/50 text-blue-400 border-blue-700/50',
    yellow: 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50',
    purple: 'bg-purple-900/50 text-purple-400 border-purple-700/50',
    red: 'bg-red-900/50 text-red-400 border-red-700/50',
  };

  return (
    <AnimatedCard delay={delay}>
      <div className="card-hover bg-[#1f2428] rounded-lg border border-gray-700/60 overflow-hidden h-full flex flex-col">
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`}></div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-base md:text-lg font-bold text-white">{title}</h3>
            <span className={`px-2 py-0.5 text-[10px] md:text-xs rounded border font-medium shrink-0 ml-2 ${statusStyles[statusColor]}`}>{status}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center text-xs text-gray-500">
              <Layers size={12} className="mr-2 shrink-0" />
              <span className="truncate">{stack}</span>
            </div>
            {metrics.map((m, i) => (
              <div key={i} className="flex items-center text-xs text-gray-500">
                <Zap size={12} className="mr-2 shrink-0 text-yellow-500/70" />
                <span>{m}</span>
              </div>
            ))}
          </div>
          {(github || live) && (
            <div className="flex gap-2 pt-3 border-t border-gray-700/40">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700/50">
                  <Github size={12} /> Code
                </a>
              )}
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700/50">
                  <ExternalLink size={12} /> Live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

const SubModuleCard = ({ title, description, stack, icon: Icon, color }) => (
  <div className="bg-[#1a1e22] rounded-lg border border-gray-700/40 p-4 flex flex-col">
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${color === 'pink' ? 'bg-pink-500/10' : 'bg-yellow-500/10'}`}>
        <Icon size={14} className={color === 'pink' ? 'text-pink-400' : 'text-yellow-400'} />
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
    </div>
    <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{description}</p>
    <div className="flex flex-wrap gap-1 mt-auto">
      {stack.map((s, i) => (
        <span key={i} className="px-1.5 py-0.5 bg-gray-700/30 text-gray-500 rounded text-[10px]">{s}</span>
      ))}
    </div>
  </div>
);

export default function ProjectsView() {
  return (
    <div className="flex flex-col h-full font-sans text-gray-300">
      <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-yellow-400" /> Featured Projects
        </h1>
        <p className="text-xs text-gray-500 mt-1">Backend systems, AI services & open-source tooling</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">

          {/* School Management Platform — full width with nested sub-modules */}
          <div className="lg:col-span-2">
            <AnimatedCard delay={0}>
              <div className="bg-[#1f2428] rounded-lg border border-gray-700/60 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base md:text-lg font-bold text-white">School Management Platform</h3>
                    <span className="px-2 py-0.5 text-[10px] md:text-xs rounded border font-medium shrink-0 ml-2 bg-green-900/50 text-green-400 border-green-700/50">Team Project</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 mb-4 leading-relaxed">
                    3-person team; built core modules — enrollment, attendance, inventory, billing, library — with role-based access for ~5 admin/clerical roles, replacing manual processes with daily-use digital workflows.
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Layers size={12} className="mr-2 shrink-0" />
                    <span>Node.js, Express.js, React.js, PostgreSQL, MongoDB, Python (FastAPI), JWT, LLM APIs, Docker</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {[
                      "Core modules: enrollment, attendance, inventory, billing, library with JWT auth + RBAC for ~5 admin/clerical roles",
                      "Docker + CI/CD pipeline; PostgreSQL schema design with role-scoped queries",
                      "Backend APIs for billing, invoicing, library, inventory modules; contributed to React migration"
                    ].map((m, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-500">
                        <Zap size={12} className="mr-2 shrink-0 text-yellow-500/70" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sub-modules grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <SubModuleCard
                      title="AI Attendance System"
                      description="Built AI-powered biometric attendance using face embeddings (~96% accuracy, sub-second latency). Later redesigned to RFID-based tracking for production reliability."
                      stack={["Python", "FastAPI", "OpenCV"]}
                      icon={Cpu}
                      color="pink"
                    />
                    <SubModuleCard
                      title="NL2SQL Chatbot"
                      description="Natural-language query engine over the school database. Upgraded from keyword-based intent routing to Gemini embedding + cosine similarity — a RAG-adjacent retrieval pipeline with role-aware SQL scoping."
                      stack={["Node.js", "Gemini API", "PostgreSQL", "Embeddings"]}
                      icon={MessageSquare}
                      color="yellow"
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          <ProjectCard
            title="MediBill"
            status="Personal Project"
            statusColor="blue"
            gradient="from-green-500 to-teal-400"
            description="Clinic billing system with PostgreSQL RLS, AES-256-GCM field-level encryption, and Supabase Edge Functions as the API layer."
            stack="React, TypeScript, Vite, Supabase (PostgreSQL), Edge Functions (Deno/TypeScript)"
            metrics={[
              "PostgreSQL schema with row-level security (RLS) for multi-tenant isolation",
              "AES-256-GCM field-level encryption with per-owner AAD binding and key versioning",
              "Supabase Edge Functions replaced traditional Node.js/Express backend"
            ]}
            delay={80}
          />

          <ProjectCard
            title="TelcoBot-QLoRA"
            status="AI Hackathon"
            statusColor="purple"
            gradient="from-purple-500 to-indigo-400"
            description="Fine-tuned Qwen2.5-1.5B-Instruct via QLoRA on 20k telecom conversations during the TCS × AMD AI Hackathon 2026."
            stack="QLoRA, Qwen2.5-1.5B-Instruct, PyTorch, AMD MI300X (ROCm)"
            metrics={[
              "Trained on AMD MI300X in 1h41m (final loss 0.46)",
              "Resolved ROCm issues: bitsandbytes, collator, stop-string handling, bf16 inference",
              "ROUGE-1 +41%, ROUGE-2 +146% over base model"
            ]}
            github="https://github.com/Yashdafade/TelcoBot-QLoRA"
            delay={160}
          />

        </div>

        {/* Open Source Section */}
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Github size={18} className="text-gray-400" /> Open Source
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">

          <ProjectCard
            title="supabase-github-backup"
            status="Open Source"
            statusColor="yellow"
            gradient="from-yellow-500 to-orange-400"
            description="Automated Supabase backup via GitHub Actions, exporting Auth/GoTrue schema alongside table data."
            stack="GitHub Actions, Supabase, PostgreSQL, Shell"
            metrics={[
              "Exports Auth/GoTrue schema often missed by standard backup tooling",
              "Restore script remaps UUIDs to preserve foreign key integrity"
            ]}
            github="https://github.com/Yashdafade/supabase-github-backup"
            delay={240}
          />

          <ProjectCard
            title="delegate-task-mcp"
            status="Open Source"
            statusColor="yellow"
            gradient="from-red-500 to-pink-400"
            description="MCP server that lets primary coding agents delegate heavy tasks to other CLI agents based on complexity and quota."
            stack="TypeScript, MCP Protocol, Claude Code, Gemini, opencode"
            metrics={[
              "Cuts primary-agent token usage by offloading repo-wide analysis and bulk refactors",
              "Routes tasks to Codex, Gemini, or opencode based on task complexity and context window"
            ]}
            github="https://github.com/Yashdafade/delegate-task"
            delay={320}
          />

        </div>
      </div>
    </div>
  );
}
