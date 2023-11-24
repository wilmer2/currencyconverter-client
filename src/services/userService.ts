import axiosAdapter from '@/utils/axiosAdapter';
import type { UserRequestBody } from '@/interfaces/request-body.interface';

export const createUser = async (body?: UserRequestBody) => {
	const response = await axiosAdapter.post<
		{ message: string },
		UserRequestBody
	>('register', body);

	return response.data;
};

export default {
	createUser,
};
