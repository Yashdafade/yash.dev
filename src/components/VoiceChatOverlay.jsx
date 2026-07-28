import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, X, Loader2, Volume2, VolumeX, FastForward } from 'lucide-react';
import VoiceSphere from './VoiceSphere';
import { VoiceChatSession } from '../utils/voiceChat';
import { renderFormattedText } from './AIChatPanel';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const STATUS_LABELS = {
  idle: '',
  connecting: 'Connecting to EMMET...',
  connected: 'Setting up voice...',
  listening: 'Listening...',
  speaking: 'EMMET is speaking...',
};

export default function VoiceChatOverlay({ isOpen, onClose, systemPrompt, onAudit }) {
  const [state, setState] = useState('idle');
  const [inputVolume, setInputVolume] = useState(0);
  const [outputVolume, setOutputVolume] = useState(0);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [hasStarted, setHasStarted] = useState(false); // To wait for user click before Mic request
  
  const sessionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Auto-scroll transcripts
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [transcripts]);

  // Animate in and Auto-start
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setHasStarted(true); // Automatically start
      setTranscripts([]);
      requestAnimationFrame(() => setVisible(true));
      
      // Auto-start the session immediately since they already clicked a button to open this
      // We need a tiny delay to ensure the DOM is ready and state is flushed
      setTimeout(() => {
        startSession();
      }, 100);
    } else {
      setVisible(false);
      handleCloseSession();
    }
  }, [isOpen]);

  const startSession = () => {
    if (!API_KEY) {
      setError("API Key missing");
      return;
    }

    const session = new VoiceChatSession(API_KEY, systemPrompt, 'Kore');
    sessionRef.current = session;

    session.onStateChange = (s) => setState(s);
    session.onInputVolumeChange = (v) => setInputVolume(v);
    session.onOutputVolumeChange = (v) => setOutputVolume(v);
    session.onError = (err) => {
      console.error('Voice chat error:', err);
      setError(err.message || 'Connection failed. Please check mic permissions.');
    };
    
    session.onAudit = (q, a) => {
      if (onAudit) onAudit(q, a);
    };
    
    session.onTranscript = (text, role, isFinal = true) => {
      setTranscripts(prev => {
        const newTranscripts = [...prev];
        // If it's a non-final interim result from the user, update the last user message or add a new one
        if (role === 'user' && !isFinal) {
          if (newTranscripts.length > 0 && newTranscripts[newTranscripts.length - 1].role === 'user' && !newTranscripts[newTranscripts.length - 1].isFinal) {
            newTranscripts[newTranscripts.length - 1] = { ...newTranscripts[newTranscripts.length - 1], text };
          } else {
            newTranscripts.push({ role, text, isFinal: false });
          }
        } 
        // If it's a final result from user
        else if (role === 'user' && isFinal) {
          if (newTranscripts.length > 0 && newTranscripts[newTranscripts.length - 1].role === 'user' && !newTranscripts[newTranscripts.length - 1].isFinal) {
            newTranscripts[newTranscripts.length - 1] = { ...newTranscripts[newTranscripts.length - 1], text, isFinal: true };
          } else {
            newTranscripts.push({ role, text, isFinal: true });
          }
        }
        // For assistant, handle streaming (isFinal=false) and final
        else {
          if (newTranscripts.length > 0 && newTranscripts[newTranscripts.length - 1].role === 'assistant' && !newTranscripts[newTranscripts.length - 1].isFinal) {
            newTranscripts[newTranscripts.length - 1] = { ...newTranscripts[newTranscripts.length - 1], text, isFinal };
          } else {
            newTranscripts.push({ role, text, isFinal });
          }
        }
        return newTranscripts;
      });
    };

    session.connect();
  };

  const handleCloseSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }
    setState('idle');
    setInputVolume(0);
    setOutputVolume(0);
    setIsMuted(false);
    setIsSpeakerMuted(false);
  }, []);

  const handleClose = () => {
    handleCloseSession();
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const toggleMute = () => {
    if (sessionRef.current) {
      const muted = sessionRef.current.toggleMute();
      setIsMuted(muted);
    }
  };

  const toggleSpeakerMute = () => {
    if (sessionRef.current) {
      const speakerMuted = sessionRef.current.toggleSpeakerMute();
      setIsSpeakerMuted(speakerMuted);
    }
  };

  const handleSkip = () => {
    if (sessionRef.current) {
      sessionRef.current.skipSpeech();
    }
  };

  if (!isOpen) return null;

  const statusText = error || STATUS_LABELS[state] || '';
  const isConnecting = state === 'connecting' || state === 'connected';
  const isActive = state === 'listening' || state === 'speaking';

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-500 ease-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0d1117] transition-opacity duration-500" />

      {!hasStarted ? null : (
        <div className="absolute inset-0 z-10 flex flex-col md:flex-row transition-all duration-700 ease-out scale-100 overflow-hidden">
          
          {/* Left Side: Sphere Area */}
          <div className="flex-1 min-h-0 min-w-0 flex flex-col items-center justify-center relative p-8 h-full">
            <div className={`transition-all duration-700 ease-out ${isActive ? 'scale-100' : isConnecting ? 'scale-90 opacity-70' : 'scale-75 opacity-50'}`}>
              <VoiceSphere
                state={state}
                inputVolume={inputVolume}
                outputVolume={outputVolume}
              />
            </div>

            {/* Status Text */}
            <div className="mt-12 text-center space-y-2 h-16">
              <p className={`text-lg font-medium transition-colors duration-300 ${error ? 'text-red-400' : state === 'speaking' ? 'text-purple-300' : state === 'listening' ? 'text-white' : 'text-gray-400'}`}>
                {isConnecting && <Loader2 size={18} className="inline animate-spin mr-3" />}
                {statusText}
              </p>
              {isActive && (
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  {state === 'listening' ? 'Speak to EMMET' : 'Voice: Kore'}
                </p>
              )}
            </div>

            {/* Controls */}
            {isActive && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 max-w-sm mx-auto">
                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleMute}
                    className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${isMuted ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border`}
                  >
                    {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-500">{isMuted ? 'Mic Muted' : 'Mic On'}</p>
                </div>
                
                {state === 'speaking' && (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleSkip}
                      className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30 border"
                    >
                      <FastForward size={22} />
                    </button>
                    <p className="text-xs text-center mt-3 text-gray-500">Skip</p>
                  </div>
                )}
                
                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleSpeakerMute}
                    className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${isSpeakerMuted ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 hover:bg-orange-500/30' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border`}
                  >
                    {isSpeakerMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-500">{isSpeakerMuted ? 'Voice Off' : 'Voice On'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Transcripts Area */}
          <div ref={scrollContainerRef} className="flex-1 min-h-0 min-w-0 md:border-l md:border-white/10 overflow-y-auto h-full scroll-smooth relative">
            <div className="w-full max-w-2xl mx-auto px-6 md:px-12 pb-20">
              <div className="sticky top-0 bg-[#0d1117]/80 backdrop-blur-md z-10 pt-6 md:pt-12 pb-4 mb-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Live Transcript</h3>
                <button onClick={handleClose} className="p-2 -mr-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              {transcripts.length === 0 && !error && (
                <div className="text-gray-500 text-center italic mt-10">
                  Waiting for conversation to begin...
                </div>
              )}

              <div className="space-y-6">
                {transcripts.map((t, idx) => (
                  <div key={idx} className={`flex flex-col ${t.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-gray-500 mb-1 px-2 uppercase tracking-wider">
                      {t.role === 'user' ? 'You' : 'EMMET'}
                    </span>
                    <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      t.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-white/10 text-gray-200 rounded-tl-sm'
                    } ${!t.isFinal && t.role === 'user' ? 'opacity-70 italic' : ''}`}>
                      {t.role === 'user' ? t.text : renderFormattedText(t.text)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
