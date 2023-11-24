import axiosAdapter from '@/utils/axiosAdapter';
import type { UserRequestBody } from '@/interfaces/request-body.interface';
import type {
	LoginTokenResponse,
	UserCreatedResponse,
	UserResponse,
} from '@/interfaces/user.interface';

export const login = async (
	body?: UserRequestBody
): Promise<LoginTokenResponse> => {
	const response = await axiosAdapter.post<LoginTokenResponse, UserRequestBody>(
		'login_check',
		body
	);

	return response.data;
};

export const createUser = async (
	body?: UserRequestBody
): Promise<UserCreatedResponse> => {
	const response = await axiosAdapter.post<
		UserCreatedResponse,
		UserRequestBody
	>('register', body);

	return response.data;
};

export const getUser = async (): Promise<UserResponse> => {
	const response = await axiosAdapter.get<UserResponse>('current/user');

	return response.data;
};

export default {
	login,
	createUser,
	getUser,
};
