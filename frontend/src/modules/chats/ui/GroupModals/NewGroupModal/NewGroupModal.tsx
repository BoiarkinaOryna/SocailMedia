import { Modal, Pressable, Text, View } from "react-native";

import { useGroupModal } from "@modules/chats/context/group-modal.context";

import { ICONS } from "@shared/icons";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./new-group-modal.styles";
import { useCreateChatMutation } from "@modules/chats/api/chat.api";
import { useUserContext } from "@modules/auth/context/user.context";
import { CreateChatDTO } from "@modules/chats/types/chat.types";
import { useState } from "react";
import { CreateChatSchema } from "@modules/chats/types/chatModal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateChatValidator } from "@modules/chats/models/chat.validation";
import { Controller, useForm } from "react-hook-form";


export function NewGroupModal() {
  const {token} = useUserContext()
  if (!token) return
  const { modalType, closeModal, openNewGroupMembers, selectedIds, PARTICIPANTS } = useGroupModal();
  const [createChat, {data, error, isLoading}] = useCreateChatMutation()

  const [ groupName, setGroupName ] = useState<string>("Нова група")
  const [ groupAvatar, setGroupAvatar ] = useState<string | undefined>(undefined)
  
  const { handleSubmit, control } = useForm<CreateChatSchema>({
    resolver: yupResolver(CreateChatValidator),
    mode: "onChange"
  })
  
    // <Button
    //   onPress={handleSubmit(submit)}
    //   isDark={true}
    //   text={ !isLoading ? "Продовжити" : "Завантаження"}
    //   textPosition="right"
    //   />
    // { error && <Text>Сталася помилка: { "status" in error ? error.status : error.message } </Text> }
  
    // <Controller
    //   name="pseudonym"
    //   control={control}
    //   render={({field, fieldState}) => {
    //     return <Input
    //     label="Псевдонім автора"
    //     placeholder="Введіть псевдонім автора"
    //     autoCorrect={false}
    //     onChangeText={field.onChange}
    //     value={field.value}
    //     labelStyle = {styles.textGray}
    //     error={fieldState.error?.message}
    //     />
    //   }}
    // />
  
  function create({title}: {title: string}){
      createChat({
        token: token!,
        contactData: {
          title,
          base64avatar: groupAvatar,
          contactUserId: selectedIds
        }
      })
      closeModal()
  }


  const pickAvatar = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          quality: 0.7,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      if (!asset.base64) return;
      setGroupAvatar(asset.base64)

      // try {
      //     await uploadAvatar({
      //         base64: asset.base64,
      //         groupId,
      //         token,
      //     }).unwrap();

      //     // await refetch();
      // } catch (e) {
      //     console.error("Upload error:", e);
      // }
  };

  if (!PARTICIPANTS) {
    return
  }

  return (
    <Modal visible={modalType === "new-group"} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable style={styles.close} onPress={closeModal}>
            <ICONS.SvgCross />
          </Pressable>

          <Text style={styles.title}>Нова група</Text>

          <View style={styles.field}>
            <Controller
              name="title"
              control={control}
              render={({field, fieldState}) => {
                return <Input
                  label="Назва"
                  placeholder="Введіть назву"
                  autoCorrect={false}
                  onChangeText={field.onChange}
                  value={field.value}
                  error={fieldState.error?.message}
                />
              }}
            />
            
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NG</Text>
          </View>

          <View style={styles.photoActions}>
            <Pressable style={styles.photoAction} onPress={pickAvatar}>
              <ICONS.SvgPlus />
              <Text style={styles.photoText}>Додайте фото</Text>
            </Pressable>
            <Pressable style={styles.photoAction}>
              <ICONS.SvgPhoto />
              <Text style={styles.photoText}>Оберіть фото</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Учасники</Text>

          <View style={styles.members}>
            {PARTICIPANTS.map((item) => (
              selectedIds.includes(item.id) && <View key={item.id} style={styles.memberRow}>
                <ICONS.SvgNP />
                <Text style={[styles.memberName]}>
                  {item.first_name !== ""
                    ? `${item.first_name} ${item.last_name}`
                    : item.username}
                </Text>
                <Pressable style={styles.deleteButton}>
                  <ICONS.SvgTrashcan />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.buttons}>
            <Button
              text="Назад"
              textPosition="left"
              style={styles.backButton}
              onPress={openNewGroupMembers}
            />
            <Button
              text="Створити групу"
              textPosition="left"
              isDark
              style={styles.createButton}
              onPress={handleSubmit(create)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
