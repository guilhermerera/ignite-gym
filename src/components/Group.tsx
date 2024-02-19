import { Text, Pressable, IPressableProps } from "native-base";

type GroupProps = IPressableProps & {
	label: string;
	isActive: boolean;
};

export function Group({ label, isActive, ...props }: GroupProps) {
	return (
		<Pressable
			mr={3}
			w={24}
			h={10}
			bg='gray.600'
			rounded='md'
			alignItems='center'
			justifyContent='center'
			overflow='hidden'
			isPressed={isActive}
			_pressed={{
				borderColor: "green.500",
				borderWidth: 1
			}}
			{...props}>
			<Text
				textTransform='uppercase'
				fontSize='xs'
				fontFamily='heading'
				color={isActive ? "green.500" : "gray.200"}>
				{label}
			</Text>
		</Pressable>
	);
}
