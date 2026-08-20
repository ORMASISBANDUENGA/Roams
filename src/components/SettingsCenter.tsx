import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Brain,
  Database,
  HardDrive,
  Bell,
  Shield,
  Sliders,
  Check,
  Save,
  Trash2,
  Cloud,
  Moon,
  Volume2
} from 'lucide-react';
import { UserIdentity, PersonalityTraits, AutonomyLevel } from '../types/roam';
import { autonomyDefinitions } from '../data/initialState';

interface SettingsCenterProps {
  user: UserIdentity;
  setUser: React.Dispatch<React.SetStateAction<UserIdentity>>;
  personality: PersonalityTraits;
  setPersonality: React.Dispatch<React.SetStateAction<PersonalityTraits>>;
  onSaveNotification: () => void;
}

export const SettingsCenter: React.FC<SettingsCenterProps> = ({
  user,
  setUser,
  personality,
  setPersonality,
  onSaveNotification,
}) => {
  const [activeCategory, setActiveCategory] = useState<'compte' | 'ia' | 'memoire' | 'systeme' | 'confidentialite'>('ia');
  const [localName, setLocalName] = useState(user.name);
  const [localPseudonym, setLocalPseudonym] = useState(user.pseudonym);
  const [localEmail, setLocalEmail] = useState(user.email);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [savedToast, setSavedToast] = useState(false);

  const categories = [
    { id: 'compte', label: 'Compte & Profil', icon: User },
    { id: 'ia', label: 'IA & Autonomie', icon: Brain },
    { id: 'memoire', label: 'Mémoire Souveraine', icon: Database },
    { id: 'systeme', label: 'Système (Local/Cloud)', icon: HardDrive },
    { id: 'confidentialite', label: 'Confidentialité & Sons', icon: Shield },
  ];

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name: localName,
      pseudonym: localPseudonym,
      email: localEmail,
    }));
    setSavedToast(true);
    onSaveNotification();
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Sliders className="w-4 h-4" />
            <span>CONFIGURATION SYSTÈME V1.0</span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100">
            Paramètres du Centre de Contrôle
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gérez vos règles de délégation, les moteurs IA, l'autonomie et le stockage souverain.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{savedToast ? 'ENREGISTRÉ ✓' : 'ENREGISTRER LES MODIFICATIONS'}</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border font-mono text-xs transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Setting Panel */}
        <div className="md:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          {/* COMPTE */}
          {activeCategory === 'compte' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-mono text-slate-100 pb-2 border-b border-slate-800">
                Profil &amp; Identité Souveraine
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Pseudonyme court</label>
                  <input
                    type="text"
                    value={localPseudonym}
                    onChange={(e) => setLocalPseudonym(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Identifiant e-mail</label>
                <input
                  type="email"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                <div className="text-slate-200 font-semibold">Sessions actives</div>
                <div>1 session locale sécurisée (Clé matérielle autorisée)</div>
              </div>
            </div>
          )}

          {/* IA & AUTONOMIE */}
          {activeCategory === 'ia' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold font-mono text-slate-100 pb-2 border-b border-slate-800">
                Configuration de l'IA &amp; Degré d'Autonomie
              </h3>

              {/* Autonomie Level Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  Niveau d'Autonomie de ROAM (1 à 5)
                </label>
                <div className="space-y-2">
                  {autonomyDefinitions.map((def) => {
                    const isSelected = user.autonomyLevel === def.level;
                    return (
                      <button
                        key={def.level}
                        onClick={() => setUser((prev) => ({ ...prev, autonomyLevel: def.level }))}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-slate-100'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-200">
                            {def.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{def.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personality Sliders */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Traits de Personnalité &amp; Proactivité
                </label>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Humour / Énergie</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={personality.humour}
                      onChange={(e) => setPersonality((p) => ({ ...p, humour: parseFloat(e.target.value) }))}
                      className="accent-amber-500 w-36"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Proactivité du Double</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={personality.proactivite}
                      onChange={(e) => setPersonality((p) => ({ ...p, proactivite: parseFloat(e.target.value) }))}
                      className="accent-amber-500 w-36"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Concision vs Détail</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={personality.longueur}
                      onChange={(e) => setPersonality((p) => ({ ...p, longueur: parseFloat(e.target.value) }))}
                      className="accent-amber-500 w-36"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÉMOIRE */}
          {activeCategory === 'memoire' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-mono text-slate-100 pb-2 border-b border-slate-800">
                Gestion de la Mémoire Souveraine
              </h3>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">Indexation Mémoire Active</div>
                  <div className="text-[11px] text-slate-400">Permet à ROAM de retenir vos projets et préférences</div>
                </div>
                <button
                  onClick={() => setMemoryEnabled(!memoryEnabled)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${
                    memoryEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {memoryEnabled ? 'ACTIVÉE 🟢' : 'DÉSACTIVÉE'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                <div className="text-xs font-mono font-bold text-red-400 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Zone de Purge Souveraine</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Supprime l'intégralité des faits indexés sur ce nœud local. Cette opération est irréversible.
                </p>
                <button
                  onClick={() => alert('Purge complète : Vos fichiers restent préservés, mais les souvenirs sémantiques sont remis à zéro.')}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-mono cursor-pointer"
                >
                  Purger toute la mémoire
                </button>
              </div>
            </div>
          )}

          {/* SYSTÈME */}
          {activeCategory === 'systeme' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-mono text-slate-100 pb-2 border-b border-slate-800">
                Nœud Local &amp; Synchronisation Cloud
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-200">Nœud Local Souverain</div>
                      <div className="text-[11px] text-slate-400">Port 3000 • Processus isolé sandbox</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    🟢 ONLINE
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-200">Miroir Cloud Chiffré</div>
                      <div className="text-[11px] text-slate-400">Sauvegarde E2E chiffrée AES-256</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    🟢 SYNCHRONISÉ
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CONFIDENTIALITÉ & SONS */}
          {activeCategory === 'confidentialite' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-mono text-slate-100 pb-2 border-b border-slate-800">
                Confidentialité &amp; Audio
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>Synthèse Vocale Roam Voice</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={voiceVolume}
                    onChange={(e) => setVoiceVolume(parseInt(e.target.value))}
                    className="accent-cyan-500 w-32"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400">
                  🔒 <strong className="text-slate-200">Zéro Télémétrie Externe :</strong> Aucune invite, requête ou document de code n'est partagé avec des tiers sans votre consentement explicite.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
