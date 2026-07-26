import React, { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { RESUME_DATA, TERMINAL_LOGS_INITIAL, TERMINAL_RANDOM_LOGS } from './data/resumeData';

// Components
import ThreeBackground from './components/ThreeBackground';
import BootScreen from './components/BootScreen';
import TitleBar from './components/TitleBar';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import EditorTabs from './components/EditorTabs';
import Breadcrumbs from './components/Breadcrumbs';
import TerminalPanel from './components/TerminalPanel';
import StatusBar from './components/StatusBar';
import MarkdownPreview from './components/MarkdownPreview';
import SyntaxHighlighter from './components/SyntaxHighlighter';

// Views
import SkillsView from './components/views/SkillsView';
import ProjectsView from './components/views/ProjectsView';
import TimelineView from './components/views/TimelineView';
import ContactView from './components/views/ContactView';
import AIChatPanel from './components/AIChatPanel';

export default function App() {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openFiles, setOpenFiles] = useState(["README.md", "skills.json", "projects.py", "career_timeline.tsx", "connect.sh"]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMode, setSidebarMode] = useState('files');
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [booting, setBooting] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState(TERMINAL_LOGS_INITIAL);
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
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newLog = TERMINAL_RANDOM_LOGS[Math.floor(Math.random() * TERMINAL_RANDOM_LOGS.length)];
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
    setSidebarMode('files');
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

  const handleToggleMode = () => {
    setIsPreviewMode(!isPreviewMode);
    setContentKey(k => k + 1);
  };

  // Close sidebar when switching to chat
  useEffect(() => {
    if (sidebarMode === 'chat') {
      setSidebarOpen(false);
    }
  }, [sidebarMode]);

  // Render the correct view for the active file
  const renderContent = () => {
    if (sidebarMode === 'chat') return null;

    if (!activeFile) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-4">
          <div className="text-6xl md:text-8xl opacity-10 font-mono">{'</>'}</div>
          <p className="text-sm">Select a file to explore.</p>
        </div>
      );
    }

    if (isPreviewMode) {
      switch (activeFile) {
        case 'skills.json':
          return <SkillsView />;
        case 'projects.py':
          return <ProjectsView />;
        case 'career_timeline.tsx':
          return <TimelineView />;
        case 'connect.sh':
          return <ContactView />;
        default:
          return <MarkdownPreview content={RESUME_DATA[activeFile].content} />;
      }
    }

    return <SyntaxHighlighter content={RESUME_DATA[activeFile].content} />;
  };

  if (booting) {
    return <BootScreen />;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0d1117] text-gray-300 font-sans overflow-hidden flex items-center justify-center">
      <ThreeBackground />

      {/* Main VS Code Window */}
      <div className="window-glow relative w-full h-full md:w-[95vw] md:h-[85vh] max-w-[1600px] flex flex-col overflow-hidden bg-[#1e1e1e] rounded-none md:rounded-lg border-0 md:border border-[#333] shadow-2xl z-10 anim-scale-in">

        <TitleBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Workspace */}
        <div className="flex flex-1 h-full overflow-hidden relative">

          <ActivityBar
            sidebarMode={sidebarMode}
            setSidebarMode={setSidebarMode}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <Sidebar
            isMobile={isMobile}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeFile={activeFile}
            onFileClick={handleFileClick}
          />

          {/* Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]/80 min-w-0 relative">

            {sidebarMode !== 'chat' && (
              <>
                <EditorTabs
                  openFiles={openFiles}
                  activeFile={activeFile}
                  onFileClick={handleFileClick}
                  onCloseFile={closeFile}
                />

                <Breadcrumbs
                  activeFile={activeFile}
                  isPreviewMode={isPreviewMode}
                  onToggleMode={handleToggleMode}
                />
              </>
            )}

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-[#1e1e1e] backdrop-blur-sm">
              {/* Chat panel — always mounted to preserve history */}
              <div className={`absolute inset-0 z-10 ${sidebarMode === 'chat' ? 'block anim-fade-up' : 'hidden'}`}>
                <AIChatPanel onCloseChat={() => setSidebarMode('files')} />
              </div>

              {/* File content — hidden during chat */}
              <div className={`h-full ${sidebarMode === 'chat' ? 'hidden' : 'block'}`} key={contentKey}>
                {renderContent()}

                <button
                  onClick={() => setSidebarMode('chat')}
                  className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 transition-all shadow-lg z-20 anim-fade-in group"
                >
                  <Bot size={16} className="shrink-0" />
                  <span className="hidden sm:inline">Ask me anything</span>
                  <Sparkles size={12} className="text-purple-400/60 group-hover:text-purple-300/80 transition-colors" />
                </button>
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sidebarMode === 'chat' ? 'max-h-0 opacity-0' : 'max-h-48 opacity-100'}`}>
              <TerminalPanel terminalLogs={terminalLogs} isMobile={isMobile} />
            </div>

          </div>
        </div>

        <StatusBar sidebarMode={sidebarMode} />

      </div>
    </div>
  );
}