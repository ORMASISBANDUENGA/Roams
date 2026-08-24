import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Compass, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { RoamLogoAnimated } from './RoamLogoAnimated';

interface TripartiteActivationScreenProps {
  onComplete: () => void;
}

export const TripartiteActivationScreen: React.FC<TripartiteActivationScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans select-none overflow-y-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0,transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl p-4 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md relative my-auto"
      >
        <div className="text-center mb-5 sm:mb-8 flex flex-col items-center">
          <div className="mb-2 sm:mb-3">
            <RoamLogoAnimated size="xl" showEmbers={true} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            ACTIVATION DU CERVEAU TRIPARTITE
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">
            Déploiement des 3 couches cognitives souveraines
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {/* SYSTEM 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0.4, x: 0 }}
            className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
              phase >= 1
                ? 'bg-amber-500/10 border-amber-500/40 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-amber-300">SYSTÈME 1 — INSTINCT</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400">Réponses rapides et réflexes d'état.</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-amber-400 font-semibold self-end sm:self-auto">
                &gt; &lt; 200 ms
              </span>
            </div>
          </motion.div>

          {/* SYSTEM 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0.4, x: 0 }}
            className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
              phase >= 2
                ? 'bg-cyan-500/10 border-cyan-500/40 text-slate-100 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-cyan-300">SYSTÈME 2 — RÉFLEXION</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400">Analyse approfondie et logique.</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400 font-semibold self-end sm:self-auto">
                &gt; Raisonnement OK
              </span>
            </div>
          </motion.div>

          {/* SYSTEM 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: phase >= 3 ? 1 : 0.4, x: 0 }}
            className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
              phase >= 3
                ? 'bg-purple-500/10 border-purple-500/40 text-slate-100 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'bg-slate-950/40 border-slate-800 text-slate-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-purple-300">SYSTÈME 3 — MÉTA</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400">Surveillance et auto-critique.</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-purple-400 font-semibold self-end sm:self-auto">
                &gt; Méta-supervision OK
              </span>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3 sm:space-y-4"
            >
              <div className="py-2 px-3 sm:px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ROAM’S.AI EST OPÉRATIONNEL.</span>
              </div>

              <button
                onClick={onComplete}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ACCÉDER AU CENTRE DE CONTRÔLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
