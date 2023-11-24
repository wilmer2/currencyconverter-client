import type { UnwrapRef } from 'vue';
import type { PostAsyncCallback } from '@/interfaces/generics.interface';
import { usePost } from './usePost';

export const usePostClearError = <T>(
	saveAsyncCallback: PostAsyncCallback<UnwrapRef<T>>
) => {
	const { data, error, loading, saveData } = usePost<T>(saveAsyncCallback);

	const clearError = (): void => {
		error.value = null;
	};

	return { data, error, loading, saveData, clearError };
};
