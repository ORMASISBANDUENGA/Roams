import React, { useState, useEffect } from 'react';
import {
  Menu,
  MessageSquare,
  Plus,
  LogOut,
  User,
  Zap,
  Mic,
  Shield,
  Sliders,
  Sparkles,
  Layers,
  Terminal,
  Download
} from 'lucide-react';
import { BootScreen } from './components/BootScreen';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HomeView } from './components/HomeView';
import { TripartiteChat } from './components/TripartiteChat';
import { ProjectsView } from './components/ProjectsView';
import { DocumentsView } from './components/DocumentsView';
import { SovereignMemoryCenter } from './components/SovereignMemoryCenter';
import { ActionsView } from './components/ActionsView';
import { AgentsView } from './components/AgentsView';
import { PrivacyCenter } from './components/PrivacyCenter';
import { DevicesView } from './components/DevicesView';
import { ProfileView } from './components/ProfileView';
import { SettingsCenter } from './components/SettingsCenter';
import { OperationsHub } from './components/OperationsHub';
import { VoiceModal } from './components/VoiceModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { RoamConsole } from './components/RoamConsole';
import { RoamLogoAnimated } from './components/RoamLogoAnimated';

import {
  auth,
  db,
  onAuthStateChanged,
  logoutFirebase,
} from './lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

import {
  initialSystemMetrics,
  initialPersonality,
  initialMessages,
  initialUserIdentity,
  initialSovereignMemories,
  initialProjects,
  initialDocuments,
  initialDevices,
  initialCustomAgents,
  initialPrivacySettings,
  initialUsageQuota,
  initialDoubleState,
  initialSecurityCenter,
  initialBubbleConfig,
  initialEthicalState,
  initialRewards
} from './data/initialState';

import {
  AppScreen,
  AppNavTab,
  UserIdentity,
  PersonalityTraits,
  ChatMessage,
  ProjectItem,
  DocumentFile,
  DeviceSession,
  CustomAgentConfig,
  PrivacySettings,
  UsageQuota,
  Conversation,
  SovereignMemoryItem,
  MemoryCategory
} from './types/roam';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('boot');
  const [currentTab, setCurrentTab] = useState<AppNavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  // User State
  const [user, setUser] = useState<UserIdentity>(initialUserIdentity);
  const [personality, setPersonality] = useState<PersonalityTraits>(initialPersonality);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(initialPrivacySettings);
  const [quota, setQuota] = useState<UsageQuota>(initialUsageQuota);

  // Core Data Collections
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocuments);
  const [devices, setDevices] = useState<DeviceSession[]>(initialDevices);
  const [agents, setAgents] = useState<CustomAgentConfig[]>(initialCustomAgents);
  const [memories, setMemories] = useState<SovereignMemoryItem[]>(initialSovereignMemories);

  // Firebase auth & user isolation listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const uid = fbUser.uid;
        const displayName = fbUser.displayName || 'Architecte Souverain';
        const userEmail = fbUser.email || '';

        const updatedUser: UserIdentity = {
          ...user,
          id: uid,
          name: displayName,
          pseudonym: displayName.split(' ')[0] || 'user',
          email: userEmail,
          avatar: fbUser.photoURL || user.avatar,
        };

        setUser(updatedUser);

        // Load isolated user data from localStorage or firestore
        try {
          const storedKey = `roam_convs_${uid}`;
          const localConvs = localStorage.getItem(storedKey);
          if (localConvs) {
            const parsed = JSON.parse(localConvs);
            setConversations(parsed);
            if (parsed.length > 0) {
              setActiveConversationId(parsed[0].id);
              setMessages(parsed[0].messages || []);
            }
          } else {
            // Fresh empty conversation space for this user
            const initialConv: Conversation = {
              id: `conv-${Date.now()}`,
              title: 'Première discussion',
              createdAt: 'À l’instant',
              updatedAt: 'À l’instant',
              messages: [],
              mode: 'auto',
            };
            setConversations([initialConv]);
            setActiveConversationId(initialConv.id);
            setMessages([]);
          }
        } catch (e) {
          console.warn('Error reading stored conversations:', e);
        }

        setCurrentScreen('dashboard');
      } else {
        // Logged out / Reset session
        setCurrentScreen((prev) => (prev === 'boot' ? 'boot' : 'login'));
      }
    });

    return () => unsubscribe();
  }, []);

  // Save active conversation messages whenever they change
  useEffect(() => {
    if (!activeConversationId) return;

    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages,
              updatedAt: 'À l’instant',
              title:
                c.title === 'Première discussion' || c.title === 'Nouvelle discussion'
                  ? messages[0]?.text?.slice(0, 30) || c.title
                  : c.title,
            }
          : c
      );

      // Persist isolated
      if (user.id) {
        try {
          localStorage.setItem(`roam_convs_${user.id}`, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
  }, [messages, activeConversationId, user.id]);

  // Create New Conversation
  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'Nouvelle discussion',
      createdAt: 'À l’instant',
      updatedAt: 'À l’instant',
      messages: [],
      mode: 'auto',
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setMessages([]);
    setCurrentTab('chat');
  };

  // Select conversation
  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversationId(conv.id);
    setMessages(conv.messages || []);
    setCurrentTab('chat');
  };

  // Delete conversation
  const handleDeleteConversation = (convId: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== convId);
      if (activeConversationId === convId) {
        if (filtered.length > 0) {
          setActiveConversationId(filtered[0].id);
          setMessages(filtered[0].messages || []);
        } else {
          setActiveConversationId('');
          setMessages([]);
        }
      }
      return filtered;
    });
  };

  // Start chat with a specific prompt
  const handleStartChatWithPrompt = (
    prompt: string,
    options?: { autoSend?: boolean; mode?: string }
  ) => {
    let currentConvId = activeConversationId;
    if (!currentConvId) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: prompt.slice(0, 30) || 'Nouvelle discussion',
        createdAt: 'À l’instant',
        updatedAt: 'À l’instant',
        messages: [],
        mode: 'auto',
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      currentConvId = newConv.id;
    }

    if (options?.autoSend) {
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    setCurrentTab('chat');
  };

  // Login handler
  const handleLogin = (
    mode: 'local' | 'cloud',
    isNewUser?: boolean,
    customUser?: Partial<UserIdentity>
  ) => {
    const updated: UserIdentity = {
      ...user,
      nodeType: mode,
      ...(customUser || {}),
    };
    setUser(updated);

    // Ensure initial conversation exists
    if (conversations.length === 0) {
      const initialConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: 'Discussion principale',
        createdAt: 'À l’instant',
        updatedAt: 'À l’instant',
        messages: [],
        mode: 'auto',
      };
      setConversations([initialConv]);
      setActiveConversationId(initialConv.id);
      setMessages([]);
    }

    if (isNewUser) {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('dashboard');
      setCurrentTab('home');
    }
  };

  // Logout handler - Isolates and resets data
  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (e) {}

    // Reset runtime state
    setUser(initialUserIdentity);
    setConversations([]);
    setMessages([]);
    setActiveConversationId('');
    setCurrentScreen('login');
    setCurrentTab('home');
  };

  // Screen Routing: Boot -> Login -> Onboarding -> Dashboard
  if (currentScreen === 'boot') {
    return <BootScreen onBootComplete={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return (
      <AuthScreen
        user={user}
        onLogin={handleLogin}
        onStartOnboarding={() => setCurrentScreen('onboarding')}
      />
    );
  }

  if (currentScreen === 'onboarding') {
    return (
      <OnboardingFlow
        initialUser={user}
        onComplete={(updatedUser, updatedPersonality) => {
          setUser(updatedUser);
          setPersonality(updatedPersonality);
          setCurrentScreen('dashboard');
          setCurrentTab('home');
        }}
      />
    );
  }

  // Dashboard Main Shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* Desktop Sidebar & Mobile Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setIsDrawerOpen(false);
        }}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        user={user}
        onLogout={handleLogout}
        onOpenProfile={() => {
          setCurrentTab('profile');
          setIsDrawerOpen(false);
        }}
      />

      {/* Center Main Stage */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        {/* Mobile Header Bar */}
        <header className="lg:hidden h-14 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <RoamLogoAnimated size="sm" />
              <span className="font-bold text-sm tracking-wider font-mono text-slate-100">ROAM'S.AI</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleNewConversation}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
              title="Nouvelle discussion"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('profile')}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-950"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>
          </div>
        </header>

        {/* Tab Router Stage */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {currentTab === 'home' && (
            <HomeView
              user={user}
              projects={projects}
              conversations={conversations}
              onStartChatWithPrompt={handleStartChatWithPrompt}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenProfile={() => setCurrentTab('profile')}
              onStartVoiceChat={() => setIsVoiceModalOpen(true)}
            />
          )}

          {currentTab === 'chat' && (
            <TripartiteChat
              messages={messages}
              setMessages={setMessages}
              personality={personality}
              setPersonality={setPersonality}
              onAwardXp={() => {}}
              voiceEnabled={true}
              user={user}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onSelectProject={(proj) => {
                handleStartChatWithPrompt(`Travaillons sur le projet "${proj.name}".`);
              }}
              onCreateProject={(newProj) => {
                setProjects((prev) => [{ id: `proj-${Date.now()}`, ...newProj } as ProjectItem, ...prev]);
              }}
              onDeleteProject={(id) => {
                setProjects((prev) => prev.filter((p) => p.id !== id));
              }}
              onStartChatInProject={(name) => {
                handleStartChatWithPrompt(`Dans le cadre du projet "${name}", `);
              }}
            />
          )}

          {currentTab === 'documents' && (
            <DocumentsView
              documents={documents}
              onUploadDocument={(doc) => {
                setDocuments((prev) => [doc, ...prev]);
              }}
              onDeleteDocument={(id) => {
                setDocuments((prev) => prev.filter((d) => d.id !== id));
              }}
              onAnalyzeDocumentInChat={(doc, prompt) => {
                handleStartChatWithPrompt(`[Document : ${doc.name}]\n\n${prompt}`, { autoSend: true });
              }}
            />
          )}

          {currentTab === 'memory' && (
            <SovereignMemoryCenter
              memories={memories}
              setMemories={setMemories}
              onForgetMemory={(id) => setMemories((prev) => prev.filter((m) => m.id !== id))}
              onClearCategory={(cat) => setMemories((prev) => prev.filter((m) => m.category !== cat))}
            />
          )}

          {currentTab === 'actions' && (
            <ActionsView
              onTriggerAction={(prompt, options) => {
                handleStartChatWithPrompt(prompt, options);
              }}
            />
          )}

          {currentTab === 'agents' && (
            <AgentsView
              agents={agents}
              onCreateAgent={(agent) => {
                setAgents((prev) => [agent, ...prev]);
              }}
              onDeleteAgent={(id) => {
                setAgents((prev) => prev.filter((a) => a.id !== id));
              }}
              onSelectAgentForChat={(agent) => {
                handleStartChatWithPrompt(`Bonjour ${agent.name}, aide-moi avec ton expertise.`, { autoSend: true });
              }}
            />
          )}

          {currentTab === 'privacy' && (
            <PrivacyCenter
              user={user}
              privacySettings={privacySettings}
              onUpdatePrivacySettings={setPrivacySettings}
              onExportAllData={() => {
                const fullData = {
                  user,
                  conversations,
                  projects,
                  documents,
                  memories,
                  privacySettings,
                  exportedAt: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `roam-sovereign-backup-${Date.now()}.json`;
                a.click();
              }}
              onClearAllUserData={() => {
                setConversations([]);
                setMessages([]);
                setMemories([]);
                if (user.id) {
                  localStorage.removeItem(`roam_convs_${user.id}`);
                }
              }}
              onDeleteAccount={handleLogout}
            />
          )}

          {currentTab === 'devices' && (
            <DevicesView
              devices={devices}
              onDisconnectDevice={(id) => {
                setDevices((prev) => prev.filter((d) => d.id !== id));
              }}
              onDisconnectAllOtherDevices={() => {
                setDevices((prev) => prev.filter((d) => d.isCurrent));
              }}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              onOpenDevices={() => setCurrentTab('devices')}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsCenter
              user={user}
              setUser={setUser}
              personality={personality}
              setPersonality={setPersonality}
              quota={quota}
              onSaveNotification={() => {}}
              onOpenDevices={() => setCurrentTab('devices')}
              onOpenPrivacy={() => setCurrentTab('privacy')}
            />
          )}

          {currentTab === 'lab' && (
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <OperationsHub
                onSelectFeature={(featId) => {
                  console.log('Lab feature selected:', featId);
                }}
                onSwitchToChat={() => setCurrentTab('chat')}
                user={user}
                metrics={initialSystemMetrics}
                doubleState={initialDoubleState}
                personality={personality}
                bubbleConfig={initialBubbleConfig}
                setBubbleConfig={() => {}}
                onOpenConsole={() => setIsConsoleOpen(true)}
                onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              />
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="lg:hidden h-14 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md flex items-center justify-around px-2 shrink-0 z-20">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-medium transition-colors ${
              currentTab === 'home' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <span className="text-base">🏠</span>
            <span>Accueil</span>
          </button>

          <button
            onClick={() => setCurrentTab('chat')}
            className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-medium transition-colors ${
              currentTab === 'chat' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <span className="text-base">💬</span>
            <span>Chat</span>
          </button>

          <button
            onClick={() => setCurrentTab('projects')}
            className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-medium transition-colors ${
              currentTab === 'projects' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <span className="text-base">📁</span>
            <span>Projets</span>
          </button>

          <button
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-medium transition-colors ${
              currentTab === 'profile' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <span className="text-base">👤</span>
            <span>Profil</span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center space-y-0.5 text-[10px] font-medium text-slate-400"
          >
            <span className="text-base">☰</span>
            <span>Menu</span>
          </button>
        </nav>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSendVoiceTranscription={(transcript) => {
          handleStartChatWithPrompt(transcript, { autoSend: true });
        }}
      />

      {/* Download & Console Modals */}
      {isDownloadModalOpen && (
        <DownloadAppModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      )}

      {isConsoleOpen && (
        <RoamConsole
          isOpen={isConsoleOpen}
          onClose={() => setIsConsoleOpen(false)}
          personality={personality}
          rewards={initialRewards}
          bubbleConfig={initialBubbleConfig}
          ethicalState={initialEthicalState}
          onAwardXp={() => {}}
        />
      )}

    </div>
  );
}
