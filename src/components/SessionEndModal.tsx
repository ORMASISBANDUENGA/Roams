import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Check, Lock, LogOut, X, Sparkles } from 'lucide-react';

interface SessionEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLockSession: () => void;
  onLogout: () => void;
}

export const SessionEndModal: React.FC<SessionEndModalProps> = ({
  isOpen,
  onClose,
  onLockSession,
  onLogout,
}) => {
  const [closingAction, setClosingAction] = useState<'lock' | 'logout' | null>(null);

  if (!isOpen) return null;

  const handleLock = () => {
    setClosingAction('lock');
    setTimeout(() => {
      onLockSession();
    }, 600);
  };

  const handleLogout = () => {
    setClosingAction('logout');
    setTimeout(() => {
      onLogout();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Shield className="w-4 h-4" />
            <span>SÉCURISATION DE CLÔTURE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold font-mono text-slate-100">
            Avant votre départ...
          </h3>
          <p className="text-xs text-slate-400">
            ROAM finalise la clôture du centre de contrôle et garantit l'intégrité de vos données.
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-200">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>3 tâches sauvegardées</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-200">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Mémoire synchronisée (Chiffrement AES-256)</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-200">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Agents en veille sécurisée</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-200">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Données locales sécurisées</span>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleLock}
            disabled={closingAction !== null}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>{closingAction === 'lock' ? 'VERROUILLAGE...' : 'VERROUILLER ROAM'}</span>
          </button>

          <button
            onClick={handleLogout}
            disabled={closingAction !== null}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{closingAction === 'logout' ? 'DÉCONNEXION...' : 'SE DÉCONNECTER'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
