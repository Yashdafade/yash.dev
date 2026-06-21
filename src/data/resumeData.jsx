import React from 'react';
import { Info, Braces, FileCode, FileText, Terminal } from 'lucide-react';

// Split out connect.sh content to handle the bash ${} syntax
// which conflicts with JS template literal interpolation
const CONNECT_SH_CONTENT = [
  '#!/bin/bash',
  '# ══════════════════════════════════════════════',
  '#  CONNECT WITH YASH DAFADE',
  '#  Backend Developer | AI Integration',
  '# ══════════════════════════════════════════════',
  '',
  '# --- Professional Links ---',
  'GITHUB="https://github.com/Yashdafade"',
  'LINKEDIN="https://www.linkedin.com/in/yash-dafade-992ab2209/"',
  'EMAIL="yashdafade93@gmail.com"',
  '',
  '# --- Quick Connect ---',
  'echo "📧  Email:     $EMAIL"',
  'echo "🐙  GitHub:    $GITHUB"',
  'echo "💼  LinkedIn:  $LINKEDIN"',
  '',
  '# --- Current Status ---',
  'echo ""',
  'echo "═════════════════════════════════════════════════════════════════════"',
  'echo "  ✅ Status: Actively Interviewing — Backend & AI Integration Roles"',
  'echo "  🎯 Target: 6+ LPA, Pune (open to remote)"',
  'echo "═════════════════════════════════════════════════════════════════════"',
  '',
  '# --- Interests ---',
  'INTERESTS=(',
  '    "Backend API Development"',
  '    "Microservice Architecture"',
  '    "AI Integration & LLMs"',
  '    "Database Design & PostgreSQL"',
  '    "Containerized Deployments"',
  ')',
  '',
  'for interest in "${INTERESTS[@]}"; do',
  '    echo "  → $interest"',
  'done',
  '',
  'echo ""',
  'echo "# Let\'s build something."',
].join('\n');

export const RESUME_DATA = {
  "README.md": {
    type: "markdown",
    icon: <Info size={16} className="text-blue-400" />,
    content: `# Yash Dafade — Backend Developer · DevOps · AI/ML Integration

> "I build backend systems and AI-integrated applications — REST APIs, microservices, containerized deployments, and LLM/computer-vision integrations. Most of my work is self-driven: I take an idea to a deployed, production-grade system to deepen my engineering depth across the full stack. Currently focused on backend API development and AI integration."

### 📍 Profile
- **Location:** Pune
- **Role:** Assistant System Engineer @ TCS
- **Email:** yashdafade93@gmail.com
- **GitHub:** github.com/Yashdafade`
  },

  "skills.json": {
    type: "json",
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "backend": {
    "production_used": ["Node.js", "Express.js", "Python"],
    "working_knowledge": ["FastAPI", "Microservices", "REST APIs"]
  },
  "frontend": {
    "production_used": ["React", "Vite", "Tailwind CSS", "TypeScript"],
    "working_knowledge": ["Three.js"]
  },
  "database": {
    "production_used": ["PostgreSQL", "MySQL", "Supabase"],
    "working_knowledge": ["MongoDB"]
  },
  "ai_ml": {
    "production_used": ["Gemini API", "NL2SQL"],
    "working_knowledge": ["QLoRA Fine-Tuning", "InsightFace", "OpenCV", "Hugging Face"]
  },
  "devops": {
    "production_used": ["Docker", "GitHub Actions", "CI/CD", "Caddy", "Nginx"],
    "working_knowledge": ["AWS EC2", "Linux server admin"]
  },
  "tools": {
    "production_used": ["Git", "Postman", "Linux"],
    "working_knowledge": ["n8n"]
  }
}`
  },

  "projects.py": {
    type: "python",
    icon: <FileCode size={16} className="text-blue-500" />,
    content: `from tech_stack import Backend, AI_ML, DevOps, Frontend
from datetime import datetime

class ProjectPortfolio:
    """
    Independent projects designed, built, and deployed to learn technologies.
    Focus on backend development, microservices, and AI integration.
    """

    def build_telcobot_qlora(self):
        """
        TelcoBot-QLoRA — Fine-Tuned Telecom Support LLM
        Fine-tuned Qwen2.5-1.5B-Instruct with QLoRA on a 20k-example telecom support dataset.
        """
        stack = ["Python", "QLoRA", "Hugging Face", "AMD MI300X", "ROCm"]
        highlights = [
            "Fine-tuned Qwen2.5-1.5B-Instruct with QLoRA (4-bit NF4, LoRA r=16) on a 20k-example telecom support dataset",
            "Built during the TCS x AMD AI Hackathon 2026; trained on AMD MI300X in under two hours",
            "Solved TRL/ROCm compatibility issues, switched to bfloat16 for stable inference"
        ]
        repo = "github.com/Yashdafade/TelcoBot-QLoRA"
        return {"status": "Fine-Tuned LLM", "stack": stack, "repo": repo}

    def init_face_recognition(self):
        """
        Face-Recognition-Microservice — Biometric Attendance Service
        Standalone microservice that generates 512-d ArcFace embeddings on enrollment and cosine-matches at scan time.
        """
        stack = ["Python", "FastAPI", "InsightFace", "OpenCV"]
        highlights = [
            "Standalone microservice: generates 512-d ArcFace embeddings on enrollment, cosine-matches at scan time",
            "~96% match accuracy, sub-second latency on a 200-face test set",
            "Fully decoupled REST service, pluggable into any backend"
        ]
        repo = "github.com/Yashdafade/Face-Recognition-Microservice"
        return {"status": "Microservice", "stack": stack, "repo": repo}

    def deploy_schoolix(self):
        """
        Schoolix — Full-Stack School Management Platform
        Full-stack ERP designed end-to-end to learn production backend architecture and DevOps.
        """
        stack = ["Node.js", "Express", "React", "PostgreSQL", "Docker", "GitHub Actions", "Caddy"]
        highlights = [
            "Full-stack ERP designed end-to-end to learn production backend architecture and DevOps",
            "Modules: enrollment, billing, library, inventory, certificates, reporting",
            "JWT auth with role-based access control (admin, teacher, staff)",
            "Containerized with Docker + Caddy, CI/CD via GitHub Actions on a Linux VPS"
        ]
        repo = "Private repo — architecture walkthrough available on request"
        return {"status": "Full-Stack ERP", "stack": stack, "repo": repo}

    def init_nl2sql_chatbot(self):
        """
        NL2SQL Chatbot — Natural Language Query Engine (Schoolix module)
        Natural-language interface over the Schoolix database; explores LLM-to-SQL without embeddings.
        """
        stack = ["Node.js", "Gemini API (gemini-3.1-flash-lite-preview)", "PostgreSQL"]
        highlights = [
            "Natural-language interface over the Schoolix database; explores LLM-to-SQL without embeddings",
            "Schema-aware prompts with explicit table-relationship lineage rules",
            "Keyword-based intent routing before the LLM call to reduce hallucination",
            "Role-aware: generated SQL scoped to the authenticated user's access level"
        ]
        return {"status": "AI Query Engine", "stack": stack}

    def build_medibill(self):
        """
        MediBill — Clinic Billing App
        Built to get hands-on with TypeScript, Supabase, and Postgres row-level security.
        """
        stack = ["React", "TypeScript", "Vite", "Supabase"]
        highlights = [
            "Built to get hands-on with TypeScript, Supabase, and Postgres row-level security",
            "Custom charge line items, TipTap rich-text patient notes, installment payment tracking",
            "Row-level security isolating each user's records at the database layer"
        ]
        repo = "Private repo — TypeScript + Supabase learning project"
        return {"status": "Full-Stack App", "stack": stack, "repo": repo}
`
  },

  "career_timeline.tsx": {
    type: "react",
    icon: <FileText size={16} className="text-cyan-400" />,
    content: `import React from 'react';

interface TimelineEntry {
  period: string;
  company: string;
  role: string;
  location: string;
  type: 'work' | 'project' | 'education';
  highlights: string[];
  technologies?: string[];
}

const CareerTimeline: React.FC = () => {
  const entries: TimelineEntry[] = [
    {
      period: "Jan 2025 — Present",
      company: "Tata Consultancy Services",
      role: "Assistant System Engineer",
      location: "Pune, India",
      type: "work",
      highlights: [
        "Ticket lifecycle management and SLA reporting via Ivanti ISM",
        "Built Chrome DevTools automation scripts to detect new ticket arrivals and trigger priority-based audio alerts",
        "Excel reporting automation using Office Scripts (TypeScript) for pivot-based SLA dashboards"
      ]
    },
    {
      period: "2024",
      company: "Independent Projects",
      role: "Backend Developer",
      location: "Pune, India",
      type: "project",
      highlights: [
        "Designed and deployed Schoolix, a full-stack school ERP, to learn production backend + DevOps",
        "Built a face-recognition microservice (96% accuracy) and an NL2SQL chatbot over the same system"
      ],
      technologies: [
        "Node.js", "React", "Python", "Docker", "FastAPI", "PostgreSQL"
      ]
    },
    {
      period: "2020 — 2024",
      company: "Govt. College of Engineering, Chandrapur",
      role: "B.Tech, Instrumentation Engineering",
      location: "Maharashtra, India",
      type: "education",
      highlights: [
        "CGPA: 8.13 / 10.0",
        "Self-taught backend development alongside the core curriculum"
      ]
    }
  ];

  return <TimelineRenderer entries={entries} />;
};

export default CareerTimeline;`
  },

  "connect.sh": {
    type: "bash",
    icon: <Terminal size={16} className="text-green-400" />,
    content: CONNECT_SH_CONTENT
  }
};

export const TERMINAL_LOGS_INITIAL = [
  { text: "System Boot Sequence Initiated...", type: "info" },
  { text: "Loading User Profile: Yash Dafade", type: "info" },
  { text: "Checking Environment Variables...", type: "info" }
];

export const TERMINAL_RANDOM_LOGS = [
  "Connecting to PostgreSQL Database... [SUCCESS]",
  "Docker container 'schoolix-api' started (PID: 4022).",
  "Fetching database columns schema...",
  "Python process ready for facial recognition.",
  "GET /api/v1/projects 200 OK — 45ms",
  "Deploying to server via GitHub Actions...",
  "Running database migration: 20250101_init_schema",
  "Security Audit: JWT verified.",
  "Optimizing SQL queries... done.",
  "Supabase Edge Function invoked: send-email ✓",
  "Face embedding generated: 512-d ArcFace vector.",
  "GitHub Actions: Build passed ✓ Deploy triggered.",
  "Caddy reverse proxy configured for schoolix module",
  "POST /api/attendance/mark 201 Created — 120ms"
];
