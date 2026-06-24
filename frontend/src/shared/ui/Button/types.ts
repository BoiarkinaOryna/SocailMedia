import { ReactNode } from "react";
import { PressableProps } from "react-native";


export interface ButtonProps extends PressableProps{
    icon?: ReactNode,
    text?: string,
    textPosition?: "left" | "right",
    isDark?: boolean
    style?: object
}