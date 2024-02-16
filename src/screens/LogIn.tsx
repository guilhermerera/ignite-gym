import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading } from "native-base";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function LogIn() {
	const navigation = useNavigation<AuthNavigatorRouteProps>();

	function handleCreateAccountPress() {
		navigation.navigate("signIn");
	}
	return (
		<VStack flex={1} px={10}>
			<Image
				source={BackgroundImg}
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
				<Input
					placeholder='E-mail'
					type='text'
					keyboardType='email-address'
					autoCapitalize='none'
				/>
				<Input placeholder='Senha' type='password' secureTextEntry />
				<Button title='Acessar' />
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
