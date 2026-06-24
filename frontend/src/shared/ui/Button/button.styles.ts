import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";


export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        minWidth: 42,
        padding: 12,
        borderRadius: 190,
        borderWidth: 1,
        borderColor: COLORS.pulm,
        backgroundColor: COLORS.white
    },
    dark: {
        backgroundColor: COLORS.pulm,
        color: COLORS.white
    }
})