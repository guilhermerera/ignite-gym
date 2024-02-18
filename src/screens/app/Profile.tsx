import { Center, Text, useTheme } from "native-base";

export function Profile() {
	const { colors } = useTheme();
	return (
		<Center flex={1}>
			<Text color={colors.gray[200]}>Profile</Text>
		</Center>
	);
}
