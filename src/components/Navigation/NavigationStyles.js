import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  navigationBlock: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  itemBlock: {
    textAlign: "center",
    fontWeight: "700"
  },
  buttonContainer: {
      flex: 1,
      padding: 10
  },
  itemButton: {
    borderRadius: Platform.OS === "ios" ? 20 : 0
  }
});
