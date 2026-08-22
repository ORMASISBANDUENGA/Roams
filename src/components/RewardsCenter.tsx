import React from 'react';
import {
  Zap,
  Award,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Flame,
  Star,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { UserIdentity, AutonomyLevel } from '../types/roam';

interface RewardsCenterProps {
  user: UserIdentity;
  onUpgradeAutonomy: (newLevel: AutonomyLevel) => void;
  onAwardXp: (amount: number, reason: string) => void;
}

export const RewardsCenter: React.FC<RewardsCenterProps> = ({
  user,
  onUpgradeAutonomy,
  onAwardXp,
}) => {
  // Autonomy levels progression
  const levels = [
    {
      level: 1,
      name: 'Niveau 1 : Assistant Passif',
      desc: 'Répond uniquement aux sollicitations directes, zéro initiative.',
      reqXp: 0,
      unlocked: true,
    },
    {
      level: 2,
      name: 'Niveau 2 : Observateur & Synthèse',
      desc: 'Analyse les contextes et propose des suggestions de structuration.',
      reqXp: 200,
      unlocked: user.autonomyLevel >= 2,
    },
    {
      level: 3,
      name: 'Niveau 3 : Le Double Proactif',
      desc: 'Prépare des brouillons de messages, anticipe les besoins avant la demande.',
      reqXp: 600,
      unlocked: user.autonomyLevel >= 3,
    },
    {
      level: 4,
      name: 'Niveau 4 : Co-Pilote Autonome Supervisé',
      desc: 'Exécute des sous-tâches, synchronise la mémoire et filtre les alertes.',
      reqXp: 1200,
      unlocked: user.autonomyLevel >= 4,
    },
    {
      level: 5,
      name: 'Niveau 5 : Autonomie Complète Délégataire',
      desc: 'Exécution d’actions planifiées, auto-amélioration et boucle souveraine fermée.',
      reqXp: 2500,
      unlocked: user.autonomyLevel >= 5,
    },
  ];

  const badges = [
    {
      id: 'first_prompt',
      name: 'Premier Dialogue',
      desc: 'Première interaction avec le Cerveau Tripartite',
      icon: Sparkles,
      unlocked: true,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30',
    },
    {
      id: 'screen_vision',
      name: 'Vision Multimodale',
      desc: 'Analyse d’écran en direct ou image réussie',
      icon: Layers,
      unlocked: true,
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-300 border-blue-500/30',
    },
    {
      id: 'sovereign_memory',
      name: 'Architecte de Mémoire',
      desc: 'Synchronisation de données dans la Mémoire Souveraine',
      icon: ShieldCheck,
      unlocked: true,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'double_activated',
      name: 'Double Numérique Actif',
      desc: 'Configuration de votre profil stylistique miroir',
      icon: Star,
      unlocked: user.autonomyLevel >= 2,
      color: 'from-purple-500/20 to-pink-500/10 text-purple-300 border-purple-500/30',
    },
    {
      id: 'terminal_master',
      name: 'Contrôleur de Système',
      desc: 'Exécution vérifiée d’une commande dans le bac à sable',
      icon: Flame,
      unlocked: user.autonomyLevel >= 3,
      color: 'from-rose-500/20 to-red-500/10 text-rose-300 border-rose-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 border border-amber-500/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                PILIER 13 • NIVEAUX, TROPHÉES & XP SOUVERAINS
              </span>
              <span className="text-xs font-mono text-slate-400">Progression d'Autonomie</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">
              Progression d'Autonomie & Trophées
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Gagnez des points d'expérience (XP) en interagissant avec l'IA, en validant des actions du
              Double et en explorant les modules opérationnels.
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 shrink-0">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Niveau d'Autonomie</div>
              <div className="text-lg font-black font-mono text-amber-300">
                NIVEAU {user.autonomyLevel} / 5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Levels Matrix */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Échelons d'Autonomie du Système</span>
        </h2>

        <div className="space-y-2.5">
          {levels.map((lvl) => {
            const isCurrent = user.autonomyLevel === lvl.level;
            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : lvl.unlocked
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-amber-500/30 text-amber-300'
                          : lvl.unlocked
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isCurrent ? 'ACTUEL' : lvl.unlocked ? 'DÉBLOQUÉ' : 'VERROUILLÉ'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{lvl.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{lvl.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {!isCurrent && (
                    <button
                      onClick={() => onUpgradeAutonomy(lvl.level as AutonomyLevel)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Sélectionner
                    </button>
                  )}
                  {isCurrent && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Actif
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges and Trophies */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Trophées & Badges d'Accomplissement</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border bg-gradient-to-br transition-all flex items-start gap-3.5 ${
                  badge.unlocked ? badge.color : 'border-slate-800/80 bg-slate-950/60 opacity-50'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100">{badge.name}</h3>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
