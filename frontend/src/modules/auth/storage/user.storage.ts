import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken(): Promise<string | null> {
	const token = await AsyncStorage.getItem("token");
	if (!token) return null;
	return token;
}