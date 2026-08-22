import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageSquare,
  LayoutDashboard,
  Bot,
  Database,
  Shield,
  Cpu,
  Sliders,
  BookOpen,
  Sparkles,
  Terminal,
  VolumeX,
  Lock,
  LogOut,
  History,
  HardDrive,
  Cloud,
  Download,
  Calendar,
  Hourglass,
  Layers,
  ChevronRight,
  User,
  Zap,
  CheckCircle2,
  Trash2,
  MessageCircle,
  Facebook,
} from 'lucide-react';
import { UserIdentity, PersonalityTraits, BubbleModeConfig, EthicalBackdoorState, ChatMessage } from '../types/roam';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMode: 'chat' | 'operations';
  setActiveMode: (mode: 'chat' | 'operations') => void;
  activeFeature: string;
  setActiveFeature: (featureId: string) => void;
  user: UserIdentity;
  personality: PersonalityTraits;
  bubbleConfig: BubbleModeConfig;
  setBubbleConfig: React.Dispatch<React.SetStateAction<BubbleModeConfig>>;
  ethicalState: EthicalBackdoorState;
  messages: ChatMessage[];
  onSelectHistoryMessage?: (msg: ChatMessage) => void;
  onClearHistory?: () => void;
  onOpenConsole: () => void;
  onOpenDownloadModal: () => void;
  onOpenProfileModal: () => void;
  onLockSession: () => void;
  onLogout: () => void;
  onToggleNode: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeMode,
  setActiveMode,
  activeFeature,
  setActiveFeature,
  user,
  personality,
  bubbleConfig,
  setBubbleConfig,
  ethicalState,
  messages = [],
  onSelectHistoryMessage,
  onClearHistory,
  onOpenConsole,
  onOpenDownloadModal,
  onOpenProfileModal,
  onLockSession,
  onLogout,
  onToggleNode,
}) => {
  // 15 Sovereign Features definition
  const sovereignFeatures = [
    { id: 'dashboard', name: '1. Centre de Contrôle (Cockpit)', icon: LayoutDashboard, category: 'Intelligence', badge: 'Télémétrie' },
    { id: 'double', name: '2. Le Double Numérique & Autonomie', icon: Bot, category: 'Intelligence', badge: 'Autonome' },
    { id: 'memory', name: '3. Mémoire Souveraine ZK', icon: Database, category: 'Mémoire', badge: '7 Catégories' },
    { id: 'security', name: '4. Centre de Sécurité & Clés AES', icon: Shield, category: 'Sécurité', badge: '100% ZK' },
    { id: 'subagents', name: '5. Sous-Agents & Ruche Spécialisée', icon: Cpu, category: 'Intelligence', badge: '7 Agents' },
    { id: 'journal', name: '6. Rêve & Journal Cognitif', icon: Calendar, category: 'Mémoire', badge: 'Nocturne' },
    { id: 'anticipation', name: '7. Anticipation & Découpage', icon: Sparkles, category: 'Intelligence', badge: 'Proactif' },
    { id: 'manual', name: '8. Manuel & Spécifications V4.1', icon: BookOpen, category: 'Architecture', badge: '15 Piliers' },
    { id: 'capsule', name: '9. Capsule Temporelle & Archives', icon: Hourglass, category: 'Mémoire', badge: 'Immuable' },
    { id: 'bubble', name: '10. Mode Bulle Anti-Distraction', icon: VolumeX, category: 'Sécurité', badge: bubbleConfig.active ? 'Actif' : 'Veille' },
    { id: 'ethical', name: '11. Porte Éthique & Non-Ingérence', icon: Lock, category: 'Sécurité', badge: 'Audit ZK' },
    { id: 'console', name: '12. Console CLI & Logs Système', icon: Terminal, category: 'Architecture', badge: 'Temps réel' },
    { id: 'rewards', name: '13. Niveaux, Trophées & XP', icon: Zap, category: 'Architecture', badge: `Niveau ${user.autonomyLevel}` },
    { id: 'settings', name: '14. Paramètres & Personnalité', icon: Sliders, category: 'Architecture', badge: personality.ton },
    { id: 'download', name: "15. Téléchargement & Multi-App", icon: Download, category: 'Architecture', badge: 'V1.0 Pro' },
    { id: 'terminal', name: "16. Agent Terminal & Commandes PC", icon: Terminal, category: 'Action', badge: 'CLI Runner' },
    { id: 'calls', name: "17. Agent Téléphonie & Appels Vocaux", icon: MessageCircle, category: 'Action', badge: 'Voix IA' },
    { id: 'plugins', name: "18. WhatsApp, Facebook & Webhooks", icon: Facebook, category: 'Action', badge: 'Connecteurs' },
    { id: 'hosting_seo', name: "19. Hébergement & Search Console", icon: HardDrive, category: 'Architecture', badge: 'SEO Google' },
  ];

  // Filter messages for history
  const userMessages = messages.filter((m) => m.sender === 'user').slice(-8).reverse();

  const handleNavigateFeature = (featureId: string) => {
    if (featureId === 'console') {
      onOpenConsole();
      onClose();
      return;
    }
    if (featureId === 'download') {
      onOpenDownloadModal();
      onClose();
      return;
    }
    if (featureId === 'bubble') {
      setBubbleConfig((prev) => ({ ...prev, active: !prev.active }));
      return;
    }

    setActiveMode('operations');
    setActiveFeature(featureId);
    onClose();
  };

  const handleNavigateChat = () => {
    setActiveMode('chat');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Menu */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-sm sm:max-w-md bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl z-10"
          >
            {/* Header of Drawer */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <img
                  src="/icon.jpg"
                  alt="ROAM'S.ai"
                  className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400 font-mono text-sm tracking-wider">ROAM’S.AI V1.0</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      SOUVERAIN
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Architecte : <span className="text-slate-200 font-semibold">{user.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition cursor-pointer"
                title="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Navigation Modes (Chatbot vs Hub 15 Piliers) */}
            <div className="p-3 bg-slate-900/90 border-b border-slate-800 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-1 font-semibold">
                Sélecteur de Mode Principal
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleNavigateChat}
                  className={`flex flex-col items-start p-3 rounded-xl border transition-all text-left cursor-pointer ${
                    activeMode === 'chat'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md font-semibold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className={`w-4 h-4 ${activeMode === 'chat' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold font-mono">1. Chatbot Hub</span>
                  </div>
                  <span className="text-[10px] text-slate-400 line-clamp-2">
                    IA Tripartite, Vision, Partage d'écran en direct & Génération.
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveMode('operations');
                    setActiveFeature('dashboard');
                    onClose();
                  }}
                  className={`flex flex-col items-start p-3 rounded-xl border transition-all text-left cursor-pointer ${
                    activeMode === 'operations'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md font-semibold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <LayoutDashboard className={`w-4 h-4 ${activeMode === 'operations' ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold font-mono">2. Hub Opérations</span>
                  </div>
                  <span className="text-[10px] text-slate-400 line-clamp-2">
                    Toutes les 15 fonctionnalités, Le Double, Mémoire & Sécurité.
                  </span>
                </button>
              </div>
            </div>

            {/* Scrollable Content: 15 Features + Message History */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
              {/* 15 Sovereign Features list */}
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    💎 Les 15 Fonctionnalités Souveraines
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    15/15 Prêts
                  </span>
                </div>

                <div className="space-y-1">
                  {sovereignFeatures.map((feat) => {
                    const Icon = feat.icon;
                    const isCurrent = activeMode === 'operations' && activeFeature === feat.id;

                    return (
                      <button
                        key={feat.id}
                        onClick={() => handleNavigateFeature(feat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer group ${
                          isCurrent
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                            : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-300'}`} />
                          <span className="truncate">{feat.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                              isCurrent
                                ? 'bg-amber-500/30 text-amber-200'
                                : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                            }`}
                          >
                            {feat.badge}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message History Section */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between px-1 mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>Historique des Messages</span>
                  </div>
                  {userMessages.length > 0 && onClearHistory && (
                    <button
                      onClick={onClearHistory}
                      className="text-[10px] text-slate-500 hover:text-red-400 flex items-center gap-1 font-mono transition cursor-pointer"
                      title="Effacer l'historique"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Vider</span>
                    </button>
                  )}
                </div>

                {userMessages.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-slate-500 font-mono italic bg-slate-950/40 rounded-lg border border-slate-800/50">
                    Aucune question récente enregistrée.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {userMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => {
                          if (onSelectHistoryMessage) {
                            onSelectHistoryMessage(msg);
                          }
                          setActiveMode('chat');
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 border border-slate-800/60 hover:border-slate-700 text-slate-300 hover:text-amber-300 text-xs font-mono transition flex items-center justify-between gap-2 cursor-pointer group"
                      >
                        <span className="truncate max-w-[240px]">"{msg.text}"</span>
                        <span className="text-[9px] text-slate-500 shrink-0 font-sans">{msg.timestamp}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls: Node Toggle + Profile + Logout Bar */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Node Toggle */}
                <button
                  onClick={onToggleNode}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  title="Basculer Nœud Local / Miroir Cloud"
                >
                  {user.nodeType === 'local' ? (
                    <>
                      <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px]">Nœud Local</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px]">Miroir Cloud</span>
                    </>
                  )}
                </button>

                {/* Profile Modal */}
                <button
                  onClick={() => {
                    onOpenProfileModal();
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">Profil & Clés</span>
                </button>
              </div>

              {/* Action Logout / Lock Session */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onLockSession();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verrouiller</span>
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 hover:border-red-700 text-red-300 hover:text-red-200 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Déconnexion</span>
                </button>
              </div>

              {/* Social Channels: WhatsApp & Facebook (Phone number is strictly invisible) */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-1">
                <span className="text-[10px] font-mono text-slate-500">Canaux Directs</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/243896082244"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Contacter sur WhatsApp"
                    aria-label="WhatsApp"
                    className="p-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/oromasis.banduenga"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Profil Facebook"
                    aria-label="Facebook"
                    className="p-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-all hover:scale-105"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
