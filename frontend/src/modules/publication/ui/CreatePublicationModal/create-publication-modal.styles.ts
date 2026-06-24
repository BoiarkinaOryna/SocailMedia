import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  modal: {
    width: 375,
    paddingTop: 24,
    paddingBottom: 44,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.black,
  },
  contentContainer: {
    paddingBottom: 8,
  },
  inputsContainer: {
    gap: 16,
  },
  topicSection: {
    gap: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: COLORS.pulm10,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.pulm,
  },
  addTagButton: {
    width: 30,
    minWidth: 34,
    height: 34,
    padding: 0,
    alignItems: "center",
  },
  linkBlock: {
    gap: 6,
  },
  linkSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  linkInputWrapper: {
    flex: 1,
  },
  darkLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "400",
  },
  textArea: {
    height: 140,
    textAlignVertical: "top",
    paddingTop: 14,
    paddingBottom: 14,
    gap: 10,
  },
  linkPlusButton: {
    width: 30,
    minWidth: 34,
    height: 34,
    padding: 0,
    borderRadius: 17,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  mediaActions: {
    flexDirection: "row",
    gap: 13,
  },
  circleButton: {
    width: 40,
    height: 40,
    padding: 10,
    alignItems: "center",
  },
  submitButton: {
    width: 130,
    paddingHorizontal: 18,
    alignItems: "center",
  },
});
