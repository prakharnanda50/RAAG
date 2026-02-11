import React from 'react';
import { Album, Track } from '../types';
import { Play, ArrowLeft, Shuffle, Heart, Share2, MoreHorizontal } from 'lucide-react';

interface AlbumScreenProps {
  album: Album;
  tracks: Track[];
  onBack: () => void;
  onPlayTrack: (track: Track) => void;
}

export const AlbumScreen: React.FC<AlbumScreenProps> = ({ album, tracks, onBack, onPlayTrack }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 relative bg-raag-black">
      {/* Blurred Background Header */}
      <div className="absolute top-0 left-0 w-full h-80 overflow-hidden z-0 opacity-40">
        <img src={album.coverArt} alt="" className="w-full h-full object-cover blur-3xl scale-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-raag-black" />
      </div>

      <div className="relative z-10 p-6 pt-12">
        <button onClick={onBack} className="mb-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center md:flex-row md:items-end gap-6 mb-8">
           <div className="w-48 h-48 md:w-56 md:h-56 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden">
             <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover" />
           </div>
           <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-serif text-white font-bold mb-2">{album.title}</h1>
              <p className="text-raag-gold text-lg mb-1">{album.artistName}</p>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Album • {album.year}</p>
           </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4">
            <button className="p-3 bg-raag-gold text-black rounded-full hover:scale-105 transition shadow-lg shadow-amber-900/40">
              <Play className="w-6 h-6 fill-current ml-1" />
            </button>
            <button className="p-3 border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition">
              <Shuffle className="w-6 h-6" />
            </button>
            <button className="p-3 border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition">
              <Heart className="w-6 h-6" />
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Tracklist */}
        <div className="bg-white/5 rounded-2xl p-2 border border-white/5">
          {tracks.map((track, i) => (
            <div 
              key={track.id}
              onClick={() => onPlayTrack(track)}
              className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer group transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-mono w-6 text-center">{i + 1}</span>
                <div>
                  <h4 className="text-white font-medium group-hover:text-raag-gold transition">{track.title}</h4>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-xs text-gray-500 font-mono">{track.duration}</span>
                 <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white">
                   <Heart className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
