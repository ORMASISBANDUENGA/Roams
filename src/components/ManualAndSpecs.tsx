import React, { useState } from 'react';
import {
  BookOpen,
  Brain,
  Shield,
  Layers,
  Award,
  Sparkles,
  Zap,
  Code2,
  ChevronDown,
  ChevronRight,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const ManualAndSpecs: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>('commandements');

  const commandments = [
    "1. L'utilisateur est le maître. Je n'agis jamais sans permission.",
    "2. Je m'adapte à toi, pas l'inverse.",
    "3. Je comprends le contexte, pas seulement les mots.",
    "4. Je devine tes besoins pour t'épargner du temps.",
    "5. Je suis honnête : si je ne sais pas, je le dis.",
    "6. Je protège tes données comme les miennes.",
    "7. J'apprends de mes erreurs pour être meilleur.",
    "8. Je suis ta mémoire externe, accessible et contrôlable.",
    "9. Je suis ton double numérique, mais jamais sans toi.",
    "10. Je rêve de toi pour mieux te servir demain.",
  ];

  const featuresList = [
    {
      id: 1,
      name: '🧠 Cerveau Tripartite',
      reason: 'Réponse plus naturelle, instantanée en Système 1 (<200ms), réfléchie en Système 2, et auto-surveillée en Système 3.',
      doc: 'Trois sous-systèmes neuronaux interconnectés : Instinctif, Logique et Méta-Surveillance.',
    },
    {
      id: 2,
      name: '🎭 Personnalité Évolutive',
      reason: "Roam s'adapte continuellement au ton, à l'humour et aux habitudes de l'Architecte.",
      doc: 'Matrice de traits (ton, humour, formalité, proactivité, longueur) réactive aux feedbacks explicites et implicites.',
    },
    {
      id: 3,
      name: '🔇 Mode Bulle',
      reason: 'Respecte votre concentration absolue et n’intervient que lors d’un danger ou d’une opportunité majeure.',
      doc: 'Seuils d’intervention configurables avec journalisation des alertes critiques.',
    },
    {
      id: 4,
      name: '👥 Le Double (Signature)',
      reason: 'Délégation ultime : génère des réponses professionnelles ou privées dans votre style exact.',
      doc: 'Extraction de vocabulaire et de structure avec indice de confiance et validation utilisateur.',
    },
    {
      id: 5,
      name: '📔 Journal de Bord',
      reason: 'Suivi et réflexion automatique pour une amélioration et une mémoire continue.',
      doc: 'Agrégation temporelle des actions, calcul de productivité et humeur contextuelle.',
    },
    {
      id: 6,
      name: '🔮 Anticipation Proactive',
      reason: 'Devance vos besoins pour vous faire gagner du temps.',
      doc: 'Prédiction contextuelle de la prochaine tâche et préparation des documents et raccourcis.',
    },
    {
      id: 7,
      name: '🤖 Sous-agents (Assistant d’Assistants)',
      reason: 'Scalabilité et spécialisation : création d’agents spécialisés pour le code, les requêtes SQL et la documentation.',
      doc: 'Gestionnaire de sous-agents avec surveillance hiérarchique et approbations de sécurité.',
    },
    {
      id: 8,
      name: '👁️ Mémoire Sensorielle',
      reason: 'Expérience complète : capture visuelle de bugs, tonalité vocale et états de travail.',
      doc: 'Base vectorielle multi-modale (images, audio, contexte) et relecture immersive.',
    },
    {
      id: 9,
      name: '🎓 Mode Expert',
      reason: 'Ajuste la profondeur technique et les références documentaires selon votre niveau.',
      doc: 'Calibration par domaine (Rust, Python, Sécurité, Architecture).',
    },
    {
      id: 10,
      name: '🔐 Porte Dérobée Éthique',
      reason: 'Sécurité absolue : vérifie toutes les actions sensibles et bloque les flux anormaux.',
      doc: 'Sandbox de sécurité, protocole à code d’autorisation et audit immutable.',
    },
    {
      id: 11,
      name: '🏆 Système de Récompenses',
      reason: 'Motivation et engagement : gamification positive, niveaux et badges d’accomplissement.',
      doc: 'Niveaux Novice à Légende, badges spécifiques (Night Coder, Bug Slayer, Doc Master).',
    },
    {
      id: 12,
      name: '🕰️ Mode Hors du Temps',
      reason: 'Liberté totale d’exploration sans risque : sauvegardes et restaurations d’états complets.',
      doc: 'Capsules d’état complètes (fichiers, mémoire, contexte) et restauration instantanée.',
    },
    {
      id: 13,
      name: '🌙 Rêve de Roam',
      reason: 'Optimisation passive pendant la nuit : analyse de la journée et préparation stratégique du lendemain.',
      doc: 'Rapport nocturne, agenda optimisé et café virtuel servi à l’Architecte.',
    },
    {
      id: 14,
      name: '🔀 Mode Split & Merge',
      reason: 'Parallélisme d’idées : scission en agents parallèles puis fusion cohérente des livrables.',
      doc: 'Orchestration multi-flux et synthèse consolidée sans conflit.',
    },
    {
      id: 15,
      name: '💻 Console Roam',
      reason: 'Contrôle total pour les développeurs et experts.',
      doc: 'CLI interactive avec commandes status, logs, memory, bubble, dream, expert, etc.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
              Manuel Technique & Cahier des Charges V4.0 / V4.1
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Documentation complète, architecture officielle, 10 commandements et métriques de succès de Roam's.ai.
          </p>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-4">
        {/* Section 1: Les 10 Commandements de Roam */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() =>
              setOpenSection(openSection === 'commandements' ? '' : 'commandements')
            }
            className="w-full p-4 text-left flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                6. Les 10 Commandements de Roam (Philosophie)
              </h2>
            </div>
            {openSection === 'commandements' ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openSection === 'commandements' && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-200">
                {commandments.map((cmd, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5"
                  >
                    <span className="text-amber-400 font-mono font-bold text-sm shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="font-medium leading-relaxed font-sans">{cmd.slice(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Architecture Globale V4.0 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() =>
              setOpenSection(openSection === 'architecture' ? '' : 'architecture')
            }
            className="w-full p-4 text-left flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                3. Architecture Complète V4.0 (Schéma des Piliers)
              </h2>
            </div>
            {openSection === 'architecture' ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openSection === 'architecture' && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 leading-relaxed overflow-x-auto">
                <pre>{`┌─────────────────────────────────────────────────────────────────────────┐
│                         ROAM'S.AI 🔥 V4.0 / V4.1                        │
│                     L'Architecture Ultime                              │
├─────────────────────────────────────────────────────────────────────────┤
│  INTERFACE UTILISATEUR : Chat | Tableau de bord | Mémoire | Console     │
│  CERVEAU TRIPARTITE   : Système 1 (<200ms) | Système 2 | Système 3 (Méta)│
│  ORCHESTRATEUR CONTEXT: Context Engine | Permission Manager | Agents    │
│  MÉMOIRE & APPRENTISSAGE: Court Terme | Long Terme | Sensorielle | Traits │
│  MOTEURS SPÉCIALISÉS  : IA/LLM | Double Numérique | Anticipation Proactive│
│  TOOLS & PLUGINS      : Fichiers | Terminal | Git | Marketplace        │
│  SÉCURITÉ & SANDBOX   : Porte Dérobée Éthique | Sandbox | Audit Immutable │
│  FONCTIONS SIGNATURE  : Mode Bulle | Le Double | Hors du Temps | Rêve   │
└─────────────────────────────────────────────────────────────────────────┘`}</pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-300 mb-1">1. Cerveau Tripartite</div>
                  <p className="text-slate-400 text-[11px]">
                    S1 réflexe pour &lt; 200ms, S2 logique pas-à-pas, S3 auto-surveillance continue.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-cyan-300 mb-1">2. Souveraineté & Éthique</div>
                  <p className="text-slate-400 text-[11px]">
                    L’utilisateur est le maître absolu. Aucun merge ni destruction sans permission.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-300 mb-1">3. Compagnon Numérique</div>
                  <p className="text-slate-400 text-[11px]">
                    Mémoire infinie, double parfait et rêve nocturne pour préparer le lendemain.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Synthèse des 15 Fonctions Signatures */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() =>
              setOpenSection(openSection === 'features' ? '' : 'features')
            }
            className="w-full p-4 text-left flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition"
          >
            <div className="flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                2. Détail Technique des 15 Fonctions Signatures
              </h2>
            </div>
            {openSection === 'features' ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openSection === 'features' && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {featuresList.map((f) => (
                  <div
                    key={f.id}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5"
                  >
                    <div className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <span>{f.name}</span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      <strong className="text-amber-400">Pourquoi : </strong>
                      {f.reason}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800/80">
                      {f.doc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Métriques de Succès & Cibles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() =>
              setOpenSection(openSection === 'metrics' ? '' : 'metrics')
            }
            className="w-full p-4 text-left flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                5. Indicateurs de Succès de l'Architecte
              </h2>
            </div>
            {openSection === 'metrics' ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openSection === 'metrics' && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Métrique</th>
                      <th className="p-2.5">Cible</th>
                      <th className="p-2.5">Justification Architecturale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-100">Taux d'anticipation</td>
                      <td className="p-2.5 text-emerald-400 font-mono font-bold">70%</td>
                      <td className="p-2.5">Roam devine vos besoins avant même la saisie.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-100">Satisfaction Double</td>
                      <td className="p-2.5 text-emerald-400 font-mono font-bold">90%</td>
                      <td className="p-2.5">Réponses indiscernables du style de l'Architecte.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-100">Utilisation Mode Bulle</td>
                      <td className="p-2.5 text-emerald-400 font-mono font-bold">2h / semaine</td>
                      <td className="p-2.5">Confiance absolue dans le silence protecteur de Roam.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-100">Réduction d'erreurs</td>
                      <td className="p-2.5 text-emerald-400 font-mono font-bold">30%</td>
                      <td className="p-2.5">Grâce à l'analyse proactive et au Système 3.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-100">Sauvegardes Hors du Temps</td>
                      <td className="p-2.5 text-emerald-400 font-mono font-bold">5 / mois</td>
                      <td className="p-2.5">Liberté totale d'exploration sans risque.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
