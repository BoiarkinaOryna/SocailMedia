import { ClientSocket } from "@shared/api/socket/socket";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ChatWithChatParticipantsDto } from "../types/chat.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationContextData = {
  personalChatNotificationsQ: number;
  groupChatNotificationsQ: number;

  increasePersonal: () => Promise<void>;
  increaseGroup: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextData | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [personalChatNotificationsQ, setPersonalChatNotificationsQ] = useState(0);
  const [groupChatNotificationsQ, setGroupChatNotificationsQ] = useState(0);

  async function increasePersonal() {
    console.log("p notif is set")
    setPersonalChatNotificationsQ((prev) => {
      const next = prev + 1;

      AsyncStorage.setItem("personalNotifQ", String(next));

      return next;
    });
  }

  async function increaseGroup() {
    console.log("g notif is set")
    setGroupChatNotificationsQ((prev) => {
      const next = prev + 1;

      AsyncStorage.setItem("groupNotifQ", String(next));

      return next;
    });
  }

  useEffect(() => {
    function handleGetNotification(chat: ChatWithChatParticipantsDto) {
        console.log("emit is here")
        if (chat.is_group) {
        increaseGroup();
      } else {
        increasePersonal();
      }
    }

    ClientSocket.on("getNotification", handleGetNotification);

    return () => {
      ClientSocket.off("getNotification", handleGetNotification);
    };
  }, []);

  useEffect(() => {
    async function loadNotifications() {
        const [personal, group] = await Promise.all([
        AsyncStorage.getItem("personalNotifQ"),
        AsyncStorage.getItem("groupNotifQ"),
        ]);

        setPersonalChatNotificationsQ(Number(personal ?? 0));
        setGroupChatNotificationsQ(Number(group ?? 0));
    }

    loadNotifications();
    }, []);

  return (
    <NotificationContext
      value={{
        personalChatNotificationsQ,
        groupChatNotificationsQ,
        increasePersonal,
        increaseGroup,
      }}
    >
      {children}
    </NotificationContext>
  );
}

export function useNotificationContext() { const ctx = useContext(NotificationContext); if (!ctx) throw new Error("Notification Context is not wrapped in Provider"); return ctx; }