import React, { useState } from 'react';

interface RoamLogoAnimatedProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textSubtitle?: string;
  showEmbers?: boolean;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  xs: { box: 'w-7 h-7', text: 'text-xs', sub: 'text-[7px]', iconSize: 14 },
  sm: { box: 'w-9 h-9', text: 'text-sm', sub: 'text-[8px]', iconSize: 18 },
  md: { box: 'w-11 h-11', text: 'text-base', sub: 'text-[9px]', iconSize: 22 },
  lg: { box: 'w-14 h-14', text: 'text-xl', sub: 'text-[11px]', iconSize: 28 },
  xl: { box: 'w-20 h-20', text: 'text-2xl', sub: 'text-xs', iconSize: 40 },
  '2xl': { box: 'w-28 h-28', text: 'text-3xl', sub: 'text-sm', iconSize: 56 },
};

export const RoamLogoAnimated: React.FC<RoamLogoAnimatedProps> = ({
  size = 'md',
  showText = false,
  textSubtitle = 'SOUVERAIN',
  showEmbers = true,
  className = '',
  interactive = true,
  onClick,
}) => {
  const [isFlaring, setIsFlaring] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('/icon.jpg');
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const currentSize = sizeMap[size] || sizeMap.md;

  const handleClick = () => {
    if (interactive) {
      setIsFlaring(true);
      setTimeout(() => setIsFlaring(false), 900);
    }
    if (onClick) onClick();
  };

  const handleImgError = () => {
    if (imgSrc === '/icon.jpg') {
      setImgSrc('/roams_logo.png');
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 select-none group ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      title="ROAM'S.AI — Flamme Souveraine"
    >
      {/* Animated Fire Icon Container */}
      <div className={`relative flex items-center justify-center ${currentSize.box} shrink-0`}>
        {/* Layer 1: Radiant Thermal Flare (Pulsing Corona) */}
        <div
          className={`absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 blur-md pointer-events-none transition-all duration-300 ${
            isFlaring
              ? 'opacity-100 scale-125 blur-lg'
              : 'opacity-75 group-hover:opacity-100 group-hover:scale-110 animate-flame-corona'
          }`}
        />

        {/* Layer 2: Core Fiery Backlight Glow */}
        <div
          className={`absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-orange-600 to-yellow-400 blur-sm pointer-events-none transition-transform duration-300 ${
            isFlaring ? 'scale-115 rotate-3' : 'group-hover:scale-105'
          }`}
        />

        {/* Layer 3: Rising Embers & Spark Particles */}
        {showEmbers && (
          <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
            {/* Spark 1 */}
            <span
              className="absolute top-0.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#f59e0b] animate-ember-1"
              style={{ animationDelay: '0.2s' }}
            />
            {/* Spark 2 */}
            <span
              className="absolute top-0 right-1.5 w-1 h-1 rounded-full bg-orange-400 shadow-[0_0_8px_#ea580c] animate-ember-2"
              style={{ animationDelay: '0.8s' }}
            />
            {/* Spark 3 */}
            <span
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047] animate-ember-3"
              style={{ animationDelay: '1.4s' }}
            />
          </div>
        )}

        {/* Layer 4: Main Logo Badge (With High-Definition Image + Vector Neural Flame Fallback) */}
        <div
          className={`relative z-10 w-full h-full rounded-xl overflow-hidden border border-amber-400/90 shadow-[0_0_14px_rgba(245,158,11,0.8)] ring-1 ring-orange-500/60 bg-slate-950 flex items-center justify-center transition-all duration-300 ${
            isFlaring
              ? 'scale-110 rotate-[-2deg] ring-amber-300'
              : 'animate-flame-sway animate-flame-pulse group-hover:scale-105'
          }`}
        >
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt="ROAM'S.AI"
              className="w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-amber-950 to-orange-950 flex items-center justify-center p-1 relative">
              <svg
                viewBox="0 0 48 48"
                className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="flameGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="45%" stopColor="#ea580c" />
                    <stop offset="80%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                </defs>
                {/* Stylized Phoenix Flame Shape */}
                <path
                  d="M24 4C24 4 28 12 25 18C23 22 18 23 18 28C18 34.6 23.4 40 30 40C34.4 40 38.2 37.6 40 34C40 28 35 24 35 24C35 24 38 27 38 31C38 31 42 26 40 20C38 14 31 11 31 11C31 11 33 16 30 19C27 22 24 20 24 16C24 10 24 4 24 4Z"
                  fill="url(#flameGrad)"
                  opacity="0.95"
                />
                <path
                  d="M16 20C16 20 19 25 18 29C17 33 13 35 13 38C13 41.3 15.7 44 19 44C21.2 44 23.1 42.8 24 41C24 38 21.5 36 21.5 36C21.5 36 23 37.5 23 39.5C23 39.5 25 37 24 34C23 31 19.5 29.5 19.5 29.5C19.5 29.5 20.5 32 19 33.5C17.5 35 16 34 16 32C16 29 16 20 16 20Z"
                  fill="#fef08a"
                />
                {/* Bold R Emblem */}
                <text
                  x="24"
                  y="32"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="18"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  R
                </text>
              </svg>
            </div>
          )}

          {/* Internal Ember Sheen overlay on hover/flare */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-red-600/30 via-transparent to-amber-300/20 pointer-events-none transition-opacity duration-300 ${
              isFlaring ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />
        </div>

        {/* Floating Mini Flame Badge indicator */}
        <span
          className={`absolute -top-1.5 -right-1.5 z-30 transition-transform duration-300 select-none ${
            isFlaring ? 'scale-125 rotate-12' : 'group-hover:scale-110'
          }`}
          style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.95))' }}
        >
          <span className="inline-block text-[11px] sm:text-xs animate-bounce" style={{ animationDuration: '2.4s' }}>
            🔥
          </span>
        </span>
      </div>

      {/* Optional Branding Text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent font-mono tracking-tight leading-none ${currentSize.text} drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]`}
            >
              ROAM’S.AI
            </span>
          </div>
          {textSubtitle && (
            <span
              className={`font-mono font-bold tracking-wider text-amber-400/80 uppercase leading-tight ${currentSize.sub}`}
            >
              {textSubtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
