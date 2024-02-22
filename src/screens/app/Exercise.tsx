import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import BodySVG from "@assets/body.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import SeriesSVG from "@assets/series.svg";

import { Button } from "@components/Button";

export function Exercise() {
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	return (
		<VStack flex={1}>
			<VStack px={8} pt={12} bg='gray.600' pb={6}>
				<TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
					<Icon as={Feather} name='arrow-left' color='green.500' size={6} />
				</TouchableOpacity>
				<HStack justifyContent='space-between' alignItems='center' mt={2}>
					<Heading
						color='gray.200'
						fontSize='md'
						fontFamily='heading'
						flexShrink={1}>
						Puxada Frontal
					</Heading>
					<HStack alignItems='center'>
						<BodySVG />
						<Text color='gray.200' ml={1} textTransform='capitalize'>
							Costas
						</Text>
					</HStack>
				</HStack>
			</VStack>

			<VStack p={8}>
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}}
					alt='Nome do Exercício'
					w='full'
					h={80}
					resizeMode='cover'
					rounded='lg'
					mb={3}
				/>
				<VStack bg='gray.600' rounded='md' pb={4} px={4}>
					<HStack alignItems='center' justifyContent='space-around' my={4}>
						<HStack alignItems='center' px={8} py={4}>
							<SeriesSVG />
							<Text color='gray.200' ml={2} fontSize='md'>
								3 séries
							</Text>
						</HStack>
						<HStack alignItems='center' px={8} py={4}>
							<RepetitionsSVG />
							<Text color='gray.200' ml={2} fontSize='md'>
								12 repetições
							</Text>
						</HStack>
					</HStack>
					<Button title='Marcar como realizado' fontSize='md' />
				</VStack>
			</VStack>
		</VStack>
	);
}
