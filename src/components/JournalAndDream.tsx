import React, { useState } from 'react';
import {
  BookOpen,
  Moon,
  Coffee,
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Code,
  Mail,
  Users,
  Search,
  Bug,
  Cpu,
} from 'lucide-react';
import { JournalEntry, DreamState } from '../types/roam';
import confetti from 'canvas-confetti';

interface JournalAndDreamProps {
  journal: JournalEntry[];
  setJournal: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
  dream: DreamState;
  setDream: React.Dispatch<React.SetStateAction<DreamState>>;
  onAwardXp: (amount: number, reason: string) => void;
}

export const JournalAndDream: React.FC<JournalAndDreamProps> = ({
  journal,
  setJournal,
  dream,
  setDream,
  onAwardXp,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [dreamLoading, setDreamLoading] = useState(false);
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<JournalEntry['type']>('code');
  const [coffeePoured, setCoffeePoured] = useState(false);

  const filteredJournal = journal.filter((j) => (filterType === 'all' ? true : j.type === filterType));

  const handlePourCoffee = () => {
    setCoffeePoured(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#d97706', '#78350f'],
    });
    onAwardXp(15, 'Café Virtuel de Roam');
  };

  const handleRefreshDream = async () => {
    setDreamLoading(true);
    try {
      const res = await fetch('/api/roam/dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayLog: journal,
          pendingTasks: ['Finaliser le module Hors du Temps', 'Tester la Console Roam'],
          moodHistory: ['focus', 'energique', 'concentré'],
        }),
      });

      if (!res.ok) throw new Error('Erreur génération Rêve de Roam');

      const data: DreamState = await res.json();
      setDream(data);
      onAwardXp(40, 'Analyse Nocturne Rêve de Roam');
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Rêve de Roam régénéré en mode local.');
    } finally {
      setDreamLoading(false);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const now = new Date();
    const entry: JournalEntry = {
      id: 'j-' + Date.now(),
      timestamp: now.toISOString(),
      timeLabel: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: newType,
      title: newTitle,
      description: newDesc || 'Enregistrement direct au journal de bord.',
      durationMinutes: 30,
      mood: 'focus',
      productivityScore: 90,
    };

    setJournal((prev) => [entry, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setShowAddEntryModal(false);
    onAwardXp(20, 'Entrée Journal ajoutée');
  };

  const exportJournalMarkdown = () => {
    const md = `# 📔 JOURNAL DE ROAM - ${new Date().toLocaleDateString('fr-FR')}
${journal
  .map(
    (j) =>
      `### ${j.timeLabel} - [${j.type.toUpperCase()}] ${j.title}
- **Description** : ${j.description}
- **Durée** : ${j.durationMinutes} min | **Score** : ${j.productivityScore}%
`
  )
  .join('\n')}

---
*Généré par Roam's.ai V4.1 - L'Architecture Ultime*`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Journal_Roam_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
  };

  const getIconForType = (type: JournalEntry['type']) => {
    switch (type) {
      case 'code':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'email':
        return <Mail className="w-4 h-4 text-amber-400" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-emerald-400" />;
      case 'recherche':
        return <Search className="w-4 h-4 text-indigo-400" />;
      case 'bug':
        return <Bug className="w-4 h-4 text-rose-400" />;
      case 'architecture':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Journal de Bord & Le Rêve de Roam
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilier 5 & Fonction Signature 13 : Suivi automatique de votre vie numérique & analyse nocturne pour préparer l'avenir.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddEntryModal(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Ajouter une action</span>
          </button>
          <button
            onClick={exportJournalMarkdown}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Journal de Bord (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  1.5 Journal de Bord (Automatique)
                </h2>
              </div>
              <span className="text-xs text-amber-400 font-mono font-semibold">
                {journal.length} actions tracées
              </span>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'code', label: 'Code' },
                { id: 'email', label: 'Emails' },
                { id: 'meeting', label: 'Réunions' },
                { id: 'recherche', label: 'Recherche' },
                { id: 'bug', label: 'Bugs' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    filterType === f.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Timeline Feed */}
            <div className="space-y-3 pt-2">
              {filteredJournal.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                    {getIconForType(item.type)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-100">{item.title}</span>
                      <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                        {item.timeLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 font-mono">
                      <span>⏱️ {item.durationMinutes} min</span>
                      <span>•</span>
                      <span>Productivité : {item.productivityScore}%</span>
                      <span>•</span>
                      <span className="capitalize">Humeur : {item.mood}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Le Rêve de Roam (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-indigo-950/70 to-slate-900 border border-indigo-900/60 rounded-2xl p-5 shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-indigo-200 uppercase tracking-wide">
                  1.13 Le Rêve de Roam (Nocturne)
                </h2>
              </div>
              <button
                onClick={handleRefreshDream}
                disabled={dreamLoading}
                className="p-1.5 rounded-lg bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 transition"
                title="Déclencher un nouveau cycle de Rêve"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dreamLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Poetic Greeting & Virtual Coffee */}
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-indigo-500/30 space-y-3">
              <div className="text-xs text-indigo-100 font-sans italic leading-relaxed">
                "{dream.poeticGreeting}"
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">Café de l’Architecte :</span>
                <button
                  onClick={handlePourCoffee}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    coffeePoured
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold shadow'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>{coffeePoured ? 'Café Servi ☕' : 'Prendre le Café ☕'}</span>
                </button>
              </div>
            </div>

            {/* Night Analysis Stats */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Bilan de la nuit :
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Travail Effectif</div>
                  <div className="text-sm font-bold text-slate-100">
                    {dream.lastNightAnalysis.effectiveWorkHours} h
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Bugs Résolus</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {dream.lastNightAnalysis.bugsResolved} / {dream.lastNightAnalysis.bugsEncountered}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Emails Traités</div>
                  <div className="text-sm font-bold text-amber-400">
                    {dream.lastNightAnalysis.emailsProcessed}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Tendance</div>
                  <div className="text-sm font-bold text-cyan-400">
                    {dream.lastNightAnalysis.productivityTrend}
                  </div>
                </div>
              </div>
            </div>

            {/* Subconscious insights */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Déductions subconscientes de Roam :
              </span>
              <div className="space-y-1 text-xs text-slate-300">
                {dream.subconsciousInsights.map((ins, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tomorrow's Schedule Plan */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Plan Recommandé pour Demain :
              </span>
              <div className="space-y-1.5">
                {dream.tomorrowSchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-mono text-[11px] text-amber-400">{item.time}</div>
                      <div className="text-slate-200 font-medium">{item.title}</div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        item.priority === 'Haute'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add manual entry modal */}
      {showAddEntryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100">Ajouter une action au Journal de Bord</h3>
            <form onSubmit={handleAddEntry} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Titre de l'action :</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Conception schémas Roam V4.1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Type :</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
                >
                  <option value="code">Code & Développement</option>
                  <option value="architecture">Architecture & Conception</option>
                  <option value="meeting">Réunion & Échange</option>
                  <option value="email">Email & Communication</option>
                  <option value="recherche">Recherche & Doc</option>
                  <option value="bug">Correction Bug</option>
                  <option value="pause">Pause & Réflexion</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Détails / Notes :</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Détails contextuels..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEntryModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
