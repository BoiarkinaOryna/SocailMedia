import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 200,
        gap: 10,
    },
    linksContainer: {
        flexDirection: "row",
        gap: 20,
        margin: 20,
    },
    profileCard: {
        alignItems: "center",
        gap: 24
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    nameContainer: {
        gap: 10,
        alignItems: "center"
    },
    currentName: {
        fontWeight: 700,
        fontSize: 24
    },
    currentUsername: {
        fontWeight: 500,
        fontSize: 16
    },
    inputContainer: {
        gap: 16,
        width: 330,
    },
    passwordContainer: {
        width: "100%",
        height:40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    passwordText: {
        fontWeight: 500,
        fontSize: 16,
        color: COLORS.black,
    },
    checkListItem: {
        flexDirection: "row",
        opacity: 0.5,
        gap: 10,
    },
    signatureText: {
        fontSize: 16
    },
    pseudonym: {
        fontSize: 16,
        fontWeight: 400
    },
    signatureContainer: {
        alignItems: "center",
        width: 380,
    },
    signature: {
        width: 200,
        height: 100
    }

})