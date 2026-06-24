import { ScrollView, View, Text } from "react-native";
import { styles } from "./chat.styles";
import { Message } from "./chat.types";
import { ChatMessage } from "./Massage/Message";

type Props = {
  messages: Message[];
  userId: number;
};

export function Chat({ messages, userId }: Props) {
  const groupedMessages: Message[][] = [];
  let group: Message[] = [];

  messages.forEach((message, index) => {
    const prev = group[group.length - 1];

    if (!prev || prev.sender_id === message.sender_id) {
      group.push(message);
    } else {
      groupedMessages.push(group);
      group = [message];
    }

    if (index === messages.length - 1) {
      groupedMessages.push(group);
    }
  });

  return (
    <View style={{height: 500}}>
      <ScrollView
        contentContainerStyle={styles.chatContainer}
      >
        {groupedMessages.map((group, i) => (
          <View
            key={i}
            style={[
              styles.sameSenderMessages,
              userId === group[0].sender_id && styles.myMessages,
            ]}
          >
            {group.map((msg) => (
              <ChatMessage
                key={msg.id}
                data={msg}
                isMy={msg.sender_id === userId}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}





/*

import { View, Text, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { ICONS } from "@shared/icons";
import { Input } from "@shared/ui/Input/Input";
import { Button } from "@shared/ui/Button/Button";

import { ChatMessage } from "../Chat/Massage/Message";
import { styles } from "../chat-window.style";

import { useUserContext } from "@modules/auth/context/user.context";
import { ClientSocket } from "@shared/api/socket/socket";
import { useLazyGetChatInfoQuery } from "@modules/chats/api/chat.api";

export function ChatWindow(params: { chatId: number }) {
  const { token, user } = useUserContext();
  if (!user || !token) return null;

  const { chatId } = params;

  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!text.trim()) return;

    ClientSocket.emit("sendMessage", {
      chatId,
      text,
    });

    setText("");
  };

  useEffect(() => {
    const handler = (message: any) => {
      setChatMessages((prev) => [...prev, message]);
    };

    ClientSocket.on("newMessage", handler);

    return () => {
      ClientSocket.off("newMessage", handler);
    };
  }, []);

  const [getChatInfo, { data }] = useLazyGetChatInfoQuery();

  useEffect(() => {
    getChatInfo({ chatId, token });
  }, [chatId]);

  useEffect(() => {
    if (!data) return;

    setChatMessages(data.chat_app_message);
  }, [data]);

  
  return (
    <View style={styles.container}>
      
      <View style={styles.head}>
        <View style={styles.groupInfo}>
          <Pressable onPress={() => router.back()}>
            <ICONS.SvgReturn />
          </Pressable>

          <View style={styles.info}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NG</Text>
            </View>

            <View>
              <Text>
                {data?.name} #{chatId}
              </Text>
              <Text>online</Text>
            </View>
          </View>
        </View>

        <ICONS.SvgDots />
      </View>

      <View style={styles.messageBlock}>
        <FlatList
          ref={listRef}
          data={[...chatMessages].reverse()}
          keyExtractor={(item) => String(item.id)}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }) => (
            <ChatMessage
              data={item}
              isMy={item.sender_id === user.id}
            />
          )}
          onContentSizeChange={() => {
            listRef.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
          }}
        />

        <View style={styles.sendMessageBlock}>
          <Input
            style={{ flex: 1 }}
            placeholder="Повідомлення"
            value={text}
            onChangeText={setText}
          />

          <Button icon={<ICONS.SvgMound />} />

          <Button
            isDark
            icon={<ICONS.SvgPlane />}
            onPress={handleSend}
          />
        </View>
      </View>
    </View>
  );
}
*/