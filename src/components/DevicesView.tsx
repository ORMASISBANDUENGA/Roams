import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  Laptop,
  Apple,
  Globe,
  Shield,
  LogOut,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Radio
} from 'lucide-react';
import { DeviceSession } from '../types/roam';

interface DevicesViewProps {
  devices: DeviceSession[];
  onDisconnectDevice: (deviceId: string) => void;
  onDisconnectAllOtherDevices: () => void;
}

export const DevicesView: React.FC<DevicesViewProps> = ({
  devices,
  onDisconnectDevice,
  onDisconnectAllOtherDevices,
}) => {
  const [showDisconnectAllConfirm, setShowDisconnectAllConfirm] = useState(false);

  const getDeviceIcon = (type: DeviceSession['type']) => {
    switch (type) {
      case 'android':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'windows':
      case 'linux':
        return <Laptop className="w-5 h-5 text-sky-400" />;
      case 'apple':
        return <Apple className="w-5 h-5 text-slate-200" />;
      default:
        return <Globe className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center space-x-3">
              <Smartphone className="w-7 h-7 text-emerald-400" />
              <span>Appareils & Sessions</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Gérez les terminaux connectés à votre compte souverain et révoquez les sessions distantes.
            </p>
          </div>

          <button
            onClick={() => setShowDisconnectAllConfirm(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-rose-400 text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnecter tous les autres appareils</span>
          </button>
        </div>

        {/* Devices List */}
        <div className="space-y-3">
          {devices.map((dev) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                dev.isCurrent
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {getDeviceIcon(dev.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-100">{dev.name}</h3>
                    {dev.isCurrent && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                        Cet appareil
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{dev.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{dev.lastActive}</span>
                    </span>
                    <span className="text-slate-500">IP: {dev.ipMasked}</span>
                  </div>
                </div>
              </div>

              <div>
                {!dev.isCurrent ? (
                  <button
                    onClick={() => onDisconnectDevice(dev.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all flex items-center space-x-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Se déconnecter</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Session active</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Disconnect All */}
        {showDisconnectAllConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-100">Déconnecter les autres appareils ?</h3>
              <p className="text-sm text-slate-300">
                Toutes les sessions distantes sur vos autres téléphones, ordinateurs ou navigateurs seront immédiatement fermées.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowDisconnectAllConfirm(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    onDisconnectAllOtherDevices();
                    setShowDisconnectAllConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm"
                >
                  Déconnecter tout
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};
