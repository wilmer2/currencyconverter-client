import { onBeforeMount, ref, watch } from 'vue';
import type { Ref } from 'vue';

import type {
	LoginTokenResponse,
	UserResponse,
} from '../interfaces/user.interface';
import { HEADERS_KEYS } from '../utils/headers.enum';
import { HTTP_STATUS_CODE } from '../utils/statusCode.enum';

import { getUser } from '../services/userService';
import { getItem } from '../utils/localStorageAdapter';
import { useFetch } from '../composables/useFetch';
import type { ErrorResponse } from '@/interfaces/generics.interface';

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

	const tokenData = getItem<LoginTokenResponse>(HEADERS_KEYS.TOKEN_ID);

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
