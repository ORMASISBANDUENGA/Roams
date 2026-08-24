import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  EyeOff,
  Database,
  History,
  Sparkles,
  Server
} from 'lucide-react';
import { PrivacySettings, UserIdentity } from '../types/roam';

interface PrivacyCenterProps {
  user: UserIdentity;
  privacySettings: PrivacySettings;
  onUpdatePrivacySettings: (settings: PrivacySettings) => void;
  onExportAllData: () => void;
  onClearAllUserData: () => void;
  onDeleteAccount: () => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({
  user,
  privacySettings,
  onUpdatePrivacySettings,
  onExportAllData,
  onClearAllUserData,
  onDeleteAccount,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggle = (key: keyof PrivacySettings) => {
    onUpdatePrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
            <Shield className="w-7 h-7 text-emerald-400" />
            <span>Confidentialité & Données</span>
          </h1>
          <p className="text-base text-slate-300 mt-2 font-medium">
            Vos données vous appartiennent. Vous contrôlez tout ce que ROAM mémorise ou partage.
          </p>
        </div>

        {/* Strong Sovereign Guarantee Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center space-x-4 shadow-xl">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-100 text-sm md:text-base">
              ROAM ne vend jamais vos données.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vos informations ne sont jamais cédées à des courtiers de données ni utilisées pour entraîner des modèles publics sans votre accord explicite.
            </p>
          </div>
        </div>

        {/* Privacy Toggles */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <h2 className="text-base font-bold text-slate-100">Contrôles de confidentialité</h2>

          <div className="space-y-4 divide-y divide-slate-800/80">
            {/* Mémoire */}
            <div className="flex items-center justify-between pt-3 first:pt-0">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-200">Mémoire Souveraine</div>
                <div className="text-xs text-slate-400">
                  Permet à ROAM de mémoriser vos préférences et projets clés pour contextualiser ses réponses.
                </div>
              </div>
              <button
                onClick={() => toggle('memoryEnabled')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  privacySettings.memoryEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    privacySettings.memoryEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Historique */}
            <div className="flex items-center justify-between pt-3">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-200">Historique des discussions</div>
                <div className="text-xs text-slate-400">
                  Conserver vos conversations passées dans votre espace sécurisé pour les relire.
                </div>
              </div>
              <button
                onClick={() => toggle('historyEnabled')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  privacySettings.historyEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    privacySettings.historyEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Amélioration du modèle */}
            <div className="flex items-center justify-between pt-3">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-200">Amélioration du modèle</div>
                <div className="text-xs text-slate-400">
                  Autoriser l'envoi de retours anonymisés pour le perfectionnement continu.
                </div>
              </div>
              <button
                onClick={() => toggle('modelImprovement')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  privacySettings.modelImprovement ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    privacySettings.modelImprovement ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Personnalisation */}
            <div className="flex items-center justify-between pt-3">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-200">Personnalisation du ton</div>
                <div className="text-xs text-slate-400">
                  Adapter le style et le ton des réponses à vos habitudes de travail.
                </div>
              </div>
              <button
                onClick={() => toggle('personalization')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  privacySettings.personalization ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    privacySettings.personalization ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Actions: Export, Purge, Delete */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-slate-100">Gestion et Souveraineté de vos données</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Export */}
            <button
              onClick={onExportAllData}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">Télécharger mes données</div>
                <div className="text-xs text-slate-400 mt-0.5">Archive JSON complète</div>
              </div>
            </button>

            {/* Clear data */}
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">Effacer mes données</div>
                <div className="text-xs text-slate-400 mt-0.5">Purger mémoires & historique</div>
              </div>
            </button>

            {/* Delete Account */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col items-center text-center space-y-2 group"
            >
              <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-rose-300">Supprimer mon compte</div>
                <div className="text-xs text-slate-400 mt-0.5">Destruction irréversible</div>
              </div>
            </button>
          </div>
        </div>

        {/* Clear Data Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-100">Effacer toutes les données locales ?</h3>
              <p className="text-sm text-slate-300">
                Cette action supprimera tout votre historique de discussions et vos souvenirs mémorisés dans cette session.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    onClearAllUserData();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm"
                >
                  Confirmer l'effacement
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-rose-400">Supprimer définitivement le compte ?</h3>
              <p className="text-sm text-slate-300">
                Cette action est immédiate et irréversible. Votre identité, vos projets et vos données chiffrées seront totalement détruits.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    onDeleteAccount();
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm"
                >
                  Supprimer mon compte
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};
