import { ClientSocket } from "@shared/api/socket/socket";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ChatWithChatParticipantsDto } from "../types/chat.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationContextData = {
  personalChatNotifications: string;
  groupChatNotifications: string;

  increasePersonal: (chatId: number) => Promise<void>;
  increaseGroup: (chatId: number) => Promise<void>;
  decreasePersonal: (chatId: number) => Promise<void>;
  decreaseGroup: (chatId: number) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextData | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [personalChatNotifications, setPersonalChatNotifications] = useState("");
  const [groupChatNotifications, setGroupChatNotifications] = useState("");

  async function increasePersonal(chatId: number) {
    console.log("p notif is set")
    setPersonalChatNotifications((prev) => {
      const idsString = prev != ""
        ? prev + " " + String(chatId)
        : String(chatId)
        
      AsyncStorage.setItem("personalNotif", String(idsString));
      return idsString;
    });
  }

  async function increaseGroup(chatId: number) {
    console.log("g notif is set")
    setGroupChatNotifications((prev) => {
      const idsString = prev != ""
        ? prev + " " + String(chatId)
        : String(chatId)

      AsyncStorage.setItem("groupNotif", String(idsString));

      return idsString;
    });
  }

  async function decreasePersonal(chatId: number) {
    console.log("p notif is dec")
    setGroupChatNotifications((prev) => {
      console.log("prev:", prev)
      const idsString = prev.split(" ").filter(id => {return id !== String(chatId)}).join(" ")
      AsyncStorage.setItem("personalNotif", idsString ? String(idsString) : "");
      console.log("idsString", idsString)
      return idsString;
    });
  }

  async function decreaseGroup(chatId: number) {
    console.log("g notif is dec")
    setGroupChatNotifications((prev) => {
      console.log("prev:", prev)
      const idsString = prev.split(" ").filter(id => {return id !== String(chatId)}).join(" ")

      AsyncStorage.setItem("groupNotif", idsString ? String(idsString) : "");
      console.log("idsString", idsString)
      return idsString;
    });
  }

  useEffect(() => {
    function handleGetNotification(chat: ChatWithChatParticipantsDto) {
        console.log("emit is here")
        if (chat.is_group) {
        increaseGroup(chat.id);
      } else {
        increasePersonal(chat.id);
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
          AsyncStorage.getItem("personalNotif"),
          AsyncStorage.getItem("groupNotif"), 
        ]);

        setPersonalChatNotifications(personal ?? "");
        setGroupChatNotifications(group ?? "");
        console.log("Nnotifs from storage", personal, group)
    }

    loadNotifications();

    }, []);

  
  return (
    <NotificationContext
      value={{
        personalChatNotifications,
        groupChatNotifications,
        increasePersonal,
        increaseGroup,
        decreasePersonal,
        decreaseGroup
      }}
    >
      {children}
    </NotificationContext>
  );
}

export function useNotificationContext() { const ctx = useContext(NotificationContext); if (!ctx) throw new Error("Notification Context is not wrapped in Provider"); return ctx; }