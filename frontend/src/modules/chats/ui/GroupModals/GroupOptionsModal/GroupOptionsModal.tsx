import { ICONS } from "@shared/icons";
import { View, Text, Pressable } from "react-native";
import { styles } from "./options.styles";
import { GroupOptionsModalProps } from "./options.types";
import { useDeleteChatMutation } from "@modules/chats/api/chat.api";
import { useUserContext } from "@modules/auth/context/user.context";

export function GroupOptionsModal(props: GroupOptionsModalProps){
    const {setIsOpen, chatId} = props
    const {token} = useUserContext()

    const [deleteChat, {isLoading, error}] = useDeleteChatMutation()

    return <View style={styles.background}>
        <View style={styles.dots}>
            <Pressable onPress={() => {setIsOpen(false)}}>
                <ICONS.SvgDots />
            </Pressable>
        </View>
        <View style={styles.smallBlock}>
            <ICONS.SvgMound/>
            <Text>Медіа</Text>
        </View>
        <View style={styles.smallBlock}>
            <ICONS.SvgPen/>
            <Text>Редагувати групу</Text>
        </View>
        <View style={styles.line}/>
        <Pressable
            onPress={() => {
                deleteChat({id: chatId, token: token!})
            }}
            style={styles.smallBlock}
        >
            <ICONS.SvgTrashcan/>
            <Text>Видалити чат</Text>
        </Pressable>
    </View>
}