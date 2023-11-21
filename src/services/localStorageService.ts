export const setItem = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};

export const getItem = (key: string): unknown | null => {
	const value = localStorage.getItem(key);

	return value ? JSON.parse(value) : null;
};

export const removeItem = (key: string): void => {
	localStorage.removeItem(key);
};

export const clearAll = (): void => {
	localStorage.clear();
};

export default {
	setItem,
	getItem,
	removeItem,
	clearAll,
};
