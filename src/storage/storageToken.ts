import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_STORAGE } from "./storageConfig";

export async function storageTokenSave(token: string) {
	try {
		await AsyncStorage.setItem(TOKEN_STORAGE, token);
	} catch (error) {
		throw error;
	}
}

export async function storageTokenGet() {
	try {
		const token = await AsyncStorage.getItem(TOKEN_STORAGE);

		return token;
	} catch (error) {
		throw error;
	}
}

export async function storageTokenDelete() {
	try {
		await AsyncStorage.removeItem(TOKEN_STORAGE);
	} catch (error) {
		throw error;
	}
}
