import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ErrorResponse } from '@/interfaces/generics.interface';
import { isErrorResponse } from '@/services/errorService';

export const usePost = (saveAsyncCallback: any) => {
	const data = ref(null);
	const error: Ref<ErrorResponse | null> = ref<ErrorResponse | null>(null);
	const loading = ref(false);

	const saveData = async (payload: any) => {
		data.value = null;
		error.value = null;
		loading.value = true;

		let response;

		try {
			response = await saveAsyncCallback(payload);
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
