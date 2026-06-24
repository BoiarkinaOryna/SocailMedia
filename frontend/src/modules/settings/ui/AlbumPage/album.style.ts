import { COLORS } from "@shared/constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    mainContainer: {
        gap: 10,
        paddingBottom: 200
    },
    linksContainer: {
        flexDirection: "row",
        gap: 20,
        margin: 20,
    },
    horizontalContainer: {
        flexDirection: "row",
        gap: 16
    },
    avatarImageContainer: {
        width: 200,
        height: 200,
    },
    avatarImage: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    imageButtons: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 10,
        width: 200,
        height: 200,
        marginTop: -10,
        marginLeft: -10
    },
    topic: {
        fontSize: 16
    },
    lightText: {
        color: COLORS.blue50
    },
    horizontalLine: {
        borderTopWidth: 1,
        borderColor: COLORS.blue50
    },
    fotosText: {
        fontSize: 16,
        fontWeight: 500,
        color: COLORS.black
    },
    albumImagesContainer: {
        gap: 16,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    albumImageContainer: {
        width: 160,
        height: 160,
    },
    albumImage: {
        width: 160,
        height: 160,
        borderRadius: 10
    },
    albumImageButtons: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 10,
        width: 160,
        height: 160,
        marginTop: -10,
        marginLeft: -10
    },
})