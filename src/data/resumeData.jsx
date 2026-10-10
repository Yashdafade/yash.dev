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
  '#   Data Engineer · DBA · Backend Developer',
  '# ============================================',
  '',
  'show_banner() {',
  '  echo "  ╔══════════════════════════════════════╗"',
  '  echo "  ║    YASH DAFADE                       ║"',
  '  echo "  ║    Data Engineer · DBA · Backend     ║"',
  '  echo "  ║    Oracle · SQL Server · Node.js     ║"',
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
  '    "Database Administration (Oracle, MS SQL Server)"',
  '    "Data Engineering & ETL Pipelines"',
  '    "Backend API Development & Microservices"',
  '    "AI Integration & LLMs"',
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
    content: `# Yash Dafade — Data Engineer · DBA · Backend Developer

> "Production DBA managing Oracle on Linux and MS SQL Server on Windows across multi-environment landscapes. I also build backend systems and AI-integrated applications — REST APIs, microservices, containerized deployments, and LLM/computer-vision integrations. Most of my work outside the day job is self-driven: I take an idea to a deployed, production-grade system to deepen my engineering depth across databases, backend, and data pipelines."

### 📍 Profile
- **Location:** Pune, India
- **Role:** Prod DBA @ TCS (Oracle on Linux · MS SQL Server on Windows)
- **Email:** yashdafade93@gmail.com
- **GitHub:** github.com/Yashdafade
- **LinkedIn:** linkedin.com/in/yash-dafade-992ab2209`
  },

  "skills.json": {
    type: "json",
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "databases": ["Oracle", "MS SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  "dba_ops": ["Oracle on Linux", "MS SQL Server on Windows", "Backup & Recovery", "Performance Tuning", "Query Optimization", "Schema Design"],
  "backend": ["Node.js", "Express.js", "Python (FastAPI)", "REST APIs", "Microservices"],
  "ai_llm": ["LLM API Integration", "RAG Pipelines", "Embedding-Based Retrieval", "Prompt Engineering", "QLoRA Fine-Tuning"],
  "data_engineering": ["ETL Pipelines", "Data Modeling", "SQL Scripting", "Power BI (DAX)", "Reporting Automation"],
  "auth_security": ["JWT", "RBAC", "Input Validation", "AES-256-GCM Field-Level Encryption"],
  "cloud_devops": ["Docker", "GitHub Actions", "CI/CD", "Linux", "Nginx", "AWS Fundamentals"],
  "languages": ["SQL", "PL/SQL", "T-SQL", "JavaScript (ES6+)", "TypeScript", "Python"],
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
      role: "Prod DBA",
      location: "Pune, India",
      type: "work",
      highlights: [
        "Handling Oracle databases on Linux and MS SQL Server instances on Windows across "
        "dev, staging, and production environments",
        "Executing and validating deployment scripts from development teams as part of "
        "release workflows; managing backup, recovery, and performance tuning",
        "Built Power BI dashboards with DAX-based calculated columns and measures to transform "
        "raw monitoring data into reporting-ready metrics",
        "Automated ticketing workflows on ServiceNow and Ivanti, reducing manual triage steps "
        "for recurring issue categories"
      ]
    },
    {
      period: "2024",
      company: "Independent Projects",
      role: "Backend Developer",
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
  "Connecting to Oracle Database... [SUCCESS]",
  "MS SQL Server health check — all instances healthy.",
  "Docker container 'schoolix-api' started (PID: 4022).",
  "Fetching database columns schema...",
  "Python face embedding service ready (OpenCV).",
  "GET /api/v1/projects 200 OK — 45ms",
  "Deploying to server via GitHub Actions...",
  "Running database migration: 20250101_init_schema",
  "Security Audit: JWT verified.",
  "Optimizing SQL queries... done.",
  "Oracle RMAN backup completed successfully.",
  "GitHub Actions: Build passed ✓ Deploy triggered.",
  "SQL Server Agent job: index_rebuild — completed.",
  "POST /api/attendance/mark 201 Created — 120ms"
];
