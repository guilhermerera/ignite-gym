import { ScreenHeader } from "@components/ScreenHeader";
import {  VStack, useTheme } from "native-base";

export function History() {
	const { colors } = useTheme();
	return (
		<VStack flex={1}>
			<ScreenHeader label="Histórico de Exercícios"/>
			
		</VStack>
	);
}
