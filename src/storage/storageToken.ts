import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
	token: string;
	refreshToken: string;
};

export async function storageTokenSave({
	token,
	refreshToken
}: StorageAuthTokenProps) {
	try {
		await AsyncStorage.setItem(
			TOKEN_STORAGE,
			JSON.stringify({ token, refreshToken })
		);
	} catch (error) {
		throw error;
	}
}

export async function storageTokenGet() {
	try {
		const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
		const { token, refreshToken }: StorageAuthTokenProps = tokenStorage
			? JSON.parse(tokenStorage as string)
			: ({} as StorageAuthTokenProps);

		return { token, refreshToken };
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
