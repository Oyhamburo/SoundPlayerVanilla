// store/usePlayerStore.ts
import { create } from "zustand";
import TrackPlayer, { Track, Capability } from "react-native-track-player";
import { mockPlaylist } from "../utils/mockPlaylist";

type PlayerState = {
  isReady: boolean;
  isPlaying: boolean;
  currentTrack: Track | null;
  progress: {
    position: number;
    duration: number;
  };
  setup: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  seekTo: (seconds: number) => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isReady: false,
  isPlaying: false,
  currentTrack: null,
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
    const track = await TrackPlayer.getCurrentTrack();
    const trackObj = track != null ? await TrackPlayer.getTrack(track) : null;
    set({ currentTrack: trackObj });
  },

  skipToPrevious: async () => {
    await TrackPlayer.skipToPrevious();
    const track = await TrackPlayer.getCurrentTrack();
    const trackObj = track != null ? await TrackPlayer.getTrack(track) : null;
    set({ currentTrack: trackObj });
  },

  seekTo: async (seconds: number) => {
    await TrackPlayer.seekTo(seconds);
  },
}));
