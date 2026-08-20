import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  Database,
  Shield,
  Sliders,
  Cpu,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calendar,
  Hourglass,
  Terminal,
  Zap,
  Download,
  MessageCircle,
  Facebook,
} from 'lucide-react';
import { Header } from './components/Header';
import { BootScreen } from './components/BootScreen';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { TripartiteActivationScreen } from './components/TripartiteActivationScreen';
import { NavigationDrawer } from './components/NavigationDrawer';
import { OperationsHub } from './components/OperationsHub';
import { ControlCenterDashboard } from './components/ControlCenterDashboard';
import { SovereignMemoryCenter } from './components/SovereignMemoryCenter';
import { SecurityCenter } from './components/SecurityCenter';
import { SettingsCenter } from './components/SettingsCenter';
import { DownloadAppModal } from './components/DownloadAppModal';
import { SessionEndModal } from './components/SessionEndModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WelcomeBackBanner } from './components/WelcomeBackBanner';
import { TripartiteChat } from './components/TripartiteChat';
import { PersonalityAndDouble } from './components/PersonalityAndDouble';
import { JournalAndDream } from './components/JournalAndDream';
import { AnticipationAndSplit } from './components/AnticipationAndSplit';
import { SubAgentsAndMemory } from './components/SubAgentsAndMemory';
import { TimeCapsuleAndSecurity } from './components/TimeCapsuleAndSecurity';
import { ManualAndSpecs } from './components/ManualAndSpecs';
import { RoamConsole } from './components/RoamConsole';

import {
  initialSystemMetrics,
  initialPersonality,
  initialMessages,
  initialJournal,
  initialAnticipations,
  initialSubAgents,
  initialSensoryMemories,
  initialTimeCapsules,
  initialBubbleConfig,
  initialEthicalState,
  initialDreamState,
  initialRewards,
  initialUserIdentity,
  initialDoubleState,
  initialSovereignMemories,
  initialSecurityCenter,
} from './data/initialState';

import {
  AppScreen,
  UserIdentity,
  DoubleState,
  SovereignMemoryItem,
  SecurityCenterData,
  SystemMetrics,
  PersonalityTraits,
  ChatMessage,
  JournalEntry,
  AnticipationCard,
  SubAgent,
  SensoryMemoryItem,
  TimeCapsuleState,
  BubbleModeConfig,
  EthicalBackdoorState,
  DreamState,
  RewardState,
  MemoryCategory,
} from './types/roam';

export default function App() {
  // Check if a persistent session exists (Login shown ONLY on the first time!)
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    try {
      const savedSession = localStorage.getItem('roam_auth_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed?.authenticated) {
          return 'dashboard';
        }
      }
    } catch (err) {
      console.warn('Session check failed', err);
    }
    return 'boot';
  });

  const [showWelcomeBack, setShowWelcomeBack] = useState(true);

  // Structural Mode Separation:
  // 1. 'chat' : Dedicated Chatbot interface (text, vision, screen sharing, image generation)
  // 2. 'operations' : Hub & Workspaces for the 15 sovereign features
  const [activeMode, setActiveMode] = useState<'chat' | 'operations'>('chat');
  const [activeFeature, setActiveFeature] = useState<string>('hub'); // 'hub' or specific feature ID

  // Navigation Drawer state
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  // Modals
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSessionEndOpen, setIsSessionEndOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Sovereign User & Core State
  const [user, setUser] = useState<UserIdentity>(() => {
    try {
      const savedUser = localStorage.getItem('roam_user_data');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return initialUserIdentity;
  });

  const [doubleState, setDoubleState] = useState<DoubleState>(initialDoubleState);
  const [sovereignMemories, setSovereignMemories] = useState<SovereignMemoryItem[]>(initialSovereignMemories);
  const [securityData, setSecurityData] = useState<SecurityCenterData>(initialSecurityCenter);

  // Features State
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [metrics, setMetrics] = useState<SystemMetrics>(initialSystemMetrics);
  const [personality, setPersonality] = useState<PersonalityTraits>(initialPersonality);
  const [journal, setJournal] = useState<JournalEntry[]>(initialJournal);
  const [anticipations, setAnticipations] = useState<AnticipationCard[]>(initialAnticipations);
  const [subAgents, setSubAgents] = useState<SubAgent[]>(initialSubAgents);
  const [sensoryMemories, setSensoryMemories] = useState<SensoryMemoryItem[]>(initialSensoryMemories);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleState[]>(initialTimeCapsules);
  const [bubbleConfig, setBubbleConfig] = useState<BubbleModeConfig>(initialBubbleConfig);
  const [ethicalState, setEthicalState] = useState<EthicalBackdoorState>(initialEthicalState);
  const [dream, setDream] = useState<DreamState>(initialDreamState);
  const [rewards, setRewards] = useState<RewardState>(initialRewards);

  // Settings
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Award XP
  const handleAwardXp = (amount: number, reason: string) => {
    setRewards((prev) => {
      const newXp = prev.totalXp + amount;
      const nextLevel = Math.floor(newXp / 100) + 1;
      return {
        ...prev,
        totalXp: newXp,
        currentStreak: prev.currentStreak + 1,
      };
    });
  };

  // Double Action Handlers
  const handleApproveDoubleAction = (id: string) => {
    setDoubleState((prev) => ({
      ...prev,
      pendingValidations: prev.pendingValidations.filter((a) => a.id !== id),
      actionsExecutedToday: prev.actionsExecutedToday + 1,
    }));
  };

  const handleDismissDoubleAction = (id: string) => {
    setDoubleState((prev) => ({
      ...prev,
      pendingValidations: prev.pendingValidations.filter((a) => a.id !== id),
    }));
  };

  // Memory Handlers
  const handleForgetMemory = (id: string) => {
    setSovereignMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearCategory = (cat: MemoryCategory) => {
    setSovereignMemories((prev) => prev.filter((m) => m.category !== cat));
  };

  // Toggle Node (Local / Cloud Mirror)
  const handleToggleNode = () => {
    setUser((prev) => {
      const updated = {
        ...prev,
        nodeType: prev.nodeType === 'local' ? ('cloud_mirror' as const) : ('local' as const),
      };
      try {
        localStorage.setItem('roam_user_data', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Login with persistence
  const handleLogin = (
    selectedNode: 'local' | 'cloud',
    isNewUser?: boolean,
    customUser?: Partial<UserIdentity>
  ) => {
    const updatedUser: UserIdentity = {
      ...user,
      nodeType: selectedNode,
      ...(customUser || {}),
    };

    setUser(updatedUser);

    try {
      localStorage.setItem('roam_auth_session', JSON.stringify({ authenticated: true, timestamp: Date.now() }));
      localStorage.setItem('roam_user_data', JSON.stringify(updatedUser));
    } catch (e) {
      console.warn('Could not save auth session to localStorage', e);
    }

    if (isNewUser) {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('tripartite_activation');
    }
  };

  // Lock / Logout Handlers
  const handleLockSession = () => {
    setIsSessionEndOpen(false);
    setIsMenuDrawerOpen(false);
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('roam_auth_session');
    } catch (e) {}
    setIsSessionEndOpen(false);
    setIsMenuDrawerOpen(false);
    setCurrentScreen('login');
  };

  const handleSaveNotification = (msg: string) => {
    alert(`Paramètre enregistré : ${msg}`);
  };

  // Global Keyboard Shortcut: Cmd/Ctrl + K opens Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. BOOT SEQUENCE SCREEN
  if (currentScreen === 'boot') {
    return <BootScreen onBootComplete={() => setCurrentScreen('login')} />;
  }

  // 2. AUTH SCREEN (Shown ONLY on first login or when user clicks Déconnexion)
  if (currentScreen === 'login') {
    return (
      <AuthScreen
        user={user}
        onLogin={handleLogin}
        onStartOnboarding={() => setCurrentScreen('onboarding')}
      />
    );
  }

  // 3. ONBOARDING WIZARD
  if (currentScreen === 'onboarding') {
    return (
      <OnboardingFlow
        initialUser={user}
        onComplete={(updatedUser, updatedTraits) => {
          setUser(updatedUser);
          setPersonality(updatedTraits);
          try {
            localStorage.setItem('roam_user_data', JSON.stringify(updatedUser));
          } catch (e) {}
          setCurrentScreen('tripartite_activation');
        }}
      />
    );
  }

  // 4. TRIPARTITE BRAIN ACTIVATION SCREEN
  if (currentScreen === 'tripartite_activation') {
    return (
      <TripartiteActivationScreen
        onComplete={() => setCurrentScreen('dashboard')}
      />
    );
  }

  // 5. MAIN DASHBOARD / CONTROL CENTER (Cleaned: Single Header Bar + Dual Modes)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Bar with Hamburger Button & Mode Selector (No second navigation bar!) */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onOpenMenuDrawer={() => setIsMenuDrawerOpen(true)}
        user={user}
        personality={personality}
        bubbleConfig={bubbleConfig}
        setBubbleConfig={setBubbleConfig}
        ethicalState={ethicalState}
        onOpenConsole={() => setConsoleOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenSessionEnd={() => setIsSessionEndOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        onToggleNode={handleToggleNode}
      />

      {/* Navigation Drawer Menu (☰ Hamburger, 15 features, message history & logout bar) */}
      <NavigationDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
        user={user}
        personality={personality}
        bubbleConfig={bubbleConfig}
        setBubbleConfig={setBubbleConfig}
        ethicalState={ethicalState}
        messages={messages}
        onSelectHistoryMessage={(msg) => {
          // Navigate to chat
          setActiveMode('chat');
        }}
        onClearHistory={() => setMessages(initialMessages)}
        onOpenConsole={() => setConsoleOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onLockSession={handleLockSession}
        onLogout={handleLogout}
        onToggleNode={handleToggleNode}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2.5 sm:px-4 pt-3 sm:pt-5 pb-16 sm:pb-8">
        {/* ========================================================================= */}
        {/* PARTIE 1 : CHATBOT DÉDIÉ (MESSAGES TEXTE, VISION, PARTAGE D'ÉCRAN & IA) */}
        {/* ========================================================================= */}
        {activeMode === 'chat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  💬 CANAL CHATBOT PRINCIPAL
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Vision • Partage d'écran en direct • Recherche Web
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveMode('operations');
                  setActiveFeature('hub');
                }}
                className="text-xs font-mono text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Accéder aux 15 fonctionnalités →</span>
              </button>
            </div>

            <TripartiteChat
              messages={messages}
              setMessages={setMessages}
              personality={personality}
              setPersonality={setPersonality}
              onAwardXp={handleAwardXp}
              voiceEnabled={voiceEnabled}
              user={user}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PARTIE 2 : HUB OPÉRATIONS & LES 15 FONCTIONNALITÉS SOUVERAINES */}
        {/* ========================================================================= */}
        {activeMode === 'operations' && (
          <div className="space-y-5">
            {/* Breadcrumb if inside a specific feature */}
            {activeFeature !== 'hub' && (
              <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 shadow-sm">
                <button
                  onClick={() => setActiveFeature('hub')}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>← Retour au Hub des 15 Piliers</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Espace actif :</span>
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    {activeFeature}
                  </span>
                </div>
              </div>
            )}

            {/* 0. Executive Hub (All 15 Features Categorized & Organized) */}
            {activeFeature === 'hub' && (
              <OperationsHub
                onSelectFeature={(featId) => setActiveFeature(featId)}
                onSwitchToChat={() => setActiveMode('chat')}
                user={user}
                metrics={metrics}
                doubleState={doubleState}
                personality={personality}
                bubbleConfig={bubbleConfig}
                setBubbleConfig={setBubbleConfig}
                onOpenConsole={() => setConsoleOpen(true)}
                onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              />
            )}

            {/* 1. Cockpit Dashboard */}
            {activeFeature === 'dashboard' && (
              <ControlCenterDashboard
                user={user}
                doubleState={doubleState}
                metrics={metrics}
                recentJournal={journal}
                anticipations={anticipations}
                onNavigateTab={(tab) => {
                  if (tab === 'chat') {
                    setActiveMode('chat');
                  } else {
                    setActiveFeature(tab);
                  }
                }}
                onApproveDoubleAction={handleApproveDoubleAction}
                onDismissDoubleAction={handleDismissDoubleAction}
                onOpenConsole={() => setConsoleOpen(true)}
                onOpenProfileModal={() => setIsProfileModalOpen(true)}
              />
            )}

            {/* 2. Le Double & Personnalité */}
            {activeFeature === 'double' && (
              <PersonalityAndDouble
                personality={personality}
                setPersonality={setPersonality}
                onAwardXp={handleAwardXp}
                user={user}
              />
            )}

            {/* 3. Mémoire Souveraine ZK */}
            {activeFeature === 'memory' && (
              <SovereignMemoryCenter
                memories={sovereignMemories}
                setMemories={setSovereignMemories}
                onForgetMemory={handleForgetMemory}
                onClearCategory={handleClearCategory}
              />
            )}

            {/* 4. Centre de Sécurité & Clés AES */}
            {activeFeature === 'security' && (
              <SecurityCenter
                securityData={securityData}
                setSecurityData={setSecurityData}
              />
            )}

            {/* 5. Sous-Agents & Ruche */}
            {activeFeature === 'subagents' && (
              <SubAgentsAndMemory
                subAgents={subAgents}
                setSubAgents={setSubAgents}
                sensoryMemories={sensoryMemories}
                setSensoryMemories={setSensoryMemories}
                onAwardXp={handleAwardXp}
              />
            )}

            {/* 6. Rêve & Journal Cognitif */}
            {activeFeature === 'journal' && (
              <JournalAndDream
                journal={journal}
                setJournal={setJournal}
                dream={dream}
                setDream={setDream}
                onAwardXp={handleAwardXp}
              />
            )}

            {/* 7. Anticipation & Découpage */}
            {activeFeature === 'anticipation' && (
              <AnticipationAndSplit
                anticipations={anticipations}
                setAnticipations={setAnticipations}
                onAwardXp={handleAwardXp}
              />
            )}

            {/* 8. Manuel & Spécifications V4.1 (15 Piliers) */}
            {activeFeature === 'manual' && <ManualAndSpecs />}

            {/* 9. Capsule Temporelle & Historique */}
            {activeFeature === 'capsule' && (
              <TimeCapsuleAndSecurity
                timeCapsules={timeCapsules}
                setTimeCapsules={setTimeCapsules}
                ethicalState={ethicalState}
                setEthicalState={setEthicalState}
                onAwardXp={handleAwardXp}
              />
            )}

            {/* 11. Porte Éthique & Souveraineté */}
            {activeFeature === 'ethical' && (
              <TimeCapsuleAndSecurity
                timeCapsules={timeCapsules}
                setTimeCapsules={setTimeCapsules}
                ethicalState={ethicalState}
                setEthicalState={setEthicalState}
                onAwardXp={handleAwardXp}
              />
            )}

            {/* 14. Paramètres & Personnalité */}
            {activeFeature === 'settings' && (
              <SettingsCenter
                user={user}
                setUser={setUser}
                personality={personality}
                setPersonality={setPersonality}
                onSaveNotification={handleSaveNotification}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <SessionEndModal
        isOpen={isSessionEndOpen}
        onClose={() => setIsSessionEndOpen(false)}
        onLockSession={handleLockSession}
        onLogout={handleLogout}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          const newUser = { ...user, ...updated };
          setUser(newUser);
          try {
            localStorage.setItem('roam_user_data', JSON.stringify(newUser));
          } catch (e) {}
        }}
        onSwitchAccount={() => {
          setIsProfileModalOpen(false);
          handleLogout();
        }}
      />

      <RoamConsole
        isOpen={consoleOpen}
        onClose={() => setConsoleOpen(false)}
        personality={personality}
        rewards={rewards}
        bubbleConfig={bubbleConfig}
        ethicalState={ethicalState}
        onAwardXp={handleAwardXp}
      />

      {/* Minimal Sovereign Footer with WhatsApp and Facebook */}
      <footer className="py-3 px-4 sm:px-6 bg-slate-950 border-t border-slate-900 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>ROAM’S.AI V1.0 • NŒUD SOUVERAIN {user.nodeType.toUpperCase()}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-[11px] text-slate-500 font-mono hidden md:block">
            Architecte : {user.name} • Autonomie Niveau {user.autonomyLevel}
          </div>

          {/* Social Links: WhatsApp & Facebook (Phone number is strictly invisible) */}
          <div className="flex items-center gap-2 font-mono">
            <a
              href="https://wa.me/243896082244"
              target="_blank"
              rel="noopener noreferrer"
              title="Contacter sur WhatsApp"
              aria-label="WhatsApp"
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/oromasis.banduenga"
              target="_blank"
              rel="noopener noreferrer"
              title="Profil Facebook"
              aria-label="Facebook"
              className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/25 text-blue-400 hover:text-blue-300 border border-blue-500/30 transition-all hover:scale-105"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
