import React from 'react';
import { Info, Braces, FileCode, FileText, Terminal } from 'lucide-react';

// Split out connect.sh content to handle the bash ${} syntax
// which conflicts with JS template literal interpolation
const CONNECT_SH_CONTENT = [
  '#!/bin/bash',
  '# ══════════════════════════════════════════════',
  '#  CONNECT WITH YASH DAFADE',
  '#  Backend Engineer | AI Integration',
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
  'echo "═════════════════════════════════════"',
  'echo "  ✅ Open to Backend Developer Roles"',
  'echo "  📍 Pune, India"',
  'echo "  🌎 Open to Remote / Hybrid"',
  'echo "═════════════════════════════════════"',
  '',
  '# --- Interests ---',
  'INTERESTS=(',
  '    "Microservice Architecture"',
  '    "Cloud-Native Systems"',
  '    "AI/ML Pipeline Engineering"',
  '    "High-Performance APIs"',
  '    "Developer Tooling"',
  ')',
  '',
  'for interest in "${INTERESTS[@]}"; do',
  '    echo "  → $interest"',
  'done',
  '',
  'echo ""',
  'echo "# Let\'s build something impactful."',
].join('\n');

export const RESUME_DATA = {
  "README.md": {
    type: "markdown",
    icon: <Info size={16} className="text-blue-400" />,
    content: `# Yash Dafade
## Backend Engineer | AI Integration Specialist

> "I build scalable backend systems and ship AI-powered features to production."

### 📍 Profile
- **Location:** Pune, India
- **Role:** Assistant System Engineer @ TCS
- **Email:** yashdafade93@gmail.com
- **GitHub:** github.com/Yashdafade

### 🚀 What I Do
I architect **high-performance backend systems** and integrate **AI/ML models** into production workflows. From building full-scale ERP platforms with **microservice architectures** to deploying real-time **face recognition pipelines** — I focus on engineering-heavy, impact-driven work.

### 🛠 Core Stack
- **Backend:** Node.js, Express, FastAPI, Python
- **AI/ML:** InsightFace, OpenCV, LangChain, OpenAI
- **Database:** MySQL, MongoDB, Supabase
- **Infra:** Docker, AWS, Nginx, Vercel, GitHub Actions
- **Frontend:** React, Next.js, Vite, Tailwind CSS`
  },

  "skills.json": {
    type: "json",
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "backend": {
    "core": ["Node.js", "Express.js", "Python", "FastAPI"],
    "architecture": ["RESTful APIs", "Microservices", "Event-Driven"],
    "auth": ["JWT", "RBAC", "Session Management"]
  },
  "frontend": {
    "frameworks": ["React", "Next.js", "Vite"],
    "styling": ["Tailwind CSS", "Vanilla CSS"],
    "libraries": ["Three.js", "TipTap Editor", "Lucide Icons"]
  },
  "database": {
    "relational": ["MySQL (Optimization)", "PostgreSQL (Supabase)"],
    "nosql": ["MongoDB (Aggregation Pipelines)"]
  },
  "ai_ml": {
    "computer_vision": ["OpenCV", "InsightFace (ArcFace)"],
    "llm_integration": ["OpenAI APIs", "LangChain", "Prompt Engineering"],
    "voice_ai": ["Deepgram", "LiveKit"]
  },
  "devops": {
    "containers": ["Docker", "Docker Compose"],
    "ci_cd": ["GitHub Actions"],
    "cloud": ["AWS (EC2, S3)", "Vercel"],
    "servers": ["Nginx", "Caddy", "Ubuntu Server"]
  },
  "tools": {
    "development": ["Git", "VS Code", "Postman"],
    "automation": ["Power Automate", "Python Scripting", "VBA Macros"]
  }
}`
  },

  "projects.py": {
    type: "python",
    icon: <FileCode size={16} className="text-blue-500" />,
    content: `from tech_stack import Backend, AI_ML, DevOps, Frontend
from deployment import Docker, Vercel, AWS
from datetime import datetime

class ProjectPortfolio:
    """
    Production-grade systems. Each project solves a real-world problem.
    All projects designed, built, and deployed independently.
    """

    def deploy_schoolix(self):
        """
        Schoolix ERP — School Management Platform
        Full-scale ERP serving 500+ students across multiple schools.
        Deployed on Hostinger VPS via Docker & Caddy reverse proxy.
        """
        stack = {
            "backend": ["Node.js", "Express.js", "MongoDB"],
            "frontend": ["React", "Tailwind CSS"],
            "infra": ["Docker", "Caddy", "GitHub Actions", "VPS"]
        }
        features = [
            "JWT-Secured REST APIs with Role-Based Access",
            "Automated Fee Billing & Financial Reports",
            "Student Records, Attendance & Transport Modules",
            "Real-time Dashboard for Admin/Teacher/Parent",
            "CI/CD Pipeline with automated deployments"
        ]
        impact = {
            "efficiency": "Reduced admin workload by 50%",
            "users": "500+ active students",
            "uptime": "99.5% availability"
        }
        return {"status": "Production", "impact": impact}

    def init_ai_attendance(self):
        """
        AI Face Attendance — Contactless Biometric System
        Python microservice using InsightFace for real-time
        face recognition. Integrates with Schoolix via REST.
        """
        stack = ["Python", "FastAPI", "InsightFace", "OpenCV"]
        pipeline = [
            "1. Capture frame from webcam/IP camera",
            "2. Detect faces using RetinaFace detector",
            "3. Generate 512-d ArcFace embeddings",
            "4. Match against enrolled student database",
            "5. Mark attendance via Schoolix API"
        ]
        metrics = {
            "accuracy": "96% recognition rate",
            "latency": "Sub-second per frame",
            "method": "ArcFace embeddings + cosine similarity"
        }
        return {"status": "Microservice", "metrics": metrics}

    def launch_chatbot(self):
        """
        Intelligent Query Bot — Natural Language to SQL
        Translates plain English into database queries.
        Handles student, fees, transport lookups.
        """
        stack = ["Node.js", "OpenAI API", "MySQL", "Express"]
        capabilities = [
            "Natural language query parsing via GPT",
            "Dynamic SQL generation with safety guards",
            "Context-aware multi-turn conversations",
            "Automated 80% of repetitive admin queries"
        ]
        return {"status": "Active", "impact": "80% automation"}

    def build_medibill(self):
        """
        MediBill — Clinic Billing & Patient Management
        Full-featured system for medical practitioners.
        """
        stack = ["React", "Supabase", "TipTap", "Vercel"]
        features = [
            "Patient records with clinical notes (TipTap)",
            "Invoice generation & payment ledger",
            "Split-layout patient profile editor",
            "Email notifications via Edge Functions"
        ]
        return {"status": "Production", "stack": stack}

if __name__ == "__main__":
    portfolio = ProjectPortfolio()
    portfolio.deploy_schoolix()
    portfolio.init_ai_attendance()
    portfolio.launch_chatbot()
    portfolio.build_medibill()`
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
        "ServiceNow incident workflows & SLA tracking",
        "Power Automate flows for ticket routing",
        "Python/VBA automation for Excel reporting",
        "Cross-team coordination for service delivery"
      ],
      technologies: [
        "ServiceNow", "Power Automate", "Python", "VBA"
      ]
    },
    {
      period: "2024",
      company: "Independent Engineering",
      role: "Full Stack & AI Developer",
      location: "Remote",
      type: "project",
      highlights: [
        "Built Schoolix ERP for real school client",
        "Engineered face recognition microservice",
        "Integrated LLM chatbot into production",
        "Shipped MediBill clinic management system"
      ],
      technologies: [
        "Node.js", "React", "Python", "Docker", "FastAPI"
      ]
    },
    {
      period: "2020 — 2024",
      company: "Govt. College of Engineering, Chandrapur",
      role: "B.Tech Instrumentation Engineering",
      location: "Maharashtra, India",
      type: "education",
      highlights: [
        "CGPA: 8.13 / 10.0",
        "Self-taught full-stack development",
        "Built production-grade projects in final year"
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
  "Connecting to MongoDB Atlas... [SUCCESS]",
  "Docker container 'schoolix-api' started (PID: 4022).",
  "Fetching student records via Gemini API...",
  "Python process ready for facial recognition.",
  "GET /api/v1/projects 200 OK — 45ms",
  "Deploying to AWS EC2 instance...",
  "Running database migration: 20250101_init_schema",
  "Security Audit: JWT verified.",
  "Optimizing SQL queries... done.",
  "Supabase Edge Function invoked: send-email ✓",
  "Face embedding generated: 512-d ArcFace vector.",
  "GitHub Actions: Build passed ✓ Deploy triggered.",
  "Nginx reverse proxy configured for api.schoolix.in",
  "POST /api/attendance/mark 201 Created — 120ms"
];
