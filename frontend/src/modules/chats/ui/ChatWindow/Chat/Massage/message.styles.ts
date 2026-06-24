import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  message: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderRadius: 6,
    borderColor: COLORS.blue50,
    borderWidth: 0.5,
    gap: 10,
  },
  myMessage: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderRadius: 6,
    backgroundColor: COLORS.blue20,
    gap: 10,
  },
  content: {
    gap: 8,
  },
  text: {
    maxWidth: 250,
    fontSize: 14,
  },
  time: {
    width: 30,
    fontSize: 10,
  },
});