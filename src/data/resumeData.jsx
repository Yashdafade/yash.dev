import React from 'react';
import { Info, Braces, FileCode, FileText, Terminal } from 'lucide-react';

// Split out connect.sh content to handle the bash ${} syntax
// which conflicts with JS template literal interpolation
const CONNECT_SH_CONTENT = [
  '#!/usr/bin/env bash',
  'set -euo pipefail',
  '',
  '# ============================================',
  '#   YASH DAFADE',
  '#   Backend Engineer · Node.js · Python · AI/LLM',
  '# ============================================',
  '',
  'show_banner() {',
  '  echo "  ╔══════════════════════════════════════╗"',
  '  echo "  ║    YASH DAFADE                       ║"',
  '  echo "  ║    Backend Engineer                   ║"',
  '  echo "  ║    Node.js · Python · AI/LLM         ║"',
  '  echo "  ╚══════════════════════════════════════╝"',
  '  echo ""',
  '}',
  '',
  'show_links() {',
  '  local GITHUB="https://github.com/Yashdafade"',
  '  local LINKEDIN="https://www.linkedin.com/in/yash-dafade-992ab2209/"',
  '  local EMAIL="yashdafade93@gmail.com"',
  '',
  '  echo "  📧  $EMAIL"',
  '  echo "  🐙  $GITHUB"',
  '  echo "  💼  $LINKEDIN"',
  '  echo ""',
  '}',
  '',
  'show_status() {',
  '  echo "  ───────────────────────────────────────"',
  '  echo "   ✅  Actively interviewing"',
  '  echo "   📍  Pune, India · Remote / Hybrid / Relocation"',
  '  echo "  ───────────────────────────────────────"',
  '  echo ""',
  '}',
  '',
  'show_interests() {',
  '  local -a INTERESTS=(',
  '    "Backend API Development & Microservices"',
  '    "AI Integration & LLMs"',
  '    "Database Design & Optimization"',
  '    "Distributed Systems & System Design"',
  '    "Containerized Deployments & DevOps"',
  '  )',
  '',
  '  echo "  Focus areas:"',
  '  for i in "${INTERESTS[@]}"; do',
  '    echo "    • $i"',
  '  done',
  '  echo ""',
  '}',
  '',
  'main() {',
  '  show_banner',
  '  show_links',
  '  show_status',
  '  show_interests',
  '  echo "  ───────────────────────────────────────"',
  '  echo "   Let\'s build something. → $EMAIL"',
  '  echo ""',
  '}',
  '',
  'main "$@"',
].join('\n');

export const RESUME_DATA = {
  "README.md": {
    type: "markdown",
    icon: <Info size={16} className="text-blue-400" />,
    content: `# Yash Dafade — Backend Engineer · Node.js · Python · AI/LLM Integration

> "Backend Engineer with hands-on experience building production REST APIs, AI/LLM-integrated services, and role-based data platforms with Node.js and Python (FastAPI). Skilled in RAG pipelines, embedding-based search, secure auth, and PostgreSQL/MongoDB optimization. Ships end-to-end via Docker, CI/CD, and Linux VPS; working knowledge of GraphQL, Redis, TypeScript."

### 📍 Profile
- **Location:** Pune, India
- **Role:** Assistant System Engineer @ TCS
- **Email:** yashdafade93@gmail.com
- **GitHub:** github.com/Yashdafade
- **LinkedIn:** linkedin.com/in/yash-dafade-992ab2209`
  },

  "skills.json": {
    type: "json",
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "backend": ["Node.js", "Express.js", "Python (FastAPI)", "REST APIs", "Microservices"],
  "ai_llm": ["LLM API Integration", "RAG Pipelines", "Embedding-Based Retrieval", "Prompt Engineering", "QLoRA Fine-Tuning"],
  "database": ["PostgreSQL", "MongoDB", "MySQL", "MS SQL Server", "Oracle"],
  "auth_security": ["JWT", "RBAC", "Input Validation", "AES-256-GCM Field-Level Encryption"],
  "cloud_devops": ["Docker", "GitHub Actions", "CI/CD", "Linux", "Nginx", "Hostinger VPS", "Render", "AWS Fundamentals"],
  "languages": ["JavaScript (ES6+)", "TypeScript", "Python"],
  "frontend": ["React.js", "Tailwind CSS"],
  "practices": ["System Design", "SOLID Principles", "Clean Code", "Git", "Agile"]
}`
  },

  "projects.py": {
    type: "python",
    icon: <FileCode size={16} className="text-blue-500" />,
    content: `from dataclasses import dataclass
from typing import List, Optional

@dataclass
class SubModule:
    name: str
    description: str
    stack: List[str]

@dataclass
class Project:
    name: str
    status: str
    stack: List[str]
    description: str
    highlights: List[str]
    sub_modules: Optional[List[SubModule]] = None
    repo: Optional[str] = None

@dataclass
class OpenSourceProject:
    name: str
    description: str
    repo: str
    highlights: List[str]


class ProjectPortfolio:
    """Personal and team projects — backend systems, AI services, and open-source tooling."""

    @staticmethod
    def school_management_platform() -> Project:
        """
        School Management Platform — Team Project
        3-person team; built core modules for ~5 admin/clerical roles.
        Contains sub-modules: AI Attendance System and NL2SQL Chatbot.
        """
        return Project(
            name="School Management Platform",
            status="Team Project",
            stack=["Node.js", "Express.js", "React.js", "PostgreSQL", "MongoDB",
                   "Python (FastAPI)", "JWT", "LLM APIs", "Docker"],
            description="3-person team; built core modules — enrollment, attendance, inventory, "
                        "billing, library — with role-based access for ~5 admin/clerical roles, "
                        "replacing manual processes with daily-use digital workflows.",
            highlights=[
                "Developed backend APIs and database workflows for billing, invoicing, library, "
                "and inventory modules; contributed to the React migration",
            ],
            sub_modules=[
                SubModule(
                    name="AI Attendance System",
                    description="Built AI-powered biometric attendance using face embeddings "
                                "(~96% accuracy, sub-second latency). Later redesigned to RFID-based "
                                "tracking for production reliability.",
                    stack=["Python", "FastAPI", "OpenCV"],
                ),
                SubModule(
                    name="NL2SQL Chatbot",
                    description="Natural-language query engine over the school database. Upgraded "
                                "from keyword-based intent routing to Gemini embedding + cosine "
                                "similarity — a RAG-adjacent retrieval pipeline with role-aware SQL.",
                    stack=["Node.js", "Gemini API", "PostgreSQL", "Embeddings"],
                ),
            ],
        )

    @staticmethod
    def medibill() -> Project:
        """
        MediBill — Clinic Billing System
        Personal project to learn TypeScript and Supabase.
        """
        return Project(
            name="MediBill",
            status="Personal Project",
            stack=["React", "TypeScript", "Vite", "Supabase (PostgreSQL)", "Edge Functions (Deno/TypeScript)"],
            description="Clinic billing system with row-level security, field-level encryption, "
                        "and Supabase Edge Functions as the API layer.",
            highlights=[
                "Designed PostgreSQL schema with row-level security (RLS) for multi-tenant clinic billing",
                "Implemented AES-256-GCM field-level encryption with per-owner AAD binding and key versioning",
                "Used Supabase Edge Functions (Deno/TypeScript) as the API layer instead of traditional Node.js/Express",
            ],
        )

    @staticmethod
    def telcobot_qlora() -> Project:
        """
        TelcoBot-QLoRA — Fine-Tuned LLM for Telecom Support
        TCS × AMD AI Hackathon 2026 project.
        """
        return Project(
            name="TelcoBot-QLoRA",
            status="AI Hackathon",
            stack=["QLoRA", "Qwen2.5-1.5B-Instruct", "PyTorch", "AMD MI300X (ROCm)"],
            description="Fine-tuned Qwen2.5-1.5B-Instruct via QLoRA on 20k telecom conversations "
                        "during the TCS × AMD AI Hackathon 2026.",
            highlights=[
                "Trained on AMD MI300X in 1h41m (final loss 0.46); resolved ROCm-specific issues "
                "(bitsandbytes incompatibility, collator switch, stop-string handling, bf16 inference)",
                "ROUGE-1 +41%, ROUGE-2 +146% over the base model",
            ],
            repo="github.com/Yashdafade/TelcoBot-QLoRA",
        )

    @staticmethod
    def open_source_projects() -> List[OpenSourceProject]:
        return [
            OpenSourceProject(
                name="supabase-github-backup",
                description="Automated Supabase backup via GitHub Actions. Exports the Auth/GoTrue "
                            "schema alongside table data; restore script remaps UUIDs.",
                repo="github.com/Yashdafade/supabase-github-backup",
                highlights=[
                    "Exports Auth/GoTrue schema often missed by standard tooling",
                    "Restore script remaps UUIDs to preserve foreign keys",
                ],
            ),
            OpenSourceProject(
                name="delegate-task-mcp",
                description="MCP server that lets a primary coding agent delegate heavy tasks "
                            "(repo-wide analysis, bulk refactors, log summarization) to other CLI "
                            "agents based on task complexity, context window, and quota.",
                repo="github.com/Yashdafade/delegate-task (going public soon)",
                highlights=[
                    "Cuts primary-agent token usage by offloading heavy tasks",
                    "Routes to Codex, Gemini, or opencode based on complexity",
                ],
            ),
        ]
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
      company: "Tata Consultancy Services (TCS)",
      role: "Assistant System Engineer",
      location: "Pune, India",
      type: "work",
      highlights: [
        "Monitored and maintained a multi-server SQL Server and Oracle database environment across "
        "dev, staging, and production; executed and validated scripts from development teams as "
        "part of release workflows",
        "Built Power BI dashboards with DAX-based calculated columns and measures to transform "
        "raw monitoring data into reporting-ready metrics",
        "Automated ticketing workflows on ServiceNow and Ivanti, reducing manual triage steps "
        "for recurring issue categories"
      ]
    },
    {
      period: "2024",
      company: "Independent Projects",
      role: "Backend Engineer",
      location: "Pune, India",
      type: "project",
      highlights: [
        "Designed and built a School Management Platform — enrollment, attendance, "
        "inventory, billing, library modules with role-based access",
        "Built an AI attendance system using face embeddings and an NL2SQL chatbot "
        "with Gemini embedding + cosine similarity retrieval"
      ],
      technologies: [
        "Node.js", "Express.js", "React", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Docker"
      ]
    },
    {
      period: "2020 — 2024",
      company: "Government College of Engineering, Amravati",
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
  "Python face embedding service ready (OpenCV).",
  "GET /api/v1/projects 200 OK — 45ms",
  "Deploying to server via GitHub Actions...",
  "Running database migration: 20250101_init_schema",
  "Security Audit: JWT verified.",
  "Optimizing SQL queries... done.",
  "Supabase Edge Function invoked: send-email ✓",
  "GitHub Actions: Build passed ✓ Deploy triggered.",
  "Caddy reverse proxy configured for schoolix module",
  "POST /api/attendance/mark 201 Created — 120ms"
];
