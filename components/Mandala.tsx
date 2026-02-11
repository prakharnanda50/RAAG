import React from 'react';

export const Mandala: React.FC<{ opacity?: string, speed?: string }> = ({ opacity = 'opacity-10', speed = 'animate-spin-slow' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 ${opacity}`}>
       <svg 
        className={`w-[150vw] h-[150vw] text-white ${speed}`}
        viewBox="0 0 100 100" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="45" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="35" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="25" strokeOpacity="0.4" />
        <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.2" />
        <path d="M18 18 L82 82 M82 18 L18 82" strokeOpacity="0.2" />
        {/* Geometric petals simulation */}
        <path d="M50 20 Q65 35 50 50 Q35 35 50 20" strokeOpacity="0.5" />
        <path d="M50 80 Q65 65 50 50 Q35 65 50 80" strokeOpacity="0.5" />
        <path d="M20 50 Q35 65 50 50 Q35 35 20 50" strokeOpacity="0.5" />
        <path d="M80 50 Q65 65 50 50 Q65 35 80 50" strokeOpacity="0.5" />
        
        <path d="M29 29 Q40 40 50 50" strokeOpacity="0.3" />
        <path d="M71 71 Q60 60 50 50" strokeOpacity="0.3" />
        <path d="M29 71 Q40 60 50 50" strokeOpacity="0.3" />
        <path d="M71 29 Q60 40 50 50" strokeOpacity="0.3" />
      </svg>
    </div>
  );
};
