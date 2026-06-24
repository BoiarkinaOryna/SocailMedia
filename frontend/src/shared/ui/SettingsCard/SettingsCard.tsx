import { View, Text } from "react-native";
import { CardProps } from "./types";
import { styles } from "./card.styles";


export function SettingsCard(props: CardProps){
    const { title, button, children } = props
    return <View style={styles.container}>
        <View style={styles.headline}>
            <Text style={styles.title}>{ title }</Text>
            { button }
        </View>
        { children }
    </View>
}