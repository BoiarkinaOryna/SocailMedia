import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        gap: 6,
    },    
    label: {
        fontSize: 16,
        color: COLORS.blue50,
        fontWeight: "400",
    },
    inputWrapper:{
        flexDirection: "row",
        borderColor: COLORS.blue50,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
    },
    inputWrapperMultiline: {
        alignItems: "flex-start",
        paddingTop: 12,
        paddingBottom: 12,
    },
    input: {
        flex: 1,
        color: COLORS.blue50,
        fontSize: 16,
    },
    inputMultiline: {
        width: "100%",
        textAlignVertical: "top",
    },
    icon:{
        width: 20,
    },
    errorMessage: {
        color: COLORS.red,
        fontSize: 12
    }
})
