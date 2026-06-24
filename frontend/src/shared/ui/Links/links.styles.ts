import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    button:{

    },
    hasLogo:{
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        height: 50
    },
    disabeled:{
        color: COLORS.blue50
    },
    text:{
        fontWeight: 500,
        height: 25,
    },
    topLine:{
        borderTopWidth: 2,
        borderTopColor: COLORS.pulm,
    },
    bottomLine:{
        borderBottomWidth: 2,
        borderBottomColor: COLORS.pulm,
    },
    notification: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 5,
        right: 30,
        width: 15,
        height: 15,
        backgroundColor: COLORS.red,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.white
    },
    notifText: {
        fontSize: 8,
        fontWeight: 800,
        color: COLORS.white
    }
})