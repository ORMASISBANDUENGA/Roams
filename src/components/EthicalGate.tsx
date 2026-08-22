import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Eye,
  Sliders,
  History,
  Info,
  KeyRound,
} from 'lucide-react';
import { EthicalBackdoorState } from '../types/roam';

interface EthicalGateProps {
  ethicalState: EthicalBackdoorState;
  setEthicalState: React.Dispatch<React.SetStateAction<EthicalBackdoorState>>;
  onAwardXp: (amount: number, reason: string) => void;
}

export const EthicalGate: React.FC<EthicalGateProps> = ({
  ethicalState,
  setEthicalState,
  onAwardXp,
}) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'logs' | 'permissions'>('policy');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [policyNotification, setPolicyNotification] = useState<string | null>(null);

  const toggleUltraSecure = () => {
    setEthicalState((prev) => {
      const next = !prev.ultraSecureMode;
      return { ...prev, ultraSecureMode: next };
    });
    setPolicyNotification('Mode de sécurité renforcé mis à jour avec succès.');
    setTimeout(() => setPolicyNotification(null), 3000);
    onAwardXp(15, 'Mise à jour de la politique de sécurité');
  };

  const handleClearLogs = () => {
    setEthicalState((prev) => ({
      ...prev,
      auditLogs: [],
      blockedCount: 0,
    }));
    setPolicyNotification('Journal des décisions éthiques réinitialisé.');
    setTimeout(() => setPolicyNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-950 border border-rose-500/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                PILIER 09 • PORTE ÉTHIQUE & NON-INGÉRENCE
              </span>
              <span className="text-xs font-mono text-slate-400">
                {ethicalState.ultraSecureMode ? '🛡️ Garde-Fou Renforcé' : '🟢 Surveillance Active'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">
              Porte Éthique, Barrières d'Accès & Non-Ingérence
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Supervision continue des actions autonomes des agents : contrôle strict des autorisations,
              politique de non-ingérence et traçabilité des décisions d'exécution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleUltraSecure}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                ethicalState.ultraSecureMode
                  ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {ethicalState.ultraSecureMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{ethicalState.ultraSecureMode ? 'Mode Strict Actif' : 'Activer Mode Strict'}</span>
            </button>
          </div>
        </div>
      </div>

      {policyNotification && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{policyNotification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('policy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'policy'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Politique & Barrières</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'logs'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Journal d'Audit ({ethicalState.auditLogs?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'permissions'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Niveaux d'Autorisation</span>
        </button>
      </div>

      {/* Tab: Policy */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Règle N°1</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                Actif
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">Consentement Explicite</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aucune action externe (envoi d'email, publication réseau, exécution de script destructeur) ne
              peut être effectuée sans votre validation humaine préalable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Règle N°2</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                Actif
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">Non-Ingérence Privée</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interdiction formelle de collecter ou d'analyser vos données privées à des fins publicitaires,
              d'entraînement externe ou d'ingérence non sollicitée.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Règle N°3</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                Actif
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">Droit à l'Oubli & Réversibilité</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toutes les mémoires, logs et synthèses peuvent être effacés à tout instant, sans conservation
              fantôme.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Logs */}
      {activeTab === 'logs' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">Événements & Décisions de Sécurité</h3>
            {ethicalState.auditLogs?.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="text-xs text-slate-400 hover:text-rose-300 font-mono transition-colors cursor-pointer"
              >
                Effacer le journal
              </button>
            )}
          </div>

          {ethicalState.auditLogs?.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 font-mono">
              Aucun incident ou tentative d'action non autorisée détectée.
            </div>
          ) : (
            <div className="space-y-2">
              {ethicalState.auditLogs?.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          log.decision === 'blocked'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {log.decision === 'blocked' ? 'BLOQUÉ' : 'APPROUVÉ'}
                      </span>
                      <span className="font-mono text-slate-300 font-semibold">{log.action}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{log.reason}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Permissions */}
      {activeTab === 'permissions' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Matrice des Permissions & Rôles des Agents</h3>
          <div className="space-y-3">
            {[
              {
                role: 'Sous-Agent Code & Architecture',
                allowed: 'Lecture code, proposition de patch, tests locaux sécurisés',
                blocked: 'Exécution rm/sudo/destruction système',
              },
              {
                role: 'Le Double Numérique',
                allowed: 'Préparation de brouillons d’emails, synthèses de messages',
                blocked: 'Envoi direct sans confirmation humaine',
              },
              {
                role: 'Connecteurs WhatsApp / Meta',
                allowed: 'Formatage et préparation des requêtes API',
                blocked: 'Publication automatique sans revue éthique',
              },
            ].map((perm, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="font-bold text-slate-200 font-mono">{perm.role}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="text-emerald-400/90 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Autorisé : {perm.allowed}</span>
                  </div>
                  <div className="text-rose-400/90 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Interdit : {perm.blocked}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
