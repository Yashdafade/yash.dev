import React, { useState, useEffect, useRef } from 'react';
import { 
  Files, 
  Search, 
  GitGraph, 
  Bug, 
  Blocks, 
  Settings, 
  UserCircle, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Terminal, 
  Code2,
  LayoutTemplate,
  Server,
  Database,
  Cpu,
  Columns,
  Braces,
  Info,
  History,
  Briefcase,
  Cloud,
  Box,
  Brain,
  Menu,
  MoreHorizontal,
  Minimize,
  Maximize,
  FileCode,
  MessageSquare,
  Minus,
  Square
} from 'lucide-react';
import * as THREE from 'three';

// --- Constants & Data ---

const RESUME_DATA = {
  "README.md": {
    type: "markdown",
    icon: <Info size={16} className="text-blue-400" />,
    content: `# Yash Dafade
## Backend Engineer | Node.js & Python

> "Building scalable backend systems and integrating AI models into production."

### 📍 Profile
- **Location:** Pune, India
- **Role:** Assistant System Engineer @ TCS
- **Email:** yashdafade93@gmail.com

### 🚀 Career Goal
Targeting a **Backend Developer** role working with **Microservices** and **AI/ML Integration**. 
Strictly focused on engineering-heavy roles.

### 🛠 Tech Stack
- **Backend:** Node.js, Express, FastAPI
- **DB:** MySQL, MongoDB
- **AI:** InsightFace, OpenCV
- **DevOps:** Docker, AWS, Nginx
`
  },
  "skills.json": {
    type: "json",
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "backend": {
    "core": ["Node.js", "Express.js", "Python (FastAPI)"],
    "architecture": ["RESTful APIs", "Microservices"]
  },
  "database": {
    "relational": "MySQL (Optimization, Indexing)",
    "nosql": "MongoDB"
  },
  "ai_ml": {
    "libraries": ["OpenCV", "InsightFace", "LangChain"],
    "integration": "Face Recognition Pipelines"
  },
  "devops": {
    "tools": ["Docker", "GitHub Actions", "AWS (EC2, S3)"],
    "server": ["Nginx", "Caddy", "Ubuntu"]
  }
}`
  },
  "projects.py": {
    type: "python",
    icon: <FileCode size={16} className="text-blue-500" />,
    content: `from tech_stack import MERN, DevOps, AI_ML
from datetime import datetime

class ProjectManager:
    """
    Manages lifecycle of high-impact backend & AI systems.
    """

    def deploy_schoolix(self):
        """
        Client-Based School Management Platform.
        Deployed on Hostinger VPS via Docker & Caddy.
        """
        stack = ["MERN", "Docker", "GitHub Actions"]
        features = [
            "JWT-Secured APIs", 
            "Auto-Billing & Reports", 
            "Role-Based Access Control"
        ]
        
        # Result:
        impact = "Reduced administrative workload by 50%"
        return {"status": "Production", "impact": impact}

    def init_ai_attendance(self):
        """
        Contactless biometrics using Computer Vision.
        Integrates directly with Schoolix DB.
        """
        stack = ["Python", "FastAPI", "InsightFace", "OpenCV"]
        
        metrics = {
            "accuracy": "96%",
            "latency": "Sub-second scan speed"
        }
        
        # Replaces manual roll calls
        return metrics

    def launch_chatbot(self):
        """
        Intelligent Query Assistant using LLM APIs.
        Translates Natural Language -> SQL Queries.
        """
        stack = ["Node.js", "LLM APIs", "REST"]
        
        def handle_query(user_input):
            # Automated 80% of repetitive queries
            return db.execute(user_input)
            
        return "Active"

if __name__ == "__main__":
    portfolio = ProjectManager()
    portfolio.deploy_schoolix()
    portfolio.launch_chatbot()`
  },
  "career_timeline.tsx": {
    type: "react",
    icon: <History size={16} className="text-cyan-400" />,
    content: "// Loading visual timeline component..."
  }
};

// --- 3D Background (Vanilla Three.js) ---

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
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x61dafb, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Responsive Particle Count
    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 200 : 600; 

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
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

    // Microservice Nodes
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

        const positions = [];
        const now = Date.now();
        
        nodes.forEach(node => {
            node.rotation.x += 0.005;
            node.rotation.y += 0.005;
            node.position.y = node.userData.originalPos[1] + Math.sin(now * node.userData.speed + node.userData.offset) * 0.5;
        });

        const linePositions = [];
        for(let i=0; i<nodes.length; i++) {
            for(let j=i+1; j<nodes.length; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                if(dist < 8) {
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
        if(mountRef.current) mountRef.current.innerHTML = '';
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linesGeometry.dispose();
        linesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#0d1117]" />;
}

// --- Specific Views ---

const SkillsView = () => (
    <div className="p-4 md:p-8 h-full overflow-y-auto font-sans text-gray-300 custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-2 sticky top-0 bg-[#1e1e1e] py-4 z-20 shadow-md border-b border-[#2d2d2d]">
            <Braces className="text-yellow-400" /> Technical Capabilities
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            
            {/* Backend Card */}
            <div className="bg-[#1f2428] border border-gray-700 rounded-lg p-5 hover:border-blue-500/50 transition-all hover:translate-y-[-2px]">
                <div className="flex items-center gap-3 mb-4">
                    <Server size={24} className="text-blue-400" />
                    <h2 className="text-lg font-bold text-white">Backend Engineering</h2>
                </div>
                <div className="space-y-3">
                    <div>
                        <span className="text-xs text-gray-500 uppercase font-bold">Core</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">Node.js</span>
                            <span className="px-2 py-1 bg-green-500/10 text-green-300 rounded text-xs">Express.js</span>
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-300 rounded text-xs">FastAPI</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs text-gray-500 uppercase font-bold">Architecture</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">Microservices</span>
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">REST APIs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI/ML Card */}
            <div className="bg-[#1f2428] border border-gray-700 rounded-lg p-5 hover:border-purple-500/50 transition-all hover:translate-y-[-2px]">
                 <div className="flex items-center gap-3 mb-4">
                    <Brain size={24} className="text-purple-400" />
                    <h2 className="text-lg font-bold text-white">AI Integration</h2>
                </div>
                 <div className="space-y-3">
                    <div>
                        <span className="text-xs text-gray-500 uppercase font-bold">Libraries</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">InsightFace</span>
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">OpenCV</span>
                            <span className="px-2 py-1 bg-orange-500/10 text-orange-300 rounded text-xs">LangChain</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        Specialized in integrating ML models (Face Rec, LLMs) into production-grade backend pipelines.
                    </div>
                </div>
            </div>

            {/* Database */}
            <div className="bg-[#1f2428] border border-gray-700 rounded-lg p-5 hover:border-green-500/50 transition-all hover:translate-y-[-2px]">
                <div className="flex items-center gap-3 mb-4">
                    <Database size={24} className="text-green-400" />
                    <h2 className="text-lg font-bold text-white">Data Persistence</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs border border-gray-600">MySQL</span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs border border-gray-600">MongoDB</span>
                </div>
            </div>

            {/* DevOps */}
            <div className="bg-[#1f2428] border border-gray-700 rounded-lg p-5 hover:border-orange-500/50 transition-all hover:translate-y-[-2px]">
                <div className="flex items-center gap-3 mb-4">
                    <Cloud size={24} className="text-orange-400" />
                    <h2 className="text-lg font-bold text-white">DevOps & Cloud</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">Docker</span>
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 rounded text-xs">GitHub Actions</span>
                    <span className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded text-xs">AWS</span>
                </div>
            </div>

        </div>
    </div>
);

const ProjectsView = () => (
     <div className="p-4 md:p-8 h-full overflow-y-auto font-sans text-gray-300 custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-2 sticky top-0 bg-[#1e1e1e] py-4 z-20 shadow-md border-b border-[#2d2d2d]">
            <Briefcase className="text-yellow-400" /> Featured Projects
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            
            {/* Schoolix */}
            <div className="bg-[#1f2428] rounded-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all group hover:translate-y-[-2px]">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">Schoolix ERP</h3>
                        <span className="px-2 py-1 bg-green-900/50 text-green-400 text-[10px] md:text-xs rounded border border-green-700">Production</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-4">
                        Comprehensive school management platform built with microservice principles. Handles student records, billing, and automated reporting.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <Box size={12} className="mr-2" /> MERN Stack, Docker, Caddy
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <Cpu size={12} className="mr-2" /> 50% Efficiency Boost
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Attendance */}
            <div className="bg-[#1f2428] rounded-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all group hover:translate-y-[-2px]">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-400"></div>
                <div className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">AI Face Attendance</h3>
                        <span className="px-2 py-1 bg-blue-900/50 text-blue-400 text-[10px] md:text-xs rounded border border-blue-700">Microservice</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-4">
                        High-performance Python microservice using InsightFace for 96% accurate attendance marking. Integrated into main Node.js backend via REST.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <Box size={12} className="mr-2" /> Python FastAPI, OpenCV
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <Cpu size={12} className="mr-2" /> 70% Faster Processing
                        </div>
                    </div>
                </div>
            </div>

             {/* Chatbot Integration */}
             <div className="bg-[#1f2428] rounded-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all group hover:translate-y-[-2px]">
                <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-400"></div>
                <div className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">Intelligent Chatbot</h3>
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 text-[10px] md:text-xs rounded border border-yellow-700">AI Integration</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-4">
                        Natural language query assistant powered by LLM APIs. Fetches student/transport data via secure SQL queries without manual intervention.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <MessageSquare size={12} className="mr-2" /> Node.js, LLM APIs, REST
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <Cpu size={12} className="mr-2" /> Automated 80% Admin Queries
                        </div>
                    </div>
                </div>
            </div>

        </div>
     </div>
);

const TimelineView = () => (
    <div className="p-4 md:p-8 h-full overflow-y-auto text-gray-300 font-sans custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-xl md:text-2xl font-bold mb-8 text-white border-b border-gray-700 pb-4 sticky top-0 bg-[#1e1e1e] py-4 z-20 shadow-md">Career Timeline</h1>
        
        <div className="relative border-l-2 border-blue-500/30 ml-3 space-y-12 pb-20">
            
            {/* Current */}
            <div className="relative pl-8 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all"></div>
                <div className="bg-[#1f2428] p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all shadow-lg hover:translate-x-1">
                    <span className="text-xs font-mono text-blue-400">Jan 2025 - Present</span>
                    <h3 className="text-base md:text-lg font-bold text-white mt-1">TATA Consultancy Services (TCS)</h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">Assistant System Engineer • Pune</p>
                    <ul className="text-xs md:text-sm space-y-1 text-gray-300">
                        <li className="flex items-start"><ChevronRight size={14} className="mt-1 mr-1 text-blue-500"/> Incident workflows & SLA Tracking</li>
                        <li className="flex items-start"><ChevronRight size={14} className="mt-1 mr-1 text-blue-500"/> Power Automate flows for routing</li>
                        <li className="flex items-start"><ChevronRight size={14} className="mt-1 mr-1 text-blue-500"/> Excel Automation (Python/Macros)</li>
                    </ul>
                </div>
            </div>

            {/* Project/Freelance */}
            <div className="relative pl-8 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-500/20 group-hover:ring-green-500/40 transition-all"></div>
                <div className="bg-[#1f2428] p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all shadow-lg hover:translate-x-1">
                    <span className="text-xs font-mono text-green-400">2024</span>
                    <h3 className="text-base md:text-lg font-bold text-white mt-1">Freelance & Projects</h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">Full Stack Development</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-[#0d1117] p-2 rounded border border-gray-800">
                            <h4 className="font-bold text-green-400 text-xs">Schoolix ERP</h4>
                            <p className="text-[10px] md:text-xs text-gray-500">MERN Stack, Docker, VPS</p>
                        </div>
                        <div className="bg-[#0d1117] p-2 rounded border border-gray-800">
                            <h4 className="font-bold text-purple-400 text-xs">AI Attendance</h4>
                            <p className="text-[10px] md:text-xs text-gray-500">Python, InsightFace</p>
                        </div>
                         <div className="bg-[#0d1117] p-2 rounded border border-gray-800">
                            <h4 className="font-bold text-yellow-400 text-xs">Intelligent Chatbot</h4>
                            <p className="text-[10px] md:text-xs text-gray-500">Node.js, LLM, SQL</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="relative pl-8 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20 group-hover:ring-yellow-500/40 transition-all"></div>
                <div className="bg-[#1f2428] p-4 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all shadow-lg hover:translate-x-1">
                    <span className="text-xs font-mono text-yellow-400">2020 - 2024</span>
                    <h3 className="text-base md:text-lg font-bold text-white mt-1">Government College of Engineering</h3>
                    <p className="text-xs md:text-sm text-gray-400">B.Tech Instrumentation</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">CGPA: 8.13 / 10.0</p>
                </div>
            </div>

        </div>
    </div>
);

const MarkdownPreview = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto font-sans text-gray-300 pb-20 custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
            {lines.map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl md:text-3xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl md:text-2xl font-bold text-blue-400 mt-6 mb-3">{line.replace('## ', '')}</h2>
                if (line.startsWith('### ')) return <h3 key={i} className="text-lg md:text-xl font-bold text-white mt-4 mb-2">{line.replace('### ', '')}</h3>
                if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4 bg-gray-800/30 p-2 rounded-r text-sm md:text-base">{line.replace('> ', '')}</blockquote>
                if (line.startsWith('- ')) {
                    const parts = line.replace('- ', '').split('**');
                    return (
                        <li key={i} className="ml-4 my-1 text-sm md:text-base list-disc text-gray-300">
                             {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-green-400 font-normal">{part}</strong> : part)}
                        </li>
                    )
                }
                return <p key={i} className="min-h-[1.5em] text-sm md:text-base leading-relaxed">{line}</p>
            })}
        </div>
    )
};

const SyntaxHighlighter = ({ content, language }) => {
    const highlight = (text) => {
        if (!text) return "";
        let highlighted = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/(".*?")/g, '<span class="text-[#ce9178]">$1</span>')
            .replace(/\b(const|let|var|function|return|import|export|default|class|if|else|for|while|await|async|def|from)\b/g, '<span class="text-[#569cd6]">$1</span>')
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#569cd6]">$1</span>')
            .replace(/(\/\/.*$)/gm, '<span class="text-[#6a9955]">$1</span>')
            .replace(/(#.*$)/gm, '<span class="text-[#6a9955]">$1</span>') // Python comments
            .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>')
            .replace(/"(\w+)":/g, '<span class="text-[#9cdcfe]">$1</span>:') 
            .replace(/([\{\}\[\]])/g, '<span class="text-[#ffd700]">$1</span>'); 
        return highlighted;
    };

    return (
        <pre className="font-mono text-xs md:text-sm leading-6 p-4 overflow-auto h-full pb-20 custom-scrollbar animate-in fade-in duration-500">
            <code dangerouslySetInnerHTML={{ __html: highlight(content) }} />
        </pre>
    );
};

// --- Main App ---

export default function App() {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openFiles, setOpenFiles] = useState(["README.md", "skills.json", "projects.py"]);
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
  const containerRef = useRef(null);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        // Default: Open on desktop, closed on mobile
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
      "GET /api/v1/projects 200 OK - 45ms",
      "Deploying to AWS EC2 instance...",
      "Running database migration: 20250101_init_schema",
      "Security Audit: JWT verified.",
      "Optimizing SQL queries..."
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
        setTerminalLogs(prev => [...prev.slice(-6), { text: newLog, type: "success" }]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [booting]);

  const handleFileClick = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
    setIsPreviewMode(true);
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
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="font-mono text-sm">Initializing Development Environment...</div>
              <div className="text-xs text-gray-600 mt-2">Loading: Skills, Projects, Timeline...</div>
          </div>
      )
  }

  return (
    <div className="relative w-full h-[100dvh] bg-[#0d1117] text-gray-300 font-sans overflow-hidden flex items-center justify-center">
      <ThreeBackground />

      {/* Main Container - Full Screen Native Look */}
      <div 
        className="relative w-full h-full flex flex-col overflow-hidden bg-[#1e1e1e]/95 backdrop-blur-sm z-10"
      >
        
        {/* Title Bar */}
        <div className="h-10 md:h-8 bg-[#1e1e1e] flex items-center justify-between px-2 select-none border-b border-[#2d2d2d] shrink-0 z-50">
             <div className="flex items-center space-x-2 ml-1 md:ml-2">
                {/* Mobile Hamburger */}
                <button 
                    onClick={() => setSidebarOpen(!isSidebarOpen)} 
                    className="md:hidden p-1 hover:bg-gray-700 rounded text-gray-400"
                >
                    <Menu size={18} />
                </button>
                
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" className="w-4 h-4" alt="VS Code" />
                <span className="text-xs text-gray-400 font-medium hidden xs:inline">Yash Dafade - Portfolio</span>
            </div>
            
            {/* Fake Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:flex items-center justify-center">
               <div className="bg-[#2d2d2d] rounded text-gray-400 text-xs py-1 px-24 border border-[#3e3e42] flex items-center">
                   <Search size={10} className="mr-2" />
                   yash-portfolio
               </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="p-1 hover:bg-gray-700 rounded hidden md:block"><Minimize size={12} className="text-gray-400"/></div>
                <div className="p-1 hover:bg-gray-700 rounded hidden md:block"><Maximize size={12} className="text-gray-400"/></div>
                <div className="p-1 hover:bg-red-600 rounded group"><X size={12} className="text-gray-400 group-hover:text-white"/></div>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-1 h-full overflow-hidden relative">
            
            {/* Activity Bar */}
            <div className="w-12 bg-[#333333] flex flex-col justify-between items-center py-3 border-r border-[#1e1e1e] z-30 shrink-0 hidden md:flex">
              <div className="flex flex-col gap-6">
                <Files 
                    size={24} 
                    className={`cursor-pointer transition-colors ${activeSidebarIndex === 0 && isSidebarOpen ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`} 
                    onClick={() => { setActiveSidebarIndex(0); setSidebarOpen(!isSidebarOpen); }} 
                />
                <Search size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
                <GitGraph size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
                <Bug size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
              </div>
              
              <div className="flex flex-col gap-6 mb-2 items-center">
                {/* User Profile - Beacon Effect + Popup */}
                <div className="relative group">
                    {/* Icon with Beacon Pulse */}
                    <div className="relative cursor-pointer">
                        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-75"></span>
                        <UserCircle size={26} className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#333333] z-20"></div>
                    </div>

                    {/* Popup - Strictly Nested in Group */}
                    <div className="absolute left-10 bottom-0 w-72 bg-[#252526] border border-black shadow-2xl rounded-lg p-0 z-50 overflow-hidden text-sm hidden group-hover:block animate-in fade-in slide-in-from-left-5 duration-200">
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
                
                {/* Settings - Separate */}
                <Settings size={24} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
              </div>
            </div>

            {/* Sidebar (Responsive) */}
            <div className={`
                ${isMobile ? 'absolute top-0 bottom-0 left-0 z-40 w-64 shadow-2xl transition-transform duration-300 ease-in-out' : 'relative w-64 transition-all duration-300'} 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:-translate-x-0 md:hidden'}
                bg-[#252526] flex flex-col border-r border-[#1e1e1e] shrink-0
            `}>
                <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  <span>Explorer</span>
                  <div className="flex gap-2 cursor-pointer hover:text-white" onClick={() => setSidebarOpen(false)}>
                      <MoreHorizontal size={14} />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="px-1 py-1 flex items-center text-xs font-bold text-gray-300 cursor-pointer hover:bg-[#2a2d2e]">
                    <ChevronDown size={14} className="mr-1" />
                    YASH_PORTFOLIO
                  </div>
                  <div className="mt-0">
                    {Object.keys(RESUME_DATA).map((file) => (
                      <div 
                        key={file}
                        onClick={() => handleFileClick(file)}
                        className={`flex items-center px-4 py-1 cursor-pointer text-[13px] hover:bg-[#2a2d2e] transition-colors border-l-2 ${activeFile === file ? 'bg-[#37373d] text-white border-blue-400' : 'text-gray-400 border-transparent'}`}
                      >
                        <span className="mr-2">{RESUME_DATA[file].icon}</span>
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]/80 min-w-0 relative">
                
                {/* Tabs */}
                <div className="flex bg-[#252526] h-9 overflow-x-auto shrink-0 custom-scrollbar">
                    {openFiles.map(file => (
                      <div 
                        key={file} 
                        onClick={() => handleFileClick(file)}
                        className={`group flex items-center px-3 cursor-pointer text-[13px] border-r border-[#1e1e1e] min-w-[120px] max-w-[200px] justify-between ${activeFile === file ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]'}`}
                      >
                        <div className="flex items-center truncate">
                            <span className="mr-2 opacity-80">{RESUME_DATA[file].icon}</span>
                            <span className="truncate">{file}</span>
                        </div>
                        <X size={14} className={`ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-[1px] ${activeFile === file ? 'opacity-100' : ''}`} onClick={(e) => { e.stopPropagation(); closeFile(file); }} />
                      </div>
                    ))}
                </div>

                {/* Breadcrumbs */}
                <div className="h-8 bg-[#1e1e1e] flex items-center px-4 text-xs text-gray-500 border-b border-[#252526] justify-between shrink-0">
                    <div className="flex items-center">
                        <span>src</span>
                        <ChevronRight size={12} className="mx-1" />
                        <span className="text-gray-300 truncate max-w-[150px]">{activeFile || 'Welcome'}</span>
                    </div>
                    
                    {/* View Toggle */}
                    {activeFile && (
                         <div className="flex gap-2">
                            <button 
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className={`p-1 rounded hover:bg-gray-700 ${isPreviewMode ? 'text-white' : 'text-gray-500'}`}
                                title={isPreviewMode ? "Show Code" : "Show Preview"}
                            >
                                {isPreviewMode ? <Code2 size={14} /> : <Columns size={14} />}
                            </button>
                         </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 relative overflow-hidden bg-[#1e1e1e] backdrop-blur-sm">
                    {activeFile ? (
                      isPreviewMode ? (
                          // RICH PREVIEW
                          activeFile === 'skills.json' ? <SkillsView /> :
                          activeFile === 'projects.py' ? <ProjectsView /> :
                          activeFile === 'career_timeline.tsx' ? <TimelineView /> : 
                          <MarkdownPreview content={RESUME_DATA[activeFile].content} />
                      ) : (
                          // CODE VIEW
                          <SyntaxHighlighter 
                            content={RESUME_DATA[activeFile].content} 
                            language={RESUME_DATA[activeFile].type} 
                          />
                      )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-4">
                             <div className="text-6xl md:text-8xl opacity-10 font-mono">{'</>'}</div>
                             <p className="text-sm">Select a file to explore.</p>
                        </div>
                    )}
                </div>

                {/* Terminal */}
                <div className={`bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col shrink-0 ${isMobile ? 'h-32' : 'h-40'}`}>
                    <div className="flex items-center px-4 h-8 gap-6 text-[10px] md:text-[11px] text-gray-400 border-b border-[#252526] uppercase font-bold tracking-wide overflow-x-auto">
                        <span className="text-white border-b border-white py-1 whitespace-nowrap">Terminal</span>
                        <span className="whitespace-nowrap">Output</span>
                        <span className="whitespace-nowrap hidden md:inline">Debug Console</span>
                    </div>
                    <div className="p-2 font-mono text-sm text-gray-300 overflow-y-auto flex-1 custom-scrollbar">
                        {terminalLogs.map((log, i) => (
                             <div key={i} className={`whitespace-nowrap text-[10px] md:text-xs leading-4 md:leading-5 ${log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
                                {log.type === 'success' && <span className="mr-2">➜</span>}
                                {log.text}
                             </div>
                        ))}
                         <div className="animate-pulse inline-block w-2 h-4 bg-gray-400 align-middle ml-1 mt-1"></div>
                    </div>
                </div>

            </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs z-20 font-sans select-none shrink-0">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <GitGraph size={10} md:size={12} />
                    <span className="hidden md:inline">main*</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer">
                    <X size={10} md:size={12} className="rounded-full bg-red-400/20 text-red-200 p-[1px]" />
                    <span>0</span>
                    <span className="text-yellow-200 ml-1">0</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="hidden md:inline">Backend: Online</span>
                </div>
                <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Prettier</span>
            </div>
        </div>

      </div>
      
       <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1e1e1e; }
        ::-webkit-scrollbar-thumb { background: #424242; border: 2px solid #1e1e1e; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #4f4f4f; }
      `}</style>
    </div>
  );
}