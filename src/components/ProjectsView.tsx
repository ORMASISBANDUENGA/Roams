import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderKanban,
  Plus,
  MessageSquare,
  FileText,
  Clock,
  Sparkles,
  Trash2,
  Edit2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { ProjectItem } from '../types/roam';

interface ProjectsViewProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onCreateProject: (newProj: Partial<ProjectItem>) => void;
  onDeleteProject: (projectId: string) => void;
  onStartChatInProject: (projectName: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
  onStartChatInProject,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Application');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateProject({
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      instructions: instructions.trim(),
      conversationsCount: 0,
      documentsCount: 0,
      tasksCount: 0,
      createdAt: 'Aujourd’hui',
      status: 'active',
    });

    setName('');
    setDescription('');
    setInstructions('');
    setShowCreateModal(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
              <FolderKanban className="w-7 h-7 text-amber-400" />
              <span>Mes Projets</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Espaces de travail isolés avec leurs conversations, fichiers, mémoire et instructions dédiées.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau projet</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 font-medium border border-slate-700/60">
                      {proj.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 mt-2">{proj.name}</h3>
                  </div>
                  <button
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Supprimer le projet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 line-clamp-2">{proj.description}</p>

                {proj.instructions && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
                    <span className="text-slate-500 font-medium">Instructions : </span>
                    {proj.instructions}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>{proj.conversationsCount} discussions</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>{proj.documentsCount} docs</span>
                  </span>
                </div>

                <button
                  onClick={() => onStartChatInProject(proj.name)}
                  className="flex items-center space-x-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Ouvrir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Créer un nouveau projet</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-200 text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nom du projet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : SQL Quest, Application E-commerce..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ex : Application, ERP, Recherche..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Description du projet
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Objectif du projet, public cible..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Instructions spécifiques pour l'IA
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Directives de code, conventions de nommage, ton à adopter..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
                  >
                    Créer le projet
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
