import { ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import type {
	ErrorResponse,
	PostAsyncCallback,
} from '@/interfaces/generics.interface';
import type { PostComposableData } from '@/interfaces/common-composable.interface';

import { isErrorResponse } from '@/services/errorService';

export const usePost = <T, R>(
	saveAsyncCallback: PostAsyncCallback<UnwrapRef<T>, R>
): PostComposableData<T, R> => {
	const data: Ref<UnwrapRef<T> | null> = ref<T | null>(null);
	const error: Ref<ErrorResponse | null> = ref<ErrorResponse | null>(null);
	const loading: Ref<boolean> = ref<boolean>(false);

	const saveData = async (body?: R): Promise<void> => {
		data.value = null;
		error.value = null;
		loading.value = true;

		let response;

		try {
			response = await saveAsyncCallback(body);
		} catch (e) {
			if (isErrorResponse(e)) {
				error.value = e;
			} else {
				throw e;
			}
		} finally {
			loading.value = false;
			data.value = response || data.value;
		}
	};

	return { data, loading, error, saveData };
};
