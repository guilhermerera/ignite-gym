import { createContext, useEffect, useState } from "react";

import {
	storageUserSave,
	storageUserGet,
	storageUserDelete
} from "@storage/storageUser";
import {
	storageTokenDelete,
	storageTokenGet,
	storageTokenSave
} from "@storage/storageToken";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { set } from "react-hook-form";

export type AuthContentDataPropos = {
	user: UserDTO;
	logIn: (email: string, password: string) => Promise<void>;
	logOut: () => Promise<void>;
	isLoadingUserStorageDate: boolean;
};

type AuthContextProviderProps = {
	children: React.ReactNode;
};

export const AuthContext = createContext<AuthContentDataPropos>(
	{} as AuthContentDataPropos
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageDate, setIsLoadingUserStorageDate] =
		useState(true);

	function setUserAndToken(userData: UserDTO, token: string) {
		setUser(userData);
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	async function storageUserAndToken(userData: UserDTO, token: string) {
		try {
			await storageUserSave(userData);
			await storageTokenSave(token);
		} catch (error) {
			throw error;
		}
	}

	async function logIn(email: string, password: string) {
		try {
			const { data } = await api.post("/sessions", {
				email,
				password
			});

			if (data.user && data.token) {
				setIsLoadingUserStorageDate(true);
				await storageUserAndToken(data.user, data.token);
				setUserAndToken(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageDate(false);
		}
	}

	async function logOut() {
		try {
			setIsLoadingUserStorageDate(true);

			setUser({} as UserDTO);

			await storageUserDelete();
			await storageTokenDelete();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageDate(false);
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageDate(true);
			const user = await storageUserGet();
			const token = await storageTokenGet();
			if (user && token) {
				setUserAndToken(user, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageDate(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, logIn, logOut, isLoadingUserStorageDate }}>
			{children}
		</AuthContext.Provider>
	);
}
