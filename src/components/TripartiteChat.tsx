import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  CheckCircle2,
  RotateCcw,
  Bot,
  User,
  Sliders,
  Play,
  Lightbulb,
  Image as ImageIcon,
  Globe,
  Download,
  Maximize2,
  X,
  Paperclip,
  Search,
  Eye,
  ExternalLink,
  Wand2,
  Monitor,
  MonitorOff,
  ScreenShare,
  HelpCircle,
  Camera,
  AlertTriangle,
  RefreshCw,
  Info,
  Edit3,
  ImagePlus,
  Copy,
  Check,
  CornerDownLeft,
} from 'lucide-react';
import { ChatMessage, PersonalityTraits, TripartiteAnalysis, BrainMode, UserIdentity } from '../types/roam';
import { MarkdownRenderer } from './MarkdownRenderer';
import { RoamLogoAnimated } from './RoamLogoAnimated';
import { synthesizeGenerativeResponse } from '../lib/roamGenerativeEngine';

interface TripartiteChatProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  personality: PersonalityTraits;
  setPersonality: React.Dispatch<React.SetStateAction<PersonalityTraits>>;
  onAwardXp: (amount: number, reason: string) => void;
  voiceEnabled: boolean;
  user?: UserIdentity;
  onOpenManualModal?: () => void;
}

export const TripartiteChat: React.FC<TripartiteChatProps> = ({
  messages = [],
  setMessages,
  personality,
  setPersonality,
  onAwardXp,
  voiceEnabled,
  user,
  onOpenManualModal,
}) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [brainMode, setBrainMode] = useState<BrainMode>('auto');
  const [enableWebSearch, setEnableWebSearch] = useState(true);
  const [imageGenModalOpen, setImageGenModalOpen] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [selectedImageSize, setSelectedImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [selectedTripartiteMsg, setSelectedTripartiteMsg] = useState<TripartiteAnalysis | null>(
    messages?.[0]?.tripartiteData || null
  );
  const [isListening, setIsListening] = useState(false);
  const [isGeneratingImageLoading, setIsGeneratingImageLoading] = useState(false);
  const [showMobileInspector, setShowMobileInspector] = useState(false);

  // Client-side instant image intent detector
  const isClientImagePrompt = (text: string): boolean => {
    if (!text || typeof text !== 'string') return false;
    const lower = text.trim().toLowerCase();
    if (
      lower.startsWith('analyse') ||
      lower.startsWith('décris') ||
      lower.startsWith('que vois-tu') ||
      lower.startsWith('comment') ||
      lower.startsWith('explique')
    ) {
      return false;
    }
    if (
      lower.startsWith('/image') ||
      lower.startsWith('/photo') ||
      lower.startsWith('/dessine') ||
      lower.startsWith('/draw') ||
      lower.startsWith('/img')
    ) {
      return true;
    }
    return (
      /^(s'il te plaît\s*,?\s*|peux-tu\s+(me\s+)?|stp\s*,?\s*|je\s+veux\s+|fais(-moi)?\s+|fais\s+moi\s+|génère(-moi)?\s+|génère\s+moi\s+|génère\s+|crée(-moi)?\s+|crée\s+moi\s+|crée\s+|dessine(-moi)?\s+|dessine\s+moi\s+|dessine\s+|peins(-moi)?\s+|peins\s+|affiche(-moi)?\s+|montre(-moi)?\s+|make\s+|create\s+|generate\s+|draw\s+)?(une\s+image|une\s+photo|une\s+illustration|un\s+visuel|un\s+dessin|un\s+portrait|un\s+paysage|un\s+tableau|un\s+logo|a\s+photo|an\s+image|a\s+picture|a\s+drawing)\b/i.test(
        lower
      ) || /^(image|photo|illustration|dessin|tableau)\s+(de|d'un|d'une|of)\s+/i.test(lower)
    );
  };

  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const handleCopyMessageText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleEditUserMessage = (text: string) => {
    setInputText(text);
    const textarea = document.querySelector('textarea');
    if (textarea) textarea.focus();
  };

  const handleRegenerateLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUser && lastUser.text) {
      handleSendMessageWithPayload(lastUser.text);
    }
  };
  const [attachedImage, setAttachedImage] = useState<{
    dataUrl: string;
    name: string;
    mimeType: string;
    sizeKb: number;
  } | null>(null);

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);

  // Fullscreen image viewer
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Engine Selection: Gemini 3.7 vs ChatGPT / GPT-4o
  const [selectedEngine, setSelectedEngine] = useState<'gemini' | 'chatgpt'>('gemini');

  // Screen Sharing State & Continuous Auto-Observation
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [screenMinimized, setScreenMinimized] = useState(false);
  const [isCapturingScreen, setIsCapturingScreen] = useState(false);
  const [continuousObserve, setContinuousObserve] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const continuousTimerRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, attachedImage, isScreenSharing]);

  // Connect stream to video element when active
  useEffect(() => {
    if (screenVideoRef.current && screenStream) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream, isScreenSharing, screenMinimized]);

  // Continuous screen observation loop
  useEffect(() => {
    if (continuousObserve && isScreenSharing) {
      continuousTimerRef.current = setInterval(() => {
        if (!loading && !isCapturingScreen) {
          handleDiagnoseScreen("Observation continue : Analyse ce qui a changé à mon écran et dis-moi ce que je dois faire.");
        }
      }, 25000);
    } else {
      if (continuousTimerRef.current) {
        clearInterval(continuousTimerRef.current);
        continuousTimerRef.current = null;
      }
    }
    return () => {
      if (continuousTimerRef.current) clearInterval(continuousTimerRef.current);
    };
  }, [continuousObserve, isScreenSharing, loading, isCapturingScreen]);

  // Clean up screen sharing on unmount
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach((t) => t.stop());
      }
      if (continuousTimerRef.current) clearInterval(continuousTimerRef.current);
    };
  }, [screenStream]);

  const [playingSpeechMsgId, setPlayingSpeechMsgId] = useState<string | null>(null);

  // Strictly manual speech synthesis (only triggers on explicit user click)
  const handleToggleSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("La synthèse vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (playingSpeechMsgId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingSpeechMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`~]/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/```[\s\S]*?```/g, 'Bloc de code.')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.05;

    utterance.onstart = () => {
      setPlayingSpeechMsgId(msgId);
    };
    utterance.onend = () => {
      setPlayingSpeechMsgId(null);
    };
    utterance.onerror = () => {
      setPlayingSpeechMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start Screen Sharing with Auto-Observation
  const handleStartScreenShare = async () => {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert("Le partage d'écran n'est pas supporté par votre navigateur ou est restreint.");
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor',
        } as any,
        audio: false,
      });

      setScreenStream(stream);
      setIsScreenSharing(true);
      setScreenMinimized(false);

      // Handle user stopping share from browser UI
      stream.getVideoTracks()[0].onended = () => {
        handleStopScreenShare();
      };

      // Automatically trigger initial live observation after short delay for video frame buffer
      setTimeout(() => {
        handleDiagnoseScreen("Analyse mon écran en direct. Indique clairement ce que tu vois actuellement et ce que je dois faire concrètement.");
      }, 1000);
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        console.warn("Erreur lors de l'activation du partage d'écran :", err);
      }
    }
  };

  // Stop Screen Sharing
  const handleStopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    setScreenStream(null);
    setIsScreenSharing(false);
    setContinuousObserve(false);
  };

  // Capture current screen frame & analyze with Roam AI (Live Perception & Guidance)
  const handleDiagnoseScreen = async (customPrompt?: string) => {
    if (!screenVideoRef.current || !screenStream) {
      alert("Aucun flux d'écran actif à capturer.");
      return;
    }

    setIsCapturingScreen(true);

    try {
      const video = screenVideoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Impossible de créer le contexte de capture');

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      const capturedAttachment = {
        dataUrl,
        name: `capture-ecran-${Date.now()}.jpg`,
        mimeType: 'image/jpeg',
        sizeKb: Math.round(dataUrl.length / 1024),
      };

      const promptToUse =
        customPrompt ||
        inputText.trim() ||
        "Analyse mon écran en direct. Décris fidèlement ce que tu vois actuellement et donne-moi les actions concrètes que je dois faire pas à pas.";

      // Send directly with captured image
      await handleSendMessageWithPayload(promptToUse, false, capturedAttachment);
    } catch (err: any) {
      console.error('Erreur lors du diagnostic écran :', err);
      alert('Impossible de capturer le flux vidéo : ' + err.message);
    } finally {
      setIsCapturingScreen(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (PNG, JPEG, WEBP, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAttachedImage({
        dataUrl,
        name: file.name,
        mimeType: file.type,
        sizeKb: Math.round(file.size / 1024),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSendMessageWithPayload = async (
    textToSend: string,
    forceImageGen = false,
    directAttachment?: { dataUrl: string; name: string; mimeType: string; sizeKb: number } | null
  ) => {
    const payloadImage = directAttachment || attachedImage;
    if ((!textToSend.trim() && !payloadImage) || loading) return;

    const actualPrompt = textToSend.trim() || (payloadImage ? 'Analyse en détail cette capture et résous le problème.' : '');
    const isImageRequest = forceImageGen || (!payloadImage && isClientImagePrompt(actualPrompt));

    const userMsgId = 'usr-' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: actualPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageAttachment: payloadImage
        ? {
            dataUrl: payloadImage.dataUrl,
            name: payloadImage.name,
            mimeType: payloadImage.mimeType,
          }
        : undefined,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setAttachedImage(null);
    setLoading(true);
    setIsGeneratingImageLoading(isImageRequest);

    const conversationHistory = messages
      .slice(-8)
      .filter((m) => m.text && (m.sender === 'user' || m.sender === 'roam'))
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    try {
      const res = await fetch('/api/roam/tripartite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: actualPrompt,
          conversationHistory,
          engine: selectedEngine,
          personality,
          systemMode: brainMode !== 'auto' ? brainMode : undefined,
          enableWebSearch,
          generateImage: isImageRequest,
          aspectRatio: selectedAspectRatio,
          imageSize: selectedImageSize,
          imageAttachment: payloadImage
            ? {
                dataUrl: payloadImage.dataUrl,
                mimeType: payloadImage.mimeType,
              }
            : undefined,
          context: {
            architect: user?.name || 'Architecte Souverain',
            userEmail: user?.email || '',
            activeProject: "ROAM’S.AI V1.0",
            localTime: new Date().toISOString(),
          },
        }),
      });

      let data: TripartiteAnalysis;

      if (!res.ok) {
        let errMessage = `Erreur serveur (${res.status})`;
        try {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errorData = await res.json();
            errMessage = errorData.error || errorData.message || errorData.finalResponse || errMessage;
          } else {
            await res.text();
          }
        } catch {
          // Ignore secondary parse error
        }
        throw new Error(errMessage);
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const textData = await res.text();
        try {
          data = JSON.parse(textData);
        } catch {
          throw new Error("Réponse serveur non-JSON, activation du relais souverain.");
        }
      }

      const roamMsgId = 'roam-' + Date.now();
      const roamMsg: ChatMessage = {
        id: roamMsgId,
        sender: 'roam',
        text: data.finalResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tripartiteData: data,
        modeUsed: brainMode === 'auto' ? 'Tripartite Complet' : `Mode ${brainMode.toUpperCase()}`,
        groundingSources: data.groundingSources,
        generatedImage: data.generatedImage,
        isImageGeneration: data.isImageGeneration,
        imageGenerationFailed: data.imageGenerationFailed,
      };

      setMessages((prev) => [...prev, roamMsg]);
      setSelectedTripartiteMsg(data);

      if (data.recommendedRewardXp) {
        onAwardXp(data.recommendedRewardXp, `Interaction Cerveau (${data.moodDetected || 'constructive'})`);
      }

      // Check if system 3 suggested a subtle personality evolution
      if (data.system3?.personalityAdjustment) {
        setPersonality((prev) => ({
          ...prev,
          lastEvolutionNote: data.system3.personalityAdjustment,
        }));
      }
    } catch (err: any) {
      console.warn('Tripartite network fallback engaged:', err);

      // Seamless Generative Neural Core Fallback (ChatGPT / DeepSeek R1 grade)
      const fallbackGen = synthesizeGenerativeResponse(
        actualPrompt,
        conversationHistory,
        personality,
        { name: user?.name, role: user?.roleTitle }
      );

      const roamMsgId = 'roam-' + Date.now();
      const roamMsg: ChatMessage = {
        id: roamMsgId,
        sender: 'roam',
        text: fallbackGen.finalResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tripartiteData: fallbackGen as any,
        modeUsed: 'ROAM Génératif Souverain',
      };

      setMessages((prev) => [...prev, roamMsg]);
      setSelectedTripartiteMsg(fallbackGen as any);

      if (fallbackGen.recommendedRewardXp) {
        onAwardXp(fallbackGen.recommendedRewardXp, 'Interaction Générative Souveraine');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (customText?: string, forceImageGen = false) => {
    await handleSendMessageWithPayload(customText || inputText, forceImageGen);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.warn('Voice error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickPrompts = [
    { label: '🖥️ Scanner mon écran', action: () => handleDiagnoseScreen() },
    { label: '🚀 Avancées IA cette semaine', text: 'Quelles sont les grandes avancées majeures en IA et technologies cette semaine ?', mode: 'auto', search: true },
    { label: '⚡ Synthèse Flash (S1)', text: 'Donne-moi une analyse concise des priorités du jour.', mode: 'system1' },
    { label: '🧩 Code & Architecture (S2)', text: 'Conçois un module TypeScript pour la gestion de tâches asynchrones avec fallback.', mode: 'system2' },
    { label: '🎨 Générer un visuel', text: 'Crée une illustration cinématique d’un cockpit d’IA souveraine futuriste.', mode: 'auto', isGen: true },
  ];

  return (
    <div
      className={`flex flex-col lg:flex-row h-[calc(100dvh-7.5rem)] sm:h-[calc(100vh-9.5rem)] max-h-[850px] w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative transition-all ${
        isDragging ? 'border-amber-400 bg-slate-900/90' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Fullscreen Zoom Viewer */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-amber-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={zoomImage} alt="Zoom" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border border-slate-700" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(zoomImage, `roam-hd-${Date.now()}.png`);
              }}
              className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs font-mono flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger l'image en Haute Définition</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Inspector Drawer / Modal */}
      {showMobileInspector && selectedTripartiteMsg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 lg:hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-4 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-xs font-mono uppercase tracking-wider">
                  Inspecteur Tripartite
                </h3>
              </div>
              <button
                onClick={() => setShowMobileInspector(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              {/* System 1 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-1">
                <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px]">
                  <span>Système 1 • Flash Réflexe</span>
                  <span className="text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                    {selectedTripartiteMsg.system1.latencyMs}ms
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  {selectedTripartiteMsg.system1.quickAnswer || selectedTripartiteMsg.system1.instinctSummary}
                </p>
              </div>

              {/* System 2 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-1.5">
                <div className="flex items-center justify-between text-indigo-300 font-bold text-[11px]">
                  <span>Système 2 • Raisonnement</span>
                  <span className="text-[10px] bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                    Logique
                  </span>
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {selectedTripartiteMsg.system2.reasoningSteps?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* System 3 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                  <span>Système 3 • Méta-Surveillance</span>
                  <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                    Score : {selectedTripartiteMsg.system3.qualityScore}%
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  {selectedTripartiteMsg.system3.metaCritique}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMobileInspector(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold rounded-xl"
            >
              Fermer l'Inspecteur
            </button>
          </div>
        </div>
      )}

      {/* Image Gen Modal */}
      {imageGenModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 font-mono text-sm">
                  Générateur d'Images IA (Gemini)
                </h3>
              </div>
              <button
                onClick={() => setImageGenModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-300">
                Format de l'image (Aspect Ratio) :
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '1:1', label: '1:1 Carré' },
                  { id: '16:9', label: '16:9 Paysage' },
                  { id: '9:16', label: '9:16 Portrait' },
                  { id: '4:3', label: '4:3 Standard' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAspectRatio(item.id as any)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-mono transition-all ${
                      selectedAspectRatio === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <label className="block text-xs font-mono text-slate-300 mt-2">
                Résolution / Définition :
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1K', label: '1K Standard' },
                  { id: '2K', label: '2K Haute Définition' },
                  { id: '4K', label: '4K Ultra HD' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImageSize(item.id as any)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-mono transition-all ${
                      selectedImageSize === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <label className="block text-xs font-mono text-slate-300 mt-2">
                Décrivez l'image que vous souhaitez créer :
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ex : Un double numérique souverain avec des faisceaux de lumière dorés dans une station spatiale élégante..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setImageGenModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-800"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setImageGenModalOpen(false);
                  handleSendMessage(undefined, true);
                }}
                disabled={!inputText.trim()}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 disabled:opacity-40 flex items-center gap-1.5 shadow-lg"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Générer l'Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
        }}
        accept="image/*"
        className="hidden"
      />

      {/* Left Chat Main Panel */}
      <div className="flex-1 flex flex-col h-full border-r border-slate-800 relative">
        {/* Chat Control Toolbar */}
        <div className="p-2.5 sm:p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          {/* Neural Modes */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Canal :</span>
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setBrainMode('auto')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  brainMode === 'auto'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Tripartite Complet (S1 Flash + S2 Logique + S3 Méta)"
              >
                Auto (Tripartite)
              </button>
              <button
                onClick={() => setBrainMode('system1')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  brainMode === 'system1'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Force Système 1 : Flash réflexe < 150ms"
              >
                S1 : Flash
              </button>
              <button
                onClick={() => setBrainMode('system2')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  brainMode === 'system2'
                    ? 'bg-indigo-500 text-slate-100 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Force Système 2 : Logique & Raisonnement"
              >
                S2 : Logique
              </button>
              <button
                onClick={() => setBrainMode('system3')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  brainMode === 'system3'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Force Système 3 : Méta-Surveillance"
              >
                S3 : Méta
              </button>
            </div>
          </div>

          {/* Quick AI Tools & Engine Selector */}
          <div className="flex items-center gap-2">
            {/* AI Provider Switcher (Gemini / ChatGPT) */}
            <div className="hidden md:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-700 text-xs font-mono">
              <button
                onClick={() => setSelectedEngine('gemini')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  selectedEngine === 'gemini'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gemini 3.7
              </button>
              <button
                onClick={() => setSelectedEngine('chatgpt')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  selectedEngine === 'chatgpt'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ChatGPT
              </button>
            </div>

            {/* Screen Sharing Toggle Button */}
            <button
              onClick={isScreenSharing ? handleStopScreenShare : handleStartScreenShare}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
                isScreenSharing
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-md animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isScreenSharing ? "Arrêter le partage d'écran" : "Partager mon écran pour diagnostic direct par l'IA"}
            >
              {isScreenSharing ? (
                <>
                  <MonitorOff className="w-3.5 h-3.5 text-rose-400" />
                  <span>Écran Actif</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Partager l'écran</span>
                  <span className="sm:hidden">Écran</span>
                </>
              )}
            </button>

            {/* Web Search Toggle */}
            <button
              onClick={() => setEnableWebSearch(!enableWebSearch)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                enableWebSearch
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Activer ou désactiver la recherche Google en direct"
            >
              <Globe className={`w-3.5 h-3.5 ${enableWebSearch ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Web Search</span>
              <span className="text-[10px]">{enableWebSearch ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Resolution Selector */}
            <div className="hidden lg:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-700 text-xs font-mono">
              {(['1K', '2K', '4K'] as const).map((res) => (
                <button
                  key={res}
                  onClick={() => setSelectedImageSize(res)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                    selectedImageSize === res
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Résolution de génération : ${res}`}
                >
                  {res}
                </button>
              ))}
            </div>

            {/* Image Gen Trigger */}
            <button
              onClick={() => setImageGenModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold transition-all cursor-pointer"
              title="Générer une photo ou image avec Gemini"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Créer Image ({selectedImageSize})</span>
              <span className="sm:hidden">Image</span>
            </button>

            {/* Manuel d'utilisation Info Button */}
            {onOpenManualModal && (
              <button
                onClick={onOpenManualModal}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-mono transition-all cursor-pointer"
                title="Consulter le Manuel d'Utilisation Complet (28 chapitres)"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Manuel</span>
              </button>
            )}

            {/* Mobile Inspector Open Button */}
            <button
              onClick={() => setShowMobileInspector(true)}
              className="flex lg:hidden items-center gap-1 px-2 py-1 rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-mono transition-all cursor-pointer"
              title="Voir l'analyse Tripartite S1/S2/S3"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inspecteur</span>
            </button>
          </div>
        </div>

        {/* LIVE SCREEN MONITOR WIDGET (when screen sharing is active) */}
        {isScreenSharing && (
          <div className="bg-slate-950 border-b border-amber-500/40 p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-28 h-18 sm:w-36 sm:h-22 rounded-lg overflow-hidden border border-amber-500/60 bg-black shrink-0 shadow-md">
                <video
                  ref={screenVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1 left-1 bg-red-600/90 text-white text-[9px] font-mono px-1 py-0.2 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>VISION LIVE</span>
                </div>
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-amber-300">
                    👁️ Guidage Visuel en Direct Activé
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    IA Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  L'IA analyse votre écran et vous indique exactement ce qu'elle voit et ce que vous devez faire.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => setContinuousObserve(!continuousObserve)}
                className={`px-2.5 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  continuousObserve
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Analyser l'écran automatiquement toutes les 25 secondes"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${continuousObserve ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{continuousObserve ? 'Observation Continue ON' : 'Observation Continue'}</span>
              </button>

              <button
                onClick={() => handleDiagnoseScreen()}
                disabled={isCapturingScreen || loading}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                {isCapturingScreen ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyse...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-3.5 h-3.5" />
                    <span>🔍 Analyser l'écran</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStopScreenShare}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition cursor-pointer"
                title="Arrêter le partage d'écran"
              >
                <MonitorOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Messages feed */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';
            const suggestions = msg.tripartiteData?.system2?.suggestedActions || [];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} group/msg`}
              >
                {!isUser && (
                  <div className="shrink-0 pt-0.5" title="ROAM'S.AI V1.0 Intelligence">
                    <RoamLogoAnimated size="sm" showEmbers={true} interactive={true} />
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 transition-all ${
                    isUser
                      ? 'bg-amber-600/90 text-white rounded-tr-none shadow-md shadow-amber-900/20'
                      : isSystem
                      ? 'bg-slate-900 border border-rose-800/60 text-rose-300'
                      : 'bg-slate-900/95 border border-slate-800 text-slate-100 rounded-tl-none shadow-lg'
                  }`}
                >
                  {/* Header info */}
                  <div className="flex items-center justify-between gap-3 mb-2 pb-1 border-b border-white/10 text-[11px] opacity-80 font-mono">
                    <span className="font-semibold flex items-center gap-1.5">
                      {isUser ? (
                        <>
                          <User className="w-3.5 h-3.5 text-amber-300" />
                          <span>{user?.name || 'Architecte'} ({user?.roleTitle || 'Architecte'})</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{msg.subagentName || "ROAM’S.AI V1.0"}</span>
                        </>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      {msg.modeUsed && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 border border-slate-700">
                          {msg.modeUsed}
                        </span>
                      )}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>

                  {/* Attached user image thumbnail (Vision / Screen Capture) */}
                  {msg.imageAttachment && (
                    <div className="mb-3 rounded-xl overflow-hidden border border-white/20 bg-slate-950/60 p-1.5 max-w-sm">
                      <div className="relative group cursor-pointer" onClick={() => setZoomImage(msg.imageAttachment!.dataUrl)}>
                        <img
                          src={msg.imageAttachment.dataUrl}
                          alt={msg.imageAttachment.name || 'Photo analysée'}
                          className="max-h-48 w-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono">
                          <Maximize2 className="w-4 h-4" />
                          <span>Agrandir</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-1 px-1 flex items-center justify-between">
                        <span className="truncate">{msg.imageAttachment.name || 'Photo utilisateur'}</span>
                        <span className="text-amber-300">Analyse Multimodale ✓</span>
                      </div>
                    </div>
                  )}

                  {/* Message content formatted with MarkdownRenderer */}
                  <div className="text-sm leading-relaxed font-sans">
                    <MarkdownRenderer content={msg.text} />
                  </div>

                  {/* Generated Image (if Roam created one) */}
                  {msg.generatedImage && msg.generatedImage.imageUrl && (
                    <div className="mt-3.5 p-3 sm:p-3.5 bg-slate-950/90 rounded-2xl border border-amber-500/40 space-y-3 shadow-xl">
                      {/* Metadata Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">
                            <Wand2 className="w-3 h-3 text-amber-400" />
                            {msg.generatedImage.model || 'Gemini 3.1 Flash Image'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 text-[10px] font-semibold">
                            {msg.generatedImage.imageSize || selectedImageSize} {msg.generatedImage.imageSize === '4K' ? 'Ultra HD' : msg.generatedImage.imageSize === '2K' ? 'HD' : 'Standard'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                            Format {msg.generatedImage.aspectRatio || selectedAspectRatio}
                          </span>
                        </div>
                        <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Généré avec succès
                        </span>
                      </div>

                      {/* Visual Container with Lightbox */}
                      <div
                        className="relative group cursor-pointer rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner"
                        onClick={() => setZoomImage(msg.generatedImage!.imageUrl)}
                      >
                        <img
                          src={msg.generatedImage.imageUrl}
                          alt={msg.generatedImage.prompt}
                          className="w-full max-h-96 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-xs font-mono">
                          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-600 flex items-center gap-1.5 shadow-lg">
                            <Maximize2 className="w-4 h-4 text-amber-400" />
                            <span>Agrandir en Plein Écran</span>
                          </div>
                        </div>
                      </div>

                      {/* Prompt display */}
                      <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="text-amber-400 font-semibold block mb-0.5 text-[10px] uppercase tracking-wider">
                          Prompt Visuel :
                        </span>
                        <p className="italic text-slate-200">« {msg.generatedImage.prompt} »</p>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => downloadImage(msg.generatedImage!.imageUrl, `roam-${Date.now()}.png`)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Télécharger PNG</span>
                          </button>

                          <button
                            onClick={() => handleSendMessage(msg.generatedImage!.prompt, true)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Régénérer cette image"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Régénérer</span>
                          </button>

                          <button
                            onClick={() => setInputText(`Crée une image avec ${msg.generatedImage!.prompt}`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Modifier le prompt dans la zone de texte"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modifier prompt</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Google Search Grounding Sources */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Sources Web en direct (Google Search) :</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-300 hover:text-emerald-200 border border-emerald-900/60 text-[11px] font-mono transition-colors max-w-xs truncate"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{source.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Follow-up Suggestions (ChatGPT / DeepSeek R1 style) */}
                  {!isUser && suggestions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800/60 space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400/80">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Suggestions de suivi :</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestions.map((actionText, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(actionText)}
                            className="text-left text-xs font-sans px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-slate-700/80 hover:border-amber-500/40 transition-all flex items-center gap-1.5 cursor-pointer group/pill"
                          >
                            <CornerDownLeft className="w-3 h-3 text-amber-400/70 group-hover/pill:text-amber-300 shrink-0" />
                            <span>{actionText}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Footer with Actions */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {!isUser && msg.tripartiteData && (
                        <button
                          onClick={() => setSelectedTripartiteMsg(msg.tripartiteData!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                          title="Inspecter le raisonnement tripartite"
                        >
                          <Sliders className="w-3 h-3 text-amber-400" />
                          <span className="hidden sm:inline">Inspecter Cerveau</span>
                          <span className="text-[10px] text-amber-400/80">(S1: {msg.tripartiteData.system1?.latencyMs || 12}ms)</span>
                        </button>
                      )}

                      {/* Copy message button */}
                      <button
                        onClick={() => handleCopyMessageText(msg.id, msg.text)}
                        className="text-xs px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all flex items-center gap-1 cursor-pointer font-mono"
                        title="Copier le texte"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300 text-[11px]">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px]">Copier</span>
                          </>
                        )}
                      </button>

                      {/* Regenerate button (assistant only) */}
                      {!isUser && (
                        <button
                          onClick={handleRegenerateLast}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-all flex items-center gap-1 cursor-pointer font-mono"
                          title="Régénérer cette réponse"
                        >
                          <RefreshCw className="w-3 h-3 text-slate-400" />
                          <span className="text-[11px]">Régénérer</span>
                        </button>
                      )}

                      {/* Edit button (user only) */}
                      {isUser && (
                        <button
                          onClick={() => handleEditUserMessage(msg.text)}
                          className="text-xs px-2 py-1 rounded-lg bg-amber-700/60 hover:bg-amber-700 text-amber-100 border border-amber-500/40 transition-all flex items-center gap-1 cursor-pointer font-mono"
                          title="Modifier ce message dans la zone de saisie"
                        >
                          <Edit3 className="w-3 h-3 text-amber-200" />
                          <span className="text-[11px]">Modifier</span>
                        </button>
                      )}
                    </div>

                    {/* Speech toggle */}
                    {!isUser && (
                      <button
                        onClick={() => handleToggleSpeech(msg.id, msg.text)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer font-mono ${
                          playingSpeechMsgId === msg.id
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse font-bold'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border-slate-700'
                        }`}
                        title={playingSpeechMsgId === msg.id ? "Arrêter la lecture" : "Lire ce message à voix haute"}
                      >
                        {playingSpeechMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                            <span>Arrêter</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Audio</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/60 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-spin shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span className="font-semibold text-slate-200">
                    {isGeneratingImageLoading
                      ? "🎨 Synthèse et création de l'image en cours..."
                      : attachedImage
                      ? 'Perception Visuelle & Analyse Multimodale en cours...'
                      : isScreenSharing
                      ? "Analyse de la capture d'écran en cours..."
                      : 'Cerveau Tripartite & Moteur Gemini en traitement...'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {isGeneratingImageLoading
                    ? "Rendu neuronal direct haute fidélité..."
                    : "Système 1 (Flash) → Système 2 (Raisonnement) → Système 3 (Méta-contrôle)"}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="px-3 sm:px-4 py-1.5 bg-slate-900/70 border-t border-slate-800/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
            Actions rapides :
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (qp.action) {
                  qp.action();
                } else if (qp.text) {
                  if (qp.mode && qp.mode !== 'auto') setBrainMode(qp.mode as BrainMode);
                  if (qp.search) setEnableWebSearch(true);
                  handleSendMessage(qp.text, qp.isGen);
                }
              }}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Image Attachment Preview Bar */}
        {attachedImage && (
          <div className="px-4 py-2 bg-slate-900/95 border-t border-amber-500/40 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <img
                src={attachedImage.dataUrl}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg border border-amber-500/50"
              />
              <div className="text-xs font-mono">
                <span className="text-amber-300 font-semibold block truncate max-w-xs">
                  📷 {attachedImage.name}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {attachedImage.sizeKb} Ko • Prêt pour analyse Gemini Vision
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputText("Analyse cette image en détail, identifie chaque élément et aide-moi à résoudre le problème.")}
                className="text-[11px] font-mono px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors cursor-pointer"
              >
                🔍 Analyser
              </button>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-800 cursor-pointer"
                title="Retirer la photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-2 sm:p-3 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5 sm:gap-2 w-full min-w-0"
          >
            {/* Screen Share Action */}
            <button
              type="button"
              onClick={isScreenSharing ? handleStopScreenShare : handleStartScreenShare}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center ${
                isScreenSharing
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-amber-400'
              }`}
              title={isScreenSharing ? "Arrêter le partage d'écran" : "Partager mon écran pour diagnostic direct"}
            >
              <Monitor className="w-4 h-4 text-amber-400" />
            </button>

            {/* Photo Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-amber-400 transition-all shrink-0 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Ajouter une photo ou image pour analyse visuelle Gemini"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title={isListening ? 'Arrêter écoute' : 'Parler à Roam'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? '🎤 Écoute en cours... parlez...'
                  : isScreenSharing
                  ? "Écran en direct partagé : posez votre question..."
                  : attachedImage
                  ? 'Posez une question sur cette image...'
                  : 'Posez votre question, demandez une image...'
              }
              className="flex-1 min-w-0 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
              disabled={loading}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || (!inputText.trim() && !attachedImage)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-md transition-all shrink-0 cursor-pointer min-w-[38px] min-h-[38px]"
              title="Envoyer le message"
            >
              <Send className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold">Envoyer</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Tripartite Brain Inspector Panel (Visible on large screens, available via button on mobile) */}
      <div className="hidden lg:flex lg:w-96 bg-slate-900 p-4 border-l border-slate-800 overflow-y-auto flex-col space-y-4 shrink-0">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider">
              Inspecteur Tripartite
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Temps Réel
          </span>
        </div>

        {selectedTripartiteMsg ? (
          <div className="space-y-4 text-xs font-mono">
            {/* System 1 (Instinct) */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-1.5">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span>Système 1 • Flash Réflexe</span>
                <span className="text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                  {selectedTripartiteMsg.system1.latencyMs}ms
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedTripartiteMsg.system1.quickAnswer || selectedTripartiteMsg.system1.instinctSummary}
              </p>
            </div>

            {/* System 2 (Logic & Reasoning) */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-900/40 space-y-2">
              <div className="flex items-center justify-between text-indigo-300 font-bold">
                <span>Système 2 • Raisonnement</span>
                <span className="text-[10px] bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                  Logique Déductive
                </span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {selectedTripartiteMsg.system2.reasoningSteps?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System 3 (Meta-Audit & Ethics) */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>Système 3 • Méta-Surveillance</span>
                <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  Score : {selectedTripartiteMsg.system3.qualityScore}%
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedTripartiteMsg.system3.metaCritique}
              </p>
              {selectedTripartiteMsg.system3.learningNote && (
                <div className="text-[10px] text-amber-300/80 pt-1 border-t border-slate-800">
                  💡 {selectedTripartiteMsg.system3.learningNote}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
            <Bot className="w-8 h-8 text-slate-600" />
            <p className="text-xs font-mono">
              Posez une question, partagez votre écran ou envoyez une photo pour observer l'analyse Tripartite en direct.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
