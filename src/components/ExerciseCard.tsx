import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type ExerciseCardProps = TouchableOpacityProps & {};

export function ExerciseCard({ ...props }: ExerciseCardProps) {
	return (
		<TouchableOpacity activeOpacity={0.7} {...props}>
			<HStack
				bg='gray.500'
				alignItems='center'
				rounded='md'
				p={1}
				pr={2}
				mb={3}>
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}}
					alt='Exercise Example'
					resizeMode='cover'
					rounded='md'
					mr={2}
					w={16}
					h={16}
				/>
				<VStack flex={1}>
					<Heading fontSize='lg' color='white' fontFamily='heading'>
						Agachamento Livre
					</Heading>
					<Text
						fontSize='sm'
						color='gray.200'
						fontFamily='body'
						mt={1}
                        numberOfLines={2}
                    >
						3 séries x 12 repetições
					</Text>
				</VStack>
				<Icon as={Entypo} name='chevron-right' color='gray.300' />
			</HStack>
		</TouchableOpacity>
	);
}
