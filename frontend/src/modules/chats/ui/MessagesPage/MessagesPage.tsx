import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { skipToken } from "@reduxjs/toolkit/query";
import { router } from "expo-router";

import { useUserContext } from "@modules/auth/context/user.context";
import { useGetMyChatsQuery } from "@modules/chats/api/chat.api";
import { COLORS } from "@shared/constants/colors";
import { ICONS } from "@shared/icons";
import { Link } from "@shared/ui/Links/Links";
import { styles } from "./messages.styles";
import { API_BASE_URL } from "@shared/api/api";
import { useNotificationContext } from "@modules/chats/context/notification.context";

const FALLBACK_AVATAR = require("@assets/LinaLi.jpg");

const getUserName = (participant?: {
  id: number;
  pseudonym: string | null;
  username: string | null;
}) => participant
  ? participant.pseudonym || participant.username || `User ${participant.id}`
  : "";

export function MessagesPage() {
  const [search, setSearch] = useState("");
  const { token, user } = useUserContext();
  const { data, isLoading } = useGetMyChatsQuery(token ?? skipToken);

  const {personalChatNotificationsQ} = useNotificationContext()
  

  const chats = data?.personal ?? [];
  const filteredChats = chats.filter((chat) => {
    const participant =
      chat.participants.find((item) => item.id !== user?.id) ??
      chat.participants[0];
    const name = getUserName(participant) || chat.name || "";
    const message = chat.lastMessage?.text || "";
    const query = search.trim().toLowerCase();

    return !query || name.toLowerCase().includes(query) || message.toLowerCase().includes(query);
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.linksContainer}>
        <Link text="Контакти" logo logoComponent={<ICONS.SvgContacts />} link="/chats/contacts" />
        <Link text="Повідомлення" logo logoComponent={<ICONS.SvgChat />} linePosition />
        <Link text="Групові чати" logo logoComponent={<ICONS.SvgChat />} link="/chats/groups" />
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.titleIconWrap}>
              <ICONS.SvgChat />
              <View style={styles.notification}>
                  <Text style={styles.notifText}>{personalChatNotificationsQ}</Text>
              </View>
            </View>
            <Text style={styles.title}>Повідомлення</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchField}>
            <ICONS.SvgSearch />
            <TextInput
              placeholder="Пошук"
              placeholderTextColor={COLORS.blue50}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator>
          {isLoading && (
            <View style={styles.messageRow}>
              <Text style={styles.messageText}>Завантаження...</Text>
            </View>
          )}

          {filteredChats.map((chat) => {
            const participant =
              chat.participants.find((item) => item.id !== user?.id) ??
              chat.participants[0];
            const name = getUserName(participant) || chat.name || `Chat ${chat.id}`;
            const avatar = participant?.avatar
              ? { uri: `${API_BASE_URL}/uploads/${participant.avatar}` }
              : FALLBACK_AVATAR;

            return (
              <Pressable onPress={() => router.push(`/chats/${chat.id}`)} key={chat.id}>
                <View style={styles.messageRow}>
                  <View style={styles.avatarWrap}>
                    <Image source={avatar} style={styles.avatar} />
                    <View style={[styles.statusDot, styles.offlineDot]} />
                  </View>

                  <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                      <Text style={styles.messageName}>{name}</Text>
                      <Text style={styles.messageDate}>{chat.lastMessage?.created_at?.slice(0, 10)}</Text>
                    </View>
                    <Text style={styles.messageText}>{chat.lastMessage?.text}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
