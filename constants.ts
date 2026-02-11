import { MoodConfig, MoodType, Track, Artist, Album, UserProfile, Playlist } from './types';

export const APP_NAME = "RAAG";

export const MOODS: MoodConfig[] = [
  {
    type: MoodType.SHANTA,
    color: 'text-cyan-300',
    gradient: 'from-cyan-900 via-blue-900 to-black',
    description: 'Peace & Tranquility',
    icon: '🧘'
  },
  {
    type: MoodType.KARUNA,
    color: 'text-violet-300',
    gradient: 'from-violet-900 via-fuchsia-900 to-black',
    description: 'Compassion & Soul',
    icon: '🥺'
  },
  {
    type: MoodType.VEERA,
    color: 'text-orange-400',
    gradient: 'from-orange-800 via-red-900 to-black',
    description: 'Energy & Valor',
    icon: '🔥'
  },
  {
    type: MoodType.HASYA,
    color: 'text-yellow-300',
    gradient: 'from-yellow-700 via-orange-800 to-black',
    description: 'Joy & Laughter',
    icon: '✨'
  },
  {
    type: MoodType.SRINGARA,
    color: 'text-rose-400',
    gradient: 'from-rose-900 via-pink-900 to-black',
    description: 'Love & Devotion',
    icon: '🌹'
  },
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    name: 'Pt. Ravi Shankar',
    image: 'https://images.unsplash.com/photo-1525926477800-7a3be580c765?q=80&w=1000&auto=format&fit=crop', // Sitar imagery
    bio: 'The maestro who brought Indian classical music to the world stage. His sitar resonates with the soul of India.',
    monthlyListeners: '2.5M'
  },
  {
    id: 'a2',
    name: 'Kaushiki Chakraborty',
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop', // Female vocalist imagery
    bio: 'A powerhouse of the Patiala Gharana, known for her intricate tans and soulful renditions.',
    monthlyListeners: '850K'
  },
  {
    id: 'a3',
    name: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop', // Band imagery
    bio: 'Pioneers of Indian fusion rock, blending folk roots with modern rhythms.',
    monthlyListeners: '1.2M'
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'al1',
    title: 'Sounds of the Valley',
    artistId: 'a1',
    artistName: 'Pt. Ravi Shankar',
    coverArt: 'https://picsum.photos/400/400?random=1',
    year: '1998',
    trackIds: ['1', '101', '102']
  },
  {
    id: 'al2',
    title: 'Pure Devotion',
    artistId: 'a2',
    artistName: 'Kaushiki Chakraborty',
    coverArt: 'https://picsum.photos/400/400?random=2',
    year: '2015',
    trackIds: ['2']
  }
];

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight Raga',
    artist: 'Pt. Ravi Shankar',
    artistId: 'a1',
    albumId: 'al1',
    albumArt: 'https://picsum.photos/400/400?random=1',
    duration: '12:45',
    mood: [MoodType.SHANTA, MoodType.KARUNA]
  },
  {
    id: '2',
    title: 'Morning Dew (Bhairav)',
    artist: 'Kaushiki Chakraborty',
    artistId: 'a2',
    albumId: 'al2',
    albumArt: 'https://picsum.photos/400/400?random=2',
    duration: '08:30',
    mood: [MoodType.SHANTA, MoodType.ADBHUTA]
  },
  {
    id: '3',
    title: 'Eternal Flame',
    artist: 'Ustad Zakir Hussain',
    artistId: 'a3', // Linked for demo purposes
    albumArt: 'https://picsum.photos/400/400?random=3',
    duration: '06:15',
    mood: [MoodType.VEERA]
  },
  {
    id: '4',
    title: 'Monsoon Malhar',
    artist: 'Kishori Amonkar',
    albumArt: 'https://picsum.photos/400/400?random=4',
    duration: '15:20',
    mood: [MoodType.KARUNA, MoodType.SRINGARA]
  },
  {
    id: '5',
    title: 'Golden Hour Fusion',
    artist: 'Indian Ocean',
    artistId: 'a3',
    albumArt: 'https://picsum.photos/400/400?random=5',
    duration: '04:50',
    mood: [MoodType.HASYA, MoodType.VEERA]
  },
  {
    id: '6',
    title: 'Sufi Soul',
    artist: 'Nusrat Fateh Ali Khan',
    albumArt: 'https://picsum.photos/400/400?random=6',
    duration: '09:10',
    mood: [MoodType.SRINGARA, MoodType.KARUNA]
  },
  {
    id: '101',
    title: 'Alap in C Major',
    artist: 'Pt. Ravi Shankar',
    artistId: 'a1',
    albumId: 'al1',
    albumArt: 'https://picsum.photos/400/400?random=1',
    duration: '10:00',
    mood: [MoodType.SHANTA]
  },
  {
    id: '102',
    title: 'Gat (Fast Tempo)',
    artist: 'Pt. Ravi Shankar',
    artistId: 'a1',
    albumId: 'al1',
    albumArt: 'https://picsum.photos/400/400?random=1',
    duration: '05:30',
    mood: [MoodType.VEERA]
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Aarya',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  isPremium: true,
  topMoods: [MoodType.SHANTA, MoodType.VEERA],
  likedTrackIds: ['1', '4'],
  playlists: [
    {
      id: 'p1',
      title: 'Morning Meditation',
      description: 'Start the day with peace.',
      tracks: [MOCK_TRACKS[0], MOCK_TRACKS[1]],
      coverArt: 'https://picsum.photos/400/400?random=10',
      isCustom: true
    },
    {
      id: 'p2',
      title: 'Sunset Vibes',
      description: 'Evening ragas for relaxation.',
      tracks: [MOCK_TRACKS[4]],
      coverArt: 'https://picsum.photos/400/400?random=11',
      isCustom: true
    }
  ]
};
