import { View, Text } from "react-native";
import { styles } from "./notification.styles";

export function Notification(props: {quantity: number | null}){
    const {quantity} = props
    if (!quantity) return

    return <View style={styles.badge}>
        <Text style={styles.badgeText}>{quantity}</Text>
    </View>
}