import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Plus,
  Shield,
  CheckCircle2,
  Lock,
  Globe,
  FileText,
  Mail,
  Edit3,
  CreditCard,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CustomAgentConfig } from '../types/roam';

interface AgentsViewProps {
  agents: CustomAgentConfig[];
  onCreateAgent: (agent: CustomAgentConfig) => void;
  onDeleteAgent: (agentId: string) => void;
  onSelectAgentForChat: (agent: CustomAgentConfig) => void;
}

export const AgentsView: React.FC<AgentsViewProps> = ({
  agents,
  onCreateAgent,
  onDeleteAgent,
  onSelectAgentForChat,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [icon, setIcon] = useState('⚡');
  const [memoryAllowed, setMemoryAllowed] = useState(true);

  // Granular permissions
  const [permissions, setPermissions] = useState({
    readProjects: true,
    readDocs: true,
    useInternet: true,
    sendEmails: false,
    editFiles: false,
    makePurchases: false,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent: CustomAgentConfig = {
      id: `agent-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Agent Spécialisé',
      description: description.trim() || 'Agent créé sur mesure pour vos besoins.',
      icon,
      instructions: instructions.trim() || 'Agis avec précision selon tes directives.',
      memoryAllowed,
      permissions,
      actionsCount: 0,
      status: 'active',
    };

    onCreateAgent(newAgent);
    setName('');
    setRole('');
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
              <Bot className="w-7 h-7 text-amber-400" />
              <span>Mes Agents</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Des agents intelligents configurés avec leurs instructions propres et des permissions strictes.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Créer un agent</span>
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((ag) => (
            <motion.div
              key={ag.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl">
                      {ag.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-100">{ag.name}</h3>
                      <p className="text-xs text-amber-400 font-medium">{ag.role}</p>
                    </div>
                  </div>

                  {ag.id !== 'agent-1' && (
                    <button
                      onClick={() => onDeleteAgent(ag.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Supprimer l'agent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-slate-300 line-clamp-2">{ag.description}</p>

                {/* Permissions Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Permissions accordées
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ag.permissions.readProjects && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Lire projets</span>
                      </span>
                    )}
                    {ag.permissions.readDocs && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Lire documents</span>
                      </span>
                    )}
                    {ag.permissions.useInternet && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-sky-400 border border-sky-500/20 flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>Internet</span>
                      </span>
                    )}
                    {ag.permissions.sendEmails && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-amber-400 border border-amber-500/20 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>Emails</span>
                      </span>
                    )}
                    {ag.permissions.editFiles && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-indigo-400 border border-indigo-500/20 flex items-center space-x-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Modifier fichiers</span>
                      </span>
                    )}
                    {!ag.permissions.makePurchases && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-500 border border-slate-800 flex items-center space-x-1">
                        <Lock className="w-3 h-3" />
                        <span>Achats verrouillés</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">{ag.actionsCount} requêtes exécutées</span>
                <button
                  onClick={() => onSelectAgentForChat(ag)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold transition-colors"
                >
                  <span>Discuter avec {ag.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Agent Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Créer un Agent Personnalisé</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-200 text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nom de l'agent
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : SQL Expert, Développeur Python..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Icône
                    </label>
                    <input
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="⚡"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm text-center focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Rôle & Spécialité
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex : Architecte de Données, Analyste Financier..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Instructions & Directives du système
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Ex : Privilégie le typage strict, évite les réponses verbeuses, teste les edge cases..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Granular Permissions */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Permissions & Accès
                  </label>

                  <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>✓ Lire mes projets et structures</span>
                      <input
                        type="checkbox"
                        checked={permissions.readProjects}
                        onChange={(e) => setPermissions({ ...permissions, readProjects: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>✓ Lire mes documents importés</span>
                      <input
                        type="checkbox"
                        checked={permissions.readDocs}
                        onChange={(e) => setPermissions({ ...permissions, readDocs: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>✓ Rechercher sur Internet (Google Search)</span>
                      <input
                        type="checkbox"
                        checked={permissions.useInternet}
                        onChange={(e) => setPermissions({ ...permissions, useInternet: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>□ Envoyer des emails ou messages</span>
                      <input
                        type="checkbox"
                        checked={permissions.sendEmails}
                        onChange={(e) => setPermissions({ ...permissions, sendEmails: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                      <span>□ Modifier ou sauvegarder des fichiers</span>
                      <input
                        type="checkbox"
                        checked={permissions.editFiles}
                        onChange={(e) => setPermissions({ ...permissions, editFiles: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>
                  </div>
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
                    Enregistrer l'agent
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
