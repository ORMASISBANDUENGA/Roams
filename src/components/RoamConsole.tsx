import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Play, Sparkles, Check, AlertCircle } from 'lucide-react';
import { PersonalityTraits, RewardState, BubbleModeConfig, EthicalBackdoorState } from '../types/roam';

interface RoamConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  personality: PersonalityTraits;
  rewards: RewardState;
  bubbleConfig: BubbleModeConfig;
  ethicalState: EthicalBackdoorState;
  onAwardXp: (amount: number, reason: string) => void;
}

export const RoamConsole: React.FC<RoamConsoleProps> = ({
  isOpen,
  onClose,
  personality,
  rewards,
  bubbleConfig,
  ethicalState,
  onAwardXp,
}) => {
  const [inputCommand, setInputCommand] = useState('');
  const [logs, setLogs] = useState<Array<{ text: string; type: 'cmd' | 'info' | 'success' | 'warn' | 'err' }>>([
    { text: "💻 ROAM'S.AI V4.1 CONSOLE EXPERT INITIALIZED", type: 'info' },
    { text: "Tapez 'help' pour la liste des commandes système ou cliquez sur un raccourci.", type: 'info' },
    { text: 'Core: 🟢 Opérationnel (v4.1.0) | Cerveau: Tripartite Actif', type: 'success' },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleRunCommand = (cmdStr?: string) => {
    const rawCmd = (cmdStr || inputCommand).trim();
    if (!rawCmd) return;

    setLogs((prev) => [...prev, { text: `> ${rawCmd}`, type: 'cmd' }]);
    setInputCommand('');

    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        setLogs((prev) => [
          ...prev,
          { text: '=== COMMANDES ROAM V4.1 DISPONIBLES ===', type: 'info' },
          { text: '  status           : Affiche l’état complet du Core et des sous-systèmes', type: 'info' },
          { text: '  logs [--tail N]  : Consulte les 20 dernières lignes du journal système', type: 'info' },
          { text: '  memory optimize  : Exécute la compression vectorielle (+15% perf)', type: 'info' },
          { text: '  double test      : Lance un test de génération via Le Double', type: 'info' },
          { text: '  dream            : Affiche les déductions du dernier Rêve de Roam', type: 'info' },
          { text: '  bubble [on|off]  : Active ou désactive le Mode Bulle silencieux', type: 'info' },
          { text: '  expert [rust|py] : Bascule en mode Expert pour un langage donné', type: 'info' },
          { text: '  rewards          : Affiche les points XP et badges débloqués', type: 'info' },
          { text: '  clear            : Nettoie l’écran de la console', type: 'info' },
        ]);
        break;

      case 'status':
        setLogs((prev) => [
          ...prev,
          { text: '● Core:        🟢 Opérationnel (v4.1.0)', type: 'success' },
          { text: '● Cerveau:     🧠 Tripartite (S1: 110ms, S2: Logique, S3: Méta)', type: 'info' },
          { text: '● Mémoire:     🟢 1.2GB utilisés / 4.0GB max', type: 'success' },
          { text: `● Personnalité: 🎭 ${personality?.ton || 'professionnel'} (Humour: ${((personality?.humour ?? 0.5) * 100).toFixed(0)}%, Concision: ${((personality?.longueur ?? 0.5) * 100).toFixed(0)}%)`, type: 'info' },
          { text: `● Bulle:       ${bubbleConfig?.active ? '🟣 ACTIVE' : '⚪ Désactivée'}`, type: 'info' },
          { text: `● Éthique:     ${ethicalState?.active ? '🟢 Sandbox Active' : '🔴 Inactive'}`, type: 'info' },
          { text: `● Récompenses: 🏆 ${rewards?.level || 'Apprenti'} (${rewards?.points ?? 0} XP)`, type: 'info' },
        ]);
        break;

      case 'logs':
        setLogs((prev) => [
          ...prev,
          { text: '09:23:01 INFO - Initialisation du Cerveau Tripartite v4.1 terminée.', type: 'info' },
          { text: '09:23:15 OK   - Sous-agents GitHub Manager et SQL Assistant rattachés.', type: 'success' },
          { text: '09:24:00 INFO - Mémoire sensorielle indexée : 3 souvenirs chargés.', type: 'info' },
          { text: '09:24:30 OK   - Porte dérobée éthique verrouillée.', type: 'success' },
        ]);
        break;

      case 'memory':
        if (args[0] === 'optimize') {
          setLogs((prev) => [
            ...prev,
            { text: '🔄 Optimisation et déduplication des vecteurs mémoires en cours...', type: 'info' },
            { text: '✅ Optimisation terminée avec succès : +18% de rapidité sur Système 1.', type: 'success' },
          ]);
          onAwardXp(15, 'Optimisation Mémoire Console');
        } else {
          setLogs((prev) => [
            ...prev,
            { text: 'Mémoire RAM : 1.2 GB / 4.0 GB (30% utilisé). Utilisez "memory optimize" pour compacter.', type: 'info' },
          ]);
        }
        break;

      case 'clear':
        setLogs([]);
        break;

      case 'bubble':
        setLogs((prev) => [
          ...prev,
          { text: `Mode Bulle : ${args[0] === 'on' ? 'Activé 🔇' : args[0] === 'off' ? 'Désactivé' : 'État actuel inspecté'}`, type: 'info' },
        ]);
        break;

      case 'rewards':
        setLogs((prev) => [
          ...prev,
          { text: `Niveau Actuel : ${rewards.level} (${rewards.points} XP / ${rewards.nextLevelPoints} XP)`, type: 'success' },
          { text: `Badges : ${rewards.badges.map((b) => b.title).join(', ')}`, type: 'info' },
        ]);
        break;

      case 'expert':
        setLogs((prev) => [
          ...prev,
          { text: `🎓 Mode Expert activé pour : ${args[0] || 'Général'}. Références documentaires strictes et analyse exhaustive.`, type: 'success' },
        ]);
        break;

      default:
        setLogs((prev) => [
          ...prev,
          { text: `❌ Commande inconnue: "${rawCmd}". Tapez 'help' pour la liste des commandes.`, type: 'err' },
        ]);
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl h-[650px] flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Console Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span className="text-xs font-bold text-slate-300 ml-2">
              ROAM CLI - MODE EXPERT (V4.1.0)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Logs Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs bg-slate-950 text-slate-200">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                log.type === 'cmd'
                  ? 'text-amber-400 font-bold'
                  : log.type === 'success'
                  ? 'text-emerald-400'
                  : log.type === 'warn'
                  ? 'text-yellow-300'
                  : log.type === 'err'
                  ? 'text-rose-400'
                  : 'text-slate-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Raccourcis :</span>
          {['status', 'help', 'logs', 'memory optimize', 'rewards', 'bubble on', 'expert rust', 'clear'].map(
            (c) => (
              <button
                key={c}
                onClick={() => handleRunCommand(c)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-[11px] border border-slate-700 whitespace-nowrap transition"
              >
                &gt; {c}
              </button>
            )
          )}
        </div>

        {/* Console Input */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
            className="flex items-center gap-2 text-xs"
          >
            <span className="text-amber-400 font-bold">&gt;</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Entrez une commande (ex: status, help, memory optimize)..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              <span>Exec</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
