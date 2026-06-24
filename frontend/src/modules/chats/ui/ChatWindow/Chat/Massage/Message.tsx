import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { API_BASE_URL } from "@shared/api/api";
import { styles } from "./message.styles";
import { ChatMessageProps } from "./message.types";

function getMessageImageUri(image: string) {
  if (image.startsWith("data:") || image.startsWith("http")) return image;
  if (image.length < 150) return `${API_BASE_URL}/uploads/${image}`;
  return `data:image/jpeg;base64,${image}`;
}

const IMAGE_WIDTH = 220;

function ChatImage({ uri }: { uri: string }) {
  const [height, setHeight] = useState(180);

  return (
    <Image
      source={{ uri }}
      style={{ width: IMAGE_WIDTH, height, borderRadius: 8 }}
      contentFit="cover"
      onLoad={(e) => {
        const { width, height: h } = e.source;
        const ratio = h / width;
        const calculated = IMAGE_WIDTH * ratio;
        setHeight(Math.min(Math.max(calculated, 120), 320));
      }}
    />
  );
}

export function ChatMessage(props: ChatMessageProps) {
  const { data, isMy } = props;
  let time = new Date(data.created_at).toLocaleTimeString("uk-UA");
  time = time.split(":")[0] + ":" + time.split(":")[1];
  const images = data.chat_app_messageimage ?? [];

  return (
    <View style={isMy ? styles.myMessage : styles.message}>
      <View style={styles.content}>
        {!!data.text && <Text style={styles.text}>{data.text}</Text>}
        {images.map((image) => (
          <ChatImage key={image.id} uri={getMessageImageUri(image.image)} />
        ))}
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}