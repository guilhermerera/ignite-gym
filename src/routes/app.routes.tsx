import {
	BottomTabNavigationProp,
	createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";

type AppRoutes = {
	exercise: undefined;
	history: undefined;
	home: undefined;
	profile: undefined;
};

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Screen name='home' component={Home} />
			<Screen name='history' component={History} />
			<Screen name='profile' component={Profile} />
			<Screen name='exercise' component={Exercise} />
		</Navigator>
	);
}
