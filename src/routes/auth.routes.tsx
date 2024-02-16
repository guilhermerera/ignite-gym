import {
	createNativeStackNavigator,
	NativeStackNavigationProp
} from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { LogIn } from "@screens/LogIn";

type AuthRoutes = {
	logIn: undefined;
	signIn: undefined;
};

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Screen name='logIn' component={LogIn} />
			<Screen name='signIn' component={SignIn} />
		</Navigator>
	);
}
