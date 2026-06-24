import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modal: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  title: {
    marginBottom: 22,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
  },
  field: {
    marginBottom: 18,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.pulm,
    marginBottom: 18,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  photoActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 20,
  },
  photoAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  photoText: {
    color: COLORS.pulm,
    fontSize: 13,
    fontWeight: "500",
  },
  sectionTitle: {
    marginBottom: 10,
    color: COLORS.black,
    fontSize: 13,
    fontWeight: "500",
  },
  members: {
    gap: 8,
    marginBottom: 20,
  },
  memberRow: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  memberName: {
    flex: 1,
    color: COLORS.black,
    fontSize: 13,
    fontWeight: "600",
  },
  deleteButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  backButton: {
    minWidth: 64,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  createButton: {
    minWidth: 118,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
