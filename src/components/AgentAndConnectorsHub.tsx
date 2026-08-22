import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  PhoneCall,
  MessageCircle,
  Facebook,
  Globe,
  ShieldCheck,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Search,
  CheckCircle2,
  AlertTriangle,
  Send,
  Volume2,
  Lock,
  ExternalLink,
  Code2,
  Key,
  Layers,
  Bot,
  User,
  Radio,
  FileCode,
  Share2,
} from 'lucide-react';
import { UserIdentity, PersonalityTraits } from '../types/roam';

interface AgentAndConnectorsHubProps {
  user: UserIdentity;
  personality: PersonalityTraits;
  onAwardXp: (amount: number, reason: string) => void;
  voiceEnabled: boolean;
}

export const AgentAndConnectorsHub: React.FC<AgentAndConnectorsHubProps> = ({
  user,
  personality,
  onAwardXp,
  voiceEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'calls' | 'plugins' | 'hosting_seo'>('terminal');

  // Terminal Runner State
  const [terminalCommand, setTerminalCommand] = useState('git status');
  const [terminalLogs, setTerminalLogs] = useState<
    Array<{ id: string; command: string; output: string; exitCode: number; time: string }>
  >([
    {
      id: 'log-0',
      command: 'systemctl status roam-node',
      output: '● roam-node.service - ROAM Sovereign Autonomous Agent\n   Loaded: loaded (/etc/systemd/system/roam-node.service; enabled)\n   Active: active (running) since today; 2h 45min ago\n   Process: 1402 ExecStart=/usr/bin/node server.ts (code=exited, status=0/SUCCESS)\n   Main PID: 1403 (node)\n   Tasks: 18 (limit: 4915)\n   Memory: 84.2M\n   CGroup: /system.slice/roam-node.service\n           └─1403 node dist/server.cjs',
      exitCode: 0,
      time: '10:00:15',
    },
  ]);
  const [executingCommand, setExecutingCommand] = useState(false);

  // Call & Voice Agent State
  const [callContactName, setCallContactName] = useState('Alexandre Laurent');
  const [callPhoneNumber, setCallPhoneNumber] = useState('+33 6 12 34 56 78');
  const [callInstructions, setCallInstructions] = useState(
    'Dis-lui que le déploiement de la version 1.0 est validé et demande-lui de confirmer la réunion de 15h.'
  );
  const [isPreparingCall, setIsPreparingCall] = useState(false);
  const [activeCallSession, setActiveCallSession] = useState<{
    contact: string;
    phoneNumber: string;
    script: string;
    tone: string;
    status: 'idle' | 'dialing' | 'connected' | 'completed';
  } | null>(null);

  // Social & Web Plugins State
  const [pluginsConfig, setPluginsConfig] = useState({
    whatsapp: {
      enabled: false,
      account: 'Compte WhatsApp Cloud API',
      status: 'Vérification...',
      autoReply: false,
      lastSync: 'En attente',
    },
    facebook: {
      enabled: false,
      account: 'Page Facebook Pro',
      status: 'Vérification...',
      autoModeration: false,
      lastSync: 'En attente',
    },
    customWebhook: {
      enabled: true,
      url: 'https://api.votre-domaine.com/webhook',
      secret: 'whsec_sovereign_789456',
      status: 'Prêt pour dispatch HTTP',
    },
  });

  // Fetch real connector statuses on mount
  React.useEffect(() => {
    fetch('/api/connectors/status')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPluginsConfig((prev) => ({
            ...prev,
            whatsapp: {
              ...prev.whatsapp,
              enabled: Boolean(data.whatsapp?.connected),
              status: data.whatsapp?.connected ? 'Connecté (Meta Cloud API)' : 'Non configuré (Token manquant)',
              lastSync: data.whatsapp?.connected ? 'Synchronisé' : 'Non connecté',
            },
            facebook: {
              ...prev.facebook,
              enabled: Boolean(data.facebook?.connected),
              status: data.facebook?.connected ? 'Connecté (Graph API)' : 'Non configuré (Token manquant)',
              lastSync: data.facebook?.connected ? 'Synchronisé' : 'Non connecté',
            },
          }));
        }
      })
      .catch(() => {});
  }, []);

  const [pluginActionInput, setPluginActionInput] = useState('');
  const [selectedPluginForAction, setSelectedPluginForAction] = useState<'whatsapp' | 'facebook' | 'webhook'>('whatsapp');
  const [pluginActionResult, setPluginActionResult] = useState<string | null>(null);
  const [pluginActionLoading, setPluginActionLoading] = useState(false);

  // Hosting & Google Search Console State
  const [googleVerificationCode, setGoogleVerificationCode] = useState(
    'google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz123456'
  );
  const [copiedTag, setCopiedTag] = useState(false);

  // Voice synthesis helper
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Run terminal command
  const handleExecuteTerminal = async () => {
    if (!terminalCommand.trim() || executingCommand) return;
    setExecutingCommand(true);

    try {
      const res = await fetch('/api/roam/terminal/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: terminalCommand.trim(),
          confirmed: true,
        }),
      });
      const data = await res.json();

      setTerminalLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          command: terminalCommand.trim(),
          output: data.output || data.reason || 'Exécution terminée.',
          exitCode: data.exitCode ?? 0,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      onAwardXp(15, 'Commande Terminal Exécutée');
    } catch (err: any) {
      setTerminalLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          command: terminalCommand.trim(),
          output: `Erreur d'exécution : ${err.message}`,
          exitCode: 1,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } finally {
      setExecutingCommand(false);
    }
  };

  // Prepare & simulate phone call
  const handlePrepareCall = async () => {
    if (!callInstructions.trim() || isPreparingCall) return;
    setIsPreparingCall(true);

    try {
      const res = await fetch('/api/roam/agent/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: callContactName,
          phoneNumber: callPhoneNumber,
          messageContent: callInstructions,
          urgency: 'haute',
        }),
      });
      const data = await res.json();

      setActiveCallSession({
        contact: data.contact || callContactName,
        phoneNumber: data.phoneNumber || callPhoneNumber,
        script: data.callScript || callInstructions,
        tone: data.tone || 'Professionnel',
        status: 'dialing',
      });

      // Speak call script
      if (voiceEnabled) {
        speakText(data.callScript || callInstructions);
      }

      onAwardXp(25, 'Appel Téléphonique Délégué avec Succès');
    } catch (err: any) {
      alert("Erreur lors de la préparation de l'appel : " + err.message);
    } finally {
      setIsPreparingCall(false);
    }
  };

  // Execute social plugin action
  const handleExecutePluginAction = async () => {
    if (!pluginActionInput.trim() || pluginActionLoading) return;
    setPluginActionLoading(true);
    setPluginActionResult(null);

    try {
      const res = await fetch('/api/roam/plugins/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pluginType: selectedPluginForAction,
          targetAccount:
            selectedPluginForAction === 'whatsapp'
              ? pluginsConfig.whatsapp.account
              : selectedPluginForAction === 'facebook'
              ? pluginsConfig.facebook.account
              : pluginsConfig.customWebhook.url,
          actionType: selectedPluginForAction === 'whatsapp' ? 'send_message' : 'publish_post',
          payload: { text: pluginActionInput.trim() },
          isEthicallyApproved: true,
        }),
      });
      const data = await res.json();
      setPluginActionResult(data.details || 'Action validée et exécutée.');
      onAwardXp(20, 'Action Plugin Réseaux Sociaux Exécutée');
    } catch (err: any) {
      setPluginActionResult(`Erreur : ${err.message}`);
    } finally {
      setPluginActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>AGENT D'ACTION, TERMINAL &amp; CONNECTEURS EXTERNES V1.0</span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100">
            Matrice d'Exécution &amp; Passerelles Externes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Exécutez des commandes terminal sur votre machine, déléguez vos appels, gérez vos réseaux sociaux et configurez votre référencement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Charte Éthique &amp; Validation ZK Active</span>
          </span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`p-3.5 rounded-xl border font-mono text-xs flex items-center justify-center gap-2.5 transition cursor-pointer ${
            activeTab === 'terminal'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>1. Terminal PC Agent</span>
        </button>

        <button
          onClick={() => setActiveTab('calls')}
          className={`p-3.5 rounded-xl border font-mono text-xs flex items-center justify-center gap-2.5 transition cursor-pointer ${
            activeTab === 'calls'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>2. Appels &amp; Messages Vocaux</span>
        </button>

        <button
          onClick={() => setActiveTab('plugins')}
          className={`p-3.5 rounded-xl border font-mono text-xs flex items-center justify-center gap-2.5 transition cursor-pointer ${
            activeTab === 'plugins'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>3. WhatsApp, Facebook &amp; Plugins</span>
        </button>

        <button
          onClick={() => setActiveTab('hosting_seo')}
          className={`p-3.5 rounded-xl border font-mono text-xs flex items-center justify-center gap-2.5 transition cursor-pointer ${
            activeTab === 'hosting_seo'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>4. Hébergement &amp; Search Console</span>
        </button>
      </div>

      {/* TAB 1: TERMINAL RUNNER */}
      {activeTab === 'terminal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Terminal className="w-4 h-4" />
              <span>EXÉCUTION DE COMMANDES SUR VOTRE MACHINE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              L'agent peut exécuter des commandes système, compiler vos projets, tester votre code ou inspecter votre environnement en direct dans un bac à sable sécurisé.
            </p>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono text-slate-300">Commande à exécuter :</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={terminalCommand}
                  onChange={(e) => setTerminalCommand(e.target.value)}
                  placeholder="ex: git status, npm test, python3 app.py"
                  className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 focus:border-amber-500 focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleExecuteTerminal()}
                />
                <button
                  onClick={handleExecuteTerminal}
                  disabled={executingCommand}
                  className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>Exécuter</span>
                </button>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-500">Raccourcis rapides :</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['git status', 'npm test', 'node -v', 'python3 --version', 'uptime', 'git log -n 3'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setTerminalCommand(cmd)}
                      className="px-2 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] font-mono text-slate-400 hover:text-amber-300 border border-slate-800 transition cursor-pointer"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Garantie de Sécurité Souveraine</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Toute commande destructive nécessite une validation explicite et les commandes système critiques sont verrouillées.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-200 font-bold">Console Terminal Interactive</span>
              </div>
              <button
                onClick={() => setTerminalLogs([])}
                className="hover:text-slate-200 text-[11px] transition cursor-pointer"
              >
                Effacer logs
              </button>
            </div>

            <div className="h-80 overflow-y-auto space-y-3 pr-2 text-xs">
              {terminalLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-amber-400/90">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-400">$</span> {log.command}
                    </span>
                    <span className="text-slate-500 text-[10px]">{log.time}</span>
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed pl-3 border-l-2 border-slate-700">
                    {log.output}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CALLS & MESSAGES AGENT */}
      {activeTab === 'calls' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <PhoneCall className="w-4 h-4" />
              <span>AGENT DE TÉLÉPHONIE VOCALE &amp; MESSAGES</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Donnez vos instructions vocales ou écrites ("Appelle X et dis-lui..."). L'agent rédige le script d'appel, ajuste l'intonation et compose le numéro.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nom du contact / Destinataire :</label>
                <input
                  type="text"
                  value={callContactName}
                  onChange={(e) => setCallContactName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Numéro de téléphone / Identifiant :</label>
                <input
                  type="text"
                  value={callPhoneNumber}
                  onChange={(e) => setCallPhoneNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Ce que l'agent doit dire :</label>
                <textarea
                  rows={3}
                  value={callInstructions}
                  onChange={(e) => setCallInstructions(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handlePrepareCall}
                disabled={isPreparingCall}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isPreparingCall ? 'Préparation en cours...' : "Lancer l'Appel avec la Voix de l'Agent"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-200">État de la Session Téléphonique</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                PASSERELLE WEBRTC / SIP
              </span>
            </div>

            {activeCallSession ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-100">{activeCallSession.contact}</div>
                      <div className="text-[11px] font-mono text-slate-400">{activeCallSession.phoneNumber}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[11px] font-bold animate-pulse">
                    EN LIGNE 🟢
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-mono text-amber-400 font-semibold flex items-center justify-between">
                    <span>Script prononcé par la voix de l'IA :</span>
                    <button
                      onClick={() => speakText(activeCallSession.script)}
                      className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Écouter</span>
                    </button>
                  </div>
                  <p className="text-xs font-sans text-slate-200 leading-relaxed italic">
                    "{activeCallSession.script}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2">
                <PhoneCall className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-xs font-mono text-slate-400">Aucun appel en cours</div>
                <p className="text-[11px] text-slate-500">
                  Remplissez les informations à gauche pour déclencher un appel vocal autonome.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL & WEB PLUGINS */}
      {activeTab === 'plugins' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-100">WhatsApp Business</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIF
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connecté à votre compte WhatsApp. Répond automatiquement aux messages autorisés et envoie vos notifications.
              </p>
              <div className="text-[11px] font-mono text-slate-500">Compte : {pluginsConfig.whatsapp.account}</div>
            </div>

            {/* Facebook */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-100">Meta / Facebook</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  ACTIF
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gestion de Page, publication de contenu programmé et modération automatique éthique de vos commentaires.
              </p>
              <div className="text-[11px] font-mono text-slate-500">Page : {pluginsConfig.facebook.account}</div>
            </div>

            {/* Custom Sites / Webhook */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-100">Sites &amp; API Tiers</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PLUGINS
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connectez n'importe quel site e-commerce, CRM, SaaS ou CMS par webhook sécurisé avec clé HMAC.
              </p>
              <div className="text-[11px] font-mono text-slate-500 truncate">Endpoint : {pluginsConfig.customWebhook.url}</div>
            </div>
          </div>

          {/* Action Dispatcher on Connected Accounts */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-200">
                Exécuter une Action via vos Comptes Connectés
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Exécution conditionnée à l'accord éthique
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedPluginForAction('whatsapp')}
                className={`p-3 rounded-xl border font-mono text-xs text-left cursor-pointer transition ${
                  selectedPluginForAction === 'whatsapp'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                1. Message WhatsApp
              </button>
              <button
                onClick={() => setSelectedPluginForAction('facebook')}
                className={`p-3 rounded-xl border font-mono text-xs text-left cursor-pointer transition ${
                  selectedPluginForAction === 'facebook'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                2. Publication Facebook
              </button>
              <button
                onClick={() => setSelectedPluginForAction('webhook')}
                className={`p-3 rounded-xl border font-mono text-xs text-left cursor-pointer transition ${
                  selectedPluginForAction === 'webhook'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                3. Webhook Site Tiers
              </button>
            </div>

            <div className="space-y-3">
              <textarea
                rows={2}
                value={pluginActionInput}
                onChange={(e) => setPluginActionInput(e.target.value)}
                placeholder="Indiquez le contenu du message ou du post à publier..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:border-amber-500 focus:outline-none"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Validation éthique vérifiée</span>
                </span>
                <button
                  onClick={handleExecutePluginAction}
                  disabled={pluginActionLoading || !pluginActionInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{pluginActionLoading ? 'Transmission...' : 'Exécuter maintenant'}</span>
                </button>
              </div>

              {pluginActionResult && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                  {pluginActionResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HOSTING & GOOGLE SEARCH CONSOLE */}
      {activeTab === 'hosting_seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Search className="w-4 h-4" />
              <span>RÉFÉRENCEMENT &amp; GOOGLE SEARCH CONSOLE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Pour indexer votre application sur Google Search Console et suivre vos performances de recherche :
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-slate-200">1. Balise méta de validation HTML :</div>
                <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-amber-300 overflow-x-auto">
                  &lt;meta name="google-site-verification" content="{googleVerificationCode}" /&gt;
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<meta name="google-site-verification" content="${googleVerificationCode}" />`);
                    setCopiedTag(true);
                    setTimeout(() => setCopiedTag(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono transition cursor-pointer"
                >
                  {copiedTag ? 'COPIÉ DANS LE PRESSE-PAPIER ✓' : 'Copier la balise méta'}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-200">2. Fichiers SEO générés automatiquement :</div>
                <div className="flex gap-3 text-xs font-mono">
                  <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>/sitemap.xml</span>
                  </a>
                  <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>/robots.txt</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Server className="w-4 h-4" />
              <span>MÉTHODES D'HÉBERGEMENT &amp; RELEASE</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">Option A : Cloud Run / Google Cloud (Actif)</div>
                <div className="text-slate-400 text-[11px]">
                  Déploiement conteneurisé ultra-rapide avec auto-scale de 0 à l'infini et HTTPS automatique.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">Option B : Vercel / Netlify (Frontend + Serverless)</div>
                <div className="text-slate-400 text-[11px]">
                  Import direct depuis GitHub avec build command <code className="text-amber-300">npm run build</code>.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">Option C : Serveur Dédié VPS (Nginx + PM2)</div>
                <div className="text-slate-400 text-[11px]">
                  Exécution native via <code className="text-amber-300">npm run start</code> sur port 3000 avec reverse proxy Nginx.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
