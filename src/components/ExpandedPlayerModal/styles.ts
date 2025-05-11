import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  chevron: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  artworkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  artwork: {
    width: 260,
    height: 260,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
  },
  playerControls: {
    width: "100%",
    alignItems: "center",
  },
  trackInfo: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  artist: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -6,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  time: {
    fontSize: 12,
    color: "#aaa",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    marginTop: 8,
    alignSelf: "center",
    paddingBottom: 20,
  },
  safeArea: {
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    height: screenHeight,
    width: "100%",
    zIndex: 100,
  },
});
