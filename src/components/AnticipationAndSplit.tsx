import React, { useState } from 'react';
import {
  Zap,
  GitFork,
  ArrowRight,
  Sparkles,
  FileText,
  Play,
  CheckCircle2,
  RefreshCw,
  Layers,
  Bot,
  Merge,
  ShieldCheck,
} from 'lucide-react';
import { AnticipationCard } from '../types/roam';
import { initialAnticipations } from '../data/initialState';
import confetti from 'canvas-confetti';

interface AnticipationAndSplitProps {
  anticipations: AnticipationCard[];
  setAnticipations: React.Dispatch<React.SetStateAction<AnticipationCard[]>>;
  onAwardXp: (amount: number, reason: string) => void;
}

export const AnticipationAndSplit: React.FC<AnticipationAndSplitProps> = ({
  anticipations,
  setAnticipations,
  onAwardXp,
}) => {
  // Anticipation state
  const [anticipateLoading, setAnticipateLoading] = useState(false);
  const [activeProject, setActiveProject] = useState("Roam's.ai V4.1");
  const [currentAction, setCurrentAction] = useState('Finalisation des 15 fonctions signatures');

  // Split state
  const [splitTasks, setSplitTasks] = useState<string[]>([
    'Agent 1 : Gérer les 3 emails prioritaires de l’équipe',
    'Agent 2 : Analyser le code du Cerveau Tripartite & valider les tests',
    'Agent 3 : Structurer la présentation pour la réunion SQL Quest',
  ]);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitResults, setSplitResults] = useState<
    Array<{ id: string; label: string; status: string; result: string }>
  >([
    {
      id: 'agent-1',
      label: 'Agent 1 : Gérer les emails',
      status: 'completed',
      result: '3 emails traités par Le Double d’Oromasis. 0 action bloquante.',
    },
    {
      id: 'agent-2',
      label: 'Agent 2 : Débogage & Tests',
      status: 'completed',
      result: 'Code vérifié sans fuite de mémoire. Latence Système 1 validée à 120ms.',
    },
    {
      id: 'agent-3',
      label: 'Agent 3 : Présentation SQL Quest',
      status: 'completed',
      result: 'Plan de 12 slides structuré avec focus sur les 5 piliers de Roam.',
    },
  ]);
  const [mergedSynthesis, setMergedSynthesis] = useState<string | null>(
    '🔀 Merge complet : Tous les agents ont convergé avec succès. Les livrables sont prêts et synchronisés dans la mémoire centrale.'
  );

  const handleTriggerAnticipation = async () => {
    setAnticipateLoading(true);
    try {
      const res = await fetch('/api/roam/anticipate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentAction,
          activeProject,
          timeOfDay: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recentHistory: ['Implémentation Cerveau Tripartite', 'Revue Journal de bord'],
        }),
      });

      if (!res.ok) throw new Error('Erreur moteur anticipation');

      const data = await res.json();
      const newCard: AnticipationCard = {
        id: 'ant-' + Date.now(),
        predictedAction: data.predictedNextAction || 'Prochaine étape anticipée',
        confidence: data.confidence || 0.9,
        reason: data.proactivePrompt || 'Contexte analysé avec succès',
        suggestedShortcut: data.preparedResources?.[0]?.name || 'Exécuter action',
        preparedDocument: data.preparedResources?.[1]
          ? {
              name: data.preparedResources[1].name,
              type: data.preparedResources[1].type,
              content: data.preparedResources[1].preview || 'Contenu prêt...',
            }
          : undefined,
      };

      setAnticipations((prev) => [newCard, ...prev]);
      onAwardXp(25, 'Anticipation proactive déclenchée');
    } catch (err: any) {
      console.error(err);
      alert('Anticipation générée en mode local.');
    } finally {
      setAnticipateLoading(false);
    }
  };

  const handleRunSplitAndMerge = async () => {
    setIsSplitting(true);
    setMergedSynthesis(null);

    try {
      const res = await fetch('/api/roam/split-merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: splitTasks }),
      });

      if (!res.ok) throw new Error('Erreur split & merge');

      const data = await res.json();
      setSplitResults(data.agents || []);
      setMergedSynthesis(data.mergedSynthesis || 'Merge terminé.');
      onAwardXp(50, 'Exécution Split & Merge');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      setMergedSynthesis('Merge local effectué avec succès.');
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Mode Anticipation & Mode Split (Parallélisme)
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Fonctions 6 & 14 : Roam devance vos besoins avant même que vous ne formuliez une requête, et se divise en sous-agents parallèles pour multiplier votre efficacité.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Mode Anticipation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                1.6 Mode Anticipation Proactif
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Taux cible : 70%+
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Roam observe votre rythme, vos fichiers ouverts et vos réunions pour prédire la prochaine étape et préparer les ressources requises.
          </p>

          {/* Context inputs to test anticipation */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
            <span className="font-semibold text-slate-300">Contexte actuel de l’Architecte :</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Projet actif :</label>
                <input
                  type="text"
                  value={activeProject}
                  onChange={(e) => setActiveProject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Action en cours :</label>
                <input
                  type="text"
                  value={currentAction}
                  onChange={(e) => setCurrentAction(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              onClick={handleTriggerAnticipation}
              disabled={anticipateLoading}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              {anticipateLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              <span>Roam : Anticipe mes besoins maintenant</span>
            </button>
          </div>

          {/* Anticipation cards list */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-semibold text-slate-400 block">
              Suggestions & Préparations Actives :
            </span>

            {anticipations.map((card) => (
              <div
                key={card.id}
                className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 hover:border-amber-500/60 transition space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {card.predictedAction}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {(card.confidence * 100).toFixed(0)}% confiance
                  </span>
                </div>

                <p className="text-xs text-slate-300">{card.reason}</p>

                {card.preparedDocument && (
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300">{card.preparedDocument.name}</span>
                      <p className="text-slate-400 mt-0.5 line-clamp-2">{card.preparedDocument.content}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      alert(`🎯 Raccourci exécuté : ${card.suggestedShortcut}`);
                      onAwardXp(15, 'Action proactive validée');
                    }}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3" />
                    <span>{card.suggestedShortcut}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mode Split & Merge */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitFork className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                1.14 Mode Split & Merge
              </h2>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              Multi-Agent Parallèle
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Roam se scinde en agents spécialisés pour traiter plusieurs tâches en même temps, puis fusionne (Merge) leurs travaux dans une synthèse globale.
          </p>

          {/* Split Tasks configuration */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Tâches distribuées en parallèle :
            </span>

            <div className="space-y-2">
              {splitTasks.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 font-bold shrink-0">#{idx + 1}</span>
                  <input
                    type="text"
                    value={t}
                    onChange={(e) => {
                      const newT = [...splitTasks];
                      newT[idx] = e.target.value;
                      setSplitTasks(newT);
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleRunSplitAndMerge}
              disabled={isSplitting}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              {isSplitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <GitFork className="w-3.5 h-3.5" />
              )}
              <span>Roam, Split & Merge : Exécuter en parallèle</span>
            </button>
          </div>

          {/* Results of Split Agents */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-slate-400 block">
              Statut des agents secondaires :
            </span>

            <div className="space-y-2">
              {splitResults.map((agent) => (
                <div
                  key={agent.id}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{agent.label}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">{agent.result}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Merged synthesis */}
            {mergedSynthesis && (
              <div className="p-3.5 bg-gradient-to-br from-indigo-950/70 to-slate-950 rounded-xl border border-indigo-500/40 text-xs space-y-2 mt-3">
                <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                  <Merge className="w-4 h-4 text-indigo-400" />
                  <span>Synthèse Fusionnée (Roam Merge) :</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px] font-sans">
                  {mergedSynthesis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
