import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";
import trackPlayerService from "./src/services/trackPlayerService";
import App from "./App";

TrackPlayer.registerPlaybackService(() => trackPlayerService);
AppRegistry.registerComponent("SP", () => App);
