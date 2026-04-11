import React, { useState, useEffect, useRef } from 'react';
import {
  Files,
  Search,
  GitGraph,
  Bug,
  Settings,
  UserCircle,
  X,
  ChevronRight,
  ChevronDown,
  Code2,
  Server,
  Database,
  Cpu,
  Columns,
  Braces,
  Info,
  Briefcase,
  Cloud,
  Box,
  Brain,
  Menu,
  MoreHorizontal,
  Minimize2,
  Maximize2,
  FileCode,
  MessageSquare,
  Monitor,
  Wrench,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Globe,
  Send,
  Shield,
  Zap,
  Layers,
  MapPin,
  Terminal,
  Mic,
  FileText
} from 'lucide-react';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════

function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return isInView;
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED CARD WRAPPER
// ═══════════════════════════════════════════════════════════════

const AnimatedCard = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// RESUME DATA
// ═══════════════════════════════════════════════════════════════

const RESUME_DATA = {
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

    def create_friday(self):
        """
        F.R.I.D.A.Y. — AI Voice Agent
        Real-time conversational AI with full voice I/O.
        Built on LiveKit agent framework.
        """
        stack = ["Python", "LiveKit", "Deepgram", "OpenAI"]
        pipeline = [
            "WebRTC audio capture via LiveKit",
            "Real-time STT (Deepgram Nova)",
            "LLM reasoning (OpenAI GPT-4 Turbo)",
            "TTS synthesis (Deepgram Aura)",
            "Full-duplex voice conversation"
        ]
        return {"status": "Prototype", "latency": "<500ms"}

if __name__ == "__main__":
    portfolio = ProjectPortfolio()
    portfolio.deploy_schoolix()
    portfolio.init_ai_attendance()
    portfolio.launch_chatbot()
    portfolio.build_medibill()
    portfolio.create_friday()`
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
    content: `#!/bin/bash
# ══════════════════════════════════════════════
#  CONNECT WITH YASH DAFADE
#  Backend Engineer | AI Integration
# ══════════════════════════════════════════════

# --- Professional Links ---
GITHUB="https://github.com/Yashdafade"
LINKEDIN="https://linkedin.com/in/yash-dafade"
EMAIL="yashdafade93@gmail.com"
PORTFOLIO="https://portfolio-v5-vs.vercel.app"

# --- Quick Connect ---
echo "📧  Email:     $EMAIL"
echo "🐙  GitHub:    $GITHUB"
echo "💼  LinkedIn:  $LINKEDIN"
echo "🌐  Portfolio: $PORTFOLIO"

# --- Current Status ---
echo ""
echo "═════════════════════════════════════"
echo "  ✅ Open to Backend Developer Roles"
echo "  📍 Pune, India"
echo "  🌎 Open to Remote / Hybrid"
echo "═════════════════════════════════════"

# --- Interests ---
INTERESTS=(
    "Microservice Architecture"
    "Cloud-Native Systems"
    "AI/ML Pipeline Engineering"
    "High-Performance APIs"
    "Developer Tooling"
)

for interest in "\${INTERESTS[@]}"; do
    echo "  → $interest"
done

echo ""
echo "# Let's build something impactful."`
  }
};

// ═══════════════════════════════════════════════════════════════
// THREE.JS BACKGROUND
// ═══════════════════════════════════════════════════════════════

function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d1117, 0.05);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x61dafb, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 300 : 800;

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4ade80,
      transparent: true,
      opacity: 0.3
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const nodes = [];
    const nodeData = [
      { pos: [-4, 2, 0], color: 0x61dafb },
      { pos: [4, -2, -2], color: 0x68a063 },
      { pos: [0, 0, -1], color: 0xffca28 },
      { pos: [-2, -3, 1], color: 0xe10098 },
      { pos: [3, 3, 1], color: 0x007acc }
    ];

    nodeData.forEach((data) => {
      const geometry = new THREE.IcosahedronGeometry(0.6, 0);
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        wireframe: true,
        emissive: data.color,
        emissiveIntensity: 0.4
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...data.pos);
      mesh.userData = {
        originalPos: [...data.pos],
        speed: Math.random() * 0.002 + 0.001,
        offset: Math.random() * Math.PI * 2
      };
      scene.add(mesh);
      nodes.push(mesh);
    });

    const linesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;

      const now = Date.now();
      nodes.forEach(node => {
        node.rotation.x += 0.005;
        node.rotation.y += 0.005;
        node.position.y = node.userData.originalPos[1] + Math.sin(now * node.userData.speed + node.userData.offset) * 0.5;
      });

      const linePositions = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 8) {
            linePositions.push(
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            );
          }
        }
      }
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.innerHTML = '';
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      nodes.forEach(n => { n.geometry.dispose(); n.material.dispose(); });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#0d1117]" />;
}

// ═══════════════════════════════════════════════════════════════
// INLINE MARKDOWN HELPER
// ═══════════════════════════════════════════════════════════════

const renderInline = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="text-green-400 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={idx}>{part}</span>;
  });
};

// ═══════════════════════════════════════════════════════════════
// SKILLS VIEW
// ═══════════════════════════════════════════════════════════════

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

const SkillsView = () => (
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

// ═══════════════════════════════════════════════════════════════
// PROJECTS VIEW
// ═══════════════════════════════════════════════════════════════

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

const ProjectsView = () => (
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

        <ProjectCard
          title="F.R.I.D.A.Y."
          status="Prototype"
          statusColor="purple"
          gradient="from-red-500 to-purple-500"
          description="Real-time AI voice agent built on LiveKit's agent framework. Features full-duplex voice conversation with sub-500ms round-trip latency. Uses Deepgram for real-time speech-to-text, GPT-4 Turbo for reasoning, and Deepgram Aura for speech synthesis."
          stack="Python, LiveKit Agents, Deepgram, OpenAI GPT-4"
          metrics={["<500ms Round-trip Latency", "Full-duplex Voice I/O", "WebRTC Streaming"]}
          delay={320}
        />

      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// TIMELINE VIEW
// ═══════════════════════════════════════════════════════════════

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

const TimelineView = () => (
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
            "Designed & shipped MediBill clinic management platform with Supabase backend",
            "Prototyped F.R.I.D.A.Y. voice agent using LiveKit + Deepgram for real-time AI conversations"
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

// ═══════════════════════════════════════════════════════════════
// CONTACT VIEW
// ═══════════════════════════════════════════════════════════════

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

const ContactView = () => (
  <div className="flex flex-col h-full font-sans text-gray-300">
    <div className="flex-none p-6 bg-[#1e1e1e] border-b border-[#2d2d2d] z-20">
      <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
        <Send className="text-green-400" /> Get In Touch
      </h1>
      <p className="text-xs text-gray-500 mt-1">Open to backend & AI engineering roles</p>
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
              <p className="text-green-400 font-semibold text-sm">Available for Opportunities</p>
              <p className="text-xs text-gray-400 mt-0.5">Backend Developer • Microservices • Cloud Native • AI Integration</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            href="https://linkedin.com/in/yash-dafade"
            icon={Linkedin}
            label="LinkedIn"
            sublabel="linkedin.com/in/yash-dafade"
            color="purple"
            delay={320}
          />
          <ContactLink
            href="https://portfolio-v5-vs.vercel.app"
            icon={Globe}
            label="Portfolio"
            sublabel="portfolio-v5-vs.vercel.app"
            color="cyan"
            delay={400}
          />
        </div>

        {/* Interests */}
        <AnimatedCard delay={480}>
          <div className="bg-[#1f2428] border border-gray-700/60 rounded-lg p-5">
            <h3 className="text-sm font-bold text-white mb-3">Areas of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {["Microservice Architecture", "Cloud-Native Systems", "AI/ML Pipelines", "High-Performance APIs", "Developer Tooling"].map((interest, i) => (
                <span key={i} className="skill-tag px-3 py-1.5 bg-gray-700/30 text-gray-300 rounded-md text-xs border border-gray-600/30">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </AnimatedCard>

      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MARKDOWN PREVIEW (Fixed)
// ═══════════════════════════════════════════════════════════════

const MarkdownPreview = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto font-sans text-gray-300 pb-20 content-enter">
      {lines.map((line, i) => {
        if (line.startsWith('# '))
          return <h1 key={i} className="text-2xl md:text-3xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## '))
          return <h2 key={i} className="text-xl md:text-2xl font-bold text-blue-400 mt-6 mb-3">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### '))
          return <h3 key={i} className="text-lg md:text-xl font-bold text-white mt-5 mb-2">{line.replace('### ', '')}</h3>;
        if (line.startsWith('> '))
          return (
            <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4 bg-gray-800/30 p-3 rounded-r text-sm md:text-base">
              {line.replace('> ', '')}
            </blockquote>
          );
        if (line.startsWith('- ')) {
          const text = line.replace('- ', '');
          return (
            <li key={i} className="ml-4 my-1.5 text-sm md:text-base list-disc text-gray-300 leading-relaxed">
              {renderInline(text)}
            </li>
          );
        }
        return <p key={i} className="min-h-[1.5em] text-sm md:text-base leading-relaxed">{renderInline(line)}</p>;
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTER (Fixed — placeholder-based tokenizer)
// ═══════════════════════════════════════════════════════════════

const SyntaxHighlighter = ({ content }) => {
  const highlight = (text) => {
    if (!text) return "";
    const placeholders = [];

    let result = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1. Extract triple-quoted docstrings first
    result = result.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (match) => {
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#6a9955;font-style:italic">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 2. Extract comments
    result = result.replace(/(\/\/.*$|#(?!.*=).*$)/gm, (match) => {
      if (match.startsWith('__PH')) return match;
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#6a9955">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 3. Extract strings
    result = result.replace(/(".*?"|'.*?'|`.*?`)/g, (match) => {
      if (match.startsWith('__PH')) return match;
      const idx = placeholders.length;
      placeholders.push(`<span style="color:#ce9178">${match}</span>`);
      return `__PH${idx}__`;
    });

    // 4. Keywords
    result = result.replace(
      /\b(const|let|var|function|return|import|export|default|class|if|else|for|while|await|async|def|from|self|None|True|False|true|false|null|undefined|interface|type|string|number|boolean|void|extends|implements|new|this|super|yield|try|catch|finally|throw|of|in|as|is|with)\b/g,
      '<span style="color:#569cd6">$1</span>'
    );

    // 5. Types / Decorators
    result = result.replace(
      /\b(React|FC|Array|Promise|Map|Set|Date|RegExp|Error|Object|String|Number|Boolean|console|window|document|Math|JSON)\b/g,
      '<span style="color:#4ec9b0">$1</span>'
    );

    // 6. Function calls
    result = result.replace(
      /\b([a-zA-Z_]\w*)\s*\(/g,
      '<span style="color:#dcdcaa">$1</span>('
    );

    // 7. Numbers
    result = result.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span style="color:#b5cea8">$1</span>'
    );

    // 8. Brackets
    result = result.replace(
      /([{}[\]])/g,
      '<span style="color:#ffd700">$1</span>'
    );

    // 9. Re-insert placeholders
    placeholders.forEach((ph, idx) => {
      result = result.replace(`__PH${idx}__`, ph);
    });

    return result;
  };

  const lines = content.split('\n');

  return (
    <pre className="font-mono text-xs md:text-sm leading-6 overflow-auto h-full pb-20 content-enter">
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/[0.03] transition-colors">
            <span className="inline-block w-12 text-right pr-4 text-gray-600 select-none shrink-0 text-xs leading-6">
              {i + 1}
            </span>
            <span dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }} />
          </div>
        ))}
      </code>
    </pre>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openFiles, setOpenFiles] = useState(["README.md", "skills.json", "projects.py", "career_timeline.tsx", "connect.sh"]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [booting, setBooting] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState([
    { text: "System Boot Sequence Initiated...", type: "info" },
    { text: "Loading User Profile: Yash Dafade", type: "info" },
    { text: "Checking Environment Variables...", type: "info" }
  ]);
  const [isMobile, setIsMobile] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic Terminal Logs
  useEffect(() => {
    if (booting) return;
    const randomLogs = [
      "Connecting to MongoDB Atlas... [SUCCESS]",
      "Docker container 'schoolix-api' started (PID: 4022).",
      "Fetching student records via Gemini API...",
      "Python process ready for facial recognition.",
      "GET /api/v1/projects 200 OK — 45ms",
      "Deploying to AWS EC2 instance...",
      "Running database migration: 20250101_init_schema",
      "Security Audit: JWT verified.",
      "Optimizing SQL queries... done.",
      "LiveKit agent connected. Awaiting voice input...",
      "Supabase Edge Function invoked: send-email ✓",
      "Face embedding generated: 512-d ArcFace vector.",
      "GitHub Actions: Build passed ✓ Deploy triggered.",
      "Nginx reverse proxy configured for api.schoolix.in",
      "POST /api/attendance/mark 201 Created — 120ms"
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
        setTerminalLogs(prev => [...prev.slice(-6), { text: newLog, type: "success" }]);
      }
    }, 2200);
    return () => clearInterval(interval);
  }, [booting]);

  const handleFileClick = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
    setIsPreviewMode(true);
    setContentKey(k => k + 1);
    if (isMobile) setSidebarOpen(false);
  };

  const closeFile = (fileName) => {
    const newFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newFiles);
    if (activeFile === fileName && newFiles.length > 0) {
      setActiveFile(newFiles[newFiles.length - 1]);
    } else if (newFiles.length === 0) {
      setActiveFile(null);
    }
  };

  if (booting) {
    return (
      <div className="h-screen w-full bg-[#1e1e1e] flex flex-col items-center justify-center text-gray-400 font-sans">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <div className="font-mono text-sm mb-2">Initializing Development Environment...</div>
        <div className="text-xs text-gray-600">Loading: Skills, Projects, Timeline, Contact...</div>
        <div className="mt-8 flex gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500/60"
              style={{ animation: `fadeIn 0.5s ease ${i * 0.15}s both` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100dvh] bg-[#0d1117] text-gray-300 font-sans overflow-hidden flex items-center justify-center">
      <ThreeBackground />

      {/* Main VS Code Window */}
      <div className="window-glow relative w-[95vw] h-[92vh] md:w-[95vw] md:h-[85vh] max-w-[1600px] flex flex-col overflow-hidden bg-[#1e1e1e] rounded-lg border border-[#333] shadow-2xl z-10 anim-scale-in">

        {/* ──── Title Bar ──── */}
        <div className="h-10 md:h-8 bg-[#1e1e1e] flex items-center justify-between px-2 select-none border-b border-[#2d2d2d] shrink-0 z-50">
          <div className="flex items-center space-x-2 ml-1 md:ml-2">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-1 hover:bg-gray-700 rounded text-gray-400 transition-colors"
            >
              <Menu size={18} />
            </button>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
              className="w-4 h-4"
              alt="VS Code"
            />
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Yash Dafade — Portfolio</span>
          </div>

          {/* Fake Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:flex items-center justify-center">
            <div className="bg-[#2d2d2d] rounded text-gray-400 text-xs py-1 px-20 border border-[#3e3e42] flex items-center">
              <Search size={10} className="mr-2" />
              yash-portfolio
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="p-1 hover:bg-gray-700 rounded hidden md:block cursor-pointer transition-colors"><Minimize2 size={12} className="text-gray-400" /></div>
            <div className="p-1 hover:bg-gray-700 rounded hidden md:block cursor-pointer transition-colors"><Maximize2 size={12} className="text-gray-400" /></div>
            <div className="p-1 hover:bg-red-600 rounded group cursor-pointer transition-colors"><X size={12} className="text-gray-400 group-hover:text-white" /></div>
          </div>
        </div>

        {/* ──── Main Workspace ──── */}
        <div className="flex flex-1 h-full overflow-hidden relative">

          {/* Activity Bar */}
          <div className="w-12 bg-[#333333] hidden md:flex flex-col justify-between items-center py-3 border-r border-[#1e1e1e] z-30 shrink-0">
            <div className="flex flex-col gap-5">
              <Files
                size={24}
                className={`cursor-pointer transition-colors ${activeSidebarIndex === 0 && isSidebarOpen ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => { setActiveSidebarIndex(0); setSidebarOpen(!isSidebarOpen); }}
              />
              <Search size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
              <GitGraph size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
              <Bug size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
            </div>

            <div className="flex flex-col gap-5 mb-2 items-center">
              {/* User Profile — Beacon + Popup */}
              <div className="relative group">
                <div className="relative cursor-pointer">
                  <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-75"></span>
                  <UserCircle size={26} className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#333333] z-20"></div>
                </div>

                {/* Invisible bridge */}
                <div className="absolute left-full top-0 h-full w-4 bg-transparent"></div>

                {/* Popup */}
                <div className="absolute left-10 bottom-0 w-72 bg-[#252526] border border-black shadow-2xl rounded-lg p-0 z-50 overflow-hidden text-sm hidden group-hover:block popup-enter">
                  <div className="bg-[#1f2428] p-4 border-b border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_10px_rgba(37,99,235,0.5)]">YD</div>
                      <div>
                        <div className="font-bold text-white">Yash Dafade</div>
                        <div className="text-xs text-gray-400">yashdafade93@gmail.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Target Role</div>
                      <div className="text-blue-400 font-semibold text-base">Backend Developer</div>
                      <div className="text-xs text-gray-400 mt-0.5">Microservices • Cloud Native • AI</div>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                        Available for Opportunities
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Settings size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* ──── Sidebar ──── */}
          <div className={`
            ${isMobile ? 'absolute top-0 bottom-0 left-0 z-40 w-64 shadow-2xl transition-transform duration-300 ease-in-out' : 'relative w-64 transition-all duration-300'}
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:-translate-x-0 md:hidden'}
            bg-[#252526] flex flex-col border-r border-[#1e1e1e] shrink-0
          `}>
            <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-500 uppercase">
              <span>Explorer</span>
              <div className="flex gap-2 cursor-pointer hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
                <MoreHorizontal size={14} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-1 py-1 flex items-center text-xs font-bold text-gray-300 cursor-pointer hover:bg-[#2a2d2e] transition-colors">
                <ChevronDown size={14} className="mr-1" />
                YASH_PORTFOLIO
              </div>
              <div className="mt-0">
                {Object.keys(RESUME_DATA).map((file, index) => (
                  <div
                    key={file}
                    onClick={() => handleFileClick(file)}
                    className={`flex items-center px-4 py-1.5 cursor-pointer text-[13px] hover:bg-[#2a2d2e] transition-colors border-l-2 ${activeFile === file ? 'bg-[#37373d] text-white border-blue-400' : 'text-gray-400 border-transparent'}`}
                    style={{ animation: `slideInFromBottom 0.3s ease ${index * 60}ms both` }}
                  >
                    <span className="mr-2">{RESUME_DATA[file].icon}</span>
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ──── Editor Area ──── */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]/80 min-w-0 relative">

            {/* Tabs */}
            <div className="flex bg-[#252526] h-9 overflow-x-auto shrink-0">
              {openFiles.map((file, index) => (
                <div
                  key={file}
                  onClick={() => handleFileClick(file)}
                  className={`tab-enter group flex items-center px-3 cursor-pointer text-[13px] border-r border-[#1e1e1e] min-w-[120px] max-w-[200px] justify-between transition-colors ${activeFile === file ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]'}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center truncate">
                    <span className="mr-2 opacity-80">{RESUME_DATA[file]?.icon}</span>
                    <span className="truncate">{file}</span>
                  </div>
                  <X
                    size={14}
                    className={`ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-[1px] transition-opacity ${activeFile === file ? 'opacity-100' : ''}`}
                    onClick={(e) => { e.stopPropagation(); closeFile(file); }}
                  />
                </div>
              ))}
            </div>

            {/* Breadcrumbs */}
            <div className="h-8 bg-[#1e1e1e] flex items-center px-4 text-xs text-gray-500 border-b border-[#2d2d2d] justify-between shrink-0">
              <div className="flex items-center">
                <span>src</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-300 truncate max-w-[150px]">{activeFile || 'Welcome'}</span>
              </div>

              {activeFile && (
                <div className="flex gap-1">
                  <button
                    onClick={() => { setIsPreviewMode(!isPreviewMode); setContentKey(k => k + 1); }}
                    className={`p-1 rounded hover:bg-gray-700 transition-colors ${isPreviewMode ? 'text-white' : 'text-gray-500'}`}
                    title={isPreviewMode ? "Show Code" : "Show Preview"}
                  >
                    {isPreviewMode ? <Code2 size={14} /> : <Columns size={14} />}
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-[#1e1e1e] backdrop-blur-sm" key={contentKey}>
              {activeFile ? (
                isPreviewMode ? (
                  // RICH PREVIEW
                  activeFile === 'skills.json' ? <SkillsView /> :
                  activeFile === 'projects.py' ? <ProjectsView /> :
                  activeFile === 'career_timeline.tsx' ? <TimelineView /> :
                  activeFile === 'connect.sh' ? <ContactView /> :
                  <MarkdownPreview content={RESUME_DATA[activeFile].content} />
                ) : (
                  // CODE VIEW
                  <SyntaxHighlighter content={RESUME_DATA[activeFile].content} />
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-4">
                  <div className="text-6xl md:text-8xl opacity-10 font-mono">{'</>'}</div>
                  <p className="text-sm">Select a file to explore.</p>
                </div>
              )}
            </div>

            {/* ──── Terminal ──── */}
            <div className={`bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col shrink-0 ${isMobile ? 'h-28' : 'h-36'}`}>
              <div className="flex items-center px-4 h-8 gap-6 text-[10px] md:text-[11px] text-gray-400 border-b border-[#252526] uppercase font-bold tracking-wide overflow-x-auto">
                <span className="text-white border-b border-white py-1 whitespace-nowrap">Terminal</span>
                <span className="whitespace-nowrap">Output</span>
                <span className="whitespace-nowrap hidden md:inline">Debug Console</span>
              </div>
              <div className="p-2 font-mono text-sm text-gray-300 overflow-y-auto flex-1">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={`whitespace-nowrap text-[10px] md:text-xs leading-4 md:leading-5 ${log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
                    {log.type === 'success' && <span className="mr-2">➜</span>}
                    {log.text}
                  </div>
                ))}
                <span className="terminal-cursor ml-1 mt-1"></span>
              </div>
            </div>

          </div>
        </div>

        {/* ──── Status Bar ──── */}
        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs z-20 font-sans select-none shrink-0 rounded-b-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">
              <GitGraph size={12} />
              <span className="hidden md:inline">main*</span>
            </div>
            <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">
              <X size={12} className="rounded-full bg-red-400/20 text-red-200 p-[1px]" />
              <span>0</span>
              <span className="text-yellow-200 ml-1">0</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="hidden md:inline">Backend: Online</span>
            </div>
            <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">Prettier</span>
          </div>
        </div>

      </div>
    </div>
  );
}