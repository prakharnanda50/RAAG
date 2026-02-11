import React, { useState } from 'react';
import { UserProfile, Playlist, Track } from '../types';
import { Settings, Plus, User, Music, ChevronRight, Play } from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  onPlaylistClick: (playlist: Playlist) => void;
  onCreatePlaylist: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onPlaylistClick, onCreatePlaylist }) => {
  const [activeTab, setActiveTab] = useState<'PLAYLISTS' | 'LIKED' | 'ARTISTS'>('PLAYLISTS');

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 relative bg-raag-black">
      <div className="absolute inset-0 bg-gradient-to-b from-raag-indigo/20 via-black to-black pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-16 px-6 pb-8 flex flex-col items-center">
        <div className="absolute top-6 right-6">
          <button className="p-2 text-gray-400 hover:text-white">
            <Settings className="w-6 h-6" />
          </button>
        </div>
        
        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-raag-gold via-raag-saffron to-raag-crimson mb-4 relative">
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-black" />
          {user.isPremium && (
            <div className="absolute bottom-0 right-0 bg-raag-gold text-black text-[10px] font-bold px-2 py-1 rounded-full border-2 border-black">
              PREMIUM
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-serif text-white mb-1">{user.name}</h1>
        <div className="flex gap-2 mb-6">
          {user.topMoods.map(mood => (
            <span key={mood} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300 font-serif">
              {mood}
            </span>
          ))}
        </div>

        {/* Stats / Rasa Analysis Placeholder */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex mb-8 max-w-xs">
          <div className="h-full bg-raag-gold w-[40%]" />
          <div className="h-full bg-raag-crimson w-[30%]" />
          <div className="h-full bg-raag-indigo w-[30%]" />
        </div>
      </div>

      {/* Library Tabs */}
      <div className="px-6">
        <div className="flex border-b border-white/10 mb-6">
           {['PLAYLISTS', 'LIKED', 'ARTISTS'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-3 text-sm font-medium tracking-wider transition relative ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}
             >
               {tab}
               {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-raag-gold shadow-[0_-5px_10px_rgba(212,175,55,0.5)]" />}
             </button>
           ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'PLAYLISTS' && (
            <>
              <button 
                onClick={onCreatePlaylist}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/10 to-transparent border border-white/5 hover:border-white/20 transition group"
              >
                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-white group-hover:bg-raag-gold group-hover:text-black transition">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium">Create Playlist</h3>
                  <p className="text-xs text-gray-400">Curate your own Rasa</p>
                </div>
              </button>

              {user.playlists.map(playlist => (
                <div 
                  key={playlist.id} 
                  onClick={() => onPlaylistClick(playlist)}
                  className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition"
                >
                  <img src={playlist.coverArt} alt={playlist.title} className="w-16 h-16 rounded shadow-lg" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{playlist.title}</h3>
                    <p className="text-xs text-gray-400">{playlist.tracks.length} Tracks • {playlist.isCustom ? 'By You' : 'RAAG'}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              ))}
            </>
          )}

          {activeTab === 'LIKED' && (
             <div className="text-center py-10 text-gray-500">
                <Music className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Your collection of cherished tunes.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
