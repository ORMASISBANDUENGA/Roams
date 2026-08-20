import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  HardDrive,
  Shield,
  Activity,
  FolderCode,
  Calendar,
  Layers,
  ArrowRight,
  Database,
  Search,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  User,
  Sliders
} from 'lucide-react';
import {
  UserIdentity,
  DoubleState,
  SystemMetrics,
  JournalEntry,
  AnticipationCard,
} from '../types/roam';

interface ControlCenterDashboardProps {
  user: UserIdentity;
  doubleState: DoubleState;
  metrics: SystemMetrics;
  recentJournal: JournalEntry[];
  anticipations: AnticipationCard[];
  onNavigateTab: (tabId: string) => void;
  onApproveDoubleAction: (id: string) => void;
  onDismissDoubleAction: (id: string) => void;
  onOpenConsole: () => void;
  onOpenProfileModal?: () => void;
}

export const ControlCenterDashboard: React.FC<ControlCenterDashboardProps> = ({
  user,
  doubleState,
  metrics,
  recentJournal,
  anticipations,
  onNavigateTab,
  onApproveDoubleAction,
  onDismissDoubleAction,
  onOpenConsole,
  onOpenProfileModal,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CENTRE DE CONTRÔLE SOUVERAIN • NŒUD LOCAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-mono flex items-center gap-3">
            <span>Bonjour, {user.name}.</span>
            {onOpenProfileModal && (
              <button
                onClick={onOpenProfileModal}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition-colors text-xs font-mono border border-slate-700/80 flex items-center gap-1 cursor-pointer"
                title="Modifier vos coordonnées"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Coordonnées</span>
              </button>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Votre environnement numérique est sous surveillance active. Niveau d'autonomie : <span className="text-amber-400 font-semibold">Niveau {user.autonomyLevel}</span>.
            {user.email && <span className="ml-2 text-slate-500 font-mono text-xs">• {user.email}</span>}
            {user.phone && <span className="ml-1 text-slate-500 font-mono text-xs">({user.phone})</span>}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('chat')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>OUVRIR LE CHAT</span>
          </button>
          <button
            onClick={() => onNavigateTab('double')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>LE DOUBLE</span>
          </button>
        </div>
      </div>

      {/* Résumé du jour : 3 éléments importants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Item 1 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              SQL Quest
            </span>
            <span className="text-[10px] text-slate-500 font-mono">En cours</span>
          </div>
          <div className="text-sm font-semibold text-slate-200 mb-1">Progression détectée</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Indexation des requêtes audit validée par le sous-agent. Gain estimé à +64%.
          </p>
        </div>

        {/* Item 2 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Tâche importante
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Priorité 1</span>
          </div>
          <div className="text-sm font-semibold text-slate-200 mb-1">À terminer aujourd'hui</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Finalisation de la release ROAM V1.0 et déploiement du bouton de téléchargement.
          </p>
        </div>

        {/* Item 3 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Productivité
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-semibold text-slate-200 mb-1">+15 % cette semaine</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            7.2h de travail effectif sans interruption majeure grâce au filtrage du mode Bulle.
          </p>
        </div>
      </div>

      {/* Main Split: LE DOUBLE WIDGET & CERVEAU TRIPARTITE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LE DOUBLE CARD (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-slate-100 flex items-center gap-2">
                  LE DOUBLE
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    🟢 ACTIF
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Dernière synchronisation : {doubleState.lastSyncAgo}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('double')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>VOIR L'ACTIVITÉ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Double Stats Grid */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-500 font-mono">Tâches surveillées</div>
              <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">
                {doubleState.monitoredTasksCount}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-500 font-mono">Actions préparées</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                {doubleState.preparedActionsCount}
              </div>
            </div>
          </div>

          {/* Prepared Actions List */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Actions prêtes pour validation ({doubleState.actions.length})
            </div>

            {doubleState.actions.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {act.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{act.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {(act.confidence * 100).toFixed(0)}% confiance
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1">{act.description}</p>

                <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {act.payloadPreview}
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => onDismissDoubleAction(act.id)}
                    className="px-2.5 py-1 rounded text-xs font-mono text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Ignorer
                  </button>
                  <button
                    onClick={() => onApproveDoubleAction(act.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approuver &amp; Exécuter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERVEAU TRIPARTITE & TOOLS STATUS (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tripartite Health Box */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <Brain className="w-4 h-4 text-amber-400" />
                <span>CERVEAU TRIPARTITE</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">99.9% Optimal</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-300">Système 1 (Instinct)</span>
                </div>
                <span className="text-amber-400 font-semibold">{metrics.system1LatencyMs} ms</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">Système 2 (Réflexion)</span>
                </div>
                <span className="text-cyan-400 font-semibold">{metrics.system2LatencyMs} ms</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-slate-300">Système 3 (Méta)</span>
                </div>
                <span className="text-purple-400 font-semibold">Surveillance continue</span>
              </div>
            </div>
          </div>

          {/* Quick Tools Access */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Accès Outils &amp; Souveraineté
              </span>
              <button
                onClick={onOpenConsole}
                className="text-[11px] font-mono text-amber-400 hover:underline cursor-pointer"
              >
                System Log ➜
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('memory')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Mémoire (7)</span>
              </button>

              <button
                onClick={() => onNavigateTab('security')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Sécurité 🟢</span>
              </button>

              <button
                onClick={() => onNavigateTab('subagents')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Agents (7)</span>
              </button>

              <button
                onClick={() => onNavigateTab('settings')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-left text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                <HardDrive className="w-4 h-4 text-amber-400" />
                <span>Paramètres</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
