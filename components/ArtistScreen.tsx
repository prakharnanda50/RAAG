import React from 'react';
import { Artist, Track, Album } from '../types';
import { Play, ArrowLeft, Heart, Disc } from 'lucide-react';
import { Mandala } from './Mandala';

interface ArtistScreenProps {
  artist: Artist;
  topTracks: Track[];
  albums: Album[];
  onBack: () => void;
  onPlayTrack: (track: Track) => void;
  onAlbumClick: (album: Album) => void;
}

export const ArtistScreen: React.FC<ArtistScreenProps> = ({ artist, topTracks, albums, onBack, onPlayTrack, onAlbumClick }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 relative bg-raag-black">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 w-full">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-raag-black via-raag-black/60 to-transparent" />
        <div className="absolute top-4 left-4 z-20">
          <button onClick={onBack} className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 drop-shadow-lg">{artist.name}</h1>
          <p className="text-gray-300 text-sm mb-4">{artist.monthlyListeners} Monthly Listeners</p>
          <div className="flex gap-4">
             <button className="px-6 py-2 bg-raag-gold text-black font-bold rounded-full hover:bg-white transition shadow-[0_0_15px_rgba(212,175,55,0.4)]">
               Follow
             </button>
             <button className="p-2 border border-white/20 rounded-full text-white hover:bg-white/10">
               <Heart className="w-6 h-6" />
             </button>
          </div>
        </div>
        
        <Mandala opacity="opacity-20" speed="animate-spin-slow" />
      </div>

      <div className="p-6 relative z-10">
        <p className="text-gray-400 font-serif leading-relaxed mb-8">{artist.bio}</p>

        {/* Popular Tracks */}
        <h2 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
          <Play className="w-4 h-4 text-raag-gold fill-current" /> Popular
        </h2>
        <div className="space-y-2 mb-8">
          {topTracks.map((track, i) => (
            <div 
              key={track.id} 
              onClick={() => onPlayTrack(track)}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition group cursor-pointer"
            >
              <span className="text-gray-500 font-mono w-4">{i + 1}</span>
              <img src={track.albumArt} alt={track.title} className="w-10 h-10 rounded object-cover" />
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-raag-gold transition">{track.title}</h3>
                <p className="text-xs text-gray-500">{track.duration}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 text-white">
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          ))}
        </div>

        {/* Albums */}
        {albums.length > 0 && (
          <>
            <h2 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
              <Disc className="w-4 h-4 text-raag-gold" /> Discography
            </h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {albums.map((album) => (
                <div 
                  key={album.id} 
                  onClick={() => onAlbumClick(album)}
                  className="w-36 flex-shrink-0 cursor-pointer group"
                >
                  <div className="w-36 h-36 rounded-lg overflow-hidden mb-2 relative">
                    <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <Disc className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white truncate">{album.title}</h3>
                  <p className="text-xs text-gray-500">{album.year}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
