import { AppRegistry } from "react-native";
import App from "./App";

function HeadlessCheck({ isHeadless }) {
  return <App />;
}

AppRegistry.registerComponent("SP", () => HeadlessCheck);
