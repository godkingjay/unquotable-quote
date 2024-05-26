'use client';

/**
 * React Hook for LocalStorage using react-secure-storage
 */
import secureStorage from 'react-secure-storage';

const useSecureStorage = () => {
	const setItem: typeof secureStorage.setItem = (key, value) => secureStorage.setItem(key, value);
	const getItem: typeof secureStorage.getItem = (key) => secureStorage.getItem(key);
	const removeItem: typeof secureStorage.removeItem = (key) => secureStorage.removeItem(key);
	const clear: typeof secureStorage.clear = () => secureStorage.clear();

	return {
		setItem,
		getItem,
		removeItem,
		clear,
	};
};

export { useSecureStorage };
