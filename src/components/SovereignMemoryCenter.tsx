import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { SovereignMemoryItem, MemoryCategory } from '../types/roam';

interface SovereignMemoryCenterProps {
  memories: SovereignMemoryItem[];
  setMemories: React.Dispatch<React.SetStateAction<SovereignMemoryItem[]>>;
  onForgetMemory: (id: string) => void;
  onClearCategory: (category: MemoryCategory) => void;
}

export const SovereignMemoryCenter: React.FC<SovereignMemoryCenterProps> = ({
  memories,
  setMemories,
  onForgetMemory,
  onClearCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('Préférences');
  const [isAdding, setIsAdding] = useState(false);
  const [forgotNotification, setForgotNotification] = useState<string | null>(null);

  const categories: MemoryCategory[] = [
    'Identité',
    'Préférences',
    'Projets',
    'Habitudes',
    'Conversations',
    'Connaissances',
    'Tâches',
  ];

  const filteredMemories = memories.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleForget = (id: string, title: string) => {
    onForgetMemory(id);
    setForgotNotification(`Souvenir « ${title} » effacé définitivement du nœud local.`);
    setTimeout(() => setForgotNotification(null), 3000);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: SovereignMemoryItem = {
      id: `mem-custom-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      confidence: 1.0,
      lastUpdated: 'À l’instant',
      source: 'Ajout Manuel Souverain',
    };

    setMemories((prev) => [newItem, ...prev]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/20 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Brain className="w-4 h-4" />
            <span>SOVEREIGN MEMORY VAULT • CHIFFREMENT LOCAL</span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100">
            Mémoire Souveraine de ROAM
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Consultez en temps réel tout ce que ROAM sait sur vous. En tant qu'Architecte, vous conservez le droit absolu d'<strong className="text-purple-300">Oublier</strong> n'importe quel fait instantanément.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono tracking-wide transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'FERMER LE FORMULAIRE' : 'AJOUTER UN SOUVENIR'}</span>
        </button>
      </div>

      {/* Temporary Toast Notification */}
      <AnimatePresence>
        {forgotNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{forgotNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Memory Addition Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddMemory}
            className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 space-y-4 shadow-xl"
          >
            <div className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">
              Enregistrer un nouveau fait dans la mémoire souveraine
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Catégorie</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Titre / Clé de mémoire</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ex: Préférence d'indentation ou Format de commit"
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Contenu / Description détaillée</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={2}
                placeholder="ex: Ne jamais proposer de librairies CSS tierces sans demande expresse."
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Mémoriser
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        {/* Categories scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Toutes ({memories.length})
          </button>
          {categories.map((cat) => {
            const count = memories.filter((m) => m.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer les souvenirs..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Memory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMemories.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Mis à jour : {item.lastUpdated}
                </span>
              </div>

              <h4 className="font-mono text-sm font-bold text-slate-100 mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-3">
                {item.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
              <span className="text-slate-500">
                Source : <span className="text-slate-400">{item.source}</span>
              </span>

              <button
                onClick={() => handleForget(item.id, item.title)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer"
                title="Supprimer ce fait de la mémoire souveraine de ROAM"
              >
                <Trash2 className="w-3 h-3" />
                <span>Oublier</span>
              </button>
            </div>
          </motion.div>
        ))}

        {filteredMemories.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            Aucun souvenir trouvé pour ces critères de recherche.
          </div>
        )}
      </div>
    </div>
  );
};
