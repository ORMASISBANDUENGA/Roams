import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  X,
  Monitor,
  Smartphone,
  Terminal,
  Check,
  HardDrive,
  Cpu,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'cli'>('desktop');
  const [copiedCli, setCopiedCli] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (platform: string) => {
    setDownloadStarted(platform);
    setTimeout(() => setDownloadStarted(null), 3500);
  };

  const copyCliCommand = () => {
    navigator.clipboard?.writeText('curl -fsSL https://get.roams.ai/install.sh | bash');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-amber-950/30 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl overflow-hidden border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
              <img
                src="/icon.jpg"
                alt="ROAM'S.ai"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-mono text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5 sm:gap-2">
                TÉLÉCHARGER ROAM’S.AI
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  V1.0
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Centre de contrôle souverain multi-plateformes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 sm:p-2 gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-1.5 sm:py-2.5 px-2 rounded-lg font-mono text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Desktop (Mac / Win / Linux)</span>
            <span className="sm:hidden">Desktop</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-1.5 sm:py-2.5 px-2 rounded-lg font-mono text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeTab === 'mobile'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Mobile (iOS / Android)</span>
            <span className="sm:hidden">Mobile</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex-1 py-1.5 sm:py-2.5 px-2 rounded-lg font-mono text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              activeTab === 'cli'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">CLI Daemon</span>
            <span className="sm:hidden">CLI</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 flex-1">
          {downloadStarted && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Téléchargement de l'installeur ({downloadStarted}) initié. Nœud local prêt à être lié.</span>
            </motion.div>
          )}

          {/* DESKTOP */}
          {activeTab === 'desktop' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* macOS */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="font-mono text-xs font-bold text-slate-200">macOS</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Apple Silicon &amp; Intel</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-2">ROAM-1.0.0-mac.dmg (124 MB)</div>
                  </div>
                  <button
                    onClick={() => handleDownload('macOS DMG')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>

                {/* Windows */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="font-mono text-xs font-bold text-slate-200">Windows</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Windows 10 / 11 (64-bit)</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-2">ROAM-Setup-1.0.0.exe (138 MB)</div>
                  </div>
                  <button
                    onClick={() => handleDownload('Windows EXE')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>

                {/* Linux */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="font-mono text-xs font-bold text-slate-200">Linux</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">AppImage / .deb / Flatpak</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-2">ROAM-1.0.0.AppImage (118 MB)</div>
                  </div>
                  <button
                    onClick={() => handleDownload('Linux AppImage')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tous les packages sont signés cryptographiquement et s'exécutent en sandbox locale étanche.</span>
              </div>
            </div>
          )}

          {/* MOBILE */}
          {activeTab === 'mobile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-200">iOS (iPhone &amp; iPad)</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Liaison sécurisée via QR Code vers votre nœud local sans passerelle externe.
                </p>
                <button
                  onClick={() => handleDownload('iOS TestFlight')}
                  className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Rejoindre la bêta TestFlight</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="font-mono text-xs font-bold text-slate-200">Android APK Souverain</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fichier APK autonome avec gestionnaire de modèles locaux sur puce Snapdragon / Tensor.
                </p>
                <button
                  onClick={() => handleDownload('Android APK')}
                  className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger ROAM-1.0.apk</span>
                </button>
              </div>
            </div>
          )}

          {/* CLI */}
          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 leading-relaxed">
                Exécutez le démon ROAM directement en arrière-plan sur votre serveur, NAS ou station Linux/macOS :
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-amber-300">
                <code>curl -fsSL https://get.roams.ai/install.sh | bash</code>
                <button
                  onClick={copyCliCommand}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Copier la commande"
                >
                  {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                <div>&gt; roams start --node=local --port=3000</div>
                <div>&gt; roams autonomy set 3</div>
                <div>&gt; roams status 🟢 Nœud souverain en écoute.</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
