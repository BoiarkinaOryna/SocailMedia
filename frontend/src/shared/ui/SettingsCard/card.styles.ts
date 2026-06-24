import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        backgroundColor: COLORS.white,
    },
    headline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        color: COLORS.black
    }
})