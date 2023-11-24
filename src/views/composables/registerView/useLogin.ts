import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import type {
	LoginTokenResponse,
	UserCreatedResponse,
} from '@/interfaces/user.interface';
import type { UserRequestBody } from '@/interfaces/request-body.interface';
import { HEADERS_KEYS } from '@/utils/headers.enum';

import { login } from '@/services/userService';
import { setItem } from '@/utils/localStorageAdapter';
import { usePost } from '@/composables/usePost';

export const useLogin = (
	successUserCreated: Ref<UserCreatedResponse | null>
) => {
	const email: Ref<string> = ref<string>('');
	const password: Ref<string> = ref<string>('');

	const {
		data,
		error,
		loading,
		saveData: loginCheck,
	} = usePost<LoginTokenResponse, UserRequestBody>(login);

	const saveCredential = (userCredential: UserRequestBody): void => {
		email.value = userCredential.email;
		password.value = userCredential.password;
	};

	watch(successUserCreated, () => {
		if (successUserCreated) {
			loginCheck({
				email: email.value,
				password: password.value,
			});
		}
	});

	watch(data, () => {
		if (data.value?.token) {
			setItem(HEADERS_KEYS.TOKEN_ID, JSON.stringify(data.value));
		}
	});

	return { data, loading, error, saveCredential, loginCheck };
};
