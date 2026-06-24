import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Header } from "../shared/ui/Header/Header";
import { TabBar } from "../shared/ui/TabBar/TabBar";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { baseApi } from "@shared/api/api";
import { UserContextProvider, useUserContext } from "@modules/auth/context/user.context";
import { PublicationModalProvider } from "@modules/publication/context/modal.context";
import { PublicationsProvider } from "@modules/publication/context/publications.context";
import { PublicationModal } from "@modules/publication/ui/modal";
import { GroupModalProvider } from "@modules/chats/context/group-modal.context";
import { NotificationProvider } from "@modules/chats/context/notification.context";
import { ClientSocket } from "@shared/api/socket/socket";

export default function App() {

  return (
    <ApiProvider api={baseApi}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <UserContextProvider>
            <PublicationsProvider>
              <GroupModalProvider>
                <NotificationProvider>
                  <PublicationModalProvider>
                    <StatusBar style="auto" />
                    <AppStack />
                    <PublicationModal />
                  </PublicationModalProvider>
                </NotificationProvider>
              </GroupModalProvider>
            </PublicationsProvider>
          </UserContextProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </ApiProvider>
  );
}

function AppStack() {
  const { token } = useUserContext();

  if (!token) {
    return (
      <Stack
        screenOptions={{
            header: () => <Header />,
            animation: "none"
        }}
      />
    );
  }

  // const connectAndJoinChat = (chatId: number) => {
      if (!ClientSocket.connected) {
          ClientSocket.auth = {
              token: `Bearer ${token}`,
          };

          ClientSocket.connect();
      }

  // };

  return (
    <View style={{
      flex: 1,
      justifyContent: "space-between",
    }}>
      <Stack
        screenOptions={{
          header: () => (
              <Header />
          ),
          animation: "none",
        }}
      />
      <TabBar />
    </View>
  );
}
