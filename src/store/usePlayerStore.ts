// store/usePlayerStore.ts
import { create } from "zustand";
import TrackPlayer, { Track, Capability } from "react-native-track-player";
import { mockPlaylist } from "../utils/mockPlaylist";
import { CATEGORY_COLORS } from "../styles/colors";

type PlayerState = {
  isReady: boolean;
  isPlaying: boolean;
  currentTrack: Track | null;
  progress: {
    position: number;
    duration: number;
  };
  backgroundColor: string;
  setup: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  seekTo: (seconds: number) => Promise<void>;
  setBackgroundColor: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isReady: false,
  isPlaying: false,
  currentTrack: null,
  backgroundColor: CATEGORY_COLORS["lofi"],
  progress: {
    position: 0,
    duration: 0,
  },

  setup: async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      alwaysPauseOnInterruption: false,
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
    await TrackPlayer.add(mockPlaylist);

    const track = await TrackPlayer.getTrack(0);
    set({ isReady: true, currentTrack: track });
    get().setBackgroundColor();
  },

  play: async () => {
    await TrackPlayer.play();
    set({ isPlaying: true });
  },

  pause: async () => {
    await TrackPlayer.pause();
    set({ isPlaying: false });
  },

  skipToNext: async () => {
    await TrackPlayer.skipToNext();
    get().setBackgroundColor();
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObj =
      trackIndex != null ? await TrackPlayer.getTrack(trackIndex) : null;

    set({ currentTrack: trackObj });
  },

  skipToPrevious: async () => {
    await TrackPlayer.skipToPrevious();
    get().setBackgroundColor();
    const track = await TrackPlayer.getCurrentTrack();
    const trackObj = track != null ? await TrackPlayer.getTrack(track) : null;
    set({ currentTrack: trackObj });
  },
  seekTo: async (seconds: number) => {
    await TrackPlayer.seekTo(seconds);
  },
  setBackgroundColor: () => {
    const currentTrack = get().currentTrack;
    const newBackgroundColor =
      CATEGORY_COLORS[currentTrack?.category] || "black";
    set({ backgroundColor: newBackgroundColor });
  },
}));
