import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, AlertCircle, Info, X, ArrowRight } from 'lucide-react';

interface WelcomeBackBannerProps {
  userName: string;
  onDismiss: () => void;
  onViewTasks: () => void;
}

export const WelcomeBackBanner: React.FC<WelcomeBackBannerProps> = ({
  userName,
  onDismiss,
  onViewTasks,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-xl mb-6 font-sans relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-mono text-sm font-bold text-amber-300">
              Bon retour, {userName}.
            </h3>
          </div>

          <div className="text-xs text-slate-300 font-mono">
            Depuis votre dernière session :
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>2 tâches terminées</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>1 tâche nécessite attention</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              <span>3 infos analysées</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Sync terminée 🟢</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewTasks}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>Voir</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
            title="Masquer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
