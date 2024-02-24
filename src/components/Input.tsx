import {
	IInputProps,
	Input as NativeBaseInput,
	FormControl
} from "native-base";

type InputProps = IInputProps & {
	errorMessage?: string | null;
};

export function Input({
	errorMessage = null,
	isInvalid,
	...props
}: InputProps) {
	const invalid = !!errorMessage || isInvalid;
	return (
		<FormControl isInvalid={invalid} mb={4}>
			<NativeBaseInput
				bg='gray.700'
				h={14}
				px={4}
				borderWidth={0}
				fontSize='md'
				color='white'
				fontFamily='body'
				placeholderTextColor='gray.300'
				rounded='md'
				isInvalid={invalid}
				_focus={{
					bg: "gray.700",
					borderWidth: 1,
					borderColor: "green.500"
				}}
				_invalid={{
					borderWidth: 1,
					borderColor: "red.500"
				}}
				{...props}
			/>
			<FormControl.ErrorMessage _text={{ color: "red.500", fontSize: "sm" }}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	);
}
