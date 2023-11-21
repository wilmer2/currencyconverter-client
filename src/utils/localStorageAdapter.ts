export const setItem = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};

export const getItem = <T>(key: string): null | T => {
	const value = localStorage.getItem(key);

	return value ? (JSON.parse(value) as T) : null;
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
