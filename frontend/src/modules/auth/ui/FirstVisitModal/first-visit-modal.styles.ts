import { COLORS } from "@shared/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: "center",
        paddingTop: 200
    },
    mainContainer: {
        width:343,
        height:385,
        borderRadius:20,
        paddingTop:24,
        paddingRight:16,
        paddingBottom:24,
        paddingLeft:16,
        backgroundColor:COLORS.white,
    },
    detailsHeadline:{
       fontSize: 24,
       fontWeight: '500'
    },
    textGray: {
        color: COLORS.black
    },
    closeButton: {
        alignItems: "flex-end"
    },
    title: {
        alignItems: "center"
    },
    details: {
        paddingVertical: 24,
        gap: 16
    },
    hint:{
        fontSize: 12
    },
    greenText:{
        color: COLORS.green
    },
    buttonContainer:{
        gap:10,
        width:311,
        justifyContent:"flex-end",
        flexDirection:"row"
    },
    button: {
        borderRadius:1234,
        paddingHorizontal:16,
        paddingVertical:10,
        backgroundColor:COLORS.pulm,
        alignItems:"center",   
    },
    buttonText: {
        fontSize: 14,
        fontWeight:'500',
        color:COLORS.white,
    }
})

