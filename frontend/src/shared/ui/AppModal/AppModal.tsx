import { ReactNode } from "react";
import {
  Modal,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { ICONS } from "@shared/icons";

import { styles } from "./app-modal.styles";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function AppModal(props: AppModalProps) {
  const { visible, onClose, title, children, style, contentStyle } = props;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.card, style]} onPress={(event) => event.stopPropagation()}>
          <View style={styles.topRow}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <ICONS.SvgCross />
            </Pressable>
          </View>

          <Text style={styles.title}>{title}</Text>

          <View style={[styles.content, contentStyle]}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
