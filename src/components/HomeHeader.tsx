import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Text, VStack, Icon } from "native-base";

import { Avatar } from "./Avatar";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
	function handleLogout() {
		alert("Logout action not implemented");
	}
	return (
		<HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
			<Avatar
				source={{ uri: "https://github.com/guilhermerera.png" }}
				size={16}
				alt='User Avatar'
				mr={4}
			/>
			<VStack flex={1}>
				<Text color='gray.100' fontSize='md'>
					Olá,
				</Text>
				<Heading color='gray.100' fontSize='md'>
					Guilherme
				</Heading>
			</VStack>
			<TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
				<Icon as={MaterialIcons} name='logout' size={6} color='gray.200' />
			</TouchableOpacity>
		</HStack>
	);
}
