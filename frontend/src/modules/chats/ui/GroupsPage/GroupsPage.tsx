import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Image } from "react-native";
import { skipToken } from "@reduxjs/toolkit/query";
import { router } from "expo-router";

import { useUserContext } from "@modules/auth/context/user.context";
import { useGetMyChatsQuery } from "@modules/chats/api/chat.api";
import { ICONS } from "@shared/icons";
import { Link } from "@shared/ui/Links/Links";

import { styles } from "./groups.styles";
import { API_BASE_URL } from "@shared/api/api";

export function GroupsPage() {
  const [search, setSearch] = useState("");
  const { token } = useUserContext();
  const { data, isLoading } = useGetMyChatsQuery(token ?? skipToken);

  const groups = data?.groups ?? [];
  const filteredGroups = groups.filter((chat) => {
    const name = chat.name || "";
    const message = chat.lastMessage?.text || "";
    const query = search.trim().toLowerCase();

    return !query || name.toLowerCase().includes(query) || message.toLowerCase().includes(query);
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.linksContainer}>
        <Link text="Контакти" logo logoComponent={<ICONS.SvgContacts />} link="/chats/contacts" />
        <Link text="Повідомлення" logo logoComponent={<ICONS.SvgChat />} link="/chats" />
        <Link text="Групові чати" logo logoComponent={<ICONS.SvgChat />} linePosition />
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.titleIconWrap}>
              <ICONS.SvgChat />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{groups.length}</Text>
              </View>
            </View>
            <Text style={styles.title}>Групові чати</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchField}>
            <ICONS.SvgSearch />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Пошук"
              placeholderTextColor="#8F90A6"
              style={styles.searchInput}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {isLoading && (
            <View style={styles.groupRow}>
              <Text style={styles.groupMessage}>Завантаження...</Text>
            </View>
          )}

          {filteredGroups.map((chat) => (
            <Pressable
              key={chat.id}
              style={styles.groupRow}
              onPress={() => router.push(`/chats/${chat.id}`)}
            >
              <Image source={{ uri: `${API_BASE_URL}/uploads/${chat?.avatar}` }} style={styles.groupAvatar}/>

              <View style={styles.groupContent}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupName}>{chat.name || `Group ${chat.id}`}</Text>
                  <Text style={styles.groupDate}>{chat.lastMessage?.created_at?.slice(0, 10)}</Text>
                </View>
                <Text style={styles.groupMessage}>{chat.lastMessage?.text}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
