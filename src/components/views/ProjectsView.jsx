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
        <p className="text-xs text-gray-500 mt-1">Production systems & experimental prototypes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">

          <ProjectCard
            title="Schoolix ERP"
            status="Production"
            statusColor="green"
            gradient="from-blue-500 to-cyan-400"
            description="Comprehensive school management platform serving 500+ students. Handles student records, automated fee billing, attendance tracking, transport management, and role-based dashboards for Admin, Teacher, and Parent users."
            stack="MERN Stack, Docker, Caddy, GitHub Actions"
            metrics={["500+ Active Students", "50% Admin Efficiency Boost", "99.5% Uptime"]}
            delay={0}
          />

          <ProjectCard
            title="AI Face Attendance"
            status="Microservice"
            statusColor="blue"
            gradient="from-purple-500 to-pink-400"
            description="High-performance Python microservice using InsightFace for contactless biometric attendance. Generates 512-dimensional ArcFace embeddings and matches against an enrolled student database via cosine similarity. Plugs into Schoolix via REST API bridge."
            stack="Python, FastAPI, InsightFace, OpenCV"
            metrics={["96% Recognition Accuracy", "Sub-second Inference", "ArcFace Embeddings"]}
            delay={80}
          />

          <ProjectCard
            title="Intelligent Chatbot"
            status="AI Integration"
            statusColor="yellow"
            gradient="from-yellow-500 to-orange-400"
            description="Natural language query assistant that translates plain English into SQL queries. Handles student data, fee records, transport schedules, and attendance lookups. Features context-aware multi-turn conversations with safety guards on generated SQL."
            stack="Node.js, OpenAI API, MySQL, Express"
            metrics={["80% Query Automation", "Multi-turn Context", "SQL Safety Guards"]}
            delay={160}
          />

          <ProjectCard
            title="MediBill"
            status="Production"
            statusColor="green"
            gradient="from-green-500 to-teal-400"
            description="Full-featured clinic billing and patient management system for medical practitioners. Includes rich-text clinical notes via TipTap editor, invoice generation, payment ledger tracking, and automated email notifications to doctors."
            stack="React, Supabase (PostgreSQL), TipTap, Vercel"
            metrics={["Patient Records + Clinical Notes", "Invoice & Payment Ledger", "Email Notifications"]}
            delay={240}
          />

        </div>
      </div>
    </div>
  );
}
