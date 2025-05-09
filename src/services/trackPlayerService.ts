// trackPlayerService.ts
import TrackPlayer, { Event } from "react-native-track-player";
import { usePlayerStore } from "../store/usePlayerStore";

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("🔈 RemotePlay");
    usePlayerStore.getState().play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("🔇 RemotePause");
    usePlayerStore.getState().pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log("⏭ RemoteNext");
    usePlayerStore.getState().skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log("⏮ RemotePrevious");
    usePlayerStore.getState().skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    console.log("🎚 RemoteSeek:", position);
    usePlayerStore.getState().seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log("⏹ RemoteStop");
    TrackPlayer.stop();
  });
};
