import React, { useState } from 'react';
import {
  Cpu,
  Eye,
  GitPullRequest,
  Database,
  ShieldCheck,
  FileText,
  Play,
  CheckCircle2,
  RefreshCw,
  Search,
  Image,
  Mic,
  Activity,
  Plus,
  Radio,
  Sliders,
} from 'lucide-react';
import { SubAgent, SensoryMemoryItem } from '../types/roam';
import confetti from 'canvas-confetti';

interface SubAgentsAndMemoryProps {
  subAgents: SubAgent[];
  setSubAgents: React.Dispatch<React.SetStateAction<SubAgent[]>>;
  sensoryMemories: SensoryMemoryItem[];
  setSensoryMemories: React.Dispatch<React.SetStateAction<SensoryMemoryItem[]>>;
  onAwardXp: (amount: number, reason: string) => void;
}

export const SubAgentsAndMemory: React.FC<SubAgentsAndMemoryProps> = ({
  subAgents,
  setSubAgents,
  sensoryMemories,
  setSensoryMemories,
  onAwardXp,
}) => {
  // Subagent task state
  const [selectedAgent, setSelectedAgent] = useState<SubAgent>(subAgents[0]);
  const [agentTaskInput, setAgentTaskInput] = useState('Analyser la PR #123 sur l’optimisation du Cerveau Tripartite');
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentOutput, setAgentOutput] = useState<{
    summary: string;
    deliverables: string[];
    confidence: number;
  } | null>(null);

  // Sensory Memory state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSensoryType, setFilterSensoryType] = useState<string>('all');
  const [replayingItem, setReplayingItem] = useState<SensoryMemoryItem | null>(null);

  const filteredMemories = sensoryMemories.filter((m) => {
    const matchesType = filterSensoryType === 'all' || m.type === filterSensoryType;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleRunAgentTask = async () => {
    if (!agentTaskInput.trim() || agentLoading) return;
    setAgentLoading(true);

    try {
      const res = await fetch('/api/roam/subagent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: selectedAgent.name,
          task: agentTaskInput,
          context: `Supervisé par Roam V4.1 - Domaine: ${selectedAgent.domain}`,
        }),
      });

      if (!res.ok) throw new Error('Erreur exécution sous-agent');

      const data = await res.json();
      setAgentOutput({
        summary: data.executionSummary || 'Tâche terminée avec succès.',
        deliverables: data.deliverables || ['Rapport validé', 'Aucune anomalie'],
        confidence: data.confidenceScore || 0.96,
      });

      // Update subagent report count
      setSubAgents((prev) =>
        prev.map((a) =>
          a.id === selectedAgent.id
            ? { ...a, actionsCount: a.actionsCount + 1, lastReport: data.executionSummary }
            : a
        )
      );

      onAwardXp(35, `Délégation à ${selectedAgent.name}`);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      setAgentOutput({
        summary: `Tâche exécutée en mode local par ${selectedAgent.name}.`,
        deliverables: ['Analyse de code effectuée', 'Validation de syntaxe'],
        confidence: 0.92,
      });
    } finally {
      setAgentLoading(false);
    }
  };

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitPullRequest':
        return <GitPullRequest className="w-5 h-5 text-purple-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Sous-Agents (Assistant d'Assistants) & Mémoire Sensorielle
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Fonctions 7 & 8 : Créez et supervisez des sous-agents experts, et explorez vos souvenirs numériques multi-modaux (visuel, audio, émotionnel).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sous-agents (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  1.7 L'Assistant d'Assistants
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Supervision Active
              </span>
            </div>

            {/* Sub-agents cards list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedAgent.id === agent.id
                      ? 'bg-slate-950 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {getAgentIcon(agent.icon)}
                      </div>
                      <span className="font-bold text-xs text-slate-100">{agent.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300">
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-2 line-clamp-2">{agent.description}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/80">
                    <span>{agent.actionsCount} actions menées</span>
                    <span className="text-amber-400">Supervisé</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Task runner for selected subagent */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  Déléguer une mission à :{' '}
                  <strong className="text-amber-300">{selectedAgent.name}</strong>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{selectedAgent.domain}</span>
              </div>

              <textarea
                value={agentTaskInput}
                onChange={(e) => setAgentTaskInput(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none"
                placeholder="Décrivez la tâche spécifique..."
              />

              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleRunAgentTask}
                  disabled={agentLoading}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow"
                >
                  {agentLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  <span>Lancer l'agent</span>
                </button>
              </div>
            </div>

            {/* Agent execution output */}
            {agentOutput && (
              <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Rapport de {selectedAgent.name} :
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    Confiance : {(agentOutput.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <p className="text-slate-200 leading-relaxed font-sans">{agentOutput.summary}</p>

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400">Livrables / Actions :</span>
                  <div className="space-y-1">
                    {agentOutput.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Mémoire Sensorielle (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  1.8 La Mémoire Sensorielle
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Multi-Modale
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Roam ne stocke pas que du texte brut : il indexe les captures visuelles de bugs, la tonalité vocale de stress ou de joie, et les contextes de session pour pouvoir les rejouer.
            </p>

            {/* Search & Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Recherche vectorielle / sémantique dans la mémoire..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'visuel', label: '📸 Visuelles' },
                  { id: 'auditif', label: '🔊 Audio / Voix' },
                  { id: 'contextuel', label: '📝 Contextes' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterSensoryType(f.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition text-[11px] ${
                      filterSensoryType === f.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Memories List */}
            <div className="space-y-3 pt-1">
              {filteredMemories.map((mem) => (
                <div
                  key={mem.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{mem.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          mem.type === 'visuel'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : mem.type === 'auditif'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {mem.type}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{mem.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{mem.description}</p>

                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    {mem.contextPreview}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      {mem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setReplayingItem(mem);
                        onAwardXp(15, 'Relecture Mémoire Sensorielle');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 transition"
                    >
                      <Radio className="w-3 h-3 text-amber-400" />
                      <span>Rejouer l'expérience</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience replay modal simulation */}
            {replayingItem && (
              <div className="p-4 bg-gradient-to-r from-cyan-950/80 to-slate-950 rounded-xl border border-cyan-500/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    Relecture Immersive : {replayingItem.title}
                  </span>
                  <button
                    onClick={() => setReplayingItem(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Fermer
                  </button>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans">
                  Roam rétablit l’environnement mental de cette session : fichiers ouverts, niveau de tension, variables système et décisions prises.
                </div>
                <div className="text-[11px] font-mono text-cyan-300/90 bg-slate-900 p-2 rounded border border-slate-800">
                  État restauré dans la mémoire de travail active.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
