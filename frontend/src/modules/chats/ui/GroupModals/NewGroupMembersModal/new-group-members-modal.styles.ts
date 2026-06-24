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
    paddingTop: 24,
    paddingRight: 44,
    paddingBottom: 44,
    paddingLeft: 44,
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
  },
  searchBlock: {
    height: 42,
    width: 309,
    marginBottom: 12,
  },
  inputText: {
    fontSize: 14,
    color: COLORS.black,
  },
  selectedText: {
    marginBottom: 14,
    fontSize: 12,
    color: COLORS.blue50,
  },
  list: {
    width: "100%",
    maxHeight: 420,
  },
  letter: {
    marginTop: 6,
    marginBottom: 8,
    fontSize: 10,
    color: COLORS.black,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: COLORS.black,
    fontWeight: "500",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.pulm,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
  },
  lightButton: {
    minWidth: 98,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  darkButton: {
    minWidth: 64,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
