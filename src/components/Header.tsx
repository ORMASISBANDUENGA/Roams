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
  Info,
} from 'lucide-react';
import { PersonalityTraits, BubbleModeConfig, EthicalBackdoorState, UserIdentity } from '../types/roam';
import { RoamLogoAnimated } from './RoamLogoAnimated';

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
  onOpenManualModal?: () => void;
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
  onOpenManualModal,
  voiceEnabled,
  setVoiceEnabled,
  onToggleNode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 font-sans shadow-sm w-full overflow-hidden">
      {/* Top Telemetry & Main Controls Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1 sm:gap-2 text-xs w-full">
        {/* Left Side: App Logo with Animated Flame + Hamburger Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Animated Fiery Logo Component */}
          <RoamLogoAnimated
            size="sm"
            showText={true}
            textSubtitle="SOUVERAIN 🔥"
            showEmbers={true}
          />

          {/* HAMBURGER MENU BUTTON (☰ 2 LIGNES / MENU SOUVERAIN) */}
          <button
            onClick={onOpenMenuDrawer}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm shrink-0"
            title="Ouvrir le Menu Principal (15 fonctionnalités, historique, déconnexion)"
          >
            <div className="flex flex-col justify-center gap-0.5 w-3.5 h-3">
              <span className="h-0.5 w-full bg-amber-400 rounded-full group-hover:bg-amber-300 transition-colors"></span>
              <span className="h-0.5 w-3/4 bg-amber-400 rounded-full group-hover:bg-amber-300 transition-colors"></span>
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-200 group-hover:text-amber-300 hidden sm:inline">
              Menu
            </span>
          </button>
        </div>

        {/* Center: Primary Dual Mode Switcher (Chatbot vs 15 Piliers) */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 shadow-inner shrink-0">
          <button
            onClick={() => setActiveMode('chat')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Interface Chatbot Dédiée"
          >
            <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveMode('operations')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
              activeMode === 'operations'
                ? 'bg-purple-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Hub Opérations (15 fonctionnalités & Outils)"
          >
            <LayoutDashboard className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">15 Piliers</span>
            <span className="sm:hidden">Piliers</span>
          </button>
        </div>

        {/* Right Side: Quick Tools & Settings */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Node Selector Toggle (Local / Cloud) */}
          <button
            onClick={onToggleNode}
            className={`hidden md:flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono border transition-colors cursor-pointer ${
              user.nodeType === 'local'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
            title="Basculer entre Nœud Local Souverain et Miroir Cloud"
          >
            {user.nodeType === 'local' ? (
              <>
                <HardDrive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                <span>🟢 Local</span>
              </>
            ) : (
              <>
                <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                <span>🟠 Cloud</span>
              </>
            )}
          </button>

          {/* Download App button */}
          <button
            onClick={onOpenDownloadModal}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[11px] font-mono shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
            title="Télécharger l'application Desktop / Mobile / CLI"
          >
            <Download className="w-3 h-3" />
            <span>App V1.0</span>
          </button>

          {/* User Manual Info Button */}
          {onOpenManualModal && (
            <button
              onClick={onOpenManualModal}
              className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Manuel d'utilisation complet (28 chapitres)"
            >
              <Info className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline text-[11px] font-mono font-bold">Guide</span>
            </button>
          )}

          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
              voiceEnabled
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={voiceEnabled ? 'Synthèse Vocale Activée' : 'Synthèse Vocale Désactivée'}
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* System Log / CLI button */}
          <button
            onClick={onOpenConsole}
            className="hidden md:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-400 border border-slate-700 transition-colors items-center gap-1 cursor-pointer shrink-0"
            title="Ouvrir le Journal d'Activité / System Log"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          {/* Profile Modal button */}
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="hidden xs:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors items-center gap-1 cursor-pointer shrink-0"
              title={`Profil Architecte : ${user.name}`}
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Lock / Exit Session Button */}
          <button
            onClick={onOpenSessionEnd}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            title="Verrouiller ou Déconnecter la Session Souveraine"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
