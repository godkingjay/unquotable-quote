/**
 * Check if values are considered empty
 *
 * @param {string | number | boolean | undefined | null | Array | Object} args - The values to check
 * @return {boolean} - Returns true if the values are empty
 */
export const isEmpty = (...args: any[]): boolean => {
	return args.every((value) => {
		if (typeof value === 'string') return value.trim().length === 0;
		if (value instanceof Array) return value.length === 0;
		if (value instanceof Object) return Object.keys(value).length === 0;
		return value === undefined || value === null;
	});
};

/**
 * Check if values is considered not empty
 *
 * @param {string | number | boolean | undefined | null | Array | Object} args - The values to check
 * @return {boolean} - Returns true if the values are not empty
 */
export const notEmpty = (...args: any[]): boolean => {
	return !isEmpty(...args);
};

/**
 * Check if value is a number
 *
 * @param {any} value - The value to check
 * @return {boolean} - Returns true if the value is a number
 */
export const isNumber = (value: any): boolean => {
	return !isNaN(value);
};

/**
 * Do something n times
 *
 * @param {number} time - The times to loop
 * @param {Function} callback - The callback function
 */
export const times = (n: number, callback: Function, delay: number = 0) => {
	for (let i = 0; i < n; i++) {
		setTimeout(() => {
			callback();
		}, i * delay);
	}
};

/**
 * Repeat action upon error up to n times
 *
 * @param {number} n - The times to loop
 * @param {Function} callback - The callback function
 */
export const repeatOnError = async (n: number, callback: Function) => {
	let error = null;
	for (let i = 0; i < n; i++) {
		try {
			await callback();
			error = null;
			break;
		} catch (e) {
			error = e;
		}
	}

	if (error) {
		throw error;
	}
};

/**
 * Wait for a specified amount of time to complete before continuing to process
 *
 * @param {number} ms - The time to wait in milliseconds
 */
export const wait = async (ms: number = 1000, callback?: Function) => {
	await new Promise((resolve) => setTimeout(resolve, ms));
	if (callback) callback();
};

/**
 * Concatenate values together joined by spaces or any
 *
 * @param {string} join - The string to join the values together
 * @param {(string | number | boolean | undefined | null)[]} args - The values to concatenate
 */
export const concatenate = (join: string = ' ', ...args: (string | number | boolean | undefined | null)[]): string => {
	return args.filter((arg) => notEmpty(arg)).join(join);
};

/**
 * Perform action after delay. If another action is performed before the
 * previous action is completed, the previous action will be cancelled.
 *
 * @param {Function} callback - The callback function
 * @param {number} delay - The delay in milliseconds
 */
export const debounce = (callback: Function, delay: number = 1000) => {
	// Declare a variable called 'timer' to store the timer ID
	let timer: NodeJS.Timeout;

	// Return an anonymous function that takes in any number of arguments
	return function (...args: any[]) {
		// Clear the previous timer to prevent the execution of 'callback'
		clearTimeout(timer);

		// Set a new timer that will execute 'callback' after the specified delay
		timer = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

/**
 * returnDoIf
 */
export const doIfReturn = (condition: boolean, callback: Function) => {
	if (condition) {
		return callback();
	} else {
		return undefined;
	}
};

/**
 * nullIfEmpty
 *
 * Returns null if the value is empty
 *
 * @param {any} value - The value to check
 *
 * @returns {any} - The value or null
 */
export const nullIfEmpty = <T extends unknown>(value: T): T | null => {
	return isEmpty(value) ? null : value;
};

/**
 * Returns null if the value of the specified keys is empty
 * else if the value of the specified keys is not empty, return the item
 *
 * @param {T} item - The object to check
 * @param {keyof T} keys - The keys to check
 */
export const nullifyInvalidObject = <T extends unknown>(item: T, keys: (keyof T)[]): T | null => {
	const invalidKeys = keys.filter((key) => isEmpty(item[key]));
	if (invalidKeys.length === 0) {
		return item;
	}
	return null;
};

/**
 * Returns a reduced array of objects that does not contain
 * the specified keys if the value of the key is empty
 *
 * @param {T[]} items - The array of objects to reduce
 * @param {keyof T} keys - The keys to check
 *
 * @returns {T[]} - The reduced array of objects
 */
export const reduceInvalidObjects = <T extends unknown>(items: T[], keys: (keyof T)[]): T[] => {
	return items.reduce((acc, item) => {
		const invalidKeys = keys.filter((key) => isEmpty(item[key]));
		if (invalidKeys.length === 0) {
			acc.push(item);
		}
		return acc;
	}, [] as T[]);
};

/**
 * Replace the name of keys of an object and return the objects of new type
 * with keys replaced by the specified transform object
 */
export const reduceTransformObjects = <T extends Record<string, unknown>, U>(
	items: T[],
	transform: { [key in keyof Partial<T>]: U }
) => {
	return items.map((item) => {
		const newItem: T = {} as any;
		(Object.keys(item) as (keyof T)[]).forEach((key) => {
			const newKey = transform[key] ?? (key as keyof T);
			newItem[newKey as keyof T] = item[key];
		});
		return newItem;
	}) as any[];
};

/**
 * Clamps a value between a minimum and maximum range.
 * @param value The value to be clamped.
 * @param min The minimum value of the range.
 * @param max The maximum value of the range.
 * @returns The clamped value.
 */
export const minMax = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max);
};

/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (inclusive).
 * @returns A random number between the minimum and maximum values.
 */
const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate random points from the specified number of points
 *
 * @param {number}  points - Number of points to generate
 * @param {number}  min - The minimum value of the points
 * @param {number}  max - The maximum value of the points
 * @returns {Point[]} - The generated random points
 */
export const randomPoints = (points: number, min: number = 0, max: number = 100) => {
	return Array.from({ length: points }).map((_) => ({
		x: Math.floor(Math.random() * (max - min + 1) + min),
		y: Math.floor(Math.random() * (max - min + 1) + min),
	}));
};

/**
 * Generates a random value from the specified list
 */
export const randomFromList = <T extends unknown>(list: T[]): T => {
	return list[Math.floor(Math.random() * list.length)];
};

/**
 * Generates a random value from the specified object
 */
export const randomFromObject = <T extends Record<string, unknown>>(object: T): T[keyof T] => {
	const keys = Object.keys(object);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];
	return object[randomKey as keyof T];
};

/**
 * Generates a random value from the specified range
 */
export const randomFromRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random value from the specified matrix
 */
export const randomFromMatrix = <T extends unknown>(matrix: T[][]): T => {
	const randomRow = matrix[Math.floor(Math.random() * matrix.length)];
	return randomRow[Math.floor(Math.random() * randomRow.length)];
};

/**
 * Generates a random value from the specified set
 */
export const randomFromSet = <T extends unknown>(set: Set<T>): T => {
	const randomIndex = Math.floor(Math.random() * set.size);
	return Array.from(set)[randomIndex];
};

/**
 * Generates a random value from the specified map
 */
export const randomFromMap = <K, V>(map: Map<K, V>): V => {
	const randomIndex = Math.floor(Math.random() * map.size);
	return Array.from(map.values())[randomIndex];
};

/**
 * Generates a random value from the specified tuple
 */
export const randomFromTuple = <T extends unknown>(tuple: [T, ...T[]]): T => {
	return tuple[Math.floor(Math.random() * tuple.length)];
};

/**
 * Returns the first not empty value from the specified values
 *
 * @param args - The values to check
 * @returns The first not empty value
 */
export const firstNotEmptyFromValues = <T extends unknown>(...args: T[]): T | undefined => {
	return args.find((value) => notEmpty(value));
};

/**
 * Checks if the value is in the specified list
 *
 * @param value - The value to check
 * @param list - The list to check
 * @returns True if the value is in the list
 */
export const isInList = <T extends unknown>(value: T, list: T[]): boolean => {
	return list.includes(value);
};

/**
 * Returns the csv string from the specified json data
 *
 * @param items - the JSON Data in array
 * @returns csv string
 */
export const arrayToCsv = (items: any[]) => {
	const header = Object.keys(items[0]);
	const headerString = header.join(',');

	const replacer = (key: string, value: any) => value ?? '';

	const rowItems = items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));

	const csv = [headerString, ...rowItems].join('\r\n');

	return csv;
};
