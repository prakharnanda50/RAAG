import React, { useState, useEffect } from 'react';
import { Mandala } from './components/Mandala';
import { Player } from './components/Player';
import { GenreBubble } from './components/GenreBubble';
import { ArtistScreen } from './components/ArtistScreen';
import { AlbumScreen } from './components/AlbumScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ShareModal } from './components/ShareModal';
import { APP_NAME, MOODS, MOCK_TRACKS, MOCK_ARTISTS, MOCK_ALBUMS, MOCK_USER } from './constants';
import { MoodType, Screen, Track, Artist, Album, Playlist } from './types';
import { generateRasaDescription, suggestTracks } from './services/geminiService';
import { Home, Compass, Moon, User, Search, Play, Pause, ChevronRight } from 'lucide-react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moodDescription, setMoodDescription] = useState<string>('');
  const [suggestedTracks, setSuggestedTracks] = useState<Track[]>([]);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  // Navigation State Data
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('MOOD');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Mood Selection Handler
  const handleMoodSelect = async (mood: MoodType) => {
    setSelectedMood(mood);
    // Visual feedback delay
    await new Promise(r => setTimeout(r, 500));
    const desc = await generateRasaDescription(mood);
    setMoodDescription(desc);
    setCurrentScreen('HOME');
  };

  // Playback Control
  const togglePlay = () => setIsPlaying(!isPlaying);
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlayerOpen(true);
  };

  const handleAiSearch = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const results = await suggestTracks(aiPrompt);
    setSuggestedTracks(results as Track[]);
    setIsAiLoading(false);
    setAiPrompt('');
  };

  // Navigation Handlers
  const handleArtistClick = (artistId?: string) => {
    if (!artistId) return;
    const artist = MOCK_ARTISTS.find(a => a.id === artistId);
    if (artist) {
      setSelectedArtist(artist);
      setPlayerOpen(false); // Close player if coming from player
      setCurrentScreen('ARTIST');
    }
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentScreen('ALBUM');
  };
  
  const handlePlaylistClick = (playlist: Playlist) => {
     // Reuse Album screen logic for simplicity in this demo, or create dedicated
     // For now, let's treat it as playing the first track
     if (playlist.tracks.length > 0) {
        playTrack(playlist.tracks[0]);
     }
  };

  // Dynamic Background Gradient
  const getGradient = () => {
    if (selectedMood) {
      const moodConfig = MOODS.find(m => m.type === selectedMood);
      return moodConfig ? moodConfig.gradient : 'from-gray-900 to-black';
    }
    return 'from-raag-charcoal to-black';
  };

  /* --- SCREENS --- */

  const renderSplash = () => (
    <div className="flex flex-col items-center justify-center h-screen relative z-10">
      <Mandala opacity="opacity-30" speed="animate-spin-slow" />
      <h1 className="text-6xl md:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-r from-raag-gold via-amber-200 to-raag-saffron animate-pulse-slow tracking-widest drop-shadow-lg">
        {APP_NAME}
      </h1>
      <p className="mt-4 text-raag-gold/60 font-serif tracking-[0.3em] uppercase text-sm animate-breathe">
        Discover your Rasa
      </p>
    </div>
  );

  const renderMoodSelection = () => (
    <div className="flex flex-col items-center justify-center h-screen relative z-10 px-4">
      <h2 className="text-2xl md:text-3xl font-serif text-white/90 mb-12 tracking-wide text-center">
        How do you feel today?
      </h2>
      
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Mood Circle Buttons */}
        {MOODS.map((mood, index) => {
          const angle = (index / MOODS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 140; // distance from center
          const x = Math.cos(angle) * radius + 160 - 32; // 160 is center (half of w-80), 32 is half button size
          const y = Math.sin(angle) * radius + 160 - 32;
          
          return (
            <button
              key={mood.type}
              onClick={() => handleMoodSelect(mood.type)}
              className="absolute w-16 h-16 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-125 transition-all duration-300 group shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              <span className="text-2xl group-hover:animate-bounce">{mood.icon}</span>
              <span className={`absolute -bottom-8 text-xs font-serif tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${mood.color}`}>
                {mood.type}
              </span>
            </button>
          );
        })}
        
        {/* Center Prompt */}
        <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm flex items-center justify-center border border-white/5">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="pb-24 pt-8 px-6 h-full overflow-y-auto no-scrollbar">
       <header className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-2xl font-serif text-white">Namaste, {MOCK_USER.name}</h1>
           <p className={`text-sm mt-1 ${MOODS.find(m => m.type === selectedMood)?.color || 'text-gray-400'}`}>
             {moodDescription || "Immerse yourself."}
           </p>
         </div>
         <button onClick={() => setCurrentScreen('PROFILE')} className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-raag-gold to-raag-saffron">
           <img src={MOCK_USER.avatar} alt="User" className="w-full h-full rounded-full object-cover border-2 border-black" />
         </button>
       </header>

       {/* Recommended Section */}
       <section className="mb-10">
         <div className="flex justify-between items-baseline mb-4">
           <h3 className="text-lg font-serif text-white/90">Curated for {selectedMood}</h3>
           <span className="text-xs text-raag-gold uppercase tracking-wider">View All</span>
         </div>
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {MOCK_TRACKS.filter(t => !selectedMood || t.mood.includes(selectedMood)).map((track) => (
              <div 
                key={track.id} 
                className="flex-shrink-0 w-40 group cursor-pointer"
              >
                <div 
                  onClick={() => playTrack(track)}
                  className="w-40 h-40 rounded-2xl overflow-hidden relative mb-3 shadow-lg"
                >
                  <img src={track.albumArt} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white truncate">{track.title}</h4>
                <p 
                  onClick={(e) => { e.stopPropagation(); handleArtistClick(track.artistId); }}
                  className="text-xs text-gray-400 truncate hover:text-raag-gold hover:underline cursor-pointer"
                >
                  {track.artist}
                </p>
              </div>
            ))}
         </div>
       </section>

       {/* Trending/New Releases */}
       <section className="mb-8">
          <h3 className="text-lg font-serif text-white/90 mb-4">Trending Ragas</h3>
          <div className="space-y-4">
            {MOCK_TRACKS.slice(0,4).map((track, i) => (
              <div 
                key={track.id}
                onClick={() => playTrack(track)} 
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 cursor-pointer"
              >
                <span className="text-raag-gold font-serif text-lg w-4">{i + 1}</span>
                <img src={track.albumArt} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{track.title}</h4>
                  <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-gray-500">{track.duration}</span>
              </div>
            ))}
          </div>
       </section>
    </div>
  );

  const renderDiscover = () => (
    <div className="h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 z-20">
        <h2 className="text-3xl font-serif text-white mb-2">Discover</h2>
        <p className="text-gray-400 text-sm mb-6">Explore the universe of sound</p>
        
        {/* AI Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Describe a feeling (e.g. 'Rainy sunset in Jaipur')..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-12 text-sm text-white focus:outline-none focus:border-raag-gold/50 transition"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button onClick={handleAiSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full hover:bg-raag-gold hover:text-black transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isAiLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
             <Mandala opacity="opacity-50" speed="animate-spin" />
             <p className="mt-4 text-raag-gold text-sm animate-pulse">Consulting the musical archives...</p>
          </div>
        </div>
      )}

      {/* Floating Bubbles */}
      {!isAiLoading && suggestedTracks.length === 0 && (
        <div className="absolute inset-0 pt-32 overflow-hidden">
          <GenreBubble label="Classical" size="8rem" color="#4B0082" top="30%" left="10%" animationDelay="0s" onClick={() => {}} />
          <GenreBubble label="Lo-fi Beats" size="6rem" color="#DC143C" top="60%" left="70%" animationDelay="1s" onClick={() => {}} />
          <GenreBubble label="Fusion" size="7rem" color="#D4AF37" top="20%" left="60%" animationDelay="2s" onClick={() => {}} />
          <GenreBubble label="Sufi" size="6.5rem" color="#008080" top="70%" left="20%" animationDelay="3s" onClick={() => {}} />
          <GenreBubble label="Folk" size="5rem" color="#FF8C00" top="45%" left="45%" animationDelay="1.5s" onClick={() => {}} />
        </div>
      )}

      {/* AI Results */}
      {!isAiLoading && suggestedTracks.length > 0 && (
        <div className="pt-40 px-6 pb-24 overflow-y-auto h-full no-scrollbar">
          <h3 className="text-raag-gold font-serif mb-4">AI Suggestions</h3>
          <div className="space-y-3">
             {suggestedTracks.map((track) => (
                <div key={track.id} onClick={() => playTrack(track)} className="bg-white/5 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition">
                  <img src={track.albumArt} alt="" className="w-12 h-12 rounded object-cover" />
                  <div>
                    <h4 className="text-white font-medium">{track.title}</h4>
                    <p className="text-gray-400 text-xs">{track.artist}</p>
                  </div>
                </div>
             ))}
             <button onClick={() => setSuggestedTracks([])} className="mt-6 text-sm text-gray-400 hover:text-white underline">Clear Results</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderSleep = () => (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-black animate-breathe opacity-50" />
      <Mandala opacity="opacity-5" speed="animate-[spin_120s_linear_infinite]" />
      
      <div className="z-10 text-center space-y-8">
        <h2 className="text-4xl font-serif text-indigo-200/80 tracking-widest">BREATHE</h2>
        
        {/* Breathing Circle Visualization */}
        <div className="w-64 h-64 rounded-full border border-indigo-500/30 flex items-center justify-center relative">
          <div className="w-56 h-56 rounded-full bg-indigo-500/10 animate-breathe blur-2xl absolute" />
          <div className="w-48 h-48 rounded-full border border-indigo-400/20 flex items-center justify-center">
             <span className="text-2xl font-light text-white/50">15:00</span>
          </div>
        </div>

        <div className="flex gap-8 justify-center">
           <button className="flex flex-col items-center gap-2 text-indigo-300/60 hover:text-indigo-200 transition">
             <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
               <Moon className="w-5 h-5" />
             </div>
             <span className="text-xs tracking-widest">SLEEP</span>
           </button>
           <button className="flex flex-col items-center gap-2 text-indigo-300/60 hover:text-indigo-200 transition">
             <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
               <Compass className="w-5 h-5" />
             </div>
             <span className="text-xs tracking-widest">MEDITATE</span>
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full h-[100dvh] bg-raag-black text-white overflow-hidden font-sans transition-colors duration-1000 ease-in-out relative`}>
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-40 transition-all duration-1000`} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

      {/* Main Content Area */}
      <main className="h-full w-full relative z-10">
        {currentScreen === 'SPLASH' && renderSplash()}
        {currentScreen === 'MOOD' && renderMoodSelection()}
        {currentScreen === 'HOME' && renderHome()}
        {currentScreen === 'DISCOVER' && renderDiscover()}
        {currentScreen === 'SLEEP' && renderSleep()}
        {currentScreen === 'PROFILE' && (
          <ProfileScreen 
            user={MOCK_USER} 
            onPlaylistClick={handlePlaylistClick} 
            onCreatePlaylist={() => {}} 
          />
        )}
        {currentScreen === 'ARTIST' && selectedArtist && (
          <ArtistScreen 
            artist={selectedArtist}
            topTracks={MOCK_TRACKS.filter(t => t.artistId === selectedArtist.id)}
            albums={MOCK_ALBUMS.filter(a => a.artistId === selectedArtist.id)}
            onBack={() => setCurrentScreen('HOME')}
            onPlayTrack={playTrack}
            onAlbumClick={handleAlbumClick}
          />
        )}
        {currentScreen === 'ALBUM' && selectedAlbum && (
           <AlbumScreen 
             album={selectedAlbum}
             tracks={MOCK_TRACKS.filter(t => selectedAlbum.trackIds.includes(t.id))}
             onBack={() => setCurrentScreen('ARTIST')} // Simple back flow
             onPlayTrack={playTrack}
           />
        )}
      </main>

      {/* Mini Player */}
      {(currentScreen === 'HOME' || currentScreen === 'DISCOVER' || currentScreen === 'SLEEP' || currentScreen === 'PROFILE') && currentTrack && !playerOpen && (
        <div 
          onClick={() => setPlayerOpen(true)}
          className="fixed bottom-20 left-4 right-4 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center px-4 justify-between z-40 shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img src={currentTrack.albumArt} className="w-10 h-10 rounded-full animate-[spin_10s_linear_infinite]" alt="art" />
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white">{currentTrack.title}</span>
                <span className="text-xs text-raag-gold">{currentTrack.artist}</span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-1" />}
          </button>
        </div>
      )}

      {/* Bottom Navigation (Only on specific screens) */}
      {(currentScreen === 'HOME' || currentScreen === 'DISCOVER' || currentScreen === 'SLEEP' || currentScreen === 'PROFILE') && (
        <nav className="fixed bottom-0 left-0 w-full h-20 bg-black/80 backdrop-blur-lg border-t border-white/5 flex justify-around items-center z-50 pb-2">
            <button onClick={() => setCurrentScreen('HOME')} className={`flex flex-col items-center gap-1 p-2 ${currentScreen === 'HOME' ? 'text-raag-gold' : 'text-gray-500'}`}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] uppercase tracking-wider">Home</span>
            </button>
            <button onClick={() => setCurrentScreen('DISCOVER')} className={`flex flex-col items-center gap-1 p-2 ${currentScreen === 'DISCOVER' ? 'text-raag-gold' : 'text-gray-500'}`}>
              <Search className="w-6 h-6" />
              <span className="text-[10px] uppercase tracking-wider">Discover</span>
            </button>
             <button onClick={() => setCurrentScreen('SLEEP')} className={`flex flex-col items-center gap-1 p-2 ${currentScreen === 'SLEEP' ? 'text-raag-gold' : 'text-gray-500'}`}>
              <Moon className="w-6 h-6" />
              <span className="text-[10px] uppercase tracking-wider">Sleep</span>
            </button>
            <button onClick={() => setCurrentScreen('PROFILE')} className={`flex flex-col items-center gap-1 p-2 ${currentScreen === 'PROFILE' ? 'text-raag-gold' : 'text-gray-500'}`}>
              <User className="w-6 h-6" />
              <span className="text-[10px] uppercase tracking-wider">Library</span>
            </button>
        </nav>
      )}

      {/* Full Screen Player Overlay */}
      {playerOpen && currentTrack && (
        <Player 
          track={currentTrack} 
          isPlaying={isPlaying} 
          onPlayPause={togglePlay} 
          onClose={() => setPlayerOpen(false)} 
          onNext={() => {}}
          onPrev={() => {}}
          onShare={() => setShareOpen(true)}
          onArtistClick={() => handleArtistClick(currentTrack.artistId)}
        />
      )}

      {/* Share Modal Overlay */}
      {shareOpen && currentTrack && (
        <ShareModal track={currentTrack} onClose={() => setShareOpen(false)} />
      )}
    </div>
  );
};

export default App;
