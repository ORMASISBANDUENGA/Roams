import React, { useState } from 'react';
import {
  History,
  Shield,
  ShieldAlert,
  ShieldCheck,
  VolumeX,
  Volume2,
  Trophy,
  Award,
  Lock,
  Unlock,
  RotateCcw,
  Plus,
  AlertTriangle,
  FileCode,
  CheckCircle,
  Eye,
} from 'lucide-react';
import {
  TimeCapsuleState,
  BubbleModeConfig,
  EthicalBackdoorState,
  RewardState,
  PersonalityTraits,
} from '../types/roam';
import confetti from 'canvas-confetti';

interface TimeCapsuleAndSecurityProps {
  timeCapsules: TimeCapsuleState[];
  setTimeCapsules: React.Dispatch<React.SetStateAction<TimeCapsuleState[]>>;
  bubbleConfig: BubbleModeConfig;
  setBubbleConfig: React.Dispatch<React.SetStateAction<BubbleModeConfig>>;
  ethicalState: EthicalBackdoorState;
  setEthicalState: React.Dispatch<React.SetStateAction<EthicalBackdoorState>>;
  rewards: RewardState;
  setRewards: React.Dispatch<React.SetStateAction<RewardState>>;
  personality: PersonalityTraits;
  setPersonality: React.Dispatch<React.SetStateAction<PersonalityTraits>>;
  onAwardXp: (amount: number, reason: string) => void;
}

export const TimeCapsuleAndSecurity: React.FC<TimeCapsuleAndSecurityProps> = ({
  timeCapsules,
  setTimeCapsules,
  bubbleConfig,
  setBubbleConfig,
  ethicalState,
  setEthicalState,
  rewards,
  setRewards,
  personality,
  setPersonality,
  onAwardXp,
}) => {
  // Snapshot creator state
  const [newSnapName, setNewSnapName] = useState('');
  const [newSnapDesc, setNewSnapDesc] = useState('');
  const [restoredNotice, setRestoredNotice] = useState<string | null>(null);

  // Ethical protocol state
  const [ethicalCodeInput, setEthicalCodeInput] = useState('');
  const [ethicalCodeMessage, setEthicalCodeMessage] = useState<string | null>(null);

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnapName.trim()) return;

    const snap: TimeCapsuleState = {
      id: 'snap-' + Date.now(),
      name: newSnapName.toLowerCase().replace(/\s+/g, '-'),
      timestamp: new Date().toISOString(),
      description: newSnapDesc || 'Capture manuelle Hors du Temps',
      filesState: [
        { name: 'server.ts', size: '6.8 KB', status: 'clean' },
        { name: 'roam_tripartite.ts', size: '14.2 KB', status: 'clean' },
        { name: 'App.tsx', size: '18.5 KB', status: 'clean' },
      ],
      activeTasks: ['Évaluation des 15 fonctions signatures', 'Veille éthique active'],
      memorySize: '1.2 GB',
      personalitySnapshot: { ...personality },
    };

    setTimeCapsules((prev) => [snap, ...prev]);
    setNewSnapName('');
    setNewSnapDesc('');
    onAwardXp(30, 'Sauvegarde Hors du Temps');
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  const handleRestoreSnapshot = (snap: TimeCapsuleState) => {
    setPersonality(snap.personalitySnapshot);
    setRestoredNotice(`🕰️ État restauré à "${snap.name}" (${new Date(snap.timestamp).toLocaleString('fr-FR')}). Contexte et mémoire rétablis.`);
    onAwardXp(20, 'Restauration Hors du Temps');
    setTimeout(() => setRestoredNotice(null), 6000);
  };

  const handleToggleEthicalProtocol = () => {
    if (!ethicalState.active) {
      setEthicalState((prev) => ({
        ...prev,
        active: true,
        ultraSecureMode: true,
      }));
      setEthicalCodeMessage('🔐 Protocole Éthique ACTIVÉ : Toutes les actions sensibles nécessiteront confirmation stricte.');
      onAwardXp(25, 'Protocole Éthique activé');
    } else {
      setEthicalState((prev) => ({
        ...prev,
        active: false,
        ultraSecureMode: false,
      }));
      setEthicalCodeMessage('⚠️ Protocole Éthique DÉSACTIVÉ par l’Architecte.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Hors du Temps, Porte Dérobée Éthique, Mode Bulle & Récompenses
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Piliers 4 & Fonctions 10, 11, 12 : Souveraineté totale, capsules temporelles, barrière éthique inviolable et progression gamifiée.
          </p>
        </div>
      </div>

      {restoredNotice && (
        <div className="p-3.5 bg-cyan-950 border border-cyan-500/50 rounded-xl text-xs text-cyan-200 font-mono flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{restoredNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Mode Hors du Temps */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                1.12 Mode Hors du Temps (Capsules)
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              {timeCapsules.length} sauvegardes
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Faites des expériences sans aucun risque : capturez l’intégralité de vos fichiers, de la mémoire et du contexte pour y revenir instantanément en cas de besoin.
          </p>

          {/* Snapshot creator */}
          <form onSubmit={handleCreateSnapshot} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-slate-300 block">Créer une capsule temporelle :</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={newSnapName}
                onChange={(e) => setNewSnapName(e.target.value)}
                placeholder="Nom : avant-modification-sql"
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                value={newSnapDesc}
                onChange={(e) => setNewSnapDesc(e.target.value)}
                placeholder="Description du point de sauvegarde"
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sauvegarder cet état complet</span>
            </button>
          </form>

          {/* Snapshots list */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-semibold text-slate-400 block">États sauvegardés :</span>
            {timeCapsules.map((snap) => (
              <div
                key={snap.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300 font-mono">{snap.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(snap.timestamp).toLocaleString('fr-FR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">{snap.description}</p>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    RAM : {snap.memorySize} | Fichiers : {snap.filesState.length}
                  </div>
                </div>

                <button
                  onClick={() => handleRestoreSnapshot(snap)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-lg border border-slate-700 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-400" />
                  <span>Restaurer</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Sécurité & Porte Dérobée Éthique */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                1.10 Porte Dérobée Éthique & Sandbox
              </h2>
            </div>
            <button
              onClick={handleToggleEthicalProtocol}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                ethicalState.active
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {ethicalState.active ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              <span>{ethicalState.active ? 'Protocole Actif' : 'Désactivé'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Mécanisme de sécurité ultime : vérifie chaque action avant exécution, bloque les commandes destructrices et journalise chaque flux.
          </p>

          {ethicalCodeMessage && (
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-300 font-mono">
              {ethicalCodeMessage}
            </div>
          )}

          {/* Mode Bulle Settings within Security */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <VolumeX className="w-4 h-4 text-purple-400" />
                1.3 Mode Bulle (Silencieux Proactif)
              </span>
              <button
                onClick={() =>
                  setBubbleConfig((prev) => ({
                    ...prev,
                    active: !prev.active,
                    activatedAt: !prev.active ? new Date().toLocaleTimeString() : undefined,
                  }))
                }
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  bubbleConfig.active
                    ? 'bg-purple-900/60 text-purple-200 border border-purple-500'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {bubbleConfig.active ? 'Bulle Activée 🔇' : 'Désactivée'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                Seuil Danger : {(bubbleConfig.dangerThreshold * 100).toFixed(0)}%
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                Seuil Opportunité : {(bubbleConfig.opportunityThreshold * 100).toFixed(0)}%
              </div>
            </div>

            {/* Bubble Interventions log */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">Dernières interventions Bulle :</span>
              {bubbleConfig.interventionsLog.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-slate-400 text-[10px]">[{log.time}] </span>
                    <span>{log.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 block">
              Journal d’Audit Éthique :
            </span>
            <div className="space-y-1.5">
              {ethicalState.auditLogs.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-slate-200 font-medium">{item.action}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {item.time} • Risque : {(item.riskScore * 100).toFixed(0)}% • {item.reason}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.decision === 'approved'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {item.decision}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Système de Récompenses (Gamification & Badges) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              1.11 Système de Récompenses & Gamification
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
              Niveau : {rewards.level} ({rewards.points} XP)
            </span>
          </div>
        </div>

        {/* Progress Bar to next level */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Progression vers {rewards.level === 'Expert' ? 'Maître (1000 XP)' : 'Légende (5000 XP)'}</span>
            <span>{rewards.points} / {rewards.nextLevelPoints ?? 2000} XP</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (rewards.points / (rewards.nextLevelPoints ?? 2000)) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Badges showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {rewards.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/50 transition space-y-1.5 text-center flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  badge.tier === 'gold'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : badge.tier === 'silver'
                    ? 'bg-slate-400/20 text-slate-200 border border-slate-400/40'
                    : 'bg-amber-900/20 text-amber-600 border border-amber-900/40'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>

              <div className="font-bold text-xs text-slate-100">{badge.title || badge.name}</div>
              <p className="text-[11px] text-slate-400 leading-tight">{badge.description || badge.name}</p>
              <div className="text-[10px] text-amber-400/80 font-mono pt-1">
                Débloqué : {badge.unlockedAt || 'Récemment'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
