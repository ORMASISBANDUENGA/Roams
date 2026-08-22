import React from 'react';
import {
  Menu,
  MessageSquare,
  LayoutDashboard,
  Shield,
  Volume2,
  VolumeX,
  Download,
  Terminal,
  HardDrive,
  Cloud,
  Sliders,
  Lock,
  Zap,
} from 'lucide-react';
import { PersonalityTraits, BubbleModeConfig, EthicalBackdoorState, UserIdentity } from '../types/roam';

interface HeaderProps {
  activeMode: 'chat' | 'operations';
  setActiveMode: (mode: 'chat' | 'operations') => void;
  onOpenMenuDrawer: () => void;
  user: UserIdentity;
  personality: PersonalityTraits;
  bubbleConfig: BubbleModeConfig;
  setBubbleConfig: React.Dispatch<React.SetStateAction<BubbleModeConfig>>;
  ethicalState: EthicalBackdoorState;
  onOpenConsole: () => void;
  onOpenDownloadModal: () => void;
  onOpenSessionEnd: () => void;
  onOpenProfileModal?: () => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  onToggleNode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setActiveMode,
  onOpenMenuDrawer,
  user,
  personality,
  bubbleConfig,
  setBubbleConfig,
  ethicalState,
  onOpenConsole,
  onOpenDownloadModal,
  onOpenSessionEnd,
  onOpenProfileModal,
  voiceEnabled,
  setVoiceEnabled,
  onToggleNode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 font-sans shadow-sm">
      {/* Top Telemetry & Main Controls Bar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 text-xs">
        {/* Left Side: Hamburger Menu Button + App Logo + Mode Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* HAMBURGER MENU BUTTON (☰ 2 LIGNES / MENU SOUVERAIN) */}
          <button
            onClick={onOpenMenuDrawer}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm"
            title="Ouvrir le Menu Principal (15 fonctionnalités, historique, déconnexion)"
          >
            {/* Custom 2-bar hamburger icon */}
            <div className="flex flex-col justify-center gap-1 w-4 h-3.5">
              <span className="h-0.5 w-full bg-amber-400 rounded-full group-hover:bg-amber-300 transition-colors"></span>
              <span className="h-0.5 w-3/4 bg-amber-400 rounded-full group-hover:bg-amber-300 transition-colors"></span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-200 group-hover:text-amber-300 hidden xs:inline">
              Menu
            </span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-bold tracking-wider text-amber-400">
            <img
              src="/icon.jpg"
              alt="ROAM'S.ai"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-cover border border-amber-500/40 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent font-mono">
              ROAM’S.AI
            </span>
          </div>

          {/* Primary Dual Mode Switcher: 1. Chatbot vs 2. Hub Opérations (15 Piliers) */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveMode('chat')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
                activeMode === 'chat'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Interface Chatbot Dédiée (Messages, Vision, Partage d'Écran)"
            >
              <MessageSquare className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>Chatbot</span>
            </button>

            <button
              onClick={() => setActiveMode('operations')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
                activeMode === 'operations'
                  ? 'bg-purple-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Hub Opérations (Toutes les 15 fonctionnalités & Outils)"
            >
              <LayoutDashboard className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span className="hidden sm:inline">15 Piliers</span>
              <span className="sm:hidden">Piliers</span>
            </button>
          </div>
        </div>

        {/* Right Side: Node Toggle + Download + Voice + Console + Lock */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Node Selector Toggle */}
          <button
            onClick={onToggleNode}
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono border transition-colors cursor-pointer ${
              user.nodeType === 'local'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
            title="Basculer entre Nœud Local Souverain et Miroir Cloud"
          >
            {user.nodeType === 'local' ? (
              <>
                <HardDrive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                <span className="hidden md:inline">🟢 Local</span>
              </>
            ) : (
              <>
                <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                <span className="hidden md:inline">🟠 Cloud</span>
              </>
            )}
          </button>

          {/* Download App button */}
          <button
            onClick={onOpenDownloadModal}
            className="hidden xs:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[11px] sm:text-xs font-mono shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
            title="Télécharger l'application Desktop / Mobile / CLI"
          >
            <Download className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden sm:inline">App V1.0</span>
            <span className="sm:hidden">App</span>
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1 sm:p-1.5 rounded-lg border transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={voiceEnabled ? 'Synthèse Vocale Activée' : 'Synthèse Vocale Désactivée'}
          >
            {voiceEnabled ? <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
          </button>

          {/* System Log / CLI button */}
          <button
            onClick={onOpenConsole}
            className="hidden sm:flex p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors items-center gap-1 cursor-pointer"
            title="Ouvrir le Journal d'Activité / System Log"
          >
            <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden lg:inline text-[11px] font-mono">Log</span>
          </button>

          {/* Profile Modal button */}
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title={`Profil Architecte : ${user.name}`}
            >
              <Sliders className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
          )}

          {/* Lock / Exit Session Button */}
          <button
            onClick={onOpenSessionEnd}
            className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            title="Verrouiller ou Déconnecter la Session Souveraine"
          >
            <Lock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
