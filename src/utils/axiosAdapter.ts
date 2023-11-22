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

export const get = <T>(url: string, params = {}): Promise<AxiosResponse<T>> => {
	return axiosObj.get<T>(url, { params });
};

export const getWithCustomHeaders = (
	url: string,
	params = {},
	headers = {}
) => {
	return axiosObj.get(url, {
		params,
		headers,
	});
};

export default {
	get,
	getWithCustomHeaders,
};
