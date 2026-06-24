import { COLORS } from "@shared/constants/colors";
import { Dimensions,StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: "center",
        paddingTop: 200,
        backgroundColor: COLORS.background
    },
    modal: {
        width: 375,
        paddingVertical: 24,
        paddingHorizontal: 16, 
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10
    },
    headline: {
        fontSize: 24,
    },
    inputsContainer: {
        paddingVertical: 24
    }
})