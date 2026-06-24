import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column-reverse",
    padding: 12,
    paddingBottom: 150,
    gap: 12,
  },
  empty: {
    minHeight: 220,
    borderWidth: 1,
    borderColor: COLORS.blue10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.fog,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.blue50,
    textAlign: "center",
    lineHeight: 22,
  },
});
