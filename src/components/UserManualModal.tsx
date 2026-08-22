import React, { useState, useMemo } from 'react';
import {
  Info,
  X,
  Search,
  BookOpen,
  ShieldCheck,
  Cpu,
  Terminal,
  Key,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Settings,
  Layers,
  Bot,
  Zap,
} from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ManualSection {
  id: number;
  title: string;
  category: 'overview' | 'features' | 'admin' | 'security' | 'checklists' | 'reference';
  summary: string;
  content: string[];
  tips?: string[];
  warnings?: string[];
  checkpoints?: string[];
}

export const MANUAL_SECTIONS: ManualSection[] = [
  {
    id: 1,
    title: '1. Présentation générale',
    category: 'overview',
    summary: 'Architecture générale, technologies utilisées et philosophie de fonctionnement.',
    content: [
      "ROAM'S.AI est une application web d'assistance IA organisée autour d'un canal Chatbot principal et d'un espace Opérations. L'interface principale sépare explicitement le chat des fonctions avancées afin de garder un usage quotidien simple et fluide.",
      "Le dépôt utilise React 18, Vite, Express, Firebase et le SDK officiel Google GenAI (@google/genai). Le package du projet déclare la version 1.0.0 et fournit les commandes dev, build, start, preview et lint.",
      "Important : ce manuel décrit la version de référence et distingue volontairement les fonctions réellement reliées à un service externe des fonctions d'interface, de démonstration ou encore à renforcer. Une fonction affichée dans l'interface ne doit pas être considérée comme une exécution réelle si le backend ne la vérifie pas.",
    ],
  },
  {
    id: 2,
    title: "2. Vue d'ensemble de l'interface",
    category: 'overview',
    summary: "Séquence d'amorçage, navigation et organisation des modes Chat et Opérations.",
    content: [
      "Au démarrage, ROAM'S.AI suit une séquence Boot → Authentification → Onboarding éventuel → Activation tripartite → Tableau de bord.",
      "Une fois connecté, l'application possède deux modes principaux : Chat et Operations. Le mode Chat est destiné aux conversations, à la vision, au partage d'écran et à la recherche Web. Le mode Operations regroupe les fonctions spécialisées.",
      "Le menu hamburger ouvre le Navigation Drawer. Il sert à changer de fonctionnalité, consulter l'historique, ouvrir la console, accéder aux réglages et gérer la session.",
      "Le raccourci clavier Ctrl+K ou Cmd+K ouvre/ferme la console ROAM.",
    ],
    tips: [
      "Chat : Assistant principal pour questions, analyse, vision, recherche.",
      "Operations : Fonctions avancées (Mémoire, sécurité, agents, console).",
      "Menu Drawer : Navigation, historique, réglages, session.",
      "Console : Diagnostic et commandes techniques.",
    ],
  },
  {
    id: 3,
    title: '3. Première utilisation',
    category: 'overview',
    summary: "Parcours guidé pas à pas pour démarrer sur ROAM'S.AI.",
    content: [
      "1. Ouvrir l'application et attendre la séquence de démarrage (Boot).",
      "2. Créer ou ouvrir une session depuis l'écran d'authentification.",
      "3. Pour un nouvel utilisateur, suivre l'onboarding : identité, préférences et personnalité.",
      "4. L'écran d'activation tripartite prépare l'espace principal.",
      "5. Arriver sur le tableau de bord.",
      "6. Commencer par le Chat pour les demandes générales ; utiliser Operations pour les fonctions spécialisées.",
    ],
  },
  {
    id: 4,
    title: '4. Authentification et session',
    category: 'security',
    summary: 'Gestion des sessions souveraines, verrouillage et sécurité des accès.',
    content: [
      "L'application conserve un état de session côté navigateur afin de pouvoir restaurer l'accès à l'interface en local.",
      "Pour une mise en production sécurisée, la session doit être renforcée par une authentification serveur vérifiable et non par une simple valeur localStorage.",
      "Verrouiller la session revient à quitter l'espace actif sans supprimer nécessairement les données locales. Déconnexion supprime la marque de session locale et ramène à l'écran de connexion.",
    ],
    warnings: [
      "Bonne pratique : ne jamais partager une clé API dans un message, une capture d'écran ou un dépôt Git. Utiliser des variables d'environnement ou un gestionnaire de secrets.",
    ],
  },
  {
    id: 5,
    title: '5. Chatbot principal',
    category: 'features',
    summary: 'Usage optimal du canal de discussion, formulation de prompts et rendu Markdown.',
    content: [
      "Le Chat est le point d'entrée quotidien. Il accepte des demandes en langage naturel et peut être utilisé pour expliquer, rédiger, analyser, programmer ou structurer des informations.",
      "Pour une demande professionnelle, préciser l'objectif, le contexte, les contraintes et le format attendu. Exemple : « Analyse ce tableau, donne-moi les anomalies, puis produis un tableau récapitulatif avec priorité, cause et action recommandée. »",
      "Éviter de demander à l'IA d'inventer des métriques ou de déclarer une action accomplie sans preuve. Pour une action réelle, demander explicitement un résultat vérifiable.",
      "Le rendu Markdown doit être considéré comme une fonction d'affichage : si des caractères comme ** ou des titres Markdown apparaissent littéralement, le renderer de l'interface doit être corrigé ; cela ne signifie pas que l'IA est incapable de produire un document structuré.",
    ],
  },
  {
    id: 6,
    title: "6. Vision et analyse d'images",
    category: 'features',
    summary: "Inspection multimodale d'images, documents, diagrammes et captures d'écran.",
    content: [
      "Lorsque la fonction Vision est disponible, joindre une image puis formuler précisément ce qui doit être analysé : texte, objets, disposition, qualité, anomalies, interface, document, etc.",
      "Pour une capture d'écran d'une application, demander par exemple : « Décris chaque élément visible, repère les boutons inutiles et propose une hiérarchie UX plus claire. »",
      "Pour une retouche ou une génération d'image, préciser le sujet, le style, la composition, la résolution souhaitée et les éléments à conserver. Ne jamais fournir une clé secrète dans le prompt.",
    ],
  },
  {
    id: 7,
    title: "7. Génération d'images",
    category: 'features',
    summary: 'Création visuelle IA haute définition avec sélecteur de résolution 1K, 2K et 4K.',
    content: [
      "Le projet dispose d'un endpoint dédié de génération d'image utilisant Gemini (gemini-3.1-flash-image). L'interface prévoit des choix de format (1:1, 16:9, 9:16, 4:3) et de résolution (1K Standard, 2K Haute Définition, 4K Ultra HD).",
      "Procédure : ouvrir la génération d'image → choisir le ratio et la résolution → décrire l'image → lancer la génération → contrôler le résultat → régénérer si nécessaire.",
      "Attention : le système propage la résolution exacte choisie. Le modèle Flash Image prend en charge 1K, 2K et 4K en natif. Pour un usage professionnel, la résolution réelle est indiquée dans le résultat.",
    ],
  },
  {
    id: 8,
    title: '8. Recherche Web',
    category: 'features',
    summary: 'Grounding avec Google Search, recherche en temps réel et vérification des sources.',
    content: [
      "Le système peut utiliser la recherche Web pour obtenir des informations externes fiables. Pour une question sensible au temps, préciser la période : « aujourd'hui », « cette semaine », « en août 2026 », etc.",
      "Demander les sources lorsque la réponse doit être vérifiable. Ne pas confondre une réponse générée avec une preuve : vérifier les liens et les données importantes.",
      "Pour un rapport, demander un tableau avec source, date, donnée et conclusion afin de faciliter la vérification.",
    ],
  },
  {
    id: 9,
    title: "9. Partage d'écran",
    category: 'features',
    summary: 'Diagnostic visuel en direct via flux WebRTC / getDisplayMedia.',
    content: [
      "Le navigateur peut fournir un flux d'écran via l'API de capture d'écran. L'utilisateur doit sélectionner la fenêtre, l'onglet ou l'écran à partager lorsque le navigateur le demande.",
      "Avant de partager : fermer les documents confidentiels, masquer les mots de passe et vérifier que la bonne fenêtre est sélectionnée.",
      "Le partage d'écran doit être arrêté après l'analyse. Une capture d'écran n'autorise pas automatiquement l'IA à effectuer une action sur la machine.",
    ],
  },
  {
    id: 10,
    title: '10. Espace Operations',
    category: 'features',
    summary: 'Hub opérationnel regroupant les 15 piliers et modules spécialisés de ROAM.',
    content: [
      "Operations regroupe les fonctions avancées du projet : le Hub, la mémoire souveraine, le centre de sécurité, les réglages, la personnalité/Double, le journal et les rêves, l'anticipation/split, les sous-agents et mémoire, les capsules temporelles, le manuel/spécifications, la console, les agents/connecteurs, le contrôle éthique et les récompenses.",
      "Le Hub sert de point d'entrée. Ouvrir une fonction, effectuer l'opération, puis revenir au Hub avec le bouton de retour.",
      "Les fonctions qui affichent un statut, un score ou un compteur doivent être interprétées comme des données fiables uniquement si elles proviennent d'une mesure ou d'un résultat backend vérifiable.",
    ],
  },
  {
    id: 11,
    title: '11. Mémoire souveraine',
    category: 'features',
    summary: 'Conservation contextuelle, droit à l’oubli et gestion par catégories.',
    content: [
      "La mémoire sert à conserver des éléments de contexte utiles au travail : décisions, préférences, informations de projet et autres éléments structurés.",
      "L'interface permet notamment d'ajouter un souvenir, d'oublier une mémoire spécifique et de supprimer une catégorie entière de mémoire.",
      "Bonne pratique : ne conserver que ce qui est nécessaire. Ne pas stocker de mots de passe, tokens, secrets privés ou informations extrêmement sensibles dans une mémoire destinée à l'IA.",
    ],
  },
  {
    id: 12,
    title: '12. Centre de sécurité',
    category: 'security',
    summary: 'Surveillance des contrôles du système, isolation des secrets et audits.',
    content: [
      "Le Centre de sécurité sert à visualiser les contrôles et l'état de sécurité du système.",
      "Un score de sécurité ne doit être considéré comme fiable que s'il est calculé à partir de contrôles réellement exécutés côté serveur.",
      "Avant déploiement public, vérifier au minimum : authentification backend, règles Firebase, protection des secrets, limitation de débit, isolation du terminal, protection SSRF des webhooks, journalisation et permissions.",
    ],
  },
  {
    id: 13,
    title: '13. Personality, Double et actions',
    category: 'features',
    summary: 'Personnalité adaptative, style de communication et délégation au Double numérique.',
    content: [
      "La personnalité permet d'adapter le comportement conversationnel (ton, humour, formalité, longueur). Le Double représente une couche d'assistance orientée vers des actions proposées ou des validations.",
      "Pour une action sensible : examiner l'objectif, la portée, les données concernées et le résultat attendu avant d'approuver.",
      "Une validation du Double doit toujours être confirmée par un résultat d'action backend avant d'être considérée comme finalisée à l'extérieur.",
    ],
  },
  {
    id: 14,
    title: '14. Journal, rêves et anticipation',
    category: 'features',
    summary: 'Journal de bord automatique, consolidation nocturne et prédictions contextuelles.',
    content: [
      "Le Journal sert à organiser des entrées ou événements personnels/projet. Les fonctions de rêve et d'anticipation sont des espaces d'expérimentation autour de la réflexion et de la planification.",
      "Pour une utilisation professionnelle, les sorties doivent être traitées comme des suggestions méthodologiques et non comme des prédictions absolues.",
      "Pour une anticipation efficace, demander : hypothèses, signaux observés, niveau d'incertitude et actions réversibles.",
    ],
  },
  {
    id: 15,
    title: '15. Sous-agents, Split & Merge',
    category: 'features',
    summary: 'Orchestration multi-rôles, division des tâches et consolidation de livrables.',
    content: [
      "Les sous-agents permettent de représenter ou d'orchestrer des rôles spécialisés (Codeur, Analyste de données, Auditeur, Rédacteur).",
      "Pour une orchestration réelle, un sous-agent doit passer par un cycle : planned → running → completed/failed, avec une preuve concrète du travail effectué.",
      "Le module Split & Merge permet de distribuer une requête complexe sur plusieurs axes d'analyse avant d'en effectuer la synthèse.",
    ],
  },
  {
    id: 16,
    title: '16. Agents et connecteurs',
    category: 'admin',
    summary: 'Intégrations Meta, WhatsApp Cloud API, Webhooks HTTP et passerelles tierces.',
    content: [
      "L'espace Agents & Connecteurs centralise les intégrations avec des services externes et des agents.",
      "Avant d'activer un connecteur : vérifier le service, les permissions demandées, les variables d'environnement, le compte utilisé et la portée de l'action.",
      "WhatsApp/Meta : ne considérer une messagerie active que lorsque le token, l'identifiant de téléphone/page et les webhooks entrants sont correctement configurés.",
    ],
  },
  {
    id: 17,
    title: '17. Console ROAM',
    category: 'admin',
    summary: 'Terminal de commande, diagnostic système et raccourci Ctrl+K / Cmd+K.',
    content: [
      "La console est accessible depuis le menu ou avec le raccourci Ctrl+K / Cmd+K.",
      "Elle doit être utilisée comme un outil d'administration et de diagnostic. Ne jamais y coller une clé API, un mot de passe ou un token.",
      "Le terminal serveur doit être considéré comme une zone sensible : une véritable isolation par conteneur/sandbox est recommandée pour l'exécution de commandes non supervisées.",
    ],
  },
  {
    id: 18,
    title: '18. Réglages',
    category: 'admin',
    summary: 'Préférences utilisateur, langue, synthèse vocale et calibration.',
    content: [
      "Les réglages regroupent les préférences d'utilisation et certains paramètres de session.",
      "Modifier les options progressivement puis tester le Chat, la voix, les connecteurs et les fonctions concernées.",
      "Pour un déploiement partagé, séparer les préférences personnelles des paramètres système afin qu'un utilisateur ne puisse pas modifier les secrets ou politiques globaux.",
    ],
  },
  {
    id: 19,
    title: '19. Configuration développeur',
    category: 'admin',
    summary: 'Installation locale, scripts npm, dépendances et compilation.',
    content: [
      "Prérequis : Node.js récent (v18+ ou v20+), npm et un navigateur moderne.",
      "Installation : cloner le dépôt, entrer dans le dossier puis exécuter npm install.",
      "Développement : npm run dev (lance le serveur Express et Vite sur le port 3000).",
      "Vérification TypeScript : npm run lint (exécute tsc --noEmit).",
      "Build production : npm run build (compile le bundle client et dist/server.cjs).",
      "Démarrage du build : npm start.",
    ],
  },
  {
    id: 20,
    title: '20. Variables d’environnement',
    category: 'admin',
    summary: 'Guide des clés API requises et des secrets serveur.',
    content: [
      "Le fichier .env.example documente GEMINI_API_KEY, OPENAI_API_KEY, APP_URL et les identifiants de connecteurs. Les valeurs réelles ne doivent jamais être commitées.",
      "GEMINI_API_KEY : clé principale pour les modèles Gemini 3.7 Flash, 3.1 Flash Lite et 3.1 Flash Image.",
      "OPENAI_API_KEY : optionnelle, utilisée pour l'intégration optionnelle GPT-4o.",
      "WHATSAPP_TOKEN & WHATSAPP_PHONE_NUMBER_ID : pour l'envoi de messages via WhatsApp Cloud API.",
      "META_PAGE_ACCESS_TOKEN & META_PAGE_ID : pour la publication sur Meta Graph API.",
    ],
  },
  {
    id: 21,
    title: '21. Sécurité et règles d’exploitation',
    category: 'security',
    summary: 'Règles impératives de protection des données, isolation et conformité.',
    content: [
      "1. Ne jamais publier .env, une clé API ou un token OAuth dans GitHub.",
      "2. Activer des règles d'authentification côté serveur et ne pas faire confiance à un champ envoyé par le navigateur pour déclarer qu'une action est autorisée.",
      "3. Limiter les endpoints sensibles par utilisateur et rôle.",
      "4. Ajouter rate limiting, journaux d'audit, validation stricte des entrées et timeouts réseau.",
      "5. Pour les webhooks, bloquer les adresses privées/locales (127.0.0.1, 10.x, 192.168.x) afin d'éviter les attaques SSRF.",
      "6. Pour le terminal, restreindre les privilèges d'exécution au strict nécessaire.",
    ],
  },
  {
    id: 22,
    title: '22. Bonnes pratiques pour obtenir de meilleures réponses',
    category: 'reference',
    summary: 'Structure de prompt : OBJECTIF → CONTEXTE → CONTRAINTES → FORMAT.',
    content: [
      "Utiliser le modèle de prompt : OBJECTIF → CONTEXTE → CONTRAINTES → DONNÉES → FORMAT → CRITÈRES DE VÉRIFICATION.",
      "Exemple : « Objectif : auditer cette interface. Contexte : application React. Contraintes : ne pas modifier les fonctionnalités existantes. Données : capture jointe. Format : tableau Problème / Cause / Correction / Priorité. »",
      "Pour les tableaux : demander explicitement les colonnes, le tri et le niveau de détail.",
      "Pour une image : spécifier sujet, cadrage, lumière, style, résolution (1K/2K/4K) et éléments à préserver.",
      "Pour du code : demander les fichiers exacts à modifier, le patch proposé, les tests à exécuter et les risques.",
    ],
  },
  {
    id: 23,
    title: '23. Dépannage',
    category: 'reference',
    summary: 'Résolution des erreurs fréquentes, coupures IA, connecteurs et affichage.',
    content: [
      "Écran blanc : lancer npm run lint, consulter la console navigateur (F12) et vérifier les variables d'environnement.",
      "IA sans réponse : vérifier GEMINI_API_KEY dans les paramètres, vérifier la connexion réseau et les quotas API.",
      "OpenAI indisponible : vérifier la présence de OPENAI_API_KEY côté serveur.",
      "Recherche Web indisponible : vérifier la configuration du modèle Gemini avec l'outil googleSearch.",
      "Image impossible : vérifier la clé Gemini et la disponibilité du modèle gemini-3.1-flash-image.",
      "WhatsApp ne répond pas : vérifier le token Cloud API, l'identifiant de numéro et la validation du webhook Meta.",
    ],
  },
  {
    id: 24,
    title: '24. Procédure de déploiement recommandée',
    category: 'admin',
    summary: '10 étapes ordonnées pour un déploiement serein et sécurisé.',
    content: [
      "Étape 1 : Vérifier l'authentification backend et les règles de sécurité Firestore.",
      "Étape 2 : Protéger les secrets d'environnement et harmoniser .env.example avec server.ts.",
      "Étape 3 : Restreindre ou isoler l'accès au terminal serveur.",
      "Étape 4 : Sécuriser les webhooks contre le SSRF en filtrant les adresses locales.",
      "Étape 5 : Activer la journalisation d'audit et surveiller l'uptime.",
      "Étape 6 : Valider le rendu Markdown et l'affichage des tableaux dans le Chat.",
      "Étape 7 : Rendre les métriques système fidèles et basées sur l'activité réelle.",
      "Étape 8 : Tester la génération d'images en 1K, 2K et 4K de bout en bout.",
      "Étape 9 : Tester chaque connecteur externe avec des comptes de test dédiés.",
      "Étape 10 : Exécuter npm run lint && npm run build avant publication.",
    ],
  },
  {
    id: 25,
    title: '25. Checklist utilisateur',
    category: 'checklists',
    summary: 'Points de contrôle essentiels avant chaque session de travail.',
    content: [
      "Vérifications recommandées pour chaque utilisateur :",
    ],
    checkpoints: [
      'Ma session est correctement authentifiée.',
      'Je n’ai pas partagé de secret ou de mot de passe dans le Chat.',
      'J’ai choisi le bon mode (Chatbot pour dialoguer, Opérations pour les outils avancés).',
      'Pour une réponse factuelle critique, j’ai demandé et vérifié les sources web.',
      'Pour une génération d’image, j’ai validé le ratio et la résolution souhaitée.',
      'Pour une action externe ou un message WhatsApp, j’ai vérifié le destinataire.',
      'Je verrouille ou déconnecte ma session lorsque j’utilise un appareil partagé.',
    ],
  },
  {
    id: 26,
    title: '26. Checklist administrateur',
    category: 'checklists',
    summary: 'Points de contrôle pour l’administrateur et l’hébergeur.',
    content: [
      "Vérifications techniques pour la mise en production :",
    ],
    checkpoints: [
      'Variables d’environnement présentes côté serveur et jamais commitées.',
      'Règles Firestore vérifiées et déployées.',
      'Protection contre les requêtes massives (Rate Limiting).',
      'Logs d’audit actifs et consultables dans la console.',
      'Webhooks sortants filtrés contre les adresses IP privées (SSRF).',
      'Secrets d’API jamais exposés directement au navigateur.',
      'Métriques calculées sur les données réelles du serveur.',
      'Connecteurs testés avec des comptes bac à sable.',
      'Build et lint TypeScript passent avec succès.',
    ],
  },
  {
    id: 27,
    title: '27. Limites connues de la version auditée',
    category: 'reference',
    summary: 'Transparence sur l’état des fonctionnalités et axes d’amélioration.',
    content: [
      "Le projet est un environnement d'assistance IA modulaire. Certaines fonctionnalités avancées combinent des flux réels et des couches d'interface dédiées.",
      "Les points clés à consolider pour une sécurité maximale : authentification backend renforcée, isolation sandbox du terminal, validation serveur stricte des permissions, et chiffrement complet des clés stockées.",
      "Le manuel est volontairement transparent : une fonction doit être identifiée selon son état réel (disponible, configurée, ou en attente de paramétrage externe).",
    ],
  },
  {
    id: 28,
    title: '28. Glossaire',
    category: 'reference',
    summary: 'Définitions des termes clés utilisés dans ROAM’S.AI.',
    content: [
      "• Agent : composant IA chargé d’un rôle ou d’une tâche spécialisée.",
      "• API Key : jeton secret permettant d’accéder à un service d’IA ou d’intégration externe.",
      "• Backend : partie serveur (Express / Node.js) exécutant les requêtes protégées.",
      "• Connector : module d’intégration vers un service tiers (WhatsApp, Meta, etc.).",
      "• Grounding : mécanisme permettant d’appuyer une réponse sur des résultats de recherche Google en temps réel.",
      "• Onboarding : parcours de configuration initiale lors de la première ouverture.",
      "• SSRF (Server-Side Request Forgery) : vulnérabilité réseau où un serveur est manipulé pour contacter des ressources internes.",
      "• Sandbox : environnement d’exécution cloisonné avec limites de mémoire et de privilèges.",
      "• Cerveau Tripartite : architecture cognitive organisée en Système 1 (Instinct/Vitesse), Système 2 (Raisonnement structuré) et Système 3 (Méta-critique/Supervision).",
      "• Webhook : URL de rappel HTTP utilisée pour transmettre des notifications ou messages en temps réel.",
    ],
  },
];

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSectionId, setActiveSectionId] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'Tous (28 Chapitres)' },
    { id: 'overview', label: '1-3. Démarrage' },
    { id: 'features', label: '4-15. Fonctions IA' },
    { id: 'security', label: 'Sécurité & Session' },
    { id: 'admin', label: 'Admin & Connecteurs' },
    { id: 'checklists', label: 'Checklists (25-26)' },
    { id: 'reference', label: 'Dépannage & Glossaire' },
  ];

  const filteredSections = useMemo(() => {
    return MANUAL_SECTIONS.filter((sec) => {
      const matchesCategory = selectedCategory === 'all' || sec.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.content.some((line) => line.toLowerCase().includes(q)) ||
        (sec.tips && sec.tips.some((t) => t.toLowerCase().includes(q))) ||
        (sec.checkpoints && sec.checkpoints.some((c) => c.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery, selectedCategory]);

  const currentSection = useMemo(() => {
    return MANUAL_SECTIONS.find((s) => s.id === activeSectionId) || MANUAL_SECTIONS[0];
  }, [activeSectionId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        {/* Header bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono font-bold text-base sm:text-lg text-slate-100">
                  MANUEL D'UTILISATION COMPLET
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  V1.0.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Guide utilisateur, administration, configuration, sécurité et dépannage (28 chapitres)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ORMASISBANDUENGA/Roams"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 text-xs font-mono transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 border border-slate-700 transition-colors"
              title="Fermer le manuel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 sm:px-6 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans le manuel (chapitre, sécurité, 4K, WhatsApp...)"
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Body: Sidebar with 28 sections + Content View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Table of contents sidebar */}
          <div className="w-64 sm:w-72 md:w-80 border-r border-slate-800 bg-slate-950/40 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-2.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800/60 sticky top-0 bg-slate-950/90 backdrop-blur z-10 flex justify-between items-center">
              <span>Sommaire ({filteredSections.length})</span>
              <span className="text-[10px] text-amber-400">28 Chapitres</span>
            </div>
            <div className="p-1.5 space-y-1">
              {filteredSections.map((sec) => {
                const isActive = sec.id === currentSection.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2 ${
                      isActive
                        ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold shrink-0 mt-0.5 px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sec.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{sec.title.replace(/^\d+\.\s*/, '')}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{sec.summary}</div>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 self-center" />}
                  </button>
                );
              })}
              {filteredSections.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 font-mono">
                  Aucun chapitre correspondant à votre recherche.
                </div>
              )}
            </div>
          </div>

          {/* Reading Pane */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-900/50">
            <div className="max-w-3xl space-y-6">
              {/* Title & Badge */}
              <div className="pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                    Chapitre {currentSection.id} / 28
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {currentSection.category}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 tracking-tight">
                  {currentSection.title}
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-sans">{currentSection.summary}</p>
              </div>

              {/* Text Paragraphs */}
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                {currentSection.content.map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-800/80">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tips Callout */}
              {currentSection.tips && currentSection.tips.length > 0 && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-cyan-200 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                    <Sparkles className="w-4 h-4" />
                    <span>Points Clés & Raccourcis</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-cyan-100 font-sans pl-1">
                    {currentSection.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings Callout */}
              {currentSection.warnings && currentSection.warnings.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Avertissement & Bonnes Pratiques</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-100 font-sans pl-1">
                    {currentSection.warnings.map((warn, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono">⚠️</span>
                        <span>{warn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Checklists */}
              {currentSection.checkpoints && currentSection.checkpoints.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Critères de Validation</span>
                  </div>
                  <div className="space-y-2">
                    {currentSection.checkpoints.map((cp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-sans"
                      >
                        <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  disabled={currentSection.id <= 1}
                  onClick={() => setActiveSectionId(Math.max(1, currentSection.id - 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs font-mono text-slate-300 transition-colors"
                >
                  ← Chapitre précédent
                </button>

                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Page {Math.ceil(currentSection.id / 3)} sur 10
                </span>

                <button
                  disabled={currentSection.id >= MANUAL_SECTIONS.length}
                  onClick={() => setActiveSectionId(Math.min(MANUAL_SECTIONS.length, currentSection.id + 1))}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 disabled:hover:bg-amber-500 text-xs font-mono font-bold transition-colors"
                >
                  Chapitre suivant →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
