import React from 'react';
import { Track } from '../types';
import { X, Copy, Instagram, Share2, Facebook } from 'lucide-react';

interface ShareModalProps {
  track: Track;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ track, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-breathe">
       <div className="bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 rounded-full text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
          
          {/* Card Preview */}
          <div className="relative h-80 w-full overflow-hidden flex flex-col justify-end p-6">
             <img src={track.albumArt} alt="" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-raag-black via-transparent to-transparent opacity-90" />
             <div className="absolute inset-0 bg-raag-indigo/30 mix-blend-overlay" />
             
             <div className="relative z-10 text-center">
                <img src={track.albumArt} alt="art" className="w-32 h-32 mx-auto rounded-lg shadow-2xl mb-4 border border-white/20" />
                <h3 className="text-xl font-serif text-white font-bold">{track.title}</h3>
                <p className="text-raag-gold text-sm">{track.artist}</p>
                <div className="w-full h-1 bg-white/20 mt-4 rounded-full overflow-hidden">
                   <div className="w-1/2 h-full bg-white/80" />
                </div>
             </div>
          </div>
          
          {/* Share Options */}
          <div className="p-6 bg-neutral-900">
             <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-widest">Share this mood</p>
             <div className="flex justify-around">
                <button className="flex flex-col items-center gap-2 group">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                      <Instagram className="w-6 h-6" />
                   </div>
                   <span className="text-xs text-gray-400">Stories</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                   <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                      <Share2 className="w-6 h-6" />
                   </div>
                   <span className="text-xs text-gray-400">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                   <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                      <Facebook className="w-6 h-6" />
                   </div>
                   <span className="text-xs text-gray-400">Facebook</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                   <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                      <Copy className="w-5 h-5" />
                   </div>
                   <span className="text-xs text-gray-400">Copy Link</span>
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};
