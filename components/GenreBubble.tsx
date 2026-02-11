import React from 'react';

interface GenreBubbleProps {
  label: string;
  size: string;
  color: string;
  animationDelay: string;
  top: string;
  left: string;
  onClick: () => void;
}

export const GenreBubble: React.FC<GenreBubbleProps> = ({ label, size, color, animationDelay, top, left, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`absolute flex items-center justify-center rounded-full backdrop-blur-md bg-opacity-20 border border-white/10 shadow-lg cursor-pointer animate-float hover:scale-110 transition-transform duration-500`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: top,
        left: left,
        animationDelay: animationDelay,
      }}
    >
      <span className="font-serif text-white font-medium tracking-wider text-sm md:text-base drop-shadow-md text-center px-2">
        {label}
      </span>
    </div>
  );
};
