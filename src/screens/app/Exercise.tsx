import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	Box,
	HStack,
	Heading,
	Icon,
	Image,
	ScrollView,
	Text,
	VStack
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useErrorToast } from "@hooks/useErrorToast";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { useSuccessToast } from "@hooks/useSuccessToast";
import { AppNavigatorRouteProps } from "@routes/app.routes";

type RouteParamsProps = {
	exerciseId: string;
};

export function Exercise() {
	const [exercise, seExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
	const [isLoading, setIsLoading] = useState(true);
	const [isSendingRegister, setIsSendingRegister] = useState(false);
	const navigation = useNavigation<AppNavigatorRouteProps>();
	const route = useRoute();
	const errorToast = useErrorToast();
	const successToast = useSuccessToast();
	const { exerciseId } = route.params as RouteParamsProps;

	function handleGoBack() {
		navigation.goBack();
	}

	async function fetchExerciseDetails(exerciseId: string) {
		try {
			setIsLoading(true);
			const { data } = await api.get(`/exercises/${exerciseId}`);
			if (data) {
				seExercise(data);
			}
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Erro desconhecido ao buscar datalhes do exercício. Tente novamente mais tarde.";

			errorToast({ title });
		} finally {
			setIsLoading(false);
		}
	}

	async function handleExerciseHistoryRegister() {
		try {
			setIsSendingRegister(true);
			await api.post(`/history`, { exercise_id: exerciseId });
			successToast({ title: "Exercício marcado como realizado." });
			navigation.navigate("history");
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Erro ao marcar exerício como realizado.";
			errorToast({ title });
		} finally {
			setIsSendingRegister(false);
		}
	}

	useEffect(() => {
		fetchExerciseDetails(exerciseId);
	}, [exerciseId]);

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
						{exercise.name}
					</Heading>
					<HStack alignItems='center'>
						<BodySVG />
						<Text color='gray.200' ml={1} textTransform='capitalize'>
							{exercise.group}
						</Text>
					</HStack>
				</HStack>
			</VStack>
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView>
					<VStack p={8}>
						<Box rounded='lg' mb={3} overflow='hidden'>
							<Image
								source={{
									uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
								}}
								alt={exercise.name}
								h={80}
								resizeMode='cover'
							/>
						</Box>
						<VStack bg='gray.600' rounded='md' pb={4} px={4}>
							<HStack alignItems='center' justifyContent='space-around' my={4}>
								<HStack alignItems='center' px={8} py={4}>
									<SeriesSVG />
									<Text color='gray.200' ml={2} fontSize='md'>
										{exercise.series} séries
									</Text>
								</HStack>
								<HStack alignItems='center' px={8} py={4}>
									<RepetitionsSVG />
									<Text color='gray.200' ml={2} fontSize='md'>
										{exercise.repetitions} repetições
									</Text>
								</HStack>
							</HStack>
							<Button
								title='Marcar como realizado'
								onPress={handleExerciseHistoryRegister}
								fontSize='md'
								isLoading={isSendingRegister}
							/>
						</VStack>
					</VStack>
				</ScrollView>
			)}
		</VStack>
	);
}
