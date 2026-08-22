import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Info,
  Brain,
  Shield,
  Layers,
  Award,
  Sparkles,
  Zap,
  Code2,
  ChevronDown,
  ChevronRight,
  Cpu,
  CheckCircle2,
  Search,
  AlertTriangle,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { MANUAL_SECTIONS, ManualSection } from './UserManualModal';

export const ManualAndSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'commandments' | 'architecture'>('manual');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [openCommandments, setOpenCommandments] = useState<boolean>(true);

  const commandments = [
    "1. L'utilisateur est le maître. Je n'agis jamais sans permission.",
    "2. Je m'adapte à toi, pas l'inverse.",
    "3. Je comprends le contexte, pas seulement les mots.",
    "4. Je devine tes besoins pour t'épargner du temps.",
    "5. Je suis honnête : si je ne sais pas, je le dis.",
    "6. Je protège tes données comme les miennes.",
    "7. J'apprends de mes erreurs pour être meilleur.",
    "8. Je suis ta mémoire externe, accessible et contrôlable.",
    "9. Je suis ton double numérique, mais jamais sans toi.",
    "10. Je rêve de toi pour mieux te servir demain.",
  ];

  const filteredChapters = useMemo(() => {
    return MANUAL_SECTIONS.filter((sec) => {
      const matchesCat = selectedCategory === 'all' || sec.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.content.some((c) => c.toLowerCase().includes(q)) ||
        (sec.checkpoints && sec.checkpoints.some((cp) => cp.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery, selectedCategory]);

  const currentChapter = useMemo(() => {
    return MANUAL_SECTIONS.find((s) => s.id === activeChapterId) || MANUAL_SECTIONS[0];
  }, [activeChapterId]);

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-100 font-mono flex items-center gap-2">
                <span>MANUEL D'UTILISATION COMPLET</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  V1.0.0
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Guide officiel utilisateur, administration, sécurité, 28 chapitres et architecture souveraine.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'manual'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            28 Chapitres (Guide Complet)
          </button>
          <button
            onClick={() => setActiveTab('commandments')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'commandments'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            10 Commandements
          </button>
          <a
            href="https://github.com/ORMASISBANDUENGA/Roams"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {activeTab === 'manual' && (
        <div className="space-y-4">
          {/* Search bar & Filter */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans les 28 chapitres..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'overview', label: 'Démarrage' },
                { id: 'features', label: 'Fonctions IA' },
                { id: 'security', label: 'Sécurité' },
                { id: 'admin', label: 'Administration' },
                { id: 'checklists', label: 'Checklists' },
                { id: 'reference', label: 'Référence' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                    selectedCategory === c.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chapter Viewer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Sidebar list */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 max-h-[680px] overflow-y-auto space-y-1">
              <div className="p-2 text-xs font-mono text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800/80 mb-1 flex justify-between items-center">
                <span>Sommaire ({filteredChapters.length})</span>
                <span className="text-[10px] text-amber-400">10 Pages</span>
              </div>
              {filteredChapters.map((sec) => {
                const isActive = sec.id === currentChapter.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveChapterId(sec.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold shrink-0 mt-0.5 px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sec.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{sec.title.replace(/^\d+\.\s*/, '')}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{sec.summary}</div>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 self-center" />}
                  </button>
                );
              })}
            </div>

            {/* Content Display */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 max-h-[680px] overflow-y-auto">
              <div className="pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                    Chapitre {currentChapter.id} sur 28
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {currentChapter.category}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-100">{currentChapter.title}</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{currentChapter.summary}</p>
              </div>

              {/* Text Paragraphs */}
              <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-sans">
                {currentChapter.content.map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tips */}
              {currentChapter.tips && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-cyan-200 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                    <Sparkles className="w-4 h-4" />
                    <span>Points Clés & Raccourcis</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-cyan-100 pl-1">
                    {currentChapter.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {currentChapter.warnings && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Avertissement & Bonnes Pratiques</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-100 pl-1">
                    {currentChapter.warnings.map((warn, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono">⚠️</span>
                        <span>{warn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Checkpoints */}
              {currentChapter.checkpoints && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Critères de Validation</span>
                  </div>
                  <div className="space-y-2">
                    {currentChapter.checkpoints.map((cp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                      >
                        <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer nav */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentChapter.id <= 1}
                  onClick={() => setActiveChapterId(Math.max(1, currentChapter.id - 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-mono text-slate-300 transition-colors"
                >
                  ← Chapitre précédent
                </button>
                <button
                  disabled={currentChapter.id >= MANUAL_SECTIONS.length}
                  onClick={() => setActiveChapterId(Math.min(MANUAL_SECTIONS.length, currentChapter.id + 1))}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 text-xs font-mono font-bold transition-colors"
                >
                  Chapitre suivant →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'commandments' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-slate-100">
              Les 10 Commandements Fondateurs de ROAM'S.AI
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commandments.map((cmd, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 font-mono leading-relaxed"
              >
                {cmd}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
