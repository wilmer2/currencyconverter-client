import { mapErrors } from '@/services/errorService';
import axios, { type AxiosResponse } from 'axios';

const axiosObj = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosObj.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const formattedError = mapErrors(error);

		return Promise.reject(formattedError);
	}
);

export const get = <T>(
	url: string,
	params = {},
	headers = {}
): Promise<AxiosResponse<T>> => {
	return axiosObj.get<T>(url, { params, headers });
};

export const post = async <T, R>(
	url: string,
	body?: R
): Promise<AxiosResponse<T>> => {
	return axiosObj.post<T>(url, body);
};

export default {
	get,
	post,
};
