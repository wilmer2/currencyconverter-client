import { mapErrors } from '@/services/errorService';
import axios, { type AxiosResponse } from 'axios';
import type { LoginTokenResponse } from '@/interfaces/user.interface';
import { HEADERS_KEYS } from './headers.enum';
import { HTTP_STATUS_CODE } from '@/utils/statusCode.enum';
import { useUserStore } from '@/stores/useUserStore';
import { getItem, removeItem } from './localStorageAdapter';

const axiosObj = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': navigator.language,
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
		const formattedError = mapErrors(error);
		const tokenData = getItem<LoginTokenResponse>(HEADERS_KEYS.TOKEN_ID);

		if (tokenData && formattedError.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
			const userStore = useUserStore();

			userStore.setUser(null);
			removeItem(HEADERS_KEYS.TOKEN_ID);
		}

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
