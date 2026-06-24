import * as ImagePicker from "expo-image-picker";

export async function pickImageBase64() {
  const result = await ImagePicker.launchImageLibraryAsync({
    base64: true,
    quality: 0.7,
  });

  if (!result.canceled) {
    return result.assets[0].base64;
  }
}