import { onBeforeMount, ref, watch } from 'vue';
import type { Ref } from 'vue';

import type {
	LoginTokenResponse,
	UserResponse,
} from '../interfaces/user.interface';
import type { ErrorResponse } from '@/interfaces/generics.interface';
import { HTTP_STATUS_CODE } from '../utils/statusCode.enum';
import { getUser } from '../services/userService';
import { useFetch } from '../composables/useFetch';
import { getToken } from '@/services/headerService';

export const useConfigInitialData = () => {
	const {
		data,
		loading,
		error: errorUser,
		fetchData: fetchUserData,
	} = useFetch<UserResponse>(getUser);

	const errorToShow: Ref<ErrorResponse | null> = ref<ErrorResponse | null>(
		null
	);

	const tokenData: LoginTokenResponse | null = getToken();

	onBeforeMount(() => {
		if (tokenData) {
			fetchUserData();
		}
	});

	watch(errorUser, () => {
		errorToShow.value =
			errorUser.value &&
			errorUser.value.status !== HTTP_STATUS_CODE.UNAUTHORIZED
				? errorUser.value
				: null;
	});

	return { data, loading, error: errorToShow, fetchUserData };
};
