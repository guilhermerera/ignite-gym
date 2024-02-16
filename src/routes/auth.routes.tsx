import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { LogIn } from "@screens/LogIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
	return (
		<Navigator>
			<Screen name='logIn' component={LogIn} />
			<Screen name='signIn' component={SignIn} />
		</Navigator>
	);
}
