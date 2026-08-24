import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Shield,
  Mail,
  Phone,
  Key,
  Fingerprint,
  CheckCircle2,
  Lock,
  Smartphone,
  ExternalLink,
  Edit2,
  Save,
  Globe,
  HardDrive
} from 'lucide-react';
import { UserIdentity } from '../types/roam';

interface ProfileViewProps {
  user: UserIdentity;
  onUpdateUser: (updated: Partial<UserIdentity>) => void;
  onOpenDevices: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onOpenDevices,
}) => {
  const [activeTab, setActiveTab] = useState<'compte' | 'securite'>('compte');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || 'Architecte');
  const [pseudonym, setPseudonym] = useState(user.pseudonym || 'user');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '+243 81 000 0000');

  const handleSave = () => {
    onUpdateUser({
      name,
      pseudonym,
      email,
      phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Card Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-slate-950 overflow-hidden shadow-xl">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl md:text-2xl font-bold text-slate-100">{name}</h1>
                <span className="flex items-center space-x-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Compte vérifié</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 font-mono">@{pseudonym.toLowerCase().replace(/\s+/g, '_')}</p>
              <p className="text-xs text-amber-400/90 font-medium">Souveraineté Niveau {user.autonomyLevel} • Nœud {user.nodeType.toUpperCase()}</p>
            </div>
          </div>

          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span>Modifier le profil</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs: Compte vs Sécurité */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('compte')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'compte'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Compte & Coordonnées
          </button>
          <button
            onClick={() => setActiveTab('securite')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'securite'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sécurité & Passkeys
          </button>
        </div>

        {/* Tab 1: Compte */}
        {activeTab === 'compte' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
              <h2 className="text-base font-bold text-slate-100">Informations personnelles</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nom complet</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200">
                      {name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Identifiant / Pseudonyme</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={pseudonym}
                      onChange={(e) => setPseudonym(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200">
                      @{pseudonym}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Adresse e-mail</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="masisbanduenga@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 flex items-center justify-between">
                      <span>{email || 'Non renseigné'}</span>
                      {email && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Numéro de téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200">
                      {phone || 'Non configuré'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comptes connectés */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-base font-bold text-slate-100">Comptes connectés</h2>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-200">Google / Gmail</div>
                      <div className="text-xs text-slate-400">{email || 'Connecté'}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                    Actif
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Fingerprint className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-200">Passkey Matériel (FIDO2)</div>
                      <div className="text-xs text-slate-400">Empreinte / Windows Hello</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                    Configuré
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Sécurité */}
        {activeTab === 'securite' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-100">Passkeys & Clés de sécurité</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Utilisez votre capteur biométrique, Face ID ou Windows Hello pour une connexion sans mot de passe.
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Actif
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Passkey de l'appareil actuel</div>
                    <div className="text-xs text-slate-500">Ajouté il y a 3 jours • WebAuthn certifié</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Passkey déjà synchronisé sur cet appareil.')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
                >
                  Gérer
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-100">Sessions & Appareils connectés</h2>
                  <p className="text-xs text-slate-400 mt-0.5">3 appareils actuellement autorisés</p>
                </div>
                <button
                  onClick={onOpenDevices}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  Voir tous les appareils →
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
