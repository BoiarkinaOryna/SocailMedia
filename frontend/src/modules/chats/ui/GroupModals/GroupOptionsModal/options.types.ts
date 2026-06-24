import { Dispatch, SetStateAction } from "react";

export type GroupOptionsModalProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    chatId: number
}