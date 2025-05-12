import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 55,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 8,
    zIndex: 10,
  },
  artworkWrapper: {
    width: 44,
    height: 44,
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: "#2a2a2a",
  },
  placeholder: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  artist: {
    color: "#aaa",
    fontSize: 12,
  },
  playButton: {
    marginLeft: 12,
  },
  progressBarBackground: {
    position: "absolute",
    bottom: 0,
    left: 6,
    right: 6,
    height: 3,
    backgroundColor: "#2a2a2a",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 3,
    backgroundColor: "#1DB954",
  },
});
