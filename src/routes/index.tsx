import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes() {
	const { colors } = useTheme();

	const { user, isLoadingUserStorageDate } = useAuth();

	const navigationTheme = DefaultTheme;
	navigationTheme.colors.background = colors.gray[700];

	if (isLoadingUserStorageDate) {
		return <Loading />;
	}

	return (
		<Box flex={1} bg='gray.700'>
			<NavigationContainer theme={navigationTheme}>
				{user.id ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</Box>
	);
}
