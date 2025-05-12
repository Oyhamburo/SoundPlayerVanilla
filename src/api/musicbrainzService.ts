// src/api/soundcloudService.ts
import axios from "axios";

const SOUNDCLOUD_API_BASE = "https://api.soundcloud.com";
const CLIENT_ID = "TU_CLIENT_ID"; // Reemplaza con tu Client ID de SoundCloud

export interface SoundCloudTrack {
  id: number;
  title: string;
  user: {
    username: string;
  };
  artwork_url: string | null;
  stream_url: string;
  genre: string | null;
}

export const searchTracks = async (
  query: string
): Promise<SoundCloudTrack[]> => {
  const response = await axios.get(`${SOUNDCLOUD_API_BASE}/tracks`, {
    params: {
      q: query,
      client_id: CLIENT_ID,
      limit: 10,
    },
  });
  return response.data;
};

export const getTrackDetails = async (
  trackId: number
): Promise<SoundCloudTrack> => {
  const response = await axios.get(`${SOUNDCLOUD_API_BASE}/tracks/${trackId}`, {
    params: {
      client_id: CLIENT_ID,
    },
  });
  return response.data;
};
