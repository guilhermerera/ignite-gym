import { createContext, useEffect, useState } from "react";
import { storageUserSave, storageUserGet } from "@storage/storageUser";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContentDataPropos = {
	user: UserDTO;
	logIn: (email: string, password: string) => Promise<void>;
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

	async function logIn(email: string, password: string) {
		try {
			const { data } = await api.post("/sessions", {
				email,
				password
			});

			if (data.user) {
				setUser(data.user);
				await storageUserSave(data.user);
			}
		} catch (error) {
			throw error;
		}
	}

	async function loadUserData() {
		try {
			const user = await storageUserGet();
			if (user) {
				setUser(user);
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
		<AuthContext.Provider value={{ user, logIn, isLoadingUserStorageDate }}>
			{children}
		</AuthContext.Provider>
	);
}
