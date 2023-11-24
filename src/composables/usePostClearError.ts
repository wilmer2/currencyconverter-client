import { usePost } from './usePost';

export const usePostClearError = (saveAsyncCallback: any) => {
	const { data, error, loading, saveData } = usePost(saveAsyncCallback);

	const clearError = (): void => {
		error.value = null;
	};

	return { data, error, loading, saveData, clearError };
};
