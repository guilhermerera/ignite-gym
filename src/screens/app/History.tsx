import { Center, Text, useTheme } from "native-base";

export function History() {
	const { colors } = useTheme();
	return (
		<Center flex={1}>
			<Text color={colors.gray[200]}>History</Text>
		</Center>
	);
}
