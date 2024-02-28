import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { api } from "@services/api";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

type ExerciseCardProps = TouchableOpacityProps & {
	exercise: ExerciseDTO;
};

export function ExerciseCard({ exercise, ...props }: ExerciseCardProps) {
	return (
		<TouchableOpacity activeOpacity={0.7} {...props}>
			<HStack
				bg='gray.500'
				alignItems='center'
				rounded='md'
				p={2}
				
				mb={3}>
				<Image
					source={{
						uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`
					}}
					alt={exercise.name}
					resizeMode='cover'
					rounded='md'
					mr={2}
					w={16}
					h={16}
				/>
				<VStack flex={1}>
					<Heading fontSize='lg' color='white' fontFamily='heading'>
						{exercise.name}
					</Heading>
					<Text
						fontSize='sm'
						color='gray.200'
						fontFamily='body'
						mt={1}
						numberOfLines={2}>
						{exercise.series} séries x {exercise.repetitions} repetições
					</Text>
				</VStack>
				<Icon as={Entypo} name='chevron-right' color='gray.300' />
			</HStack>
		</TouchableOpacity>
	);
}
