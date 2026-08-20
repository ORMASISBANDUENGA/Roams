import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  UserCheck,
  Send,
  CheckCircle,
  Copy,
  RefreshCw,
  Zap,
  MessageSquare,
  Mail,
  History,
  ShieldCheck,
} from 'lucide-react';
import { PersonalityTraits, UserIdentity } from '../types/roam';
import { initialPersonality } from '../data/initialState';

interface PersonalityAndDoubleProps {
  personality: PersonalityTraits;
  setPersonality: React.Dispatch<React.SetStateAction<PersonalityTraits>>;
  onAwardXp: (amount: number, reason: string) => void;
  user?: UserIdentity;
}

export const PersonalityAndDouble: React.FC<PersonalityAndDoubleProps> = ({
  personality = initialPersonality,
  setPersonality,
  onAwardXp,
  user,
}) => {
  const userName = user?.name || 'Masis';
  const userPseudo = user?.pseudonym || user?.name || 'Masis';

  // Personality state
  const [evolutionHistory, setEvolutionHistory] = useState<string[]>([
    `v1.0 Initialisation : Calibration selon le profil de l’Architecte ${userName}`,
    'Session 1 : Préférence confirmée pour la concision et les listes à puces logiques',
    'Session 2 : Humour modéré adapté aux sessions créatives',
  ]);

  // Le Double State
  const [doubleActive, setDoubleActive] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState(
    `Salut ${userPseudo}, pourrais-tu valider le rapport d’architecture SQL Quest V4 avant la réunion de 11h ?`
  );
  const [channel, setChannel] = useState<'Email' | 'WhatsApp' | 'Slack'>('Email');
  const [doubleLoading, setDoubleLoading] = useState(false);
  const [doubleResult, setDoubleResult] = useState<{
    draftResponse: string;
    confidenceScore: number;
    styleMatches: string[];
    notes: string;
    needsUserValidation: boolean;
  } | null>({
    draftResponse:
      'Salut Marie, bien reçu le rapport SQL Quest. L’architecture est validée avec la granularité tripartite. On fait un point rapide de 10 min à 11h si besoin pour cadrer les déploiements.',
    confidenceScore: 0.95,
    styleMatches: [
      'Concision naturelle (pas de formules de politesse superflues)',
      'Ton constructif et orienté décision',
      'Validation claire sans ambiguïté',
    ],
    notes: `Le Double a calibré le ton professionnel et direct propre à ${userName}.`,
    needsUserValidation: false,
  });

  const [copied, setCopied] = useState(false);

  const handlePersonalityChange = (trait: keyof PersonalityTraits, value: any) => {
    setPersonality((prev) => ({
      ...prev,
      [trait]: value,
    }));
  };

  const applyQuickFeedback = (feedback: string) => {
    let note = '';
    if (feedback === 'Trop long') {
      setPersonality((p) => ({ ...p, longueur: Math.max(0.1, p.longueur - 0.2) }));
      note = 'Action utilisateur : "Trop long" → Concision renforcée (-20% longueur).';
    } else if (feedback === 'Plus d’humour') {
      setPersonality((p) => ({ ...p, humour: Math.min(1.0, p.humour + 0.25) }));
      note = 'Action utilisateur : "Plus d’humour" → Humour augmenté (+25%).';
    } else if (feedback === 'Sois chirurgical') {
      setPersonality((p) => ({ ...p, ton: 'chirurgical', formalite: 0.8, longueur: 0.3 }));
      note = 'Action utilisateur : Passage en mode "Chirurgical & Factuel".';
    } else if (feedback === 'Décontracté') {
      setPersonality((p) => ({ ...p, ton: 'decontracte', formalite: 0.3, humour: 0.7 }));
      note = 'Action utilisateur : Passage en mode "Décontracté & Chaleureux".';
    } else if (feedback === 'Reset') {
      setPersonality(initialPersonality);
      note = 'Réinitialisation de la personnalité aux valeurs d’origine.';
    }

    if (note) {
      setEvolutionHistory((prev) => [note, ...prev.slice(0, 5)]);
      onAwardXp(10, 'Adaptation Personnalité');
    }
  };

  const handleGenerateDouble = async () => {
    if (!incomingMessage.trim() || doubleLoading) return;
    setDoubleLoading(true);

    try {
      const res = await fetch('/api/roam/double', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incomingMessage,
          channel,
          context: `Personnalité active: ${personality.ton}, formalité: ${personality.formalite}`,
          userSampleStyle:
            'Salut, c’est bien noté. Tout est d’équerre de mon côté. Je valide le commit. À toute !',
        }),
      });

      if (!res.ok) throw new Error('Erreur génération Le Double');

      const data = await res.json();
      setDoubleResult(data);
      onAwardXp(30, 'Délégation via Le Double');
    } catch (err: any) {
      console.error(err);
      setDoubleResult({
        draftResponse:
          'Bien reçu. Je valide les éléments techniques. On en discute lors du prochain point prévu.',
        confidenceScore: 0.88,
        styleMatches: ['Formulation directe', 'Validation immédiate'],
        notes: 'Généré en mode local de secours.',
        needsUserValidation: false,
      });
    } finally {
      setDoubleLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!doubleResult) return;
    navigator.clipboard.writeText(doubleResult.draftResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Personnalité Évolutive & Le Double Numérique
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilier 2 & 4 : Roam s’adapte organiquement à votre ton et crée votre réplique numérique parfaite pour agir en votre nom.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Double : {doubleActive ? 'Actif & Prêt' : 'Désactivé'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Personnalité Évolutive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                1.2 Personnalité Évolutive
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded">
              Profil dynamique
            </span>
          </div>

          {/* Quick feedback buttons */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">
              Feedback Implicite & Ajustements Rapides :
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyQuickFeedback('Trop long')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                ✂️ "Trop long"
              </button>
              <button
                onClick={() => applyQuickFeedback('Plus d’humour')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                😄 "Plus d’humour"
              </button>
              <button
                onClick={() => applyQuickFeedback('Sois chirurgical')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                🎯 "Sois chirurgical"
              </button>
              <button
                onClick={() => applyQuickFeedback('Décontracté')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                ☕ "Décontracté"
              </button>
              <button
                onClick={() => applyQuickFeedback('Reset')}
                className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 transition"
              >
                ↺ Réinitialiser
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Ton Principal :</span>
                <span className="font-mono text-amber-400 font-bold uppercase">{personality.ton}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
                {(['professionnel', 'amical', 'decontracte', 'philosophique', 'chirurgical'] as const).map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => handlePersonalityChange('ton', t)}
                      className={`py-1.5 px-2 rounded-lg font-medium text-center transition capitalize ${
                        personality.ton === t
                          ? 'bg-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Humour */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Humour :</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {(personality.humour * 100).toFixed(0)}% ({personality.humour < 0.3 ? 'Sérieux' : personality.humour > 0.7 ? 'Très drôle' : 'Modéré'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={personality.humour}
                onChange={(e) => handlePersonalityChange('humour', parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Formalité */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Formalité :</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {(personality.formalite * 100).toFixed(0)}% ({personality.formalite < 0.4 ? 'Familier / Direct' : 'Cadre formel'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={personality.formalite}
                onChange={(e) => handlePersonalityChange('formalite', parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Proactivité */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Proactivité (Anticipation) :</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {(personality.proactivite * 100).toFixed(0)}% ({personality.proactivite > 0.7 ? 'Devance tout' : 'À la demande'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={personality.proactivite}
                onChange={(e) => handlePersonalityChange('proactivite', parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Longueur / Concision */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Longueur / Concision :</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {(personality.longueur * 100).toFixed(0)}% ({personality.longueur < 0.35 ? 'Ultra-concis' : 'Exhaustif'})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={personality.longueur}
                onChange={(e) => handlePersonalityChange('longueur', parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>
          </div>

          {/* Historical evolution log */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Journal d’Évolution Organique :</span>
            </div>
            <div className="space-y-1 text-slate-300 text-[11px]">
              {evolutionHistory.map((note, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module 2: Le Double Numérique (Signature) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  1.4 Le Double (Fonction Signature)
                </h2>
              </div>
              <button
                onClick={() => setDoubleActive(!doubleActive)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  doubleActive
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {doubleActive ? 'Actif' : 'Désactivé'}
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Le Double a analysé vos messages, décisions et style d’écriture pour répondre exactement comme vous le feriez, avec votre vocabulaire et votre rythme.
            </p>

            {/* Test Double interactive panel */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  Message entrant à déléguer :
                </label>
                <div className="flex items-center gap-1">
                  {(['Email', 'WhatsApp', 'Slack'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setChannel(c)}
                      className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                        channel === c
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={incomingMessage}
                onChange={(e) => setIncomingMessage(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none"
                placeholder="Message entrant reçu..."
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button
                    onClick={() =>
                      setIncomingMessage(
                        `Salut ${userPseudo}, as-tu finalisé le schéma du Cerveau Tripartite ?`
                      )
                    }
                    className="text-[10px] text-slate-400 hover:text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800"
                  >
                    Ex. Schéma V4
                  </button>
                  <button
                    onClick={() =>
                      setIncomingMessage(
                        `Bonjour ${userName}, quel est le créneau idéal pour la démo demain ?`
                      )
                    }
                    className="text-[10px] text-slate-400 hover:text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800"
                  >
                    Ex. Démo
                  </button>
                </div>

                <button
                  onClick={handleGenerateDouble}
                  disabled={doubleLoading || !doubleActive}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 transition shadow"
                >
                  {doubleLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5" />
                  )}
                  <span>Double : Rédiger réponse</span>
                </button>
              </div>
            </div>

            {/* Generated result */}
            {doubleResult && (
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Réponse générée dans le style de {userName}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Confiance : {(doubleResult.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  "{doubleResult.draftResponse}"
                </div>

                {/* Style breakdown */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400">Marqueurs stylistiques détectés :</span>
                  <div className="flex flex-wrap gap-1">
                    {doubleResult.styleMatches.map((m, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                  >
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                  </button>
                  <button
                    onClick={() => {
                      alert(`✅ Réponse validée et transmise par Le Double de ${userName}.`);
                      onAwardXp(20, 'Validation réponse Double');
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Valider & Envoyer</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>🔒 Toutes les actions du Double sont auditées dans le Journal de Bord.</span>
            <span className="text-amber-400 font-mono">100% Souveraineté</span>
          </div>
        </div>
      </div>
    </div>
  );
};
