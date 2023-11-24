import type { UnwrapRef } from 'vue';
import type { PostAsyncCallback } from '@/interfaces/generics.interface';
import { usePost } from './usePost';

export const usePostClearError = <T, R>(
	saveAsyncCallback: PostAsyncCallback<UnwrapRef<T>, R>
) => {
	const { data, error, loading, saveData } = usePost<T, R>(saveAsyncCallback);

	const clearError = (): void => {
		error.value = null;
	};

	return { data, error, loading, saveData, clearError };
};
