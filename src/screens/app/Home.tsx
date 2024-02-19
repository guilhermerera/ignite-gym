import { useState } from "react";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
	const [groups, setGroups] = useState([
		"costas",
		"biceps",
		"triceps",
		"ombro"
	]);
	const [exercises, setExercises] = useState([
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10"
	]);
	const [groupSelected, setGroupSelected] = useState(groups[0]);
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
				my={10}
				_contentContainerStyle={{ px: 6 }}
			/>
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
					keyExtractor={(item) => item}
					renderItem={({ item }) => <ExerciseCard />}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{ paddingBottom: 10 }}
				/>
			</VStack>
		</VStack>
	);
}
