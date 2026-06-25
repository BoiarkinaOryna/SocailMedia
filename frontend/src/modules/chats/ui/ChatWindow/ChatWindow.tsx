import { View, Text, Pressable, Image, Modal } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ICONS } from "@shared/icons";
import { Input } from "@shared/ui/Input/Input";
import { Button } from "@shared/ui/Button/Button";
import { Chat } from "./Chat/Chat";
import { styles } from "./chat-window.style";
import { useUserContext } from "@modules/auth/context/user.context";
import { ClientSocket } from "@shared/api/socket/socket";
import { useLazyGetChatInfoQuery } from "@modules/chats/api/chat.api";
import { API_BASE_URL } from "@shared/api/api";
import { GroupOptionsModal } from "../GroupModals/GroupOptionsModal/GroupOptionsModal";
import * as ImagePicker from "expo-image-picker";
import { useNotificationContext } from "@modules/chats/context/notification.context";
import AsyncStorage from "@react-native-async-storage/async-storage";



export function ChatWindow(params: {chatId: number}) {

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false)
  const [secondPersonalChatUser, setSecondPersonalChatUser] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [onlineUserIds, setOnlineUserIds] = useState<number[]>([])
  const [isOnlineText, setIsOnlineText] = useState<string | null>(null)

  const [text, setText] = useState("");


  const {decreaseGroup, decreasePersonal} = useNotificationContext()
  const { token, user } = useUserContext()

  if (!user || !token) return
  const { chatId } = params

  const handleSend = () => {
    if (!text.trim()) return;

    ClientSocket.emit("sendMessage", { chatId, text }, (response: any) => {
      if (response?.status === "error") {
        console.log("send message error:", response.message);
      }
    });
    setText("");

  };


  const handlePickAndSendPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const image = result.assets[0]?.base64;
    if (!image) return;

    ClientSocket.emit(
      "sendMessage",
      {
        chatId,
        text: text.trim(),
        images: [image],
      },
      (response: any) => {
        if (response?.status === "error") {
          console.log("send image message error:", response.message);
        }
      },
    );

    setText("");
  };

  const getImageUrl = (img: string) => {
      const uri = `${API_BASE_URL}/uploads/${img}`
      return uri
  }

  useEffect(() => {
    const handler = (message: any) => {
      setChatMessages((prev) => [...prev, message]);
    };

    ClientSocket.on("newMessage", handler);

    return () => {
      ClientSocket.off("newMessage", handler);
    };
  }, []);

  const [getChatInfo, {data, error, isLoading}] = useLazyGetChatInfoQuery()

  useEffect(() => {
    getChatInfo({ chatId, token });
  }, [chatId]);
  
  useEffect(() => {
    if (!data) return;

    const users = data.chat_app_chat_users;

    if (!data.is_group) {
      const secondUser = users.find(
        (chatUser: any) => chatUser.user_id !== user.id
      );

      setSecondPersonalChatUser(secondUser);
    }

    ClientSocket.emit(
      "getOnlineUsers",
      users.map((u: any) => u.user_id),
      (response: any) => {
        if (response?.status === "error") {
          console.log("get online users error:", response.message);
        } else {
          setOnlineUserIds(response.userIds);
        }
      }
    );

    setChatMessages(data.chat_app_message);

    if (data.is_group){
      console.log("decreasing group")
      decreaseGroup(data.id)
    } else {
      console.log("decreasing personal")
      decreasePersonal(data.id)
    }

  }, [data, user.id]);

  useEffect(() => {
    if (!data || data.is_group || !secondPersonalChatUser) return;

    if (onlineUserIds.includes(secondPersonalChatUser.user_id)) {
      setIsOnlineText("в мережі");
    } else {
      setIsOnlineText("офлайн");
    }
  }, [secondPersonalChatUser, onlineUserIds, data]);

  useEffect(() => {
    if (!data || !data.is_group) return;

    setIsOnlineText(
      `${data.chat_app_chat_users.length} учасники, ${onlineUserIds.length} в мережі`
    );
  }, [onlineUserIds, data]);
  
  const groupName = () => {
    if (data && data.is_group){
      return data.name
    } else{
      if (secondPersonalChatUser?.user_app_user?.first_name){
        return secondPersonalChatUser?.user_app_user?.first_name + " " + secondPersonalChatUser?.user_app_user.last_name
      } else {
        return secondPersonalChatUser?.user_app_user?.profile_app_profile.pseudonym
      }
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.groupInfo}>
            <Pressable onPress={() => router.back()}>
              <ICONS.SvgReturn />
            </Pressable>

            <View style={styles.info}>
              <Image source={{ uri:
                ((data && !data.is_group) && secondPersonalChatUser?.user_app_user?.profile_app_profile?.avatar)
                ? getImageUrl(secondPersonalChatUser?.user_app_user?.profile_app_profile?.avatar) 
                : data && getImageUrl(data.avatar)
              }} style={styles.avatar}/>

              <View>
                <Text>
                  {
                    groupName()
                  }
                </Text>
                <Text>{isOnlineText}</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={() => {setIsOptionsModalOpen(true)}}>
              <ICONS.SvgDots />
          </Pressable>
        </View>

        <View style={styles.messageBlock}>
          <Chat messages={chatMessages} userId={user?.id} />
          <View style={styles.sendMessageBlock}>
            <Input
              style={{ flex: 1 }}
              placeholder="Повідомлення"
              value={text}
              keyboardType="ascii-capable"
              onChangeText={setText}
            />

            <Button icon={<ICONS.SvgMound />} onPress={handlePickAndSendPhoto} />

            <Button
              isDark
              icon={<ICONS.SvgPlane />}
              onPress={() => handleSend()}
            />
          </View>
        </View>
      </View>
        <Modal
          visible={isOptionsModalOpen}
          style={styles.modal}
          transparent
        >
        <View style={styles.modalContainer}>
          <GroupOptionsModal setIsOpen={setIsOptionsModalOpen} chatId={chatId}/>
        </View>
      </Modal>
    </View>
  );
}