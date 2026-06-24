import AsyncStorage from "@react-native-async-storage/async-storage";



export async function getPersonalChatNotifications(){
    const personalNotifQ = await AsyncStorage.getItem("personalNotifQ")
    return personalNotifQ
}

export async function getGroupChatNotifications(){
    const groupNotifQ = await AsyncStorage.getItem("groupNotifQ")
    return groupNotifQ
}