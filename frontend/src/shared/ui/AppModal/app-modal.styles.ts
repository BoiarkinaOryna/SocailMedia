import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  topRow: {
    minHeight: 24,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 4,
  },
  content: {
    marginTop: 12,
  },
});
