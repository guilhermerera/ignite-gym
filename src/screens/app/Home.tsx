import { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useErrorToast } from "@hooks/useErrorToast";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigatorRouteProps } from "@routes/app.routes";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [groups, setGroups] = useState<string[]>([]);
	const [exercises, setExercises] = useState<ExerciseDTO[]>(
		[] as ExerciseDTO[]
	);
	const [groupSelected, setGroupSelected] = useState("costas");

	const errorToast = useErrorToast();
	const navigation = useNavigation<AppNavigatorRouteProps>();

	function handleOpenExerciseDetails() {
		navigation.navigate("exercise", );
	}

	async function fetchGroups() {
		try {
			const { data } = await api.get("/groups");
			setGroups(data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Erro ao buscar grupos musculares.";
			errorToast({ title });
		}
	}

	async function fetchExercisesByGroup() {
		try {
			setIsLoading(true)
			const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
			setExercises(data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError ? error.message : "Erro ao buscar exercícios.";
			errorToast({ title });
		} finally {
			
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchGroups();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchExercisesByGroup();
		}, [groupSelected])
	);

	return (
		<VStack flex={1}>
			<HomeHeader />
			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => {
					return (
						<Group
							label={item}
							isActive={groupSelected.toUpperCase() === item.toUpperCase()}
							onPress={() => setGroupSelected(item)}
						/>
					);
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				maxH={10}
				minH={10}
				my={10}
				_contentContainerStyle={{ px: 6 }}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<VStack flex={1} px={6}>
					<HStack justifyContent='space-between' alignItems='center' mb={5}>
						<Heading color='gray.200' fontSize='md' fontFamily='heading'>
							Exercícios
						</Heading>
						<Text color='gray.200' fontSize='sm'>
							{exercises.length}
						</Text>
					</HStack>

					<FlatList
						data={exercises}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ExerciseCard
								exercise={item}
								onPress={handleOpenExerciseDetails}
							/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 10 }}
					/>
				</VStack>
			)}
		</VStack>
	);
}
