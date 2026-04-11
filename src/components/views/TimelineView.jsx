import React from 'react';
import { Briefcase, ChevronRight, MapPin } from 'lucide-react';
import AnimatedCard from '../AnimatedCard';

const TimelineEntry = ({ period, title, role, location, highlights, technologies, color, delay = 0 }) => {
  const colorStyles = {
    blue: { dot: 'bg-blue-500 ring-blue-500/20', border: 'hover:border-blue-500/50', label: 'text-blue-400' },
    green: { dot: 'bg-green-500 ring-green-500/20', border: 'hover:border-green-500/50', label: 'text-green-400' },
    yellow: { dot: 'bg-yellow-500 ring-yellow-500/20', border: 'hover:border-yellow-500/50', label: 'text-yellow-400' },
  };
  const s = colorStyles[color];

  return (
    <AnimatedCard delay={delay} className="relative pl-8 group">
      <div className={`timeline-dot absolute -left-[9px] top-0 w-4 h-4 rounded-full ${s.dot} ring-4 group-hover:ring-8 transition-all`}></div>
      <div className={`card-hover bg-[#1f2428] p-5 rounded-lg border border-gray-700/60 ${s.border} transition-all shadow-lg`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs font-mono ${s.label} font-medium`}>{period}</span>
          {location && (
            <span className="flex items-center text-[10px] text-gray-500">
              <MapPin size={10} className="mr-0.5" /> {location}
            </span>
          )}
        </div>
        <h3 className="text-base md:text-lg font-bold text-white mt-1">{title}</h3>
        <p className="text-xs md:text-sm text-gray-400 mb-3">{role}</p>
        {highlights.length > 0 && (
          <ul className="text-xs md:text-sm space-y-1.5 text-gray-300 mb-3">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start">
                <ChevronRight size={14} className={`mt-0.5 mr-1.5 ${s.label} shrink-0`} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        {technologies && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-700/40">
            {technologies.map((t, i) => (
              <span key={i} className="skill-tag px-2 py-0.5 bg-gray-700/40 text-gray-400 rounded text-[10px] font-medium">{t}</span>
            ))}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default function TimelineView() {
  return (
    <div className="flex flex-col h-full font-sans text-gray-300">
      <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-cyan-400" /> Career Timeline
        </h1>
        <p className="text-xs text-gray-500 mt-1">Professional experience & education</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative border-l-2 border-blue-500/20 ml-3 space-y-10 pb-10">

          <TimelineEntry
            period="Jan 2025 — Present"
            title="Tata Consultancy Services (TCS)"
            role="Assistant System Engineer"
            location="Pune, India"
            color="blue"
            delay={0}
            highlights={[
              "Managing ServiceNow incident workflows & ensuring SLA compliance across enterprise clients",
              "Built Power Automate flows that automated ticket routing, reducing manual triage by 40%",
              "Developed Python & VBA automation scripts for Excel reporting, cutting manual effort by 60%",
              "Cross-team coordination for enterprise service delivery and escalation management"
            ]}
            technologies={["ServiceNow", "Power Automate", "Python", "Excel VBA", "ITIL"]}
          />

          <TimelineEntry
            period="2024"
            title="Independent Engineering"
            role="Full Stack Developer & AI Engineer"
            location="Remote"
            color="green"
            delay={100}
            highlights={[
              "Built & deployed Schoolix ERP from scratch for a real school client — now serving 500+ students",
              "Engineered face recognition microservice with InsightFace achieving 96% accuracy in production",
              "Integrated LLM-powered chatbot that automated 80% of admin queries with natural language to SQL",
              "Designed & shipped MediBill clinic management platform with Supabase backend"
            ]}
            technologies={["Node.js", "React", "Python", "FastAPI", "Docker", "MongoDB", "OpenAI", "Supabase"]}
          />

          <TimelineEntry
            period="2020 — 2024"
            title="Government College of Engineering, Chandrapur"
            role="B.Tech Instrumentation Engineering"
            location="Maharashtra, India"
            color="yellow"
            delay={200}
            highlights={[
              "CGPA: 8.13 / 10.0",
              "Self-taught full-stack web development alongside core engineering curriculum",
              "Built multiple production-grade projects during final year, gaining real-world deployment experience"
            ]}
          />

        </div>
      </div>
    </div>
  );
}
