import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        minWidth: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: COLORS.white,
        backgroundColor: COLORS.red,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
    },
    badgeText: {
        fontSize: 9,
        color: COLORS.white,
        fontWeight: "700",
    },
})