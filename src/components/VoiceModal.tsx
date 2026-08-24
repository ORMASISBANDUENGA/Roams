import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Sparkles,
  Settings2,
  Globe,
  Radio,
  Layers
} from 'lucide-react';
import { RoamLogoAnimated } from './RoamLogoAnimated';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendVoiceTranscription: (transcript: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSendVoiceTranscription,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [voiceGender, setVoiceGender] = useState<'femme' | 'homme'>('femme');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [selectedLanguage, setSelectedLanguage] = useState('fr-FR');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          try {
            recognition.start();
          } catch (e) {
            // ignore
          }
        }
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition init error', err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isOpen, selectedLanguage]);

  if (!isOpen) return null;

  const handleDone = () => {
    if (transcript.trim()) {
      onSendVoiceTranscription(transcript.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-between p-6 md:p-12 text-slate-100">
      
      {/* Top bar */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <RoamLogoAnimated size="sm" />
          <span className="font-bold text-sm font-mono tracking-wider">ROAM VOCAL</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Sound Wave & Listening Pulse */}
      <div className="flex flex-col items-center justify-center space-y-8 my-auto max-w-lg text-center">
        <div className="relative">
          {/* Animated sound wave aura */}
          <motion.div
            animate={{
              scale: isListening ? [1, 1.3, 1] : 1,
              opacity: isListening ? [0.2, 0.5, 0.2] : 0.1,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            className="absolute -inset-8 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"
          />

          <button
            onClick={() => setIsListening(!isListening)}
            className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all shadow-2xl ${
              isListening
                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30 ring-8 ring-amber-500/20'
                : 'bg-slate-900 border-2 border-slate-700 text-slate-400'
            }`}
          >
            {isListening ? (
              <Mic className="w-12 h-12 md:w-14 md:h-14 animate-pulse" />
            ) : (
              <MicOff className="w-12 h-12 md:w-14 md:h-14" />
            )}
          </button>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>{isListening ? 'Écoute active...' : 'En pause'}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            « Parlez naturellement »
          </h2>

          <p className="text-sm text-slate-400 min-h-[48px] max-w-md mx-auto italic px-4">
            {transcript || 'ROAM vous écoute et comprendra votre demande dans votre langue...'}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
          >
            <option value="fr-FR">Français (France / Afrique)</option>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
            <option value="pt-BR">Português</option>
            <option value="de-DE">Deutsch</option>
            <option value="zh-CN">中文 (Mandarin)</option>
            <option value="ja-JP">日本語 (Japanese)</option>
            <option value="ar-SA">العربية (Arabic)</option>
          </select>

          <select
            value={voiceGender}
            onChange={(e) => setVoiceGender(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
          >
            <option value="femme">Voix Féminine</option>
            <option value="homme">Voix Masculine</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold"
          >
            Annuler
          </button>
          <button
            onClick={handleDone}
            disabled={!transcript.trim()}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              transcript.trim()
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            Envoyer à ROAM
          </button>
        </div>
      </div>

    </div>
  );
};
