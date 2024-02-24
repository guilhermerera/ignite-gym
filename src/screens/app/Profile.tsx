import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

type ProfileFormProps = {
	name: string;
	email: string;
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

const profileFormSchema = yup.object({
	name: yup.string().required("Nome: Campo obrigatório."),
	email: yup
		.string()
		.required("E-mail: Campo obrigatório.")
		.email("E-mail: Formato inválido."),
	oldPassword: yup.string().required("Senha antiga: Campo obrigatório."),
	newPassword: yup
		.string()
		.required("Nova senha: Campo obrigatório.")
		.min(6, "Nova senha: Mínimo de 6 caracteres.")
		.notOneOf(
			[yup.ref("oldPassword"), ""],
			"Nova senha: Não pode ser igual a senha antiga."
		),
	confirmNewPassword: yup
		.string()
		.required("Confirmação de nova senha: Campo obrigatório.")
		.oneOf([yup.ref("newPassword"), ""], "Senhas não conferem.")
});

export function Profile() {
	const [isPhotoLoading, setIsPhotoLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState(
		"https://github.com/guilhermerera.png"
	);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileFormProps>({
		resolver: yupResolver(profileFormSchema),
		defaultValues: {
			name: "Guilherme Rera",
			email: "guilhermerera@gmail.com"
		}
	});

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

	function handleUpdateProfile({
		name,
		email,
		oldPassword,
		newPassword,
		confirmNewPassword
	}: ProfileFormProps) {
		console.log({
			name,
			email,
			oldPassword,
			newPassword,
			confirmNewPassword
		});
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

					<Controller
						name='name'
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder='Nome'
								bg='gray.600'
								value={value}
								onChangeText={onChange}
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						name='email'
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder='Email'
								bg='gray.600'
								isDisabled
								value={value}
								onChangeText={onChange}
								errorMessage={errors.email?.message}
							/>
						)}
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
					<Controller
						name='oldPassword'
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder='Senha Antiga'
								bg='gray.600'
								secureTextEntry
								value={value}
								onChangeText={onChange}
								errorMessage={errors.oldPassword?.message}
							/>
						)}
					/>
					<Controller
						name='newPassword'
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder='Nova senha'
								bg='gray.600'
								secureTextEntry
								value={value}
								onChangeText={onChange}
								errorMessage={errors.newPassword?.message}
							/>
						)}
					/>

					<Controller
						name='confirmNewPassword'
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder='Confirme a nova senha'
								bg='gray.600'
								secureTextEntry
								value={value}
								onChangeText={onChange}
								errorMessage={errors.confirmNewPassword?.message}
							/>
						)}
					/>

					<Button
						title='Atualizar'
						mt={4}
						onPress={handleSubmit(handleUpdateProfile)}
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
}
