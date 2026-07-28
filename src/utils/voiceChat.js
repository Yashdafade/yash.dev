/**
 * VoiceChat — Gemini Live API WebSocket manager
 * Handles bidirectional audio streaming with real-time volume analysis.
 */

const INPUT_SAMPLE_RATE = 16000;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

export class VoiceChatSession {
  constructor(apiKey, systemPrompt, voiceName = 'Kore') {
    this.apiKey = apiKey;
    this.systemPrompt = systemPrompt;
    this.state = 'idle'; // idle | connected | listening | thinking | speaking
    
    this.isMuted = false;
    this.isSpeakerMuted = false;
    this.recognition = null;
    this.micStream = null;
    this.audioContext = null;
    this.scriptNode = null;
    this.micSource = null;
    this.chatHistory = [];
    
    this.accumulatedTranscript = '';
    this.silenceTimer = null;
    this.fakeVolumeTimer = null;
    this.typeInterval = null;
    this.currentFullText = '';

    // Callbacks
    this.onStateChange = () => {};
    this.onInputVolumeChange = () => {};
    this.onOutputVolumeChange = () => {};
    this.onError = () => {};
    this.onTranscript = () => {};
    this.onAudit = () => {};
  }

  setState(newState) {
    this.state = newState;
    this.onStateChange(newState);
  }

  async connect() {
    try {
      this.setState('connected');
      
      // Stop any existing speech
      window.speechSynthesis.cancel();
      
      // Initialize mic for volume visualization
      await this._startMicVisualization();
      
      // Initialize Speech Recognition
      this._startRecognition();

      this.setState('listening');
      
      // Initial greeting
      setTimeout(() => {
        const greeting = "Hi there! I am Emmet, Yash's AI assistant. I'm listening, how can I help you?";
        this.chatHistory.push({ role: 'model', parts: [{ text: greeting }] });
        this._speakText(greeting);
      }, 500);

    } catch (err) {
      this.onError(err);
      this.disconnect();
    }
  }

  async _startMicVisualization() {
    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: INPUT_SAMPLE_RATE });
      this.micSource = this.audioContext.createMediaStreamSource(this.micStream);
      
      this.scriptNode = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.scriptNode.onaudioprocess = (e) => {
        if (this.state !== 'listening' || this.isMuted) {
          this.onInputVolumeChange(0);
          return;
        }
        const inputData = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
        const rms = Math.sqrt(sum / inputData.length);
        this.onInputVolumeChange(Math.min(1, rms * 6));
      };

      this.micSource.connect(this.scriptNode);
      this.scriptNode.connect(this.audioContext.destination);
    } catch (err) {
      throw new Error('Microphone access denied or not supported.');
    }
  }

  _startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.onError(new Error("Your browser does not support voice recognition. Try Chrome."));
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      if (this.state !== 'listening' || this.isMuted) return;

      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.accumulatedTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const displayTranscript = this.accumulatedTranscript + interim;
      if (displayTranscript.trim()) {
        this.onTranscript(displayTranscript, 'user', false);
      }

      // Reset silence timer
      clearTimeout(this.silenceTimer);
      if (this.accumulatedTranscript.trim() && !interim) {
        this.silenceTimer = setTimeout(() => {
          this._processUserTurn();
        }, 1500); // 1.5 seconds of silence triggers send
      }
    };

    this.recognition.onend = () => {
      if (this.state === 'listening' && this.recognition) {
        try { this.recognition.start(); } catch (e) {}
      }
    };

    try { this.recognition.start(); } catch (e) {}
  }

  async _processUserTurn() {
    const text = this.accumulatedTranscript.trim();
    this.accumulatedTranscript = '';
    if (!text) return;

    this.setState('thinking');
    if (this.recognition) this.recognition.stop();
    
    // Add to history
    this.chatHistory.push({ role: 'user', parts: [{ text }] });
    if (this.chatHistory.length > 6) this.chatHistory = this.chatHistory.slice(-6);

    try {
      const payload = {
        contents: this.chatHistory,
        systemInstruction: { parts: [{ text: this.systemPrompt + "\n\nIMPORTANT: You are in a voice conversation. Keep responses natural and conversational. You may use markdown (bullet points, bold text, links) as they will be displayed on screen, but the user is listening to you, so keep the actual text concise." }] }
      };

      const res = await fetch(`${API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'API Error');
      
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I did not understand that.';
      
      this.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
      this.onAudit(text, reply);
      
      this._speakText(reply);
      
    } catch (err) {
      this.onError(err);
      this._speakText("I'm having trouble connecting to my brain. Please try again.");
    }
  }

  _speakText(text) {
    const murfKey = import.meta.env.VITE_MURF_API_KEY;
    if (murfKey && murfKey.trim().length > 0 && murfKey !== 'your_murf_api_key_here') {
      this._speakWithMurf(text, murfKey);
    } else {
      this._speakWithBrowser(text);
    }
  }

  async _speakWithMurf(text, murfKey) {
    this.currentFullText = text;
    this.setState('speaking');
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    
    if (this.typeInterval) clearInterval(this.typeInterval);
    
    let charIdx = 0;
    const speedMs = 1000 / (18 * 1.05);
    this.typeInterval = setInterval(() => {
      charIdx += 2; 
      if (charIdx < text.length) {
        this.onTranscript(text.slice(0, charIdx), 'assistant', false);
      } else {
        clearInterval(this.typeInterval);
        this.onTranscript(text, 'assistant', true);
      }
    }, speedMs * 2);
    
    // Clean text for speech synthesis (remove URLs, markdown links, asterisks)
    let speechText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); 
    speechText = speechText.replace(/https?:\/\/[^\s]+/g, 'the link provided'); 
    speechText = speechText.replace(/\*\*/g, '').replace(/\*/g, ''); 
    
    try {
      const response = await fetch('https://global.api.murf.ai/v1/speech/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': murfKey
        },
        body: JSON.stringify({
          voiceId: "Judith",
          style: "Conversational",
          text: speechText,
          "rate": 35,
          locale: "en-US",
          model: "FALCON",
          format: "MP3",
          sampleRate: 24000,
          channelType: "MONO"
        })
      });

      if (!response.ok) throw new Error(`Murf API Error: ${response.status}`);

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.muted = this.isSpeakerMuted;
      this.currentAudio = audio;

      // Fake volume for sphere animation while speaking
      this.fakeVolumeTimer = setInterval(() => {
        this.onOutputVolumeChange(Math.random() * 0.4 + 0.2);
      }, 100);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        clearInterval(this.fakeVolumeTimer);
        this.onOutputVolumeChange(0);
        
        if (this.state !== 'idle') {
          this.setState('listening');
          if (this.recognition) {
            try { this.recognition.start(); } catch (e) {}
          }
        }
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
        clearInterval(this.fakeVolumeTimer);
        this.onOutputVolumeChange(0);
        this.setState('listening');
      };

      await audio.play();
    } catch (err) {
      console.error("Failed to play Murf TTS:", err);
      clearInterval(this.fakeVolumeTimer);
      this.onOutputVolumeChange(0);
      this.setState('listening');
    }
  }

  _speakWithBrowser(text) {
    this.currentFullText = text;
    this.setState('speaking');
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    
    if (this.typeInterval) clearInterval(this.typeInterval);
    
    let charIdx = 0;
    // Estimate TTS speaking speed to sync the text printing (~18 chars per second)
    const speedMs = 1000 / (18 * 1.05);
    this.typeInterval = setInterval(() => {
      charIdx += 2; // Print 2 chars at a time for smoother feel
      if (charIdx < text.length) {
        this.onTranscript(text.slice(0, charIdx), 'assistant', false);
      } else {
        clearInterval(this.typeInterval);
        this.onTranscript(text, 'assistant', true);
      }
    }, speedMs * 2);
    
    // Clean text for speech synthesis (remove URLs, markdown links, asterisks)
    let speechText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // [Text](url) -> Text
    speechText = speechText.replace(/https?:\/\/[^\s]+/g, 'the link provided'); // raw URLs
    speechText = speechText.replace(/\*\*/g, '').replace(/\*/g, ''); // markdown bold/italic
    
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; // Keep at 1.0, modifying pitch degrades neural voice quality
    utterance.volume = this.isSpeakerMuted ? 0 : 1;
    
    // Prioritize high-quality neural voices
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name === 'Google US English') || 
                           voices.find(v => v.name.includes('Jenny Online (Natural)')) || 
                           voices.find(v => v.name.includes('Samantha')) || 
                           voices.find(v => v.name.includes('Google UK English Female')) ||
                           voices.find(v => v.name.includes('Aria Online (Natural)')) ||
                           voices.find(v => v.name.includes('Female')) ||
                           voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    // Fake volume for sphere animation while speaking
    this.fakeVolumeTimer = setInterval(() => {
      this.onOutputVolumeChange(Math.random() * 0.4 + 0.2);
    }, 100);

    utterance.onend = () => {
      clearInterval(this.fakeVolumeTimer);
      this.onOutputVolumeChange(0);
      
      if (this.state !== 'idle') {
        this.setState('listening');
        if (this.recognition) {
          try { this.recognition.start(); } catch (e) {}
        }
      }
    };
    
    utterance.onerror = () => {
      clearInterval(this.fakeVolumeTimer);
      this.onOutputVolumeChange(0);
      this.setState('listening');
      if (this.recognition) {
        try { this.recognition.start(); } catch (e) {}
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  disconnect() {
    clearTimeout(this.silenceTimer);
    clearInterval(this.fakeVolumeTimer);
    if (this.typeInterval) clearInterval(this.typeInterval);
    window.speechSynthesis.cancel();
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    
    if (this.recognition) {
      this.recognition.onend = null;
      this.recognition.stop();
      this.recognition = null;
    }
    
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.scriptNode) {
      this.scriptNode.disconnect();
      this.scriptNode = null;
    }
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }

    this.setState('idle');
    this.onInputVolumeChange(0);
    this.onOutputVolumeChange(0);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  toggleSpeakerMute() {
    this.isSpeakerMuted = !this.isSpeakerMuted;
    
    // For Murf Audio API
    if (this.currentAudio) {
      this.currentAudio.volume = this.isSpeakerMuted ? 0 : 1;
      this.currentAudio.muted = this.isSpeakerMuted;
    }
    
    // For Browser TTS: pause and resume so it can actually be unmuted mid-sentence
    if (window.speechSynthesis.speaking) {
      if (this.isSpeakerMuted) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
    
    return this.isSpeakerMuted;
  }

  skipSpeech() {
    if (this.state !== 'speaking') return;
    
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
      this.typeInterval = null;
      if (this.currentFullText) {
        this.onTranscript(this.currentFullText, 'assistant', true);
      }
    }
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      if (this.currentAudio.onended) this.currentAudio.onended();
    } else {
      window.speechSynthesis.resume(); // Fix Chrome cancel bug
      window.speechSynthesis.cancel();
      clearInterval(this.fakeVolumeTimer);
      this.onOutputVolumeChange(0);
      
      this.setState('listening');
      if (this.recognition) {
        try { this.recognition.start(); } catch (e) {}
      }
    }
  }
}
