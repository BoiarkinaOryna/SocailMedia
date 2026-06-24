import { Pressable, Text } from "react-native";
import { ButtonProps } from "./types";
import { styles } from "./button.styles";


export function Button(props: ButtonProps){
    const { icon, text, textPosition, isDark, style, ...rest } = props
    return <Pressable style={[styles.container, isDark && styles.dark, style]} {...rest}>
        { textPosition === "left" && <Text style={isDark && styles.dark}>{text}</Text> }
        { icon }
        { textPosition === "right" && <Text style={isDark && styles.dark}>{text}</Text> }
    </Pressable>
}