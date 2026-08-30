import React from 'react';

export function GaneshaIcon({ className = "w-12 h-12 text-amber-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Traditional artistic Vinayaka silhouette / Trishul Tilak */}
      <path d="M50 8 C47 8 45 10 45 13 L45 28 C45 31 47 33 50 33 C53 33 55 31 55 28 L55 13 C55 10 53 8 50 8 Z" fill="#DC2626" />
      <circle cx="50" cy="38" r="4" fill="#F59E0B" />
      
      {/* Crown / Mukut */}
      <path d="M38 25 L50 14 L62 25 L56 28 L44 28 Z" fill="#F59E0B" />
      
      {/* Ears */}
      <path d="M32 32 C20 28 14 42 22 56 C28 66 38 60 36 48 C36 42 34 36 32 32 Z" fill="#EA580C" opacity="0.9" />
      <path d="M68 32 C80 28 86 42 78 56 C72 66 62 60 64 48 C64 42 66 36 68 32 Z" fill="#EA580C" opacity="0.9" />
      
      {/* Head and Trunk */}
      <path d="M42 32 C38 42 40 54 44 62 C46 66 48 72 46 78 C44 84 38 88 42 92 C46 96 56 94 56 86 C56 76 52 68 50 60 C54 52 58 42 56 32 Z" fill="#D97706" />
      
      {/* Modak in Trunk tip */}
      <circle cx="38" cy="90" r="3.5" fill="#FBBF24" />
      
      {/* Left Tusk (Single Tusk / Ekdanta) */}
      <path d="M42 54 L35 56 L42 58 Z" fill="#FFFDF8" stroke="#D97706" strokeWidth="0.5" />
      
      {/* Small Right Tusk */}
      <path d="M56 54 L60 55 L56 56 Z" fill="#FFFDF8" />
    </svg>
  );
}

export function DiyaIcon({ className = "w-6 h-6 text-amber-500", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={`${className} ${glow ? 'animate-diya' : ''}`} xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <path d="M32 6 C32 6 22 22 22 30 C22 35.5 26.5 40 32 40 C37.5 40 42 35.5 42 30 C42 22 32 6 32 6 Z" fill="url(#flameGrad)" />
      <path d="M32 16 C32 16 26 25 26 30 C26 33.3 28.7 36 32 36 C35.3 36 38 33.3 38 30 C38 25 32 16 32 16 Z" fill="#FEF08A" />
      
      {/* Base Bowl / Diya */}
      <path d="M12 40 C14 54 50 54 52 40 C52 40 40 44 32 44 C24 44 12 40 12 40 Z" fill="#C2410C" stroke="#9A3412" strokeWidth="1.5" />
      <path d="M22 52 L42 52 L38 58 L26 58 Z" fill="#9A3412" />
      <circle cx="32" cy="47" r="2" fill="#FBBF24" />

      <defs>
        <linearGradient id="flameGrad" x1="32" y1="6" x2="32" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.6" stopColor="#EA580C" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function KalashIcon({ className = "w-6 h-6 text-amber-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Coconut on top */}
      <path d="M32 8 C26 14 26 22 32 26 C38 22 38 14 32 8 Z" fill="#78350F" />
      
      {/* Mango leaves */}
      <path d="M20 22 C26 18 30 24 32 26 C28 28 22 28 20 22 Z" fill="#16A34A" />
      <path d="M44 22 C38 18 34 24 32 26 C36 28 42 28 44 22 Z" fill="#16A34A" />
      <path d="M14 26 C22 26 28 28 32 30 C24 34 16 32 14 26 Z" fill="#15803D" />
      <path d="M50 26 C42 26 36 28 32 30 C40 34 48 32 50 26 Z" fill="#15803D" />
      
      {/* Kalash Pot (brass/copper) */}
      <path d="M24 28 H40 L44 34 C48 40 46 52 32 54 C18 52 16 40 20 34 L24 28 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      {/* Red Swastik / Sacred mark on Pot */}
      <path d="M32 37 V45 M28 41 H36 M28 37 H30 M36 45 H34 M36 37 V39 M28 45 V43" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <path d="M24 54 H40 L38 58 H26 Z" fill="#B45309" />
    </svg>
  );
}

export function ModakIcon({ className = "w-6 h-6 text-amber-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10 C32 10 18 32 18 44 C18 53 24 56 32 56 C40 56 46 53 46 44 C46 32 32 10 32 10 Z" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
      {/* Pleats / Folds of Modak */}
      <path d="M32 10 V56" stroke="#CA8A04" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 12 C28 26 23 38 23 48" stroke="#CA8A04" strokeWidth="1" />
      <path d="M32 12 C36 26 41 38 41 48" stroke="#CA8A04" strokeWidth="1" />
      {/* Kesar saffron strand */}
      <path d="M32 8 C33 4 35 4 36 6" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ToranBanner() {
  return (
    <div className="w-full overflow-hidden flex items-center justify-center py-1 opacity-90 select-none">
      <div className="flex space-x-3 sm:space-x-6 text-amber-600 font-serif text-sm">
        <span>✨ ॐ गं गणपतये नमः ✨</span>
        <span className="hidden sm:inline">🌸 शुभ लाभ 🌸</span>
        <span>🚩 गणपती बाप्पा मोरया 🚩</span>
        <span className="hidden md:inline">✨ मंगलमूर्ती मोरया ✨</span>
      </div>
    </div>
  );
}

export function RangoliBorder() {
  return (
    <div className="w-full flex items-center justify-center gap-2 py-3 text-amber-500/80">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-amber-700 uppercase">
        <span>✦</span>
        <span>•</span>
        <span className="text-sm text-red-600">ॐ</span>
        <span>•</span>
        <span>✦</span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
    </div>
  );
}

export function MarigoldGarland() {
  return (
    <div className="w-full overflow-hidden py-1 flex justify-around items-center select-none">
      {[...Array(12)].map((_, i) => (
        <span key={i} className="inline-block transform hover:scale-110 transition-transform">
          {i % 2 === 0 ? (
            <span className="text-amber-500 text-lg drop-shadow-sm">🏵️</span>
          ) : (
            <span className="text-orange-500 text-lg drop-shadow-sm">🌼</span>
          )}
        </span>
      ))}
    </div>
  );
}
