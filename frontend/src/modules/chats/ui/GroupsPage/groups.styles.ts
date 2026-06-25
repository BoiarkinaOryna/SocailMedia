import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.blue10,
    overflow: "hidden",
    margin: 8,
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
  groupRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  unreadRow: {
    backgroundColor: COLORS.pulm10,
  },
  groupAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.pulm,
    alignItems: "center",
    justifyContent: "center",
  },
  groupAvatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  groupContent: {
    flex: 1,
    gap: 4,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  groupName: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.black,
  },
  groupDate: {
    fontSize: 12,
    color: COLORS.blue50,
  },
  groupMessage: {
    fontSize: 15,
    color: COLORS.black,
  },
});
