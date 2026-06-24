import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        width: 343,
        height: 176,
        gap: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: COLORS.plum50,
    },
    dots: {
        alignItems: "flex-end"
    },
    smallBlock: {
        flexDirection: "row",
        gap: 10
    },
    line: {
        borderWidth: 1,
        borderColor: COLORS.blue20
    }
})