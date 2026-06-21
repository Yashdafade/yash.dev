import React from 'react';
import { Briefcase, Layers, Zap, Github, ExternalLink } from 'lucide-react';
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

export default function ProjectsView() {
  return (
    <div className="flex flex-col h-full font-sans text-gray-300">
      <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-yellow-400" /> Featured Projects
        </h1>
        <p className="text-xs text-gray-500 mt-1">Personal builds & AI integration systems</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">

          <ProjectCard
            title="TelcoBot-QLoRA"
            status="Fine-Tuned LLM"
            statusColor="purple"
            gradient="from-purple-500 to-indigo-400"
            description="Fine-tuned Qwen2.5-1.5B-Instruct with QLoRA on a 20k telecom support dataset during the TCS x AMD AI Hackathon 2026."
            stack="Python, Qwen2.5-1.5B, QLoRA, Hugging Face, AMD MI300X (ROCm)"
            metrics={[
              "Fine-tuned Qwen2.5-1.5B-Instruct with QLoRA (4-bit NF4, LoRA r=16)",
              "Trained on AMD MI300X in under two hours during Hackathon",
              "TRL/ROCm compatibility resolved; bfloat16 stable inference"
            ]}
            github="https://github.com/Yashdafade/TelcoBot-QLoRA"
            delay={0}
          />

          <ProjectCard
            title="Face-Recognition-Microservice"
            status="Microservice"
            statusColor="blue"
            gradient="from-pink-500 to-rose-400"
            description="Standalone microservice that generates 512-dimensional ArcFace embeddings on enrollment and cosine-matches at scan time for biometric attendance."
            stack="Python, FastAPI, InsightFace, OpenCV"
            metrics={[
              "~96% match accuracy on 200-face test set",
              "Sub-second scan time latency",
              "Fully decoupled and pluggable REST service"
            ]}
            github="https://github.com/Yashdafade/Face-Recognition-Microservice"
            delay={80}
          />

          <ProjectCard
            title="Schoolix"
            status="Full-Stack ERP"
            statusColor="green"
            gradient="from-blue-500 to-cyan-400"
            description="Full-stack school management platform designed end-to-end to learn production backend architecture, security, and DevOps."
            stack="Node.js, Express, React, PostgreSQL, Docker, GitHub Actions, Caddy"
            metrics={[
              "Modules: enrollment, billing, library, inventory, certificates, reporting",
              "JWT authentication with role-based access control (admin, teacher, staff)",
              "Docker + Caddy deployments with CI/CD via GitHub Actions on a Linux VPS"
            ]}
            github=""
            delay={160}
          />

          <ProjectCard
            title="NL2SQL Chatbot"
            status="AI Integration"
            statusColor="yellow"
            gradient="from-yellow-500 to-orange-400"
            description="Natural-language interface over the Schoolix database that translates plain English queries into SQL without using embeddings."
            stack="Node.js, Gemini API, PostgreSQL"
            metrics={[
              "Schema-aware prompts with explicit table lineage rules",
              "Keyword-based intent routing before LLM call to reduce hallucination",
              "Role-aware generated SQL scoped to authenticated user access level"
            ]}
            github=""
            delay={240}
          />

          <ProjectCard
            title="MediBill"
            status="Learning Project"
            statusColor="green"
            gradient="from-green-500 to-teal-400"
            description="Clinic billing and patient management application built to learn TypeScript, Supabase, and Postgres row-level security."
            stack="React, TypeScript, Vite, Supabase"
            metrics={[
              "Custom charge line items and installment payment tracking",
              "TipTap rich-text patient notes editor",
              "Row-level security isolating each user's records at database layer"
            ]}
            github=""
            delay={320}
          />

        </div>
      </div>
    </div>
  );
}
