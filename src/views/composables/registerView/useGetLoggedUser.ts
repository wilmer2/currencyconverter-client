import { watch } from 'vue';
import type { Ref } from 'vue';
import type {
	LoginTokenResponse,
	UserResponse,
} from '@/interfaces/user.interface';
import { useFetch } from '@/composables/useFetch';
import { getUser } from '@/services/userService';

export const useGetLoggedUser = (
	loginToken: Ref<LoginTokenResponse | null>
) => {
	const { data, loading, error, fetchData } = useFetch<UserResponse>(getUser);

	watch(loginToken, () => {
		if (loginToken.value?.token) {
			fetchData();
		}
	});

	return { data, loading, error, fetchData };
};
