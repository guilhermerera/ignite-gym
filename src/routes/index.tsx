import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
	const { colors } = useTheme();

	const { user } = useAuth();

	const navigationTheme = DefaultTheme;
	navigationTheme.colors.background = colors.gray[700];

	return (
		<Box flex={1} bg='gray.700'>
			<NavigationContainer theme={navigationTheme}>
				{user.id ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</Box>
	);
}
