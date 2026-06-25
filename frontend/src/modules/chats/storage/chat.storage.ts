import AsyncStorage from "@react-native-async-storage/async-storage";



export async function getPersonalChatNotifications(){
    const personalNotif = await AsyncStorage.getItem("personalNotif")
    return personalNotif
}

export async function getGroupChatNotifications(){
    const groupNotif = await AsyncStorage.getItem("groupNotif")
    return groupNotif
}