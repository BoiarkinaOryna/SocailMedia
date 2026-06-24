import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";


export const styles = StyleSheet.create({
    headerTop: {
        flexDirection: "row",
        paddingTop:8,
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:8,
        justifyContent: "space-between",
        height: 56,
        backgroundColor: COLORS.white,
    },
    imgWorld:{
        flexDirection:"row",
        alignItems:"center",
        gap:5,
    },
    buttonCon:{
        height:40,
        gap:10,
        flexDirection:"row",
    },
    button:{
        width:40,
        height:40,
        borderRadius:1234,
        borderWidth:1  ,
        borderColor: COLORS.pulm,
        padding:10,
        gap:8,
        alignItems:"center",
        justifyContent:"center",
    },
    selected:{
        borderTopWidth: 2,
        borderTopColor: COLORS.pulm,
    },
    chosenIcon:{
        backgroundColor: COLORS.pulm10
    },
    headerRegister: {
    height: 56,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
},
})