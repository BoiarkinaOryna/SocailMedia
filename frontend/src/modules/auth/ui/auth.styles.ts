import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 343,
    backgroundColor: COLORS.white,
    borderRadius: 32, 
    padding: 30,     
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: 30,
  },

  tab: {
    marginHorizontal: 15, 
    fontWeight: "700",
    fontSize: 24,        
    color: COLORS.blue50,
  },

  activeTab: {
    color: COLORS.black,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.pulm, 
    paddingBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: COLORS.black,
  },

  inputsBlock: {
    gap: 16
  },

  button: {
    marginTop: 24,
    backgroundColor: COLORS.pulm,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
  
  error: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: "500",
    // marginTop: -12,
    // marginBottom: 12,
  },
});
