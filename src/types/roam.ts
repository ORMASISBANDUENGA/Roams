export type AppNavTab =
  | 'home'
  | 'chat'
  | 'projects'
  | 'documents'
  | 'memory'
  | 'actions'
  | 'agents'
  | 'privacy'
  | 'devices'
  | 'settings'
  | 'profile'
  | 'lab';

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  isTemporary?: boolean;
  projectId?: string;
  pinned?: boolean;
  mode?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  conversationsCount: number;
  documentsCount: number;
  instructions?: string;
  tasksCount?: number;
  createdAt: string;
  status?: 'active' | 'archived' | 'draft';
}

export interface DocumentFile {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'word' | 'excel' | 'powerpoint' | 'image' | 'txt' | 'csv' | 'code';
  uploadedAt: string;
  summary?: string;
  extractedText?: string;
  tags?: string[];
}

export interface DeviceSession {
  id: string;
  name: string;
  type: 'android' | 'windows' | 'apple' | 'linux' | 'web';
  location: string;
  lastActive: string;
  ipMasked: string;
  isCurrent: boolean;
}

export interface CustomAgentConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  instructions: string;
  memoryAllowed: boolean;
  permissions: {
    readProjects: boolean;
    readDocs: boolean;
    useInternet: boolean;
    sendEmails: boolean;
    editFiles: boolean;
    makePurchases: boolean;
  };
  actionsCount: number;
  status: 'active' | 'idle' | 'paused';
}

export interface PrivacySettings {
  memoryEnabled: boolean;
  historyEnabled: boolean;
  modelImprovement: boolean;
  personalization: boolean;
  strictLocalMode: boolean;
  telemetryBlocked: boolean;
}

export interface UsageQuota {
  messagesUsed: number;
  messagesLimit: number;
  imagesUsed: number;
  imagesLimit: number;
  searchUsed: number;
  searchLimit: number;
  daysRemaining: number;
  plan: 'Free' | 'Plus' | 'Pro' | 'Business';
}

export type AppScreen =
  | 'boot'
  | 'login'
  | 'onboarding'
  | 'tripartite_activation'
  | 'dashboard';

export type BrainMode = 'auto' | 'system1' | 'system2' | 'system3';

export type AutonomyLevel = 1 | 2 | 3 | 4 | 5;

export interface AutonomyDefinition {
  level: AutonomyLevel;
  title: string;
  shortDesc: string;
  description: string;
  permissions: string[];
}

export interface UserIdentity {
  id?: string;
  name: string;
  pseudonym: string;
  email: string;
  phone?: string;
  roleTitle?: string;
  avatar: string;
  authProvider?: 'google' | 'phone' | 'email' | 'passkey' | 'local_key' | 'web3' | 'nfc';
  autonomyLevel: AutonomyLevel;
  nodeType: 'local' | 'cloud' | 'cloud_mirror';
  personalityPreset: 'professionnel' | 'amical' | 'direct' | 'dynamique' | 'sarcastique' | 'personnalise';
  lastSessionTime: string;
  onboardingCompleted: boolean;
  createdAt?: string;
}

export type MemoryCategory =
  | 'Identité'
  | 'Préférences'
  | 'Projets'
  | 'Habitudes'
  | 'Conversations'
  | 'Connaissances'
  | 'Tâches';

export interface SovereignMemoryItem {
  id: string;
  category: MemoryCategory;
  title: string;
  content: string;
  confidence: number;
  lastUpdated: string;
  source: string;
}

export interface SecurityAuditItem {
  id: string;
  time: string;
  event: string;
  category: 'auth' | 'memory' | 'agent' | 'sync' | 'security';
  status: 'ok' | 'warn' | 'blocked';
  detail: string;
}

export interface SecurityCenterData {
  localProcessing: boolean;
  encryptionActive: boolean;
  cloudConnection: boolean;
  memoryProtection: boolean;
  activeSessions: number;
  integrityScore: number;
  auditLogs: SecurityAuditItem[];
}

export interface DoublePreparedAction {
  id: string;
  title: string;
  category: 'email' | 'code' | 'organizer' | 'alert' | 'calendar';
  description: string;
  confidence: number;
  preparedTime: string;
  payloadPreview: string;
  status: 'pending' | 'approved' | 'dismissed';
}

export interface DoubleState {
  active: boolean;
  lastSyncAgo: string;
  monitoredTasksCount: number;
  preparedActionsCount: number;
  pendingValidations?: number;
  actionsExecutedToday?: number;
  actions: DoublePreparedAction[];
  backgroundLogs: string[];
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: string;
  system1LatencyMs: number;
  system2LatencyMs: number;
  system3Active: boolean;
  anticipationRate: number;
  activeAgentsCount: number;
  uptime: string;
}

export interface PersonalityTraits {
  ton: 'professionnel' | 'amical' | 'decontracte' | 'philosophique' | 'chirurgical' | 'direct' | 'dynamique' | 'sarcastique';
  humour: number;       // 0 to 1
  formalite: number;     // 0 to 1
  proactivite: number;   // 0 to 1
  longueur: number;      // 0 (ultra-concise) to 1 (exhaustive)
  lastEvolutionNote?: string;
}

export interface TripartiteAnalysis {
  system1: {
    latencyMs: number;
    confidence: number;
    instinctSummary: string;
    quickAnswer: string;
  };
  system2: {
    reasoningSteps: string[];
    detailedResponse: string;
    suggestedActions: string[];
    requiresCode?: boolean;
  };
  system3: {
    qualityScore: number;
    metaCritique: string;
    learningNote: string;
    personalityAdjustment?: string;
  };
  finalResponse: string;
  moodDetected?: string;
  recommendedRewardXp?: number;
  groundingSources?: Array<{ title: string; uri: string }>;
  isWebSearch?: boolean;
  generatedImage?: {
    imageUrl: string;
    prompt: string;
    aspectRatio?: string;
    imageSize?: '1K' | '2K' | '4K' | string;
    model?: string;
    status?: 'success' | 'failed';
    error?: string;
  };
  isImageGeneration?: boolean;
  imageGenerationFailed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'roam' | 'double' | 'subagent' | 'system';
  subagentName?: string;
  text: string;
  timestamp: string;
  tripartiteData?: TripartiteAnalysis;
  fileAttachment?: {
    name: string;
    size: string;
    type: string;
  };
  imageAttachment?: {
    dataUrl: string;
    name?: string;
    mimeType: string;
  };
  generatedImage?: {
    imageUrl: string;
    prompt: string;
    aspectRatio?: string;
    imageSize?: '1K' | '2K' | '4K' | string;
    model?: string;
    status?: 'success' | 'failed';
    error?: string;
  };
  isImageGeneration?: boolean;
  imageGenerationFailed?: boolean;
  groundingSources?: Array<{ title: string; uri: string }>;
  toolsUsed?: string[];
  suggestedActions?: string[];
  sensoryAttachment?: {
    type: 'image' | 'audio' | 'code' | 'context';
    dataUrl?: string;
    label: string;
  };
  modeUsed?: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  timeLabel: string;
  type: 'code' | 'email' | 'meeting' | 'recherche' | 'bug' | 'architecture' | 'pause';
  title: string;
  description: string;
  durationMinutes: number;
  mood: 'focus' | 'energique' | 'stress' | 'fatigue' | 'neutre';
  productivityScore: number; // 0-100
}

export interface DreamState {
  lastNightAnalysis: {
    effectiveWorkHours: number;
    bugsEncountered: number;
    bugsResolved: number;
    emailsProcessed: number;
    productivityTrend: string;
  };
  subconsciousInsights: string[];
  optimizations: string[];
  tomorrowSchedule: Array<{
    time: string;
    title: string;
    priority: 'Haute' | 'Moyenne' | 'Normale';
  }>;
  poeticGreeting: string;
  virtualCoffeeServed: boolean;
}

export interface SubAgent {
  id: string;
  name: string;
  domain: string;
  icon: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'idle' | 'running' | 'paused';
  actionsCount: number;
  lastReport?: string;
  isSupervised: boolean;
}

export interface TimeCapsuleState {
  id: string;
  name: string;
  timestamp: string;
  description: string;
  filesState: Array<{ name: string; size: string; status: string }>;
  activeTasks: string[];
  memorySize: string;
  personalitySnapshot: PersonalityTraits;
}

export interface SensoryMemoryItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'visuel' | 'auditif' | 'contextuel';
  description: string;
  tags: string[];
  mood: string;
  contextPreview: string;
  mediaUrl?: string;
}

export interface BubbleModeConfig {
  active: boolean;
  activatedAt?: string;
  autoDurationMinutes?: number;
  dangerThreshold: number; // e.g. 0.9
  opportunityThreshold: number; // e.g. 0.8
  exceptions: string[];
  interventionsLog: Array<{
    id: string;
    time: string;
    type: 'danger' | 'opportunity' | 'call';
    message: string;
    blocked: boolean;
  }>;
}

export interface EthicalBackdoorState {
  active: boolean;
  passcodeProtected: boolean;
  ultraSecureMode: boolean;
  blockedCount: number;
  auditLogs: Array<{
    id: string;
    time: string;
    action: string;
    riskScore: number;
    decision: 'blocked' | 'authorized_with_warning' | 'approved';
    reason: string;
  }>;
}

export interface AnticipationCard {
  id: string;
  predictedAction: string;
  confidence: number;
  reason: string;
  suggestedShortcut: string;
  preparedDocument?: {
    name: string;
    type: string;
    content: string;
  };
}

export interface RewardBadge {
  id: string;
  name: string;
  icon: string;
  title?: string;
  description?: string;
  tier?: string;
  unlockedAt?: string;
}

export interface RewardState {
  points: number;
  totalXp?: number;
  level: string;
  levelNumber?: number;
  nextLevelPoints?: number;
  currentStreak?: number;
  badges: RewardBadge[];
}


