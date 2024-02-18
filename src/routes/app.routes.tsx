import { Platform } from "react-native";
import {
	BottomTabNavigationProp,
	createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/app/Home";
import HomeIcon from "@assets/home.svg";

import { History } from "@screens/app/History";
import HistoryIcon from "@assets/history.svg";

import { Profile } from "@screens/app/Profile";
import ProfileIcon from "@assets/profile.svg";

import { Exercise } from "@screens/app/Exercise";
import { useTheme } from "native-base";

type AppRoutes = {
	exercise: undefined;
	history: undefined;
	home: undefined;
	profile: undefined;
};

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	const { sizes, colors } = useTheme();
	const iconSize = sizes[6];
	return (
		<Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.gray[600],
					borderTopWidth: 0,
					height: 72
				},
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.green[500],
				tabBarInactiveTintColor: colors.gray[200],
				tabBarIcon: ({ color }) => {
					switch (route.name) {
						case "home":
							return (
								<HomeIcon width={iconSize} height={iconSize} fill={color} />
							);
						case "history":
							return (
								<HistoryIcon width={iconSize} height={iconSize} fill={color} />
							);
						case "profile":
							return (
								<ProfileIcon width={iconSize} height={iconSize} fill={color} />
							);
						default:
							return (
								<HomeIcon width={iconSize} height={iconSize} fill={color} />
							);
					}
				}
			})}>
			<Screen name='home' component={Home} />
			<Screen name='history' component={History} />
			<Screen name='profile' component={Profile} />
			<Screen
				name='exercise'
				component={Exercise}
				options={{ tabBarButton: () => null }}
			/>
		</Navigator>
	);
}
