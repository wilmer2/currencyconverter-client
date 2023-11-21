import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const get = <T>(url: string, params = {}): Promise<AxiosResponse<T>> => {
	return instance.get<T>(url, { params });
};

export const customHeaderRequest = (url: string, customHeaderValue: string) => {
	return instance.get(url, {
		headers: {
			'X-Custom-Header': customHeaderValue,
		},
	});
};

export default {
	get,
	customHeaderRequest,
};
