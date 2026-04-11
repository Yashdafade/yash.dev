import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openFiles, setOpenFiles] = useState(["README.md", "skills.json", "projects.py", "career_timeline.tsx", "connect.sh"]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
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

  // Render the correct view for the active file
  const renderContent = () => {
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
    <div className="relative w-full h-[100dvh] bg-[#0d1117] text-gray-300 font-sans overflow-hidden flex items-center justify-center">
      <ThreeBackground />

      {/* Main VS Code Window */}
      <div className="window-glow relative w-[95vw] h-[92vh] md:w-[95vw] md:h-[85vh] max-w-[1600px] flex flex-col overflow-hidden bg-[#1e1e1e] rounded-lg border border-[#333] shadow-2xl z-10 anim-scale-in">

        <TitleBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Workspace */}
        <div className="flex flex-1 h-full overflow-hidden relative">

          <ActivityBar
            activeSidebarIndex={activeSidebarIndex}
            isSidebarOpen={isSidebarOpen}
            setActiveSidebarIndex={setActiveSidebarIndex}
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

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-[#1e1e1e] backdrop-blur-sm" key={contentKey}>
              {renderContent()}
            </div>

            <TerminalPanel terminalLogs={terminalLogs} isMobile={isMobile} />

          </div>
        </div>

        <StatusBar />

      </div>
    </div>
  );
}