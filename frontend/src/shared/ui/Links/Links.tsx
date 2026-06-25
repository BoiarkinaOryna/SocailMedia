import { Pressable ,Text, View} from "react-native";
import { LinksProps } from "./links.types";
import { styles } from "./links.styles"
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useNotificationContext } from "@modules/chats/context/notification.context";
import { Notification } from "../Notification/Notification";

export function Link(prop: LinksProps){
    const {text, link, logo, logoComponent, disabeled, linePosition} = prop

    const {personalChatNotifications, groupChatNotifications} = useNotificationContext()
    const [notifQuantity, setNotifQuantity] = useState<number | null>(null)

    useEffect(() => {
        let value = 0
        if (text === "Повідомлення"){
            value = personalChatNotifications ? personalChatNotifications.split(" ").length : 0
        } else if (text === "Групові чати") groupChatNotifications ? groupChatNotifications.split(" ").length : 0
        setNotifQuantity(value)

    }, [personalChatNotifications, groupChatNotifications])
    

    return <Pressable
        onPress={() => link && router.push(link)}
        style={[styles.button, logo && styles.hasLogo, linePosition ? styles.topLine
            : linePosition == false && styles.bottomLine
        ]}
    >   
        <View>
            {logo && logoComponent}
            {(logo && (text === "Повідомлення" || text === "Групові чати") && (notifQuantity !== 0)) && 
                <Notification quantity={notifQuantity} />
                // <View style={styles.notification}>
                //     <Text style={styles.notifText}>{notifQuantity}</Text>
                // </View>
            }
        </View>
        {disabeled ? <Text style={[styles.disabeled, styles.text]}>{text}</Text>
        : <Text style={styles.text}>{text}</Text>}
    
   </Pressable>
}