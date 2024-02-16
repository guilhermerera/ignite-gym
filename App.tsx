import { StatusBar, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { THEME } from "./src/theme";
import { Loading } from "@components/Loading";
import { LogIn } from "@screens/LogIn";
import { SignIn } from "@screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold
	});

	return (
		<NavigationContainer>
			<NativeBaseProvider theme={THEME}>
				<StatusBar
					barStyle='light-content'
					backgroundColor='transparent'
					translucent
				/>

				{fontsLoaded ? <SignIn /> : <Loading />}
			</NativeBaseProvider>
		</NavigationContainer>
	);
}
