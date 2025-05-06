import TrackPlayer, { Capability, Event } from "react-native-track-player";
// const track = {
//   id: "1",
//   url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//   title: "Canción de prueba",
//   artist: "Artista de prueba",
// };
// export const setupPlayer = async () => {
//   await TrackPlayer.setupPlayer();
//   await TrackPlayer.add([track]);
//   TrackPlayer.updateOptions({
//     alwaysPauseOnInterruption: false,
//     capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
//     compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
//   });
// };

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
};
