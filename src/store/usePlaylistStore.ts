import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
  uri: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlaylistState {
  playlists: Playlist[];
  addPlaylist: (name: string) => void;
  removePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      playlists: [],

      addPlaylist: (name) => {
        const newPlaylist: Playlist = {
          id: Date.now().toString(),
          name,
          tracks: [],
        };
        set({ playlists: [...get().playlists, newPlaylist] });
      },

      removePlaylist: (id) => {
        set({ playlists: get().playlists.filter((p) => p.id !== id) });
      },

      addTrackToPlaylist: (playlistId, track) => {
        set({
          playlists: get().playlists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: [...playlist.tracks, track],
                }
              : playlist
          ),
        });
      },

      removeTrackFromPlaylist: (playlistId, trackId) => {
        set({
          playlists: get().playlists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: playlist.tracks.filter((t) => t.id !== trackId),
                }
              : playlist
          ),
        });
      },
    }),
    {
      name: "playlist-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
