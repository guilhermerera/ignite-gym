import { AppError } from "@utils/AppError";
import axios from "axios";

export const BASE_URL = "http://192.168.15.98:3333"

const api = axios.create({
	baseURL: BASE_URL
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.data) {
			return Promise.reject(new AppError(error.response.data.message));
		}
		return Promise.reject(error);
	}
);

export { api };
