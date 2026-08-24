import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Trash2,
  Plus,
  Search,
  CheckCircle2,
  Sparkles,
  Edit2,
  Save,
  Lock,
  Tag
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
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('Préférences');
  const [notification, setNotification] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Tout' },
    { id: 'Préférences', label: 'Préférences' },
    { id: 'Projets', label: 'Projets' },
    { id: 'Habitudes', label: 'Travail' },
    { id: 'Identité', label: 'Personnel' },
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
    setNotification(`Souvenir « ${title} » oublié.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const startEdit = (mem: SovereignMemoryItem) => {
    setEditingId(mem.id);
    setEditTitle(mem.title);
    setEditContent(mem.content);
  };

  const saveEdit = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: editTitle, content: editContent, lastUpdated: 'Modifié' } : m))
    );
    setEditingId(null);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: SovereignMemoryItem = {
      id: `mem-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      confidence: 1.0,
      lastUpdated: 'À l’instant',
      source: 'Ajout Manuel',
    };

    setMemories((prev) => [newItem, ...prev]);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
              <Brain className="w-7 h-7 text-purple-400" />
              <span>Mémoire de ROAM</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              ROAM se souvient de ce que vous choisissez. Vous pouvez modifier ou oublier chaque fait à tout moment.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un souvenir</span>
          </button>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Category Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔎 Rechercher dans ma mémoire..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const count = tab.id === 'all'
                ? memories.length
                : memories.filter((m) => m.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    selectedCategory === tab.id
                      ? 'bg-purple-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-3 shadow-xl"
            >
              {editingId === mem.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 resize-none"
                  />
                  <div className="flex items-center justify-end space-x-2 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-xs text-slate-400"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => saveEdit(mem.id)}
                      className="px-3 py-1 text-xs bg-purple-600 text-white rounded-lg font-bold"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-400 font-medium">
                          {mem.category}
                        </span>
                        <span className="text-[11px] text-slate-500">{mem.lastUpdated}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => startEdit(mem)}
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                          title="Modifier"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleForget(mem.id, mem.title)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                          title="Oublier ce souvenir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-200">{mem.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{mem.content}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Source : {mem.source}</span>
                    <button
                      onClick={() => handleForget(mem.id, mem.title)}
                      className="text-purple-400/80 hover:text-purple-300 font-medium"
                    >
                      Oublier
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add Memory Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Enregistrer un nouveau souvenir</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Titre du fait</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Préférence de code TypeScript"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none"
                  >
                    <option value="Préférences">Préférences</option>
                    <option value="Projets">Projets</option>
                    <option value="Habitudes">Travail / Habitudes</option>
                    <option value="Identité">Personnel / Identité</option>
                    <option value="Connaissances">Connaissances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contenu détaillé</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Ex: Toujours utiliser le typage strict et des noms de variables explicites..."
                    rows={3}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};
