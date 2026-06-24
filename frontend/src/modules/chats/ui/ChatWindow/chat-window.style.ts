import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 650,
        justifyContent: "space-between",
        marginTop: 8,
        padding: 16,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLORS.blue50
    },
    head: {
        height: 58,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: COLORS.blue50,
        borderBottomWidth: 0.5
    },
    groupInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24
    },
    info: {
        flexDirection: "row",
        gap: 10
    },
    avatar: {
        justifyContent: "center",
        alignItems: "center",
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.pulm
    },
    avatarText: {
        color: COLORS.white,
        fontSize: 16
    },
    modalContainer: {
        position: "absolute",
        right: 0,
        top: 135
    },
    modal: {
        right: 0
    },
    messageBlock: {
        gap: 24,
        // flex: 1
    },
    sendMessageBlock: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 24
    }
})