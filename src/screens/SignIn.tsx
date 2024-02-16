import { VStack, Image, Text, Center, Heading } from "native-base";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
	return (
		<VStack flex={1} bg='gray.700' px={10}>
			<Image
				source={BackgroundImg}
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
				<Input
					placeholder='Nome'
					type='text'
					keyboardType='default'
					autoCapitalize='words'
				/>
				<Input
					placeholder='E-mail'
					type='text'
					keyboardType='email-address'
					autoCapitalize='none'
				/>
				<Input placeholder='Senha' type='password' secureTextEntry />
				<Input placeholder='Confirme a senha' type='password' secureTextEntry />
				<Button title='Acessar' />
			</Center>
			<Center mb='20'>
				<Button title='Voltar para o login' variant='outline' />
			</Center>
		</VStack>
	);
}
