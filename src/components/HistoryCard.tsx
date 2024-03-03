import { HStack, Heading, VStack, Text } from "native-base";

import { HistoryDTO } from "@dtos/HistoryDTO";

type HistoryCardProps = {
	exercise: HistoryDTO;
};

export function HistoryCard({ exercise }: HistoryCardProps) {
	return (
		<HStack
			alignItems='center'
			px={5}
			py={4}
			mb={3}
			bg='gray.600'
			rounded='md'
			w='full'>
			<VStack mr={5} flex={1}>
				<Heading
					fontSize='md'
					color='white'
					fontFamily='heading'
					textTransform='capitalize'
					numberOfLines={1}>
					{exercise.group}
				</Heading>
				<Text
					numberOfLines={1}
					fontSize='lg'
					color='gray.100'
					fontFamily='body'>
					{exercise.name}
				</Text>
			</VStack>
			<Text color='gray.300' fontSize='md'>
				{exercise.hour}
			</Text>
		</HStack>
	);
}
