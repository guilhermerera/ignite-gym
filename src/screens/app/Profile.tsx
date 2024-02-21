import { Avatar } from "@components/Avatar";
import { ScreenHeader } from "@components/ScreenHeader";
import {
	Center,
	Heading,
	ScrollView,
	Skeleton,
	Text,
	VStack
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const AVATAR_SIZE = 32;

export function Profile() {
	const [isPhotoLoading, setIsPhotoLoading] = useState(true);
	function handleSelectPhoto() {
		alert("handle select photo");
	}
	return (
		<VStack flex={1}>
			<ScreenHeader label='Perfil do Usuário' />
			<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
				<Center mt={6} px={10}>
					{isPhotoLoading ? (
						<Skeleton
							w={AVATAR_SIZE}
							h={AVATAR_SIZE}
							rounded='full'
							startColor='gray.400'
							endColor='gray.600'
						/>
					) : (
						<Avatar
							size={AVATAR_SIZE}
							source={{ uri: "https://github.com/guilhermerera.png" }}
							alt='Avatar do usuário'
						/>
					)}

					<TouchableOpacity activeOpacity={0.7} onPress={handleSelectPhoto}>
						<Text
							fontFamily='heading'
							fontSize='md'
							color='green.500'
							mt={2}
							mb={8}>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Input placeholder='Nome' value='Guilherme Rera' bg='gray.600' />
					<Input
						placeholder='Email'
						value='guilhermerera@gmail.com'
						bg='gray.600'
						isDisabled
					/>

					<Heading
						color='gray.200'
						fontSize='md'
						fontFamily='heading'
						mt={10}
						mb={2}
						alignSelf='flex-start'>
						Alterar senha
					</Heading>
					<Input
						placeholder='Senha Antiga'
						value=''
						bg='gray.600'
						secureTextEntry
					/>
					<Input
						placeholder='Nova senha'
						value=''
						bg='gray.600'
						secureTextEntry
					/>
					<Input
						placeholder='Confirme a nova senha'
						value=''
						bg='gray.600'
						secureTextEntry
					/>
					<Button title='Atualizar' mt={4} />
				</Center>
			</ScrollView>
		</VStack>
	);
}
