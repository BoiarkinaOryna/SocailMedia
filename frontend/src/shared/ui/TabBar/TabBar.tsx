import { Pressable, View, Text } from "react-native";
import { ICONS } from "../../icons";
import { styles } from "./tab-bar.styles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNotificationContext } from "@modules/chats/context/notification.context";
import { Notification } from "../Notification/Notification";

export function TabBar(){
    const [ currentPage, setCurrentPage ] = useState<string | null>(null)
    const route = useRoute()
    const routeName = route.name

    const {personalChatNotifications, groupChatNotifications} = useNotificationContext()
    const [notifQuantity, setNotifQuantity] = useState<number | null>(null)

    useEffect(() => {
        const p = personalChatNotifications
            ? personalChatNotifications.split(" ").length
            : 0
        const g =groupChatNotifications
            ? groupChatNotifications.split(" ").length
            : 0
        setNotifQuantity(p + g)
        console.log(
            "personalChatNotifications", personalChatNotifications, p,
            "groupChatNotifications", groupChatNotifications, g,
            "notifQuantity", notifQuantity,
        )

    }, [personalChatNotifications, groupChatNotifications])

    useEffect(() => {
            if (
                routeName === "chats/index" ||
                routeName === "chats/groups" ||
                routeName === "chats/contacts" ||
                routeName === "chats/chat"
            ) {
                setCurrentPage("chats");
            } else if (
                routeName === "friends/index" ||
                routeName === "friends/requests" ||
                routeName === "friends/friends" ||
                routeName === "friends/recommendations"
            ) {
                setCurrentPage("friends");
            } else if (routeName === "(main)/main") {
                setCurrentPage("main")
            } else if (routeName === "(publications)/publications"){
                setCurrentPage("publications")
            } else if (
                routeName === "auth/index" ||
                routeName === "auth/authorization"
            ) {
                setCurrentPage("register")
            }
            else {
                setCurrentPage(null);
            }
        }, [routeName]);
    return currentPage !== "register" && 
        <View style={styles.headerBottom} >
            <View style={styles.linksContainer} >
                <Pressable onPress={() => router.push("/(main)/main")} style={[styles.links, currentPage === "main" && styles.selected]} >
                    <ICONS.SvgHome />
                    <Text style = {styles.h1} >Головна</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/(publications)/publications")} style={[styles.links, currentPage === "publications" && styles.selected]} >
                    <ICONS.SvgMound/>
                    <Text numberOfLines={1}  style = {styles.h1}>Мої Публікіції</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/friends/friends")} style={[styles.links, currentPage === "friends" && styles.selected]} >
                    <ICONS.SvgPeople/>
                    <Text style = {styles.h1}>Друзі</Text>

                </Pressable>
                <Pressable onPress={() => router.push("/chats")} style={[styles.links, currentPage === "chats" && styles.selected]} >
                    <View>
                        <ICONS.SvgChat/>
                        <Notification quantity={notifQuantity}/>
                    </View>

                    <Text style = {styles.h1}>Чати</Text>

                </Pressable>
            </View>

        </View>
}