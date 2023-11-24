import { type Ref, type UnwrapRef, ref } from 'vue';
import {
	type AsyncCallback,
	type ErrorResponse,
} from '@/interfaces/generics.interface';
import { type FetchComposableData } from '@/interfaces/common-composable.interface';
import { isErrorResponse } from '@/services/errorService';

export const useFetch = <T, R = any>(
	asyncCallback: AsyncCallback<UnwrapRef<T>, R>
): FetchComposableData<T, R> => {
	const data: Ref<UnwrapRef<T> | null> = ref<T | null>(null);
	const error: Ref<ErrorResponse | null> = ref<ErrorResponse | null>(null);
	const loading: Ref<boolean> = ref<boolean>(false);

	const fetchData = async (params?: R, headers = {}): Promise<void> => {
		loading.value = true;
		error.value = null;

		let response;

		try {
			response = await asyncCallback(params, headers);
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

	return { data, loading, error, fetchData };
};
