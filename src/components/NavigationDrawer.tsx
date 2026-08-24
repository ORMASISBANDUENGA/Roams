import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  MessageSquare,
  FolderKanban,
  FileText,
  Brain,
  Zap,
  Bot,
  Shield,
  Smartphone,
  Sliders,
  User,
  Plus,
  Trash2,
  LogOut,
  X,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { AppNavTab, Conversation, UserIdentity } from '../types/roam';
import { RoamLogoAnimated } from './RoamLogoAnimated';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (conv: Conversation) => void;
  onNewConversation: () => void;
  onDeleteConversation: (convId: string) => void;
  user: UserIdentity;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  user,
  onLogout,
  onOpenProfile,
}) => {
  const mainNavItems = [
    { id: 'home' as AppNavTab, label: 'Accueil', icon: Home },
    { id: 'chat' as AppNavTab, label: 'Chat', icon: MessageSquare },
    { id: 'projects' as AppNavTab, label: 'Projets', icon: FolderKanban },
    { id: 'documents' as AppNavTab, label: 'Documents', icon: FileText },
    { id: 'memory' as AppNavTab, label: 'Mémoire', icon: Brain },
    { id: 'actions' as AppNavTab, label: 'Actions', icon: Zap },
    { id: 'agents' as AppNavTab, label: 'Agents', icon: Bot },
  ];

  const secondaryNavItems = [
    { id: 'privacy' as AppNavTab, label: 'Confidentialité', icon: Shield },
    { id: 'devices' as AppNavTab, label: 'Appareils', icon: Smartphone },
    { id: 'settings' as AppNavTab, label: 'Paramètres', icon: Sliders },
  ];

  const renderContent = (isMobileDrawer = false) => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80 select-none">
      
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
        <div
          onClick={() => {
            onSelectTab('home');
            if (isMobileDrawer) onClose();
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <RoamLogoAnimated size="sm" />
          <div>
            <span className="font-bold text-sm tracking-wider font-mono text-slate-100 group-hover:text-amber-400 transition-colors">
              ROAM'S.AI
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">Souverain & Privé</span>
          </div>
        </div>

        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-3 border-b border-slate-800/60">
        <button
          onClick={() => {
            onNewConversation();
            onSelectTab('chat');
            if (isMobileDrawer) onClose();
          }}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle discussion</span>
        </button>
      </div>

      {/* Primary Navigation List */}
      <div className="px-3 py-2 space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (isMobileDrawer) onClose();
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 border-t border-slate-800/60">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Historique récent</span>
          <span className="text-[10px] text-slate-400 font-mono">{conversations.length}</span>
        </div>

        {conversations.length === 0 ? (
          <div className="px-3 py-4 text-xs text-slate-400 italic">
            Aucune conversation pour l'instant.
          </div>
        ) : (
          conversations.slice(0, 15).map((conv) => {
            const isSelected = activeConversationId === conv.id && currentTab === 'chat';
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv);
                  onSelectTab('chat');
                  if (isMobileDrawer) onClose();
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 font-medium border border-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  <span className="truncate">{conv.title || 'Discussion sans titre'}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                  title="Supprimer la discussion"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Secondary items: Confidentialité, Appareils, Paramètres */}
      <div className="p-3 border-t border-slate-800/80 space-y-1">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (isMobileDrawer) onClose();
              }}
              className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs transition-all ${
                isActive
                  ? 'bg-slate-900 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div
          onClick={() => {
            onOpenProfile();
            if (isMobileDrawer) onClose();
          }}
          className="flex items-center space-x-2.5 cursor-pointer truncate"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-slate-200 truncate">{user.name || 'Mon Profil'}</div>
            <div className="text-[10px] text-slate-500 truncate">@{user.pseudonym || 'user'}</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed on lg screens) */}
      <aside className="hidden lg:flex w-64 h-screen shrink-0 flex-col">
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer (Modal on small screens) */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Slide-out drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10"
            >
              {renderContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
