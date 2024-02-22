import { HStack, Heading, VStack, Text } from "native-base";

export function HistoryCard() {
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
					Costas
				</Heading>
				<Text
					numberOfLines={1}
					fontSize='lg'
					color='gray.100'
					fontFamily='body'>
					Puxada frontal
				</Text>
			</VStack>
			<Text color='gray.300' fontSize='md'>
				08:56
			</Text>
		</HStack>
	);
}
