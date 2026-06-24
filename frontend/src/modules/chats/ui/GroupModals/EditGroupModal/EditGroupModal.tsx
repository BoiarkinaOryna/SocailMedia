import { Modal, Pressable, Text, View } from "react-native";

import { useGroupModal } from "@modules/chats/context/group-modal.context";

import { ICONS } from "@shared/icons";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";

import { styles } from "./edit-group-modal.styles";

const MEMBERS = [
  { id: "1", name: "Aeslie Alexander" },
  { id: "2", name: "Aeslie Alexander" },
  { id: "3", name: "Aeslie Alexander" },
];

export function EditGroupModal() {
  const { modalType, closeModal, openAddParticipant } = useGroupModal();

  return (
    <Modal visible={modalType === "edit-group"} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable style={styles.close} onPress={closeModal}>
            <ICONS.SvgCross />
          </Pressable>

          <Text style={styles.title}>Редагування групи</Text>

          <Input label="Назва" value="New group" />

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NG</Text>
          </View>

          <View style={styles.photoActions}>
            <Pressable style={styles.photoAction}>
              <ICONS.SvgPlus />
              <Text style={styles.photoText}>Додайте фото</Text>
            </Pressable>
            <Pressable style={styles.photoAction}>
              <ICONS.SvgPhoto />
              <Text style={styles.photoText}>Оберіть фото</Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Учасники</Text>
            <Pressable onPress={openAddParticipant}>
              <Text style={styles.addText}>Додати</Text>
            </Pressable>
          </View>

          <View style={styles.members}>
            {MEMBERS.map((item) => (
              <View key={item.id} style={styles.memberRow}>
                <ICONS.SvgNP />
                <Text style={styles.memberName}>{item.name}</Text>
                <Pressable style={styles.deleteButton}>
                  <ICONS.SvgTrashcan />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.buttons}>
            <Button
              text="Скасувати"
              textPosition="left"
              style={styles.lightButton}
              onPress={closeModal}
            />
            <Button
              text="Зберегти"
              textPosition="left"
              isDark
              style={styles.darkButton}
              onPress={closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
