import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, useToast } from "native-base";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useErrorToast } from "@hooks/useErrorToast";

type LoginFormProps = {
	email: string;
	password: string;
};

const loginFormSchema = yup.object({
	email: yup
		.string()
		.required("E-mail: Campo obrigatório.")
		.email("E-mail: Formato inválido."),
	password: yup.string().required("Senha: Campo obrigatório.")
});

export function LogIn() {
	const [isLoginLoading, setIsLoginLoading] = useState(false);
	const { logIn } = useAuth();
	const errorToast = useErrorToast();
	const navigation = useNavigation<AuthNavigatorRouteProps>();
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormProps>({
		resolver: yupResolver(loginFormSchema)
	});

	async function handleLogin({ email, password }: LoginFormProps) {
		try {
			setIsLoginLoading(true);
			await logIn(email, password);
		} catch (error) {
			const isAppError = error instanceof AppError;
			errorToast({
				title: isAppError
					? error.message
					: "Não foi possível realizar o login. Tente novamente."
			});

			setIsLoginLoading(false);
		}
	}

	function handleCreateAccountPress() {
		navigation.navigate("signIn");
	}
	return (
		<VStack flex={1} px={10}>
			<Image
				source={BackgroundImg}
				defaultSource={BackgroundImg}
				alt='Pessoas treinando na academia'
				position={"absolute"}
			/>
			<Center my={32}>
				<LogoSvg />
				<Text color='gray.100' fontSize={"sm"}>
					Treine sua mente e seu corpo
				</Text>
			</Center>

			<Center mb='auto'>
				<Heading fontFamily='heading' fontSize='xl' color='gray.100' mb={6}>
					Acesse sua conta
				</Heading>
				<Controller
					name='email'
					control={control}
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
					name='password'
					control={control}
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

				<Button
					isLoading={isLoginLoading}
					title='Acessar'
					onPress={handleSubmit(handleLogin)}
				/>
			</Center>
			<Center mb='20'>
				<Text color='white' fontFamily='body' fontSize={16} mb={2}>
					Ainda não tem acesso?
				</Text>
				<Button
					onPress={handleCreateAccountPress}
					title='Criar conta'
					variant='outline'
				/>
			</Center>
		</VStack>
	);
}
