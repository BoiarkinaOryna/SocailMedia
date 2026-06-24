import { COLORS } from "@shared/constants/colors";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
// Вычисляем ширину карточки: экран минус отступы по бокам
const CARD_WIDTH = width - 40; 

export const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.blue20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 14,
        backgroundColor: COLORS.blue20,
    },
    name: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.black,
        marginBottom: 4,
    },
    username: {
        fontSize: 14,
        color: COLORS.blue50,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: COLORS.pulm,
        paddingVertical: 10,
        flex: 1,
        maxWidth: 130,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryText: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: "600",
    },
    secondaryBtn: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: COLORS.pulm,
        paddingVertical: 10,
        flex: 1,
        maxWidth: 130,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryText: {
        color: COLORS.pulm,
        fontSize: 13,
        fontWeight: "600",
    },
});
