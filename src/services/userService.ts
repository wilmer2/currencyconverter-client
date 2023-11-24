import axiosAdapter from '@/utils/axiosAdapter';

export const createUser = async (data: any) => {
	const response = await axiosAdapter.post('register', data);

	return response.data;
};

export default {
	createUser,
};
