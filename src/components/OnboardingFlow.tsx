import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, Shield, ArrowRight, ArrowLeft, Check, Mail, Phone, Zap } from 'lucide-react';
import { UserIdentity, AutonomyLevel, PersonalityTraits } from '../types/roam';
import { autonomyDefinitions } from '../data/initialState';

interface OnboardingFlowProps {
  initialUser: UserIdentity;
  onComplete: (updatedUser: UserIdentity, updatedPersonality: PersonalityTraits) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialUser,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(initialUser.name || 'Masis Banduenga');
  const [pseudonym, setPseudonym] = useState(initialUser.pseudonym || 'Masis');
  const [email, setEmail] = useState(initialUser.email || 'masisbanduenga@gmail.com');
  const [phone, setPhone] = useState(initialUser.phone || '+33 6 12 34 56 78');
  const [personalityPreset, setPersonalityPreset] = useState<UserIdentity['personalityPreset']>(
    initialUser.personalityPreset || 'direct'
  );
  const [autonomyLevel, setAutonomyLevel] = useState<AutonomyLevel>(initialUser.autonomyLevel || 3);

  const personalityOptions = [
    {
      id: 'professionnel',
      label: 'Professionnel',
      desc: 'Formel, méthodique, orienté rigueur et précision chirurgicale.',
      sample: '« Bien reçu. Voici l’analyse de la structure et les 3 actions recommandées. »',
    },
    {
      id: 'amical',
      label: 'Amical',
      desc: 'Bienveillant, chaleureux, attentif à votre charge mentale.',
      sample: '« Salut ! J’ai jeté un œil à ton code, tout roule. On attaque le prochain module ? »',
    },
    {
      id: 'direct',
      label: 'Direct',
      desc: 'Concis, sans détour, centré exclusivement sur le résultat.',
      sample: '« Patch prêt. 0 régression. Tu veux déployer maintenant ? »',
    },
    {
      id: 'dynamique',
      label: 'Dynamique',
      desc: 'Énergique, proactif, stimulant pour les sessions intenses.',
      sample: '« Super progression ce matin ! J’ai pré-généré les tests pour garder le rythme ! 🔥 »',
    },
    {
      id: 'sarcastique',
      label: 'Sarcastique',
      desc: 'Piquant avec humour fin, pour les développeurs chevronnés.',
      sample: '« Encore un commit à 23h ? J’ai corrigé la variable, mais ton sommeil en a besoin aussi. »',
    },
    {
      id: 'personnalise',
      label: 'Personnalisé',
      desc: 'S’adapte en continu à vos habitudes et votre humeur en temps réel.',
      sample: '« ROAM observera vos interactions et modulera son ton automatiquement. »',
    },
  ];

  const handleFinish = () => {
    const updatedUser: UserIdentity = {
      ...initialUser,
      name: name.trim() || 'Masis',
      pseudonym: pseudonym.trim() || (name.trim() ? name.trim().split(' ')[0] : 'Masis'),
      email: email.trim(),
      phone: phone.trim(),
      personalityPreset,
      autonomyLevel,
      onboardingCompleted: true,
    };

    // Derive initial personality traits from preset
    let ton: PersonalityTraits['ton'] = 'direct';
    let humour = 0.4;
    let formalite = 0.6;
    let proactivite = 0.8;
    let longueur = 0.4;

    if (personalityPreset === 'professionnel') {
      ton = 'professionnel';
      humour = 0.1;
      formalite = 0.9;
      proactivite = 0.6;
      longueur = 0.7;
    } else if (personalityPreset === 'amical') {
      ton = 'amical';
      humour = 0.7;
      formalite = 0.3;
      proactivite = 0.7;
      longueur = 0.6;
    } else if (personalityPreset === 'dynamique') {
      ton = 'dynamique';
      humour = 0.6;
      formalite = 0.4;
      proactivite = 0.9;
      longueur = 0.5;
    } else if (personalityPreset === 'sarcastique') {
      ton = 'sarcastique';
      humour = 0.9;
      formalite = 0.2;
      proactivite = 0.8;
      longueur = 0.4;
    }

    const updatedTraits: PersonalityTraits = {
      ton,
      humour,
      formalite,
      proactivite,
      longueur,
      lastEvolutionNote: `Calibré initialement pour l'Architecte ${updatedUser.name} (${personalityPreset})`,
    };

    onComplete(updatedUser, updatedTraits);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans select-none overflow-y-auto px-4 py-8">
      {/* Step Indicator */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-400">ROAM IDENTITY</span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400 font-mono">Étape {step} sur 3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-1.5 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-slate-800'}`} />
          <div className={`w-6 h-1.5 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-slate-800'}`} />
          <div className={`w-6 h-1.5 rounded-full ${step >= 3 ? 'bg-amber-400' : 'bg-slate-800'}`} />
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full max-w-xl p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md"
      >
        {/* STEP 1: IDENTITY & COORDINATES */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono text-slate-100">Étape 1 — Coordonnées &amp; Identité</h3>
                <p className="text-xs text-slate-400">Renseignez votre nom pour que ROAM vous salue personnellement</p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Nom complet (utilisé dans "Bonjour, {name || '...'}")
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Masis Banduenga"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Prénom / Pseudonyme court
                  </label>
                  <input
                    type="text"
                    value={pseudonym}
                    onChange={(e) => setPseudonym(e.target.value)}
                    placeholder="Ex : Masis"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="masisbanduenga@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs font-mono text-slate-300">
                💡 <span className="text-amber-400 font-semibold">Souveraineté garantie :</span> Vos coordonnées sont chiffrées localement et personnalisent en temps réel les salutations et les rapports de votre Double.
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all cursor-pointer disabled:opacity-40"
              >
                <span>CONTINUER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PERSONALITY */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono text-slate-100">Étape 2 — Personnalité</h3>
                <p className="text-xs text-slate-400">Comment souhaitez-vous que ROAM vous parle ?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5 max-h-[380px] overflow-y-auto pr-1">
              {personalityOptions.map((opt) => {
                const isSelected = personalityPreset === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPersonalityPreset(opt.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-semibold text-slate-100">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                    </div>
                    <p className="text-xs text-slate-400 mb-2 leading-relaxed">{opt.desc}</p>
                    <div className="text-[11px] text-amber-300/90 font-mono italic bg-slate-900/80 p-2 rounded border border-slate-800/80">
                      {opt.sample}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>RETOUR</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all cursor-pointer"
              >
                <span>NIVEAU D'AUTONOMIE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AUTONOMY LEVEL */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono text-slate-100">Étape 3 — Niveau d'autonomie</h3>
                <p className="text-xs text-slate-400">Contrôlez le degré de proactivité et de délégation de ROAM</p>
              </div>
            </div>

            <div className="space-y-2.5 my-5">
              {autonomyDefinitions.map((def) => {
                const isSelected = autonomyLevel === def.level;
                return (
                  <button
                    key={def.level}
                    onClick={() => setAutonomyLevel(def.level)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          NIVEAU {def.level}
                        </span>
                        <span className="font-mono text-sm font-semibold text-slate-100">{def.shortDesc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                    </div>
                    <p className="text-xs text-slate-400 ml-1 leading-relaxed">{def.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>RETOUR</span>
              </button>
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>ACTIVER LE CERVEAU TRIPARTITE</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
