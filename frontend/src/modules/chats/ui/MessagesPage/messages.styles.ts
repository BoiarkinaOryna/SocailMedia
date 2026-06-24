import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLORS.fog,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  card: {
    margin: 8,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.blue10,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleIconWrap: {
    position: "relative",
  },
  notification: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      top: 5,
      right: 30,
      width: 15,
      height: 15,
      backgroundColor: COLORS.red,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.white
  },
  notifText: {
      fontSize: 8,
      fontWeight: 800,
      color: COLORS.white
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.blue50,
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    borderWidth: 1,
    borderColor: COLORS.blue20,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 8,
  },

  listContent: {
    paddingTop: 2,
  },
  messageRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  unreadRow: {
    backgroundColor: COLORS.pulm10,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  statusDot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  onlineDot: {
    backgroundColor: COLORS.green,
  },
  offlineDot: {
    backgroundColor: COLORS.blue20,
  },
  messageContent: {
    flex: 1,
    gap: 4,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  messageName: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.black,
  },
  messageDate: {
    fontSize: 12,
    color: COLORS.blue50,
  },
  messageText: {
    fontSize: 15,
    color: COLORS.black,
  },
});
