import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack, SectionList, Text } from "native-base";
import { useState } from "react";

export function History() {
	const [exercises, setExercisesData] = useState([
		{
			title: "26.08.2022",
			data: ["Puxada frontal", "Remada unilateral"]
		},
		{
			title: "27.08.2022",
			data: ["Puxada frontal"]
		}
	]);

	return (
		<VStack flex={1}>
			<ScreenHeader label='Histórico de Exercícios' />

			<SectionList
				px={5}
				sections={exercises}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => <HistoryCard />}
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
			/>
		</VStack>
	);
}
