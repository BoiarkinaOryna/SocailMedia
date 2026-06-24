import { Message } from "../chat.types";

export interface ChatMessageProps {
    data: Message,
    isMy: boolean
}