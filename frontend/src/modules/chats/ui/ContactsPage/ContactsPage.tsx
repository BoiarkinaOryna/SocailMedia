import { useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./contacts.styles";
import { ICONS } from "@shared/icons";
import { COLORS } from "@shared/constants/colors";
import { Link } from "@shared/ui/Links/Links";

const CONTACTS = [
  { id: "1", name: "Jane Cooper", avatar: require("@assets/LinaLi.jpg") },
  { id: "2", name: "Cameron Williamson", avatar: require("@assets/LinaLi.jpg") },
  { id: "3", name: "Leslie Alexander", avatar: require("@assets/LinaLi.jpg") },
  { id: "4", name: "Robert Fox", avatar: require("@assets/LinaLi.jpg") },
  { id: "5", name: "Jacob Jones", avatar: require("@assets/LinaLi.jpg") },
  { id: "6", name: "Brooklyn Simmons", avatar: require("@assets/LinaLi.jpg") },
  { id: "7", name: "Brooklyn Simmons", avatar: require("@assets/LinaLi.jpg") },
];

export function ContactsPage() {
  const [search, setSearch] = useState("");

  const filteredContacts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return CONTACTS;
    }

    return CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedSearch)
    );
  }, [search]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.linksContainer}>
        <Link
          text="Контакти"
          logo
          logoComponent={<ICONS.SvgContacts />}
          linePosition={true}
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

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <ICONS.SvgContacts />
            <Text style={styles.title}>Контакти</Text>
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

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator
        >
          {filteredContacts.map((contact) => (
            <View key={contact.id} style={styles.contactRow}>
              <Image source={contact.avatar} style={styles.avatar} />
              <Text style={styles.contactName}>{contact.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
