import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader";
import {
	Center,
	Heading,
	ScrollView,
	Skeleton,
	Text,
	VStack,
	useToast
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Input } from "@components/Input";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

const AVATAR_SIZE = 32;

export function Profile() {
	const [isPhotoLoading, setIsPhotoLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState(
		"https://github.com/guilhermerera.png"
	);

	const toast = useToast();
	async function handleSelectPhoto() {
		setIsPhotoLoading(true);
		try {
			const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
				allowsMultipleSelection: false
			});

			if (canceled) {
				return;
			}

			if (assets[0].uri) {
				const photoInfo = await FileSystem.getInfoAsync(assets[0].uri);
				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 1) {
					toast.show({
						title: "Imagem muito grande",
						_title: {
							color: "white",
							fontSize: "md",
							fontFamily: "heading",
							textAlign: "center",
							marginTop: 2
						},
						description: "Escolha uma de no máximo 1MB.",
						_description: {
							color: "white",
							fontSize: "md",
							fontFamily: "body",
							marginX: 10,
							marginBottom: 2
						},
						placement: "top",
						duration: 3000,
						bgColor: "red.500"
					});
					return;
				}
			}
			setUserPhoto(assets[0].uri);
		} catch (e) {
			console.log(e);
		} finally {
			setIsPhotoLoading(false);
		}
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
							source={{ uri: userPhoto }}
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
