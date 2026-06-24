import { useUserContext } from "@modules/auth/context/user.context";
import { ChatWindow } from "@modules/chats/ui/ChatWindow/ChatWindow";
import { styles } from "@modules/chats/ui/GroupsPage/groups.styles";
import { ClientSocket } from "@shared/api/socket/socket";
import { ICONS } from "@shared/icons";
import { Link } from "@shared/ui/Links/Links";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Chat(){
    const params = useLocalSearchParams<{ chatId: string }>();
    const chatId = Number(params.chatId);
    console.log("chatId", chatId)
    const {token} = useUserContext()

    const connectAndJoinChat = (chatId: number) => {
        if (!ClientSocket.connected) {
            ClientSocket.auth = {
                token: `Bearer ${token}`,
            };

            ClientSocket.connect();
        }

        ClientSocket.once("connect", () => {
            console.log("Connected:", ClientSocket.id);

            ClientSocket.emit(
                "joinChat",
                { chatId },
                (response: any) => {
                    console.log("join response:", response);
                },
            );
        });
    };

    useEffect(() => {
        if (isNaN(chatId)) return;
        console.log("in use effect")
		// ClientSocket.emit("joinChat", { chatId }, (response: any) => {
		// 	console.log(`Joined chat ${chatId} with response:`, response);
		// });
		// return () => {
		// 	ClientSocket.emit("leaveChat", { chatId });
		// };
        
        connectAndJoinChat(chatId)
	}, [chatId]);

    return <View style={styles.mainContainer}>
            <View style={styles.linksContainer}>
            <Link
                text="Контакти"
                logo
                logoComponent={<ICONS.SvgContacts />}
                link="/chats/contacts"
            />
            <Link
                text="Повідомлення"
                logo
                logoComponent={<ICONS.SvgChat />}
                link="/chats"
            />
            <Link
                text="Групові чати"
                logo
                logoComponent={<ICONS.SvgChat />}
                link="/chats/groups"
            />
        </View>
        <ChatWindow chatId={chatId} />
    </View>
}