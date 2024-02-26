import { VStack, Image, Text, Center, Heading, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
	name: string;
	email: string;
	password: string;
	password_confirm: string;
};

const createAccountFormSchema = yup.object({
	name: yup.string().required("Nome: Campo obrigatório."),
	email: yup
		.string()
		.required("E-mail: Campo obrigatório.")
		.email("E-mail: Formato inválido."),
	password: yup
		.string()
		.required("Senha: Campo obrigatório.")
		.min(6, "A senha deve ter no mínimo 6 caracteres."),
	password_confirm: yup
		.string()
		.required("Confirme a senha: Campo obrigatório.")
		.oneOf([yup.ref("password"), ""], "As senhas devem ser iguais.")
});

export function SignIn() {
	const toast = useToast();
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(createAccountFormSchema)
	});

	function handleBackToLoginPress() {
		navigation.goBack();
	}

	async function handleCreateAccount({ name, email, password }: FormDataProps) {
		try {
			const { data } = await api.post("/users", { name, email, password });
		} catch (error) {
			const isAppError = error instanceof AppError;

			toast.show({
				title: isAppError
					? error.message
					: "Erro inesperado ao criar conta. Tente novamente.",
				_title: {
					color: "white",
					fontSize: "md",
					fontFamily: "heading",
					textAlign: "center",
					marginY: 2,
					marginX: 4
				},
				placement: "top",
				duration: 3000,
				bgColor: "red.500"
			});
		}
	}

	return (
		<VStack flex={1} px={10}>
			<Image
				source={BackgroundImg}
				defaultSource={BackgroundImg}
				alt='Pessoas treinando na academia'
				position={"absolute"}
			/>
			<Center mt={32} mb={16}>
				<LogoSvg />
				<Text color='gray.100' fontSize={"sm"}>
					Treine sua mente e seu corpo
				</Text>
			</Center>

			<Center mb='auto'>
				<Heading fontFamily='heading' fontSize='xl' color='gray.100' mb={6}>
					Crie sua conta
				</Heading>

				<Controller
					control={control}
					name='name'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='Nome'
							autoCapitalize='words'
							onChangeText={onChange}
							value={value}
							errorMessage={errors.name?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name='email'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='E-mail'
							keyboardType='email-address'
							autoCapitalize='none'
							onChangeText={onChange}
							value={value}
							errorMessage={errors.email?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='Senha'
							secureTextEntry
							onChangeText={onChange}
							value={value}
							errorMessage={errors.password?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='password_confirm'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='Confirme a senha'
							secureTextEntry
							onChangeText={onChange}
							value={value}
							onSubmitEditing={handleSubmit(handleCreateAccount)}
							returnKeyType='send'
							errorMessage={errors.password_confirm?.message}
						/>
					)}
				/>

				<Button
					title='Criar e acessar'
					onPress={handleSubmit(handleCreateAccount)}
				/>
			</Center>
			<Center mb='20'>
				<Button
					onPress={handleBackToLoginPress}
					title='Voltar para o login'
					variant='outline'
				/>
			</Center>
		</VStack>
	);
}
