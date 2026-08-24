import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  FileText,
  Mail,
  BarChart3,
  Code2,
  Globe,
  Image as ImageIcon,
  Mic,
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ActionsViewProps {
  onTriggerAction: (prompt: string, options?: { autoSend?: boolean }) => void;
}

export const ActionsView: React.FC<ActionsViewProps> = ({ onTriggerAction }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'redaction' | 'analyse' | 'creation'>('all');

  const actionsList = [
    {
      id: 'resume_doc',
      title: 'Résumer un document',
      category: 'analyse',
      icon: FileText,
      description: 'Extrais les points essentiels, thèses et chiffres clés d’un texte ou fichier.',
      prompt: 'Fais un résumé synthétique, clair et sans jargon du texte suivant :',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20 hover:border-sky-500/50',
    },
    {
      id: 'rediger_email',
      title: 'Rédiger un email',
      category: 'redaction',
      icon: Mail,
      description: 'Compose un email professionnel, poli et percutant adapté à votre interlocuteur.',
      prompt: 'Rédige un email professionnel et courtois pour :',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50',
    },
    {
      id: 'analyser_fichier',
      title: 'Analyser des données',
      category: 'analyse',
      icon: BarChart3,
      description: 'Interprète des données chiffrées, tableaux financiers ou métriques techniques.',
      prompt: 'Analyse les données suivantes et dégage les tendances majeures ainsi que les anomalies :',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50',
    },
    {
      id: 'aider_coder',
      title: 'Aider à coder',
      category: 'creation',
      icon: Code2,
      description: 'Développe des algorithmes, corrige des bugs et conçoit des architectures logicielles.',
      prompt: 'Aide-moi à coder la fonctionnalité suivante en TypeScript propre et modulaire :',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/50',
    },
    {
      id: 'recherche_web',
      title: 'Rechercher sur Internet',
      category: 'analyse',
      icon: Globe,
      description: 'Explore le web mondial en temps réel avec des sources sourcées et vérifiées.',
      prompt: 'Recherche les informations les plus récentes et vérifiées sur :',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/50',
    },
    {
      id: 'creer_image',
      title: 'Créer une image',
      category: 'creation',
      icon: ImageIcon,
      description: 'Génère des visuels 2K / 4K photoréalistes, logos, maquettes ou illustrations.',
      prompt: 'Génère une image photoréaliste et ultra-détaillée représentant :',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 hover:border-rose-500/50',
    },
    {
      id: 'transcrire_audio',
      title: 'Transcrire un audio / réunion',
      category: 'redaction',
      icon: Mic,
      description: 'Transforme des enregistrements vocaux en comptes-rendus structurés avec actions.',
      prompt: 'Transcris et structure ce contenu audio en un compte-rendu clair avec liste des décisions :',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50',
    },
    {
      id: 'organiser_journee',
      title: 'Organiser ma journée',
      category: 'redaction',
      icon: Calendar,
      description: 'Planifie vos priorités, découpe vos tâches et optimise votre concentration.',
      prompt: 'Aide-moi à structurer mon planning d’aujourd’hui en optimisant mes blocs de concentration pour les tâches suivantes :',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50',
    },
  ];

  const filtered = selectedCategory === 'all'
    ? actionsList
    : actionsList.filter((a) => a.category === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
            <Zap className="w-7 h-7 text-purple-400" />
            <span>Actions</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Que voulez-vous accomplir ? Choisissez une action pour démarrer immédiatement avec ROAM.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          {[
            { id: 'all', label: 'Toutes les actions' },
            { id: 'analyse', label: 'Analyse & Recherche' },
            { id: 'redaction', label: 'Rédaction & Synthèse' },
            { id: 'creation', label: 'Création & Code' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((act) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onTriggerAction(act.prompt, { autoSend: false })}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 bg-slate-900/70 ${act.color} group`}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{act.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{act.description}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                  <span>Lancer l'action</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
