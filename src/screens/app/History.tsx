import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text } from "native-base";

import { api } from "@services/api";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { AppError } from "@utils/AppError";
import { useErrorToast } from "@hooks/useErrorToast";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Loading } from "@components/Loading";

export function History() {
	const [isLoading, setIsLoading] = useState(true);
	const [exercises, setExercisesData] = useState<HistoryByDayDTO[]>([]);
	const errorToast = useErrorToast();

	async function fetchHistory() {
		try {
			setIsLoading(true);
			const { data } = await api.get("/history");
			setExercisesData(data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError ? error.message : "Erro ao buscar seu histório.";
			errorToast({ title });
		} finally {
			setIsLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchHistory();
		}, [])
	);

	return (
		<VStack flex={1}>
			<ScreenHeader label='Histórico de Exercícios' />

			{isLoading ? (
				<Loading />
			) : (
				<SectionList
					px={5}
					sections={exercises}
					keyExtractor={(item, index) => item.id}
					renderItem={({ item }) => <HistoryCard exercise={item} />}
					renderSectionHeader={({ section }) => (
						<Heading
							color='gray.200'
							mt={10}
							mb={3}
							fontSize='md'
							fontFamily='heading'>
							{section.title}
						</Heading>
					)}
					ListEmptyComponent={() => (
						<Text
							color='gray.200'
							fontSize='lg'
							fontFamily='body'
							textAlign='center'>
							Nenhum exercício encontrado.
						</Text>
					)}
					contentContainerStyle={
						exercises.length === 0 && { flex: 1, justifyContent: "center" }
					}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</VStack>
	);
}
