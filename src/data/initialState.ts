import {
  SystemMetrics,
  PersonalityTraits,
  ChatMessage,
  JournalEntry,
  DreamState,
  SubAgent,
  TimeCapsuleState,
  SensoryMemoryItem,
  BubbleModeConfig,
  EthicalBackdoorState,
  AnticipationCard,
  UserIdentity,
  AutonomyDefinition,
  SovereignMemoryItem,
  SecurityCenterData,
  DoubleState,
  RewardState,
} from '../types/roam';

export const initialUserIdentity: UserIdentity = {
  name: 'Oromasis',
  pseudonym: 'Masis',
  email: 'masisbanduenga@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  autonomyLevel: 3,
  nodeType: 'local',
  personalityPreset: 'direct',
  lastSessionTime: 'Hier, 19:42',
  onboardingCompleted: true,
};

export const autonomyDefinitions: AutonomyDefinition[] = [
  {
    level: 1,
    title: 'NIVEAU 1 — Observation',
    shortDesc: 'ROAM observe',
    description: 'Collecte de contexte, métriques système et journal de bord sans aucune suggestion intrusive.',
    permissions: ['Lecture télémétrie locale', 'Journalisation silencieuse', 'Zéro intervention'],
  },
  {
    level: 2,
    title: 'NIVEAU 2 — Suggestion',
    shortDesc: 'ROAM suggère',
    description: 'Conseils contextuels, alertes de sécurité et opportunités délivrées au moment opportun.',
    permissions: ['Suggestions non bloquantes', 'Alertes de risque', 'Recommandations intelligentes'],
  },
  {
    level: 3,
    title: 'NIVEAU 3 — Préparation',
    shortDesc: 'ROAM prépare',
    description: 'Anticipation des actions, pré-rédaction d’emails, synthèses de code et brouillons prêts.',
    permissions: ['Brouillons Le Double', 'Pré-calculs en tâche de fond', 'Documents prêts à signer'],
  },
  {
    level: 4,
    title: 'NIVEAU 4 — Exécution Assistée',
    shortDesc: 'ROAM exécute avec autorisation',
    description: 'Déclenchement des agents spécialisés et refactorisation après validation explicite en 1 clic.',
    permissions: ['Exécution sur clic unique', 'Multi-agents synchronisés', 'Modifications supervisées'],
  },
  {
    level: 5,
    title: 'NIVEAU 5 — Autonomie Souveraine',
    shortDesc: 'ROAM fonctionne de manière autonome',
    description: 'Autonomie complète en arrière-plan selon les règles strictes de la sandbox éthique.',
    permissions: ['Auto-remédiation continue', 'Optimisation nocturne', 'Délégation totale sécurisée'],
  },
];

export const initialSovereignMemories: SovereignMemoryItem[] = [
  {
    id: 'mem-1',
    category: 'Identité',
    title: 'Identité & Rôle de l’Architecte',
    content: 'Oromasis (Masis), créateur et architecte système de ROAM’S.AI. Préfère un style direct, sans détour et hautement technique.',
    confidence: 1.0,
    lastUpdated: 'Aujourd’hui',
    source: 'Configuration Système',
  },
  {
    id: 'mem-2',
    category: 'Préférences',
    title: 'Stack & Typage Strict',
    content: 'Priorise TypeScript strict, l’architecture modulaire sans code monolithe, Rust pour la haute performance et Tailwind CSS épuré.',
    confidence: 0.96,
    lastUpdated: '19 Août 2026',
    source: 'Analyse de Code',
  },
  {
    id: 'mem-3',
    category: 'Projets',
    title: 'Projet Phare : SQL Quest & ROAM V1.0',
    content: 'SQL Quest est un simulateur de bases de données gamifié. ROAM V1.0 constitue le cockpit souverain centralisant la gestion.',
    confidence: 0.98,
    lastUpdated: 'Ce matin',
    source: 'Journal & Fichiers',
  },
  {
    id: 'mem-4',
    category: 'Habitudes',
    title: 'Rythme Circadien de Création',
    content: 'Concentration maximale entre 08h30 et 12h00. Les tâches administratives et emails sont optimaux entre 16h00 et 17h00.',
    confidence: 0.92,
    lastUpdated: 'Rêve de Roam #14',
    source: 'Analyse Subconsciente',
  },
  {
    id: 'mem-5',
    category: 'Conversations',
    title: 'Arbitrage Souveraineté Local vs Cloud',
    content: 'La priorité absolue est le traitement local en premier ressort (Local Node), le Cloud intervenant uniquement comme miroir chiffré.',
    confidence: 0.99,
    lastUpdated: '18 Août 2026',
    source: 'Discussion Architecture',
  },
  {
    id: 'mem-6',
    category: 'Connaissances',
    title: 'Patterns Cerveau Tripartite V1.0',
    content: 'Système 1 (Instinct <200ms), Système 2 (Raisonnement approfondi), Système 3 (Méta-critique & auto-ajustement).',
    confidence: 1.0,
    lastUpdated: 'Hier',
    source: 'Core Architecture',
  },
  {
    id: 'mem-7',
    category: 'Tâches',
    title: 'Points ouverts prioritaires',
    content: 'Finaliser la release V1.0, valider le bouton de téléchargement de l’application et vérifier la sandbox éthique.',
    confidence: 0.95,
    lastUpdated: 'En cours',
    source: 'Planning Agent',
  },
];

export const initialDoubleState: DoubleState = {
  active: true,
  lastSyncAgo: '2 min',
  monitoredTasksCount: 14,
  preparedActionsCount: 3,
  actions: [
    {
      id: 'act-1',
      title: 'Réponse email : Validation du livrable V1.0',
      category: 'email',
      description: 'Brouillon prêt respectant ton style direct et concis.',
      confidence: 0.94,
      preparedTime: 'Il y a 10 min',
      payloadPreview: 'Bonjour Marc, Le centre de contrôle ROAM V1.0 avec nœud local actif est validé. Déploiement prévu à 14h. Bien à toi, Oromasis.',
      status: 'pending',
    },
    {
      id: 'act-2',
      title: 'Patch SQL : Index composite sur logs_activity',
      category: 'code',
      description: 'Accélération estimée de +64% sur les requêtes d’audit.',
      confidence: 0.91,
      preparedTime: 'Il y a 25 min',
      payloadPreview: 'CREATE INDEX CONCURRENTLY idx_logs_timestamp ON logs_activity(created_at DESC, user_id);',
      status: 'pending',
    },
    {
      id: 'act-3',
      title: 'Planning : Ordre du jour de la revue de 16h00',
      category: 'organizer',
      description: '3 points clés pré-remplis selon les discussions du matin.',
      confidence: 0.88,
      preparedTime: 'Il y a 45 min',
      payloadPreview: '1. Nœud local et résilience hors-ligne\n2. Cerveau Tripartite\n3. Portabilité Desktop / Mobile',
      status: 'pending',
    },
  ],
  backgroundLogs: [
    '10:14  Analyse des 14 tâches en cours... Aucune dérive.',
    '10:02  Synchronisation mémoire souveraine : 7 entrées indexées.',
    '09:48  Pré-génération du patch SQL pour validation.',
    '09:30  Surveillance réseau : 0 fuite, nœud local hermétique.',
  ],
};

export const initialSecurityCenter: SecurityCenterData = {
  localProcessing: true,
  encryptionActive: true,
  cloudConnection: true,
  memoryProtection: true,
  activeSessions: 1,
  integrityScore: 100,
  auditLogs: [
    { id: 'sec-1', time: '17:21', event: 'Local authentication (Hardware Key)', category: 'auth', status: 'ok', detail: 'Authentification souveraine validée sur matériel local.' },
    { id: 'sec-2', time: '17:22', event: 'Memory accessed (Identity & Projects)', category: 'memory', status: 'ok', detail: 'Lecture autorisée par la sandbox interne.' },
    { id: 'sec-3', time: '17:24', event: 'Agent started (GitHub Manager)', category: 'agent', status: 'ok', detail: 'Processus isolé sans accès root.' },
    { id: 'sec-4', time: '17:25', event: 'Cloud synchronized (E2E Encrypted)', category: 'sync', status: 'ok', detail: 'Miroir chiffré AES-GCM 256 mis à jour.' },
    { id: 'sec-5', time: '17:28', event: 'Memory protection audit', category: 'security', status: 'ok', detail: 'Zéro tentative de lecture non autorisée.' },
  ],
};

export const initialSystemMetrics: SystemMetrics = {
  cpuUsage: 12,
  memoryUsage: '1.1 / 4.0 GB',
  system1LatencyMs: 95,
  system2LatencyMs: 620,
  system3Active: true,
  anticipationRate: 88,
  activeAgentsCount: 7,
  uptime: '99.99%',
};

export const initialPersonality: PersonalityTraits = {
  ton: 'direct',
  humour: 0.4,
  formalite: 0.6,
  proactivite: 0.8,
  longueur: 0.4,
  lastEvolutionNote: 'Calibré pour l’efficacité de l’Architecte Oromasis.',
};

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'roam',
    text: `⚡ **ROAM’S.AI V1.0 — CENTRE DE CONTRÔLE PRÊT**

Bonjour Oromasis. Votre environnement est sous votre contrôle total.

• **Nœud Local** : 🟢 Actif & Souverain
• **Cerveau Tripartite** : 🧠 S1 (95ms), S2 (Logique), S3 (Méta-Surveillance)
• **Le Double** : 🤖 Actif (3 actions préparées, 14 tâches surveillées)
• **Niveau d'Autonomie** : 🛡️ Niveau 3 (Préparation active)

Que souhaitez-vous inspecter ou exécuter ?`,
    timestamp: '09:23',
    modeUsed: 'Système Tripartite (V1.0)',
    suggestedActions: [
      'Analyse ce projet et trouve les blocages',
      'Prépare mon travail pour demain',
      'Afficher les actions préparées par Le Double',
      'Consulter la mémoire souveraine',
    ],
    tripartiteData: {
      system1: {
        latencyMs: 95,
        confidence: 0.99,
        instinctSummary: 'Session prête. Aucune alerte.',
        quickAnswer: 'Cockpit opérationnel.',
      },
      system2: {
        reasoningSteps: [
          'Vérification de l’intégrité du Nœud Local',
          'Synchronisation de la Mémoire Souveraine (7 entrées)',
          'Activation du Double avec respect de l’Autonomie Niveau 3',
        ],
        detailedResponse: 'Tous les systèmes sont synchronisés. Les agents spécialisés sont en attente d’instructions.',
        suggestedActions: ['Voir Le Double', 'Ouvrir les Outils', 'Inspecter la Sécurité'],
      },
      system3: {
        qualityScore: 100,
        metaCritique: 'Alignement absolu avec les principes de souveraineté numérique.',
        learningNote: 'Profil Oromasis actif : concision et actions concrètes.',
      },
      finalResponse: 'ROAM V1.0 prêt.',
      moodDetected: 'focus',
      recommendedRewardXp: 50,
    },
  },
];

export const initialJournal: JournalEntry[] = [
  {
    id: 'j-1',
    timestamp: '2026-08-20T08:15:00',
    timeLabel: '08:15',
    type: 'pause',
    title: 'Initialisation de la station de travail',
    description: 'Démarrage du nœud local ROAM et synchronisation silencieuse.',
    durationMinutes: 10,
    mood: 'energique',
    productivityScore: 85,
  },
  {
    id: 'j-2',
    timestamp: '2026-08-20T08:30:00',
    timeLabel: '08:30',
    type: 'code',
    title: 'Revue d’architecture SQL Quest',
    description: 'Optimisation des index et validation de la structure de données.',
    durationMinutes: 45,
    mood: 'focus',
    productivityScore: 95,
  },
  {
    id: 'j-3',
    timestamp: '2026-08-20T09:30:00',
    timeLabel: '09:30',
    type: 'email',
    title: 'Préparation des réponses via Le Double',
    description: 'Validation de 3 actions préparées en arrière-plan sans interruption.',
    durationMinutes: 20,
    mood: 'focus',
    productivityScore: 92,
  },
  {
    id: 'j-4',
    timestamp: '2026-08-20T10:15:00',
    timeLabel: '10:15',
    type: 'architecture',
    title: 'Cockpit ROAM V1.0 Souverain',
    description: 'Mise en place de l’activation des 3 cerveaux et du centre de sécurité.',
    durationMinutes: 60,
    mood: 'focus',
    productivityScore: 98,
  },
];

export const initialDream: DreamState = {
  lastNightAnalysis: {
    effectiveWorkHours: 7.2,
    bugsEncountered: 3,
    bugsResolved: 3,
    emailsProcessed: 18,
    productivityTrend: '+15% cette semaine',
  },
  subconsciousInsights: [
    'Tu atteins un état de flux optimal lorsque Le Double gère les micro-décisions.',
    'Les requêtes SQL Quest sont 64% plus rapides depuis la mise en place de l’index.',
    'La séparation claire Nœud Local vs Cloud renforce la confiance opérationnelle.',
  ],
  optimizations: [
    'Conserver le créneau 09h-12h pour le travail architectural profond.',
    'Déléguer les résumés et pré-rédactions au niveau 3 d’autonomie.',
    'Effectuer un audit hebdomadaire de la mémoire souveraine.',
  ],
  tomorrowSchedule: [
    { time: '09:00 - 11:00', title: 'Travail profond : Déploiement ROAM V1.0', priority: 'Haute' },
    { time: '11:00 - 11:45', title: 'Revue projet SQL Quest avec l’équipe', priority: 'Moyenne' },
    { time: '14:00 - 15:30', title: 'Tests de charge & résilience hors-ligne', priority: 'Haute' },
    { time: '16:00 - 17:00', title: 'Validation des actions du Double', priority: 'Normale' },
  ],
  poeticGreeting: '🌙 Nuit productive pour votre double numérique. Votre café virtuel est servi ☕. Bonne session Oromasis !',
  virtualCoffeeServed: true,
};

export const initialDreamState = initialDream;

export const initialSubAgents: SubAgent[] = [
  {
    id: 'agent-research',
    name: 'Research Agent',
    domain: 'Recherche & Documentation',
    icon: 'Search',
    description: 'Extraction d’informations web, synthèse d’articles et veille technologique.',
    capabilities: ['Recherche documentaire', 'Synthèse rapide', 'Veille sécurité'],
    status: 'active',
    actionsCount: 64,
    lastReport: 'Indexation complète de la documentation Rust & TypeScript 5.8.',
    isSupervised: true,
  },
  {
    id: 'agent-coding',
    name: 'Coding Agent',
    domain: 'Architecture & Code',
    icon: 'Code2',
    description: 'Refactoring ciblé, analyse statique, détection de deadlocks et écriture de tests.',
    capabilities: ['Analyse de code', 'Génération TypeScript', 'Debug en sandbox'],
    status: 'active',
    actionsCount: 112,
    lastReport: 'Zero régression détectée sur les composants du cockpit.',
    isSupervised: true,
  },
  {
    id: 'agent-file',
    name: 'File Agent',
    domain: 'Système de Fichiers',
    icon: 'FolderKanban',
    description: 'Organisation locale, détection de doublons, parsing PDF et markdown.',
    capabilities: ['Parsing fichiers', 'Nettoyage répertoires', 'Indexation locale'],
    status: 'idle',
    actionsCount: 38,
    lastReport: 'Structure du projet vérifiée et optimisée.',
    isSupervised: true,
  },
  {
    id: 'agent-memory',
    name: 'Memory Agent',
    domain: 'Mémoire Souveraine',
    icon: 'Brain',
    description: 'Indexation sémantique des préférences, projets et habitudes de l’Architecte.',
    capabilities: ['Extraction de faits', 'Purge sur demande', 'Chiffrement local'],
    status: 'active',
    actionsCount: 95,
    lastReport: '7 mémoires souveraines actives et protégées.',
    isSupervised: true,
  },
  {
    id: 'agent-planning',
    name: 'Planning Agent',
    domain: 'Agenda & Priorités',
    icon: 'Calendar',
    description: 'Gestion des jalons, détection de conflits horaires et réorganisation préventive.',
    capabilities: ['Ordonnancement', 'Détection surcharge', 'Revue quotidienne'],
    status: 'active',
    actionsCount: 47,
    lastReport: 'Planning de la journée équilibré : 4h de flow préservées.',
    isSupervised: true,
  },
  {
    id: 'agent-automation',
    name: 'Automation Agent',
    domain: 'Workflows & Scripts',
    icon: 'Zap',
    description: 'Déclenchement automatique de pipelines, sauvegardes et synchronisations.',
    capabilities: ['Scripts cron', 'Webhooks locaux', 'Déclencheurs conditionnels'],
    status: 'idle',
    actionsCount: 53,
    lastReport: 'Sauvegarde des capsules temporelles programmée à 20h00.',
    isSupervised: true,
  },
  {
    id: 'agent-security',
    name: 'Security Agent',
    domain: 'Audit & Sandbox',
    icon: 'ShieldCheck',
    description: 'Contrôle permanent des flux, surveillance des clés API et isolation stricte.',
    capabilities: ['Contrôle d’accès', 'Surveillance sandbox', 'Audit cryptographique'],
    status: 'active',
    actionsCount: 140,
    lastReport: 'Score d’intégrité maximal : 100/100.',
    isSupervised: true,
  },
];

export const initialTimeCapsules: TimeCapsuleState[] = [
  {
    id: 'snap-1',
    name: 'v1.0-pre-release-golden',
    timestamp: '2026-08-20T08:00:00',
    description: 'Point de restauration de référence pour le lancement V1.0.',
    filesState: [
      { name: 'server.ts', size: '6.4 KB', status: 'clean' },
      { name: 'App.tsx', size: '14.2 KB', status: 'clean' },
      { name: 'roam.ts', size: '5.8 KB', status: 'clean' },
    ],
    activeTasks: ['Validation Cockpit Souverain', 'Test Téléchargement App'],
    memorySize: '1.1 GB',
    personalitySnapshot: initialPersonality,
  },
];

export const initialSensoryMemories: SensoryMemoryItem[] = [
  {
    id: 'sm-1',
    title: 'Résolution Bug API Prod (15/08)',
    timestamp: '15 Août 2026, 14:32',
    type: 'visuel',
    description: 'Trace d’erreur du blocage SQLite lors de la montée en charge.',
    tags: ['bug', 'sqlite', 'résolu'],
    mood: 'concentré',
    contextPreview: 'Roam a identifié un verrou concurrent et a appliqué un WAL mode.',
  },
  {
    id: 'sm-2',
    title: 'Session Cockpit Souverain V1.0',
    timestamp: '20 Août 2026, 09:15',
    type: 'contextuel',
    description: 'Validation de l’expérience complète : Boot -> Auth -> Onboarding -> Tripartite -> Cockpit.',
    tags: ['cockpit', 'v1.0', 'souverainete'],
    mood: 'enthousiaste',
    contextPreview: 'Concept central : Votre intelligence, Votre environnement, Votre contrôle.',
  },
];

export const initialBubbleConfig: BubbleModeConfig = {
  active: false,
  dangerThreshold: 0.9,
  opportunityThreshold: 0.8,
  exceptions: ['Appels explicites "Roam"', 'Dossier /production', 'Perte de données imminente'],
  interventionsLog: [
    {
      id: 'int-1',
      time: '19 Août, 14:10',
      type: 'danger',
      message: 'Tentative de suppression de "database_prod.sqlite" interceptée avec succès.',
      blocked: true,
    },
    {
      id: 'int-2',
      time: '18 Août, 11:30',
      type: 'opportunity',
      message: 'Optimisation de bundling détectée (+52% de vitesse de chargement).',
      blocked: false,
    },
  ],
};

export const initialEthicalState: EthicalBackdoorState = {
  active: true,
  passcodeProtected: true,
  ultraSecureMode: false,
  blockedCount: 2,
  auditLogs: [
    {
      id: 'audit-1',
      time: '20 Août, 09:15',
      action: 'Vérification de l’intégrité des clés API dans .env',
      riskScore: 0.1,
      decision: 'approved',
      reason: 'Lecture sécurisée sans fuite réseau.',
    },
    {
      id: 'audit-2',
      time: '19 Août, 23:45',
      action: 'Tentative d’écriture dans /etc/systemd par un script externe',
      riskScore: 0.95,
      decision: 'blocked',
      reason: 'Violation de la sandbox éthique de Roam.',
    },
  ],
};

export const initialAnticipations: AnticipationCard[] = [
  {
    id: 'ant-1',
    predictedAction: 'Préparer la note de synthèse pour la réunion SQL Quest de 11h',
    confidence: 0.94,
    reason: 'Réunion inscrite au calendrier à 11h + dernier sujet traité dans les emails.',
    suggestedShortcut: 'Générer note de cadrage',
    preparedDocument: {
      name: 'Synthese_SQL_Quest_V1.md',
      type: 'markdown',
      content: '# Note de Cadrage - SQL Quest V1.0\n- Déploiement du Nœud Local\n- Indexation des requêtes\n- Calendrier de livraison validé',
    },
  },
  {
    id: 'ant-2',
    predictedAction: 'Créer un point de restauration Hors du Temps avant les tests de charge',
    confidence: 0.88,
    reason: 'Modification récente des modules centraux.',
    suggestedShortcut: 'Sauvegarder état "post-cockpit-v1"',
  },
];

export const initialRewards: RewardState = {
  points: 1450,
  level: 'Architecte Souverain',
  badges: [
    { id: 'b1', name: 'Nœud Local Actif', icon: 'HardDrive', unlockedAt: '20 Août 2026' },
    { id: 'b2', name: 'Cerveau Tripartite Initialisé', icon: 'Brain', unlockedAt: '20 Août 2026' },
    { id: 'b3', name: 'Autonomie Niv. 3 Configurée', icon: 'Shield', unlockedAt: '20 Août 2026' },
  ],
};


