import { ReactNode } from "react"

export interface CardProps{
    title: string
    button: ReactNode
    children?: ReactNode
}