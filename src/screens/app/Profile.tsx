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
	VStack
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from "@services/api";

import { Input } from "@components/Input";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useErrorToast } from "@hooks/useErrorToast";
import { useSuccessToast } from "@hooks/useSuccessToast";

import DefaultProfileImage from "@assets/userPhotoDefault.png";

const AVATAR_SIZE = 32;

type ProfileFormProps = {
	name: string;
	email: string;
	oldPassword?: string | null;
	newPassword?: string | null;
	confirmNewPassword?: string | null;
};

const profileFormSchema = yup.object({
	name: yup.string().required("Nome: Campo obrigatório."),
	email: yup
		.string()
		.required("E-mail: Campo obrigatório.")
		.email("E-mail: Formato inválido."),
	oldPassword: yup
		.string()
		.nullable()
		.transform((value) => (!!value ? value : null)),
	newPassword: yup
		.string()
		.min(6, "Nova senha: Mínimo de 6 caracteres.")
		.nullable()
		.transform((value) => (!!value ? value : null))
		.when("oldPassword", {
			is: (Field: any) => Field && Field.length > 0,
			then: (Field: any) =>
				Field.required("Nova senha: informe a nova senha.").notOneOf(
					[yup.ref("oldPassword"), ""],
					"Nova senha: Não pode ser igual a senha antiga."
				)
		}),
	confirmNewPassword: yup
		.string()
		.nullable()
		.transform((value) => (!!value ? value : null))
		.oneOf([yup.ref("newPassword"), ""], "Senhas não conferem.")
		.when("newPassword", {
			is: (Field: any) => Field && Field.length > 0,
			then: (Field: any) =>
				Field.required("Confirmação de senha: Campo obrigatório.")
		})
});

export function Profile() {
	const [isFormUpdating, setIsFormUpdating] = useState(false);
	const [isPhotoLoading, setIsPhotoLoading] = useState(false);
	const { user, updateUserProfile } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileFormProps>({
		resolver: yupResolver(profileFormSchema),
		defaultValues: {
			name: user.name,
			email: user.email
		}
	});

	const errorToast = useErrorToast();
	const successToast = useSuccessToast();
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
				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
					errorToast({
						title: "Imagem muito grande",
						description: "Escolha uma de no máximo 5MB."
					});
					return;
				}
			}

			const fileExtension = assets[0].uri.split(".").pop();

			const photoFile = {
				name: `${user.name}.${fileExtension}`.toLowerCase(),
				type: `${assets[0].type}/${fileExtension}`,
				uri: assets[0].uri
			} as any;

			const userPhotoUploadForm = new FormData();
			userPhotoUploadForm.append("avatar", photoFile);

			const avatarUpdatedResponse = await api.patch(
				"/users/avatar",
				userPhotoUploadForm,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);

			const userUpdated = { ...user };
			userUpdated.avatar = avatarUpdatedResponse.data.avatar;
			await updateUserProfile(userUpdated);

			successToast({ title: "Foto atualizada com sucesso." });
		} catch (e) {
			console.log(e);
		} finally {
			setIsPhotoLoading(false);
		}
	}

	async function handleUpdateProfile({
		name,
		oldPassword,
		newPassword
	}: ProfileFormProps) {
		try {
			setIsFormUpdating(true);

			await api.put("/users", {
				name,
				old_password: oldPassword,
				password: newPassword
			});

			const userUpdated = { ...user };
			userUpdated.name = name;
			await updateUserProfile(userUpdated);
			successToast({ title: "Perfil atualizado com sucesso." });
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError ? error.message : "Erro ao atualizar perfil.";
			errorToast({ title });
		} finally {
			setIsFormUpdating(false);
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
							source={
								user.avatar
									? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
									: DefaultProfileImage
							}
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
								value={value!}
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
								value={value!}
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
								value={value!}
								onChangeText={onChange}
								errorMessage={errors.confirmNewPassword?.message}
							/>
						)}
					/>

					<Button
						title='Atualizar'
						mt={4}
						onPress={handleSubmit(handleUpdateProfile)}
						isLoading={isFormUpdating}
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
}
