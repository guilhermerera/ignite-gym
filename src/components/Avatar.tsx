import { Image, IImageProps } from "native-base";

type AvatarProps = IImageProps & {
	size: number;
};

export function Avatar({ size, ...props }: AvatarProps) {
	return (
		<Image
			w={size}
			h={size}
			rounded='full'
			borderWidth={1}
			borderColor='gray.200'
			{...props}
		/>
	);
}
