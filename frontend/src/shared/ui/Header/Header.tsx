import { styles } from "./header.styles";
import { ICONS } from "../../icons/";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useUserContext } from "@modules/auth/context/user.context";
import { usePublicationModal } from "@modules/publication/context/modal.context";
import { useGroupModal } from "@modules/chats/context/group-modal.context";

export function Header() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const { setToken } = useUserContext();
  const { open } = usePublicationModal();
  const { openNewGroupMembers } = useGroupModal();

  const route = useRoute();
  const routeName = route.name;

  useEffect(() => {
    if (
      routeName === "chats/index" ||
      routeName === "chats/groups" ||
      routeName === "chats/contacts" ||
      routeName === "chats/[chatId]"
    ) {
      setCurrentPage("chats");
    } else if (
      routeName === "friends/index" ||
      routeName === "friends/requests" ||
      routeName === "friends/friends" ||
      routeName === "friends/recommendations"
    ) {
      setCurrentPage("friends");
    } else if (
      routeName === "settings/index" ||
      routeName === "settings/album"
    ) {
      setCurrentPage("settings");
    } else if (routeName === "auth/index") {
      setCurrentPage("register");
    } else {
      setCurrentPage(null);
    }
  }, [routeName]);

  if (currentPage === "register") {
    return (
      <View style={styles.headerRegister}>
        <View style={styles.imgWorld}>
          <ICONS.SvgLogo />
          <ICONS.SvgLogoText />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.headerTop}>
      <View style={styles.imgWorld}>
        <ICONS.SvgLogo />
        <ICONS.SvgLogoText />
      </View>
      <View style={styles.buttonCon}>
        {currentPage !== "friends" && (
          <TouchableOpacity
            style={styles.button}
            onPress={currentPage === "chats" ? openNewGroupMembers : open}
          >
            <ICONS.SvgPlus />
          </TouchableOpacity>
        )}

        {currentPage !== "chats" && (
          <TouchableOpacity
            style={[
              styles.button,
              currentPage === "settings" && styles.chosenIcon,
            ]}
          >
            <Pressable onPress={() => router.push("/settings")}>
              <ICONS.SvgSettings />
            </Pressable>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setToken(null);
            router.push("/auth");
          }}
        >
          <ICONS.SvgBack />
        </TouchableOpacity>
      </View>
    </View>
  );
}
