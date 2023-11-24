import { mapErrors } from '@/services/errorService';
import axios, { type AxiosResponse } from 'axios';
import type { LoginTokenResponse } from '@/interfaces/user.interface';
import { HEADERS_KEYS } from './headers.enum';
import { getItem } from './localStorageAdapter';

const axiosObj = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosObj.interceptors.request.use(
	(config) => {
		const tokenData = getItem<LoginTokenResponse>(HEADERS_KEYS.TOKEN_ID);

		if (tokenData) {
			config.headers['Authorization'] = `Bearer ${tokenData.token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosObj.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log('*** error ***', error);
		const formattedError = mapErrors(error);

		return Promise.reject(formattedError);
	}
);

export const get = <T>(
	url: string,
	params?: any,
	headers?: any
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
