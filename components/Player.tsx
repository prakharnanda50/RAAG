import React, { useEffect, useState } from 'react';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Heart, Share2, MoreHorizontal, ChevronDown } from 'lucide-react';

interface PlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShare: () => void;
  onArtistClick: () => void;
}

export const Player: React.FC<PlayerProps> = ({ track, isPlaying, onPlayPause, onClose, onNext, onPrev, onShare, onArtistClick }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900/90 backdrop-blur-3xl text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-raag-indigo/30 via-transparent to-raag-crimson/20 pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6 mt-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition">
          <ChevronDown className="w-6 h-6 text-gray-300" />
        </button>
        <span className="text-xs uppercase tracking-widest text-raag-gold font-serif">Now Playing</span>
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <MoreHorizontal className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      {/* Album Art with Glow */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-8">
        <div className={`relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-90 opacity-80'}`}>
             <div className={`absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 animate-spin-slow`} />
             <img src={track.albumArt} alt={track.title} className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`} />
             {/* Center hole for vinyl look */}
             <div className="absolute inset-0 m-auto w-8 h-8 bg-neutral-900 rounded-full border border-gray-700" />
        </div>
        
        {/* Animated Glow behind art */}
        <div className={`absolute w-64 h-64 bg-raag-gold/20 blur-3xl rounded-full -z-10 transition-all duration-1000 ${isPlaying ? 'scale-150 opacity-50' : 'scale-100 opacity-20'}`} />
      </div>

      {/* Info & Controls */}
      <div className="relative z-10 px-8 pb-12 flex flex-col gap-6">
        
        {/* Track Info */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-1 leading-tight">{track.title}</h2>
            <button onClick={onArtistClick} className="text-gray-400 font-sans text-lg hover:text-raag-gold transition underline decoration-transparent hover:decoration-raag-gold">
              {track.artist}
            </button>
          </div>
          <button className="p-2 text-rose-500 hover:scale-110 transition">
            <Heart className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Scrubber */}
        <div className="w-full group cursor-pointer">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden relative">
            <div className="h-full bg-raag-gold transition-all duration-300 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>{(progress * 0.05).toFixed(2).replace('.',':')}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex items-center justify-between px-4">
           <button onClick={onShare} className="text-gray-400 hover:text-white transition hover:scale-110">
             <Share2 className="w-5 h-5" />
           </button>
           
           <div className="flex items-center gap-8">
              <button onClick={onPrev} className="text-white hover:text-raag-gold transition transform hover:-translate-x-1">
                <SkipBack className="w-8 h-8 fill-current" />
              </button>
              
              <button 
                onClick={onPlayPause}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-raag-gold to-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-white text-white" /> : <Play className="w-8 h-8 fill-white text-white ml-1" />}
              </button>
              
              <button onClick={onNext} className="text-white hover:text-raag-gold transition transform hover:translate-x-1">
                <SkipForward className="w-8 h-8 fill-current" />
              </button>
           </div>
           
           <button className="text-gray-400 hover:text-white transition">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};
