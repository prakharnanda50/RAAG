export type Screen = 'SPLASH' | 'MOOD' | 'HOME' | 'PLAYER' | 'DISCOVER' | 'SLEEP' | 'ARTIST' | 'ALBUM' | 'PROFILE' | 'LIBRARY';

export enum MoodType {
  SHANTA = 'Shanta', // Peace
  KARUNA = 'Karuna', // Compassion
  VEERA = 'Veera',   // Heroism/Energy
  HASYA = 'Hasya',   // Joy
  SRINGARA = 'Sringara', // Love
  ADBHUTA = 'Adbhuta' // Wonder
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  monthlyListeners: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverArt: string;
  year: string;
  trackIds: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string; // Optional for compatibility with old mocks
  albumId?: string;  // Optional for compatibility with old mocks
  albumArt: string;
  duration: string;
  mood: MoodType[];
  url?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  tracks: Track[];
  coverArt: string;
  isCustom?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  isPremium: boolean;
  topMoods: MoodType[];
  playlists: Playlist[];
  likedTrackIds: string[];
}

export interface MoodConfig {
  type: MoodType;
  color: string;
  gradient: string;
  description: string;
  icon: string;
}
