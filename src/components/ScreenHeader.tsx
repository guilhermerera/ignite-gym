import { Center, Heading, ICenterProps } from "native-base";

type ScreenHeaderProps = ICenterProps & {
	label: string;
};

export function ScreenHeader({ label }: ScreenHeaderProps) {
	return (
		<Center backgroundColor='gray.600' pt={16} pb={6}>
			<Heading fontFamily='heading' color='gray.100' fontSize='lg'>
				{label}
			</Heading>
		</Center>
	);
}
