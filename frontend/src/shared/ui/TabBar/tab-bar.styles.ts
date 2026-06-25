import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";


export const styles = StyleSheet.create({
    headerBottom:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        paddingBottom: 16,
        backgroundColor: COLORS.white,
    },
    linksContainer:{
        flexDirection: "row",
        justifyContent:"space-between",
        height:54,
        paddingLeft: 16,
        paddingRight: 16, 
        gap: 20,   
    },
    links:{
        height: 54,
        borderRadius:2,
        paddingTop: 8 ,
        paddingRight:8,
        paddingBottom:4,
        paddingLeft:8,  
        alignItems:"center",
        justifyContent: "center",
        gap: 6,
    },
    h1:{
        fontWeight: 500,
        textAlign: "center",
    },
    selected:{
        borderTopWidth: 2,
        borderTopColor: COLORS.pulm,
    },
    // notification: {
    //     position: "absolute",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     top: 3,
    //     right: 8,
    //     width: 15,
    //     height: 15,
    //     backgroundColor: COLORS.red,
    //     borderRadius: 12,
    //     borderWidth: 1,
    //     borderColor: COLORS.white
    // },
    // notifText: {
    //     fontSize: 8,
    //     fontWeight: 800,
    //     color: COLORS.white
    // }
})