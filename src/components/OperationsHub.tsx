import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Database,
  Shield,
  Cpu,
  Calendar,
  Sparkles,
  BookOpen,
  Hourglass,
  VolumeX,
  Volume2,
  Lock,
  Terminal,
  Zap,
  Sliders,
  Download,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  HardDrive,
  MessageSquare,
} from 'lucide-react';
import { UserIdentity, SystemMetrics, DoubleState, PersonalityTraits, BubbleModeConfig } from '../types/roam';

interface OperationsHubProps {
  onSelectFeature: (featureId: string) => void;
  onSwitchToChat: () => void;
  user: UserIdentity;
  metrics: SystemMetrics;
  doubleState: DoubleState;
  personality: PersonalityTraits;
  bubbleConfig: BubbleModeConfig;
  setBubbleConfig: React.Dispatch<React.SetStateAction<BubbleModeConfig>>;
  onOpenConsole: () => void;
  onOpenDownloadModal: () => void;
}

export const OperationsHub: React.FC<OperationsHubProps> = ({
  onSelectFeature,
  onSwitchToChat,
  user,
  metrics,
  doubleState,
  personality,
  bubbleConfig,
  setBubbleConfig,
  onOpenConsole,
  onOpenDownloadModal,
}) => {
  // 15 Sovereign Pillars grouped into 4 pristine architectural categories
  const featureCategories = [
    {
      title: '1. Cerveau & Autonomie Cognitive',
      description: 'Intelligence tripartite, délégation autonome et anticipation proactive',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
      items: [
        {
          id: 'dashboard',
          number: '01',
          name: 'Centre de Contrôle (Cockpit)',
          desc: 'Télémétrie en temps réel, charge CPU, latence Système 1/2/3 et métriques.',
          icon: LayoutDashboard,
          badge: 'Cockpit V1.0',
          badgeColor: 'text-amber-300 bg-amber-500/20',
        },
        {
          id: 'double',
          number: '02',
          name: 'Le Double Numérique',
          desc: 'Signature stylistique, actions déléguées en attente et personnalité miroir.',
          icon: Bot,
          badge: `${doubleState.actions?.length || 3} actions prêtes`,
          badgeColor: 'text-emerald-300 bg-emerald-500/20',
        },
        {
          id: 'anticipation',
          number: '03',
          name: 'Anticipation & Découpage',
          desc: 'Prédiction contextuelle des besoins et scission automatique des projets.',
          icon: Sparkles,
          badge: '98% Précision',
          badgeColor: 'text-purple-300 bg-purple-500/20',
        },
        {
          id: 'subagents',
          number: '04',
          name: 'Sous-Agents & Ruche Spécialisée',
          desc: '7 assistants autonomes (Code, Veille, Sécurité, Données, Rédaction).',
          icon: Cpu,
          badge: '7 Agents Actifs',
          badgeColor: 'text-cyan-300 bg-cyan-500/20',
        },
      ],
    },
    {
      title: '2. Mémoire Souveraine & Synthèse Cognitive',
      description: 'Persistance ZK chiffrée, journal de bord automatique et capsules immuables',
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
      items: [
        {
          id: 'memory',
          number: '05',
          name: 'Mémoire Souveraine ZK',
          desc: '7 catégories souveraines chiffrées en AES-256 avec droit à l’oubli granulaire.',
          icon: Database,
          badge: '7 Catégories ZK',
          badgeColor: 'text-blue-300 bg-blue-500/20',
        },
        {
          id: 'journal',
          number: '06',
          name: 'Rêve & Journal Cognitif',
          desc: 'Consolidation nocturne, synthèse des apprentissages et carnet de bord.',
          icon: Calendar,
          badge: 'Cycle Nocturne',
          badgeColor: 'text-indigo-300 bg-indigo-500/20',
        },
        {
          id: 'capsule',
          number: '07',
          name: 'Capsule Temporelle & Historique',
          desc: 'Snapshots complets d’états, archivage immuable et restauration temporelle.',
          icon: Hourglass,
          badge: 'Immuable ZK',
          badgeColor: 'text-teal-300 bg-teal-500/20',
        },
      ],
    },
    {
      title: '3. Sécurité, Éthique & Souveraineté',
      description: 'Protection cryptographique, non-ingérence et concentration absolue',
      color: 'from-red-500/20 to-rose-500/10 border-red-500/30',
      items: [
        {
          id: 'security',
          number: '08',
          name: 'Centre de Sécurité & Clés ZK',
          desc: 'Audit cryptographique, détection des anomalies et gestion des clés locales.',
          icon: Shield,
          badge: '100% Souverain',
          badgeColor: 'text-emerald-300 bg-emerald-500/20',
        },
        {
          id: 'ethical',
          number: '09',
          name: 'Porte Éthique & Non-Ingérence',
          desc: 'Audit continu des droits d’accès, bac à sable et barrières de sécurité.',
          icon: Lock,
          badge: 'Audit Zéro-Fuite',
          badgeColor: 'text-rose-300 bg-rose-500/20',
        },
        {
          id: 'bubble',
          number: '10',
          name: 'Mode Bulle Anti-Distraction',
          desc: 'Filtrage intelligent du bruit : intervention uniquement sur danger ou opportunité.',
          icon: bubbleConfig.active ? VolumeX : Volume2,
          badge: bubbleConfig.active ? 'Bulle Active' : 'Veille',
          badgeColor: bubbleConfig.active ? 'text-purple-300 bg-purple-500/20 animate-pulse' : 'text-slate-400 bg-slate-800',
        },
      ],
    },
    {
      title: '4. Documentation, Outils & Progression',
      description: 'Manuel technique, commandes CLI, gamification XP et distribution multi-plateforme',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
      items: [
        {
          id: 'manual',
          number: '11',
          name: 'Manuel & Spécifications V4.1',
          desc: 'Les 10 Commandements de Roam, cahier des charges officiel et architecture.',
          icon: BookOpen,
          badge: 'Spécifications',
          badgeColor: 'text-amber-300 bg-amber-500/20',
        },
        {
          id: 'console',
          number: '12',
          name: 'Console CLI & Logs Système',
          desc: 'Invite de commandes interactives et télémétrie des événements en direct.',
          icon: Terminal,
          badge: 'Shell Roam',
          badgeColor: 'text-cyan-300 bg-cyan-500/20',
        },
        {
          id: 'rewards',
          number: '13',
          name: 'Niveaux, Trophées & XP',
          desc: `Progression de l'autonomie (Niveau ${user.autonomyLevel}) et badges débloqués.`,
          icon: Zap,
          badge: `Niveau ${user.autonomyLevel}`,
          badgeColor: 'text-yellow-300 bg-yellow-500/20',
        },
        {
          id: 'settings',
          number: '14',
          name: 'Paramètres & Personnalité',
          desc: 'Réglage fin du ton, formalité, proactivité, sauvegardes et configuration.',
          icon: Sliders,
          badge: personality.ton,
          badgeColor: 'text-slate-300 bg-slate-800',
        },
        {
          id: 'download',
          number: '15',
          name: 'Distribution & Multi-Plateforme',
          desc: 'Téléchargement de l’application Desktop (Windows, macOS, Linux), Mobile et PWA.',
          icon: Download,
          badge: 'Multi-OS V1.0',
          badgeColor: 'text-emerald-300 bg-emerald-500/20',
        },
      ],
    },
    {
      title: '5. Agent d\'Action, Terminal PC & Connecteurs Externes',
      description: 'Exécution de commandes terminal, appels vocaux autonomes, connecteurs WhatsApp / Facebook et Google Search Console',
      color: 'from-amber-500/30 to-emerald-500/20 border-amber-500/40',
      items: [
        {
          id: 'terminal',
          number: '16',
          name: 'Agent Terminal & Commandes PC',
          desc: 'Exécutez des commandes et scripts sur votre ordinateur de façon sécurisée.',
          icon: Terminal,
          badge: 'Shell Sécurisé',
          badgeColor: 'text-amber-300 bg-amber-500/20',
        },
        {
          id: 'calls',
          number: '17',
          name: 'Agent Téléphonie & Appels Vocaux',
          desc: 'Déléguez des appels ("Appelle X et dis-lui...") avec voix IA et transcription.',
          icon: MessageSquare,
          badge: 'Passerelle WebRTC/SIP',
          badgeColor: 'text-emerald-300 bg-emerald-500/20',
        },
        {
          id: 'plugins',
          number: '18',
          name: 'Connecteurs WhatsApp, Meta & Webhooks',
          desc: 'Gérez vos comptes WhatsApp, Facebook et sites tiers de manière éthique.',
          icon: HardDrive,
          badge: 'Plugins Éthiques',
          badgeColor: 'text-blue-300 bg-blue-500/20',
        },
        {
          id: 'hosting_seo',
          number: '19',
          name: 'Hébergement & Google Search Console',
          desc: 'Guide de déploiement multi-cloud, balise de vérification et sitemap XML.',
          icon: HardDrive,
          badge: 'SEO & Search Console',
          badgeColor: 'text-purple-300 bg-purple-500/20',
        },
      ],
    },
  ];

  const handleAction = (id: string) => {
    if (id === 'console') {
      onOpenConsole();
      return;
    }
    if (id === 'download') {
      onOpenDownloadModal();
      return;
    }
    if (id === 'bubble') {
      setBubbleConfig((prev) => ({ ...prev, active: !prev.active }));
      return;
    }
    onSelectFeature(id);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner with Executive Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                💎 HUB DES 15 PILIERS • PARTIE GESTION & OPÉRATIONS
              </span>
              <span className="text-xs font-mono text-slate-400">15/15 Piliers Opérationnels</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 font-sans tracking-tight">
              Centre des Opérations Souveraines & Capacités Intégrées
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Toutes les 15 fonctionnalités de l'architecture <strong className="text-slate-200">ROAM'S.AI V1.0</strong> sont
              organisées de manière claire et accessible en un clic.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={onSwitchToChat}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono shadow-lg transition-all cursor-pointer group"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Basculer vers le Chatbot</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Categorized Grids of the 15 Features */}
      <div className="space-y-6">
        {featureCategories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-3">
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2 px-1">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-100 font-mono tracking-wide">
                  {category.title}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">{category.description}</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {category.items.length} modules
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAction(item.id)}
                    className="flex flex-col justify-between p-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition-all text-left group shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-amber-500/20 border border-slate-700 group-hover:border-amber-500/40 flex items-center justify-center transition-colors">
                          <Icon className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-amber-500/70 font-bold">{item.number}.</span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-amber-400 transition-colors">
                      <span>Accéder au module</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
