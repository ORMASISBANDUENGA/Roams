import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Mic,
  ArrowRight,
  Code2,
  BookOpen,
  PenTool,
  Search,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Eye,
  Briefcase,
  Zap,
  FolderKanban,
  User,
  Plus
} from 'lucide-react';
import { UserIdentity, ProjectItem, Conversation } from '../types/roam';
import { RoamLogoAnimated } from './RoamLogoAnimated';

interface HomeViewProps {
  user: UserIdentity;
  projects: ProjectItem[];
  conversations: Conversation[];
  onStartChatWithPrompt: (prompt: string, options?: { autoSend?: boolean; mode?: string }) => void;
  onNavigateTab: (tab: any) => void;
  onOpenProfile: () => void;
  onStartVoiceChat: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  projects,
  conversations,
  onStartChatWithPrompt,
  onNavigateTab,
  onOpenProfile,
  onStartVoiceChat,
}) => {
  const [inputText, setInputText] = useState('');

  const displayName = user.name ? user.name.split(' ')[0] : 'vous';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onStartChatWithPrompt(inputText.trim(), { autoSend: true });
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickActions = [
    {
      id: 'coder',
      title: 'Aide-moi à coder',
      icon: Code2,
      prompt: 'Aide-moi à concevoir et coder une solution logicielle propre et typée en TypeScript.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40',
    },
    {
      id: 'apprendre',
      title: 'Explique-moi quelque chose',
      icon: BookOpen,
      prompt: 'Explique-moi les concepts clés d’une architecture logicielle moderne et sécurisée.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
    },
    {
      id: 'ecrire',
      title: 'Aide-moi à rédiger',
      icon: PenTool,
      prompt: 'Aide-moi à rédiger un document clair, concis et professionnel.',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20 hover:border-sky-500/40',
    },
    {
      id: 'recherche',
      title: 'Recherche sur le web',
      icon: Search,
      prompt: 'Recherche les dernières actualités et tendances technologiques de cette semaine.',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
        
        {/* Top Minimalist Header */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800/60">
          <div className="flex items-center space-x-3">
            <RoamLogoAnimated size="sm" />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider text-slate-100 font-mono">ROAM'S.AI</span>
              <span className="text-[10px] text-amber-400/80 font-medium">Intelligence Souveraine</span>
            </div>
          </div>

          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all text-xs font-medium text-slate-300 hover:text-slate-100"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-slate-950">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span>{user.name || 'Mon Profil'}</span>
          </button>
        </div>

        {/* Hero Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2 pt-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            Bonjour {user.name ? user.name : ''} 👋
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-light">
            Comment puis-je vous aider aujourd'hui ?
          </p>
        </motion.div>

        {/* Central Clean Input Prompt Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="w-full"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 focus-within:border-amber-500/60 focus-within:ring-1 focus-within:ring-amber-500/30 shadow-2xl transition-all p-3.5 flex flex-col space-y-3 backdrop-blur-xl"
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="✨ Demandez quelque chose à ROAM..."
              rows={3}
              className="w-full bg-transparent resize-none outline-none text-slate-100 placeholder-slate-500 text-sm md:text-base leading-relaxed px-1"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              {/* Accessory quick tags */}
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => onStartChatWithPrompt('Génère une image ', { autoSend: false })}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('documents')}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Document</span>
                </button>
                <button
                  type="button"
                  onClick={onStartVoiceChat}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Voix</span>
                </button>
              </div>

              {/* Mic & Send button */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onStartVoiceChat}
                  title="Parler à l'oral"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    inputText.trim()
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 font-bold" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* 4 Main Action Cards */}
        <div className="w-full space-y-3 pt-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
            Actions Rapides
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onStartChatWithPrompt(action.prompt, { autoSend: true })}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${action.color}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-950/50">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{action.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Sovereign Pillars Navigation */}
        <div className="w-full pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigateTab('chat')}
            className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center text-center space-y-1.5 transition-all"
          >
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">Discuter</span>
          </button>

          <button
            onClick={() => onNavigateTab('documents')}
            className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center text-center space-y-1.5 transition-all"
          >
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">Analyser</span>
          </button>

          <button
            onClick={() => onNavigateTab('projects')}
            className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center text-center space-y-1.5 transition-all"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">Travailler</span>
          </button>

          <button
            onClick={() => onNavigateTab('actions')}
            className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex flex-col items-center text-center space-y-1.5 transition-all"
          >
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">Actions</span>
          </button>
        </div>

        {/* Recent Projects / Continuation Section */}
        {projects.length > 0 && (
          <div className="w-full space-y-3 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Continuer un projet
              </span>
              <button
                onClick={() => onNavigateTab('projects')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Voir tout ({projects.length})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigateTab('projects')}
                  className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/30 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-200">{proj.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                  <div className="text-[11px] text-slate-500 pt-1">
                    {proj.conversationsCount} discussions • {proj.documentsCount} documents
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
