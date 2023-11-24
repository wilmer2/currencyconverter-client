import axiosAdapter from '@/utils/axiosAdapter';
import type { UserRequestBody } from '@/interfaces/request-body.interface';

export const createUser = async (body?: UserRequestBody) => {
	const response = await axiosAdapter.post('register', body);

	return response.data;
};

export default {
	createUser,
};
