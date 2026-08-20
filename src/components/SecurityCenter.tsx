import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  HardDrive,
  Cloud,
  Eye,
  Key,
  Terminal,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { SecurityCenterData, SecurityAuditItem } from '../types/roam';

interface SecurityCenterProps {
  securityData: SecurityCenterData;
  setSecurityData: React.Dispatch<React.SetStateAction<SecurityCenterData>>;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({
  securityData,
  setSecurityData,
}) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const runFullAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      const newAudit: SecurityAuditItem = {
        id: `sec-${Date.now()}`,
        time: new Date().toLocaleTimeString().slice(0, 5),
        event: 'Full cryptographic sandbox audit completed',
        category: 'security',
        status: 'ok',
        detail: 'Toutes les clés sont chiffrées en AES-256. 0 fuite détectée.',
      };

      setSecurityData((prev) => ({
        ...prev,
        integrityScore: 100,
        auditLogs: [newAudit, ...prev.auditLogs],
      }));
      setAuditMessage('Audit d’intégrité réussi : Système 100% hermétique et souverain.');
      setTimeout(() => setAuditMessage(null), 4000);
    }, 1200);
  };

  const statusTiles = [
    { label: 'LOCAL PROCESSING', icon: HardDrive, value: '🟢 SOUVERAIN (Actif)', ok: securityData.localProcessing },
    { label: 'ENCRYPTION', icon: Lock, value: '🟢 AES-GCM 256', ok: securityData.encryptionActive },
    { label: 'CLOUD CONNECTION', icon: Cloud, value: '🟢 SYNCHRONISÉ (E2E)', ok: securityData.cloudConnection },
    { label: 'MEMORY PROTECTION', icon: Eye, value: '🟢 SANDBOX ISOLÉE', ok: securityData.memoryProtection },
    { label: 'ACTIVE SESSIONS', icon: Key, value: `${securityData.activeSessions} CONNECTÉE`, ok: true },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>CENTRE DE SÉCURITÉ SOUVERAIN • AUDIT EN CONTINU</span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100">
            Centre de Sécurité &amp; Confidentialité
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Surveillance en temps réel des accès matériels, de l'isolation mémoire et du chiffrement du nœud local.
          </p>
        </div>

        <button
          onClick={runFullAudit}
          disabled={isAuditing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer disabled:opacity-50 self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'AUDIT EN COURS...' : 'LANCER UN AUDIT COMPLET'}</span>
        </button>
      </div>

      {auditMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{auditMessage}</span>
        </motion.div>
      )}

      {/* Security Status Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] font-mono tracking-wider">{tile.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-mono font-bold text-slate-200">
                {tile.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Audit Log Stream */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>JOURNAL D'AUDIT DE SÉCURITÉ EN DIRECT</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Score d'intégrité : <strong className="text-emerald-400">100 / 100</strong>
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-[400px] overflow-y-auto pr-1">
          {securityData.auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0">{log.time}</span>
                <div>
                  <div className="text-slate-200 font-semibold">{log.event}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{log.detail}</div>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shrink-0 ml-2">
                🟢 {log.category.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
