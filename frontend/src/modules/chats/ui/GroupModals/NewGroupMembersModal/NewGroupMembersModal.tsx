import { Alert, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useGroupModal } from "@modules/chats/context/group-modal.context";

import { ICONS } from "@shared/icons";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";

import { styles } from "./new-group-members-modal.styles";
import { Checkbox } from 'expo-checkbox';
import { COLORS } from "@shared/constants/colors";
import { useEffect, useState } from "react";

// const PARTICIPANTS = [
//   { id: "1", name: "Aeslie Alexander", withPhoto: false, checked: true },
//   { id: "2", name: "Auy Hawkins", withPhoto: true, checked: false },
//   { id: "3", name: "Acob Jones", withPhoto: true, checked: false },
//   { id: "4", name: "Bonald Richards", withPhoto: true, checked: true },
//   { id: "5", name: "Bert Flores", withPhoto: true, checked: false },
//   { id: "6", name: "Bheresa Webb", withPhoto: true, checked: true },
// ];

// const PHOTO = require("@assets/LinaLi.jpg");

export function NewGroupMembersModal() {
  const { modalType, closeModal, openNewGroup, selectedIds, setSelectedIds, PARTICIPANTS } = useGroupModal();
    

  const toggleSelection = (id: number) => {
    console.log("id", id)
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
    // console.log("selected", selectedIds)
  };
  useEffect(() => {
    console.log("selectedIds updated:", selectedIds);
  }, [selectedIds]);


  if (!PARTICIPANTS) {
    return
  }

  return (
    <Modal visible={modalType === "new-group-members"} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable style={styles.close} onPress={closeModal}>
            <ICONS.SvgCross />
          </Pressable>

          <Text style={styles.title}>Нова група</Text>

          <View style={styles.searchBlock}>
            <Input
              iconLeft={<ICONS.SvgSearch />}
              placeholder="Пошук"
              style={styles.inputText}
            />
          </View>

          <Text style={styles.selectedText}>Вибрано: 3</Text>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {/* <Text style={styles.letter}>A</Text> */}
            {PARTICIPANTS.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <TouchableOpacity
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                  }}
                  onPress={() => toggleSelection(item.id)}
                >
                  <ICONS.SvgNP />
                  <Text style={[styles.name]}>
                    {item.first_name !== ""
                      ? `${item.first_name} ${item.last_name}`
                      : item.username}
                  </Text>
                  <Checkbox
                    value={selectedIds.includes(item.id)}
                    onValueChange={() => toggleSelection(item.id)}
                    color={COLORS.pulm}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.buttons}>
            <Button
              text="Скасувати"
              textPosition="left"
              style={styles.lightButton}
              onPress={closeModal}
            />
            <Button
              text="Далі"
              textPosition="left"
              isDark
              style={styles.darkButton}
              onPress={openNewGroup}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
