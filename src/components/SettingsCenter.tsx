import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Sliders,
  Sparkles,
  Shield,
  Palette,
  FlaskConical,
  CreditCard,
  Check,
  Save,
  Moon,
  Sun,
  Globe,
  Mic,
  Cpu,
  Fingerprint,
  Smartphone,
  Lock,
  Zap,
  Bot,
  Eye,
  Key
} from 'lucide-react';
import { UserIdentity, PersonalityTraits, UsageQuota } from '../types/roam';

interface SettingsCenterProps {
  user: UserIdentity;
  setUser: React.Dispatch<React.SetStateAction<UserIdentity>>;
  personality: PersonalityTraits;
  setPersonality: React.Dispatch<React.SetStateAction<PersonalityTraits>>;
  quota: UsageQuota;
  onSaveNotification: () => void;
  onOpenDevices?: () => void;
  onOpenPrivacy?: () => void;
}

export const SettingsCenter: React.FC<SettingsCenterProps> = ({
  user,
  setUser,
  personality,
  setPersonality,
  quota,
  onSaveNotification,
  onOpenDevices,
  onOpenPrivacy,
}) => {
  const [activeTab, setActiveTab] = useState<'compte' | 'apparence' | 'ia' | 'securite' | 'confidentialite' | 'lab'>('compte');
  const [savedToast, setSavedToast] = useState(false);

  // Local state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [aiEngine, setAiEngine] = useState<'auto' | 'flash' | 'reasoning' | 'vision'>('auto');
  const [voiceGender, setVoiceGender] = useState<'femme' | 'homme'>('femme');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);

  // Lab features toggles
  const [labDoubleEnabled, setLabDoubleEnabled] = useState(true);
  const [labContinuousScreen, setLabContinuousScreen] = useState(false);
  const [labSovereignKey, setLabSovereignKey] = useState(true);
  const [labEthicalSandbox, setLabEthicalSandbox] = useState(true);

  const tabs = [
    { id: 'compte', label: 'Compte & Forfait', icon: User },
    { id: 'apparence', label: 'Apparence & Langue', icon: Palette },
    { id: 'ia', label: 'Moteur IA & Voix', icon: Sparkles },
    { id: 'securite', label: 'Sécurité & Accès', icon: Shield },
    { id: 'confidentialite', label: 'Confidentialité', icon: Lock },
    { id: 'lab', label: 'Laboratoire Expérimental', icon: FlaskConical },
  ];

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
    }));
    setSavedToast(true);
    onSaveNotification();
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
              <Sliders className="w-7 h-7 text-amber-400" />
              <span>Paramètres</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Personnalisez votre expérience, vos moteurs d'IA, votre sécurité et vos quotas.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{savedToast ? 'Enregistré ✓' : 'Enregistrer'}</span>
          </button>
        </div>

        {/* Layout: Vertical Navigation Tabs on left, Content on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Navigation */}
          <div className="md:col-span-4 space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-slate-900 border border-amber-500/40 text-amber-400 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Panel */}
          <div className="md:col-span-8">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
              
              {/* Tab 1: Compte & Forfait */}
              {activeTab === 'compte' && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-100">Profil & Abonnement</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nom complet</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Quotas & Plan */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Forfait Actuel
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                        {quota.plan.toUpperCase()} SOUVERAIN
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Messages & Requêtes IA</span>
                          <span>{quota.messagesUsed} / {quota.messagesLimit}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${(quota.messagesUsed / quota.messagesLimit) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Générations d'images 2K/4K</span>
                          <span>{quota.imagesUsed} / {quota.imagesLimit}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full transition-all"
                            style={{ width: `${(quota.imagesUsed / quota.imagesLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Apparence */}
              {activeTab === 'apparence' && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-100">Apparence & Internationalisation</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Thème d'affichage</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setTheme('dark')}
                          className={`p-3.5 rounded-xl border flex items-center justify-center space-x-2 text-xs font-semibold transition-all ${
                            theme === 'dark'
                              ? 'bg-slate-950 border-amber-500 text-amber-400'
                              : 'bg-slate-950/40 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          <span>Mode Sombre (Par défaut)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTheme('light')}
                          className={`p-3.5 rounded-xl border flex items-center justify-center space-x-2 text-xs font-semibold transition-all ${
                            theme === 'light'
                              ? 'bg-slate-100 border-amber-500 text-slate-900'
                              : 'bg-slate-950/40 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          <span>Mode Clair</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Langue de l'interface</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none"
                      >
                        <option value="fr">Français (France / RDC / Afrique / Canada)</option>
                        <option value="en">English (US / UK)</option>
                        <option value="es">Español</option>
                        <option value="pt">Português</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: IA & Voix */}
              {activeTab === 'ia' && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-100">Moteur IA & Comportement</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Moteur par défaut</label>
                      <select
                        value={aiEngine}
                        onChange={(e) => setAiEngine(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none"
                      >
                        <option value="auto">Automatique (Routage intelligent)</option>
                        <option value="flash">Rapide (Flash 2.5 • Instantané)</option>
                        <option value="reasoning">Raisonnement Profond (Thinking 2.5 • Code & Audit)</option>
                        <option value="vision">Vision Multimodale (Analyse images & écrans)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ton des réponses</label>
                      <select
                        value={personality.ton}
                        onChange={(e) => setPersonality({ ...personality, ton: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none"
                      >
                        <option value="Professionnel">Professionnel & Clair (Recommandé)</option>
                        <option value="Direct & Concis">Direct & Concis (Sans bavardage)</option>
                        <option value="Créatif & Approfondi">Créatif & Approfondi</option>
                        <option value="Pédagogique">Pédagogique & Analytique</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Voix de synthèse</label>
                      <select
                        value={voiceGender}
                        onChange={(e) => setVoiceGender(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none"
                      >
                        <option value="femme">Voix Féminine (Clair & Naturel)</option>
                        <option value="homme">Voix Masculine (Posé & Professionnel)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Sécurité */}
              {activeTab === 'securite' && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-100">Sécurité & Authentification</h2>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Fingerprint className="w-5 h-5 text-amber-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Passkeys FIDO2 Matériels</div>
                          <div className="text-xs text-slate-400">Connexion par empreinte, Face ID ou Windows Hello</div>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold">Activé</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-sky-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Appareils connectés</div>
                          <div className="text-xs text-slate-400">Sessions autorisées sur ce compte</div>
                        </div>
                      </div>
                      <button
                        onClick={onOpenDevices}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                      >
                        Gérer →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Confidentialité */}
              {activeTab === 'confidentialite' && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-100">Confidentialité & Données</h2>
                  <p className="text-xs text-slate-400">
                    Contrôlez l'historique et la mémoire conservée par ROAM.
                  </p>
                  <button
                    onClick={onOpenPrivacy}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20"
                  >
                    Ouvrir le Centre de Confidentialité →
                  </button>
                </div>
              )}

              {/* Tab 6: Laboratoire Expérimental */}
              {activeTab === 'lab' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                      <FlaskConical className="w-5 h-5 text-amber-400" />
                      <span>Laboratoire & Fonctionnalités Expérimentales</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Modules avancés pour utilisateurs experts et développeurs.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-slate-200">Le Double Numérique Autonome</div>
                        <div className="text-xs text-slate-400">Simulation d'actions proactives en arrière-plan</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={labDoubleEnabled}
                        onChange={(e) => setLabDoubleEnabled(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-slate-200">Observation continue de l'écran</div>
                        <div className="text-xs text-slate-400">Diagnostic périodique sans cliquer</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={labContinuousScreen}
                        onChange={(e) => setLabContinuousScreen(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>

                    <label className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-slate-200">Clé Souveraine ZK & Sandbox Éthique</div>
                        <div className="text-xs text-slate-400">Audit de non-ingérence et chiffrement local matériel</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={labSovereignKey}
                        onChange={(e) => setLabSovereignKey(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
