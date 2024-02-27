import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Text, VStack, Icon } from "native-base";

import { Avatar } from "./Avatar";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import DefaultProfileImage from "@assets/userPhotoDefault.png";

export function HomeHeader() {
	const { user, logOut } = useAuth();

	return (
		<HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
			<Avatar
				source={user.avatar ? { uri: user.avatar } : DefaultProfileImage}
				size={16}
				alt='User Avatar'
				mr={4}
			/>

			<VStack flex={1}>
				<Text color='gray.100' fontSize='md'>
					Olá,
				</Text>
				<Heading color='gray.100' fontSize='md' fontFamily='heading'>
					{user.name}
				</Heading>
			</VStack>
			<TouchableOpacity activeOpacity={0.7} onPress={logOut}>
				<Icon as={MaterialIcons} name='logout' size={6} color='gray.200' />
			</TouchableOpacity>
		</HStack>
	);
}
