import { View, useToast } from "native-base";

type ToastProps = {
	title: string;
	description?: string;
};
export function useErrorToast() {
	const toast = useToast();

	return ({ title, description }: ToastProps) => {
		toast.show({
			title,
			_title: {
				color: "white",
				fontSize: "md",
				fontFamily: "heading",
				textAlign: "center",
				marginTop: 2,
				marginBottom: description ? undefined : 2
			},
			description: description ? description : undefined,
			_description: description
				? {
						color: "white",
						fontSize: "md",
						fontFamily: "body",
						marginX: 10,
						marginBottom: 2
				  }
				: undefined,
			placement: "top",
			duration: 3000,
			bgColor: "red.500"
		});
	};
}