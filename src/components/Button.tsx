import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
	title: string;
	variant?: "solid" | "outline";
}

export function Button(props: ButtonProps) {
	const { title, variant = "solid" } = props;
	const isOutline = variant === "outline";

	return (
		<NativeBaseButton
			w='full'
			h={12}
			bg={isOutline ? "transparent" : "green.700"}
			borderWidth={isOutline ? 1 : 0}
			borderColor={isOutline ? "green.700" : "transparent"}
			rounded='md'
			_pressed={{
				bg: isOutline ? "gray.500" : "green.500"
			}}
			{...props}>
			<Text
				color={isOutline ? "green.500" : "white"}
				fontFamily='heading'
				fontSize='sm'>
				{title}
			</Text>
		</NativeBaseButton>
	);
}
