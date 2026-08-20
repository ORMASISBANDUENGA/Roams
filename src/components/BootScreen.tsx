import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Cpu, Shield, Sparkles, Database, Cloud, Terminal, ArrowRight, Zap } from 'lucide-react';

interface BootScreenProps {
  onComplete?: () => void;
  onBootComplete?: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete, onBootComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleFinish = useCallback(() => {
    if (onBootComplete) {
      onBootComplete();
    } else if (onComplete) {
      onComplete();
    }
  }, [onBootComplete, onComplete]);

  const steps = [
    { label: 'Local Core', icon: Cpu, latency: '12ms' },
    { label: 'Memory Engine', icon: Database, latency: '24ms' },
    { label: 'Security Layer', icon: Shield, latency: '8ms' },
    { label: 'Agent System', icon: Terminal, latency: '35ms' },
    { label: 'Cloud Sync', icon: Cloud, latency: '48ms' },
    { label: 'Personalization', icon: Sparkles, latency: '18ms' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            handleFinish();
          }, 600);
          return prev;
        }
      });
    }, 220);

    return () => clearInterval(timer);
  }, [handleFinish, steps.length]);

  // Keyboard shortcut: Press Enter or Space to skip/enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  const isReady = currentStep >= steps.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans select-none overflow-y-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4 sm:px-8 py-6 sm:py-10 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md relative my-auto"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3 sm:mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Cpu className="w-6 sm:w-8 h-6 sm:h-8 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-slate-100 font-mono">
            ROAM’S.AI <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">V1.0</span>
          </h1>
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 mt-1 font-mono">
            Initialisation du Système...
          </p>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
          {steps.map((step, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border text-xs font-mono transition-all ${
                  isDone
                    ? 'bg-slate-800/60 border-slate-700/80 text-slate-200'
                    : isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900/40 border-slate-800/40 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      isDone
                        ? 'text-emerald-400'
                        : isCurrent
                        ? 'text-amber-400 animate-spin'
                        : 'text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <StepIcon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="truncate">{step.label}</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0 ml-2">
                  {isDone ? `✓ ${step.latency}` : isCurrent ? '...' : 'en attente'}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Ready status banner & click button */}
        <div className="min-h-[44px]">
          <AnimatePresence>
            {isReady && (
              <motion.button
                type="button"
                onClick={handleFinish}
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex items-center justify-between py-2.5 px-3.5 sm:px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">&gt; ROAM’S.AI est prêt.</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-200 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Accéder au Nœud</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Skip button for instant access */}
        <div className="mt-3 sm:mt-4 text-center">
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs font-mono text-slate-400 hover:text-amber-300 underline underline-offset-4 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
          >
            Passer la séquence →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

