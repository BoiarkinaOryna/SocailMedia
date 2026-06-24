import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useState } from "react";

import { ICONS } from "@shared/icons";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";

import { usePublicationModal } from "@modules/publication/context/modal.context";

import { publicationValidator } from "@modules/publication/models/publication.validation";

import { PublicationSchema } from "@modules/publication/types/publication.types";

import {
  useCreatePostMutation,
} from "@modules/publication/api/posts.api";

import { useUserContext } from "@modules/auth/context/user.context";

import { styles } from "./create-publication-modal.styles";

const TOPIC_TAGS = [
  "#відпочинок",
  "#натхнення",
  "#життя",
  "#природа",
  "#читання",
  "#спокій",
  "#гармонія",
  "#музика",
  "#фільми",
  "#подорожі",
];

const DEFAULT_VALUES: PublicationSchema = {
  title: "",
  topic: "",
  content: "",
  links: "",
};

export function CreatePublicationModal() {
  const { isOpen, close } = usePublicationModal();

  const { token } = useUserContext();

  const [createPostMutation] = useCreatePostMutation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const { handleSubmit, control, watch, setValue, reset } =
    useForm<PublicationSchema>({
      resolver: yupResolver(publicationValidator),
      mode: "onChange",
      defaultValues: DEFAULT_VALUES,
    });

  const contentValue = watch("content") ?? "";

  function addTagToContent(tag: string) {
    const currentContent = contentValue;

    const tagWithSpace = `${tag} `;

    if (!currentContent.includes(tag)) {
      const newContent =
        currentContent + (currentContent ? " " : "") + tagWithSpace;

      setValue("content", newContent, { shouldValidate: true });
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setSelectedImage(asset.uri);

      if (asset.base64) {
        setImageBase64(asset.base64);
      }
    }
  }

  async function onSubmit(data: PublicationSchema) {
    try {
      if (!token) {
        router.push("/auth");

        return;
      }

      await createPostMutation({
        token,
        data: {
          title: data.title,
          topic: data.topic,
          content: data.content,
          links: data.links,
          image: imageBase64,
        },
      }).unwrap();

      reset(DEFAULT_VALUES);

      setSelectedImage(null);

      setImageBase64(null);

      close();

      router.push("/(publications)/publications");
    } catch (error) {
      console.log("create post error", error);
    }
  }

  return (
    <Modal visible={isOpen} onRequestClose={close}>
      <Pressable style={styles.overlay} onPress={close}>
        <Pressable
          style={styles.modal}
          onPress={(event) => event.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.headline}>Створення публікації</Text>

            <Pressable onPress={close} style={styles.closeButton}>
              <ICONS.SvgCross />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputsContainer}>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Назва публікації"
                    labelStyle={styles.darkLabel}
                    placeholder="Напишіть назву"
                    onChangeText={field.onChange}
                    value={field.value}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <View style={styles.topicSection}>
                <Controller
                  name="topic"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      label="Тема публікації"
                      labelStyle={styles.darkLabel}
                      placeholder="Напишіть тему публікації"
                      onChangeText={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <View style={styles.tagsContainer}>
                  {TOPIC_TAGS.map((tag) => (
                    <Pressable
                      key={tag}
                      style={styles.tag}
                      onPress={() => addTagToContent(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </Pressable>
                  ))}

                  <Button
                    icon={<ICONS.SvgPlusB />}
                    style={styles.addTagButton}
                  />
                </View>
              </View>

              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    placeholder="Напишіть текст публікації"
                    multiline
                    numberOfLines={7}
                    onChangeText={field.onChange}
                    value={field.value}
                    error={fieldState.error?.message}
                    style={styles.textArea}
                  />
                )}
              />

              <Controller
                name="links"
                control={control}
                render={({ field, fieldState }) => (
                  <View style={styles.linkBlock}>
                    <Text style={styles.darkLabel}>Посилання</Text>

                    <View style={styles.linkSection}>
                      <View style={styles.linkInputWrapper}>
                        <Input
                          placeholder="Ваше посилання"
                          onChangeText={field.onChange}
                          value={field.value}
                          error={fieldState.error?.message}
                        />
                      </View>

                      <Button
                        icon={<ICONS.SvgPlusB />}
                        style={styles.linkPlusButton}
                      />
                    </View>
                  </View>
                )}
              />

              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 16,
                    marginTop: 15,
                  }}
                  contentFit="cover"
                />
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.mediaActions}>
              <Button
                icon={<ICONS.SvgaddPhoto />}
                style={styles.circleButton}
                onPress={pickImage}
              />

              <Button icon={<ICONS.addEmoji />} style={styles.circleButton} />
            </View>

            <Button
              text="Публікація"
              textPosition="left"
              isDark
              icon={<ICONS.SvgPlane />}
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}