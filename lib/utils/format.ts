import pluralize from 'pluralize';

import { isEmpty } from './utility';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const formatCurrency = (value: number) =>
	currencyFormatter
		.format(value)
		.toString()
		.replace(/\$/g, '')
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Remove Space
 *
 * @param value
 * @returns {string}
 */
export const formatRemoveSpace = (value: string = '') => value.replace(/\s+/g, '');

/**
 * Remove whitespace and space at the beginning of a string
 * bit not at the end
 *
 * @param value
 * @returns {string}
 */
export const formatRemoveExtraSpaces = (value: string = '') => value.replace(/^\s+/g, '').replace(/\s+/g, ' ');

/**
 * Capitalize first letter of each word
 *
 * @param value
 * @returns {string}
 */
export const formatTitle = (value: string = '') =>
	value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1));

/**
 * Capitalize a string
 */
export const formatCapitalize = (value: string = '') => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Capitalize all to upper case
 *
 * @param value
 * @returns {string}
 */
export const formatUpperCase = (value: string = '') => value.toUpperCase();

/**
 * Convert all to lower case
 *
 * @param value
 * @returns {string}
 */
export const formatLowerCase = (value: string = '') => value.toLowerCase();

/**
 * UnSlugify a string
 */
export const formatUnSlugify = (value: string = '') => value.replace(/-/g, ' ');

/**
 * Slugify a string
 */
export const formatSlugify = (value: string = '') => value.replace(/\s+/g, '_').toLowerCase();

/**
 * Convert a 'a_text' string to 'a text'
 */
export const formatUnUnderscore = (value: string = '') => value.replace(/_/g, ' ');

/**
 * Convert a 'a text' string to 'a_text'
 */
export const formatUnderscore = (value: string = '') => value.replace(/\s+/g, '_').toLowerCase();

/**
 * Add apostrophe to a string
 */
export const formatApostrophe = (value: string = '') => {
	if (value.slice(-1) === 's') {
		return `${value}'`;
	}

	return `${value}'s`;
};

/**
 * Format Plural
 *
 * Formats a string to be plural if the value is greater than 1.
 *
 * @param {string} text - The text to format
 * @param {number | string} count - The value to check if the text should be plural
 * @param {boolean} inclusive - If the count should be added to the beginning of the string
 * @return {string}
 */
export const formatPlural = (text: string, count: number | string, inclusive: boolean = false) => {
	if (typeof count === 'string') {
		count = Number(count);
	}
	if (isNaN(count)) {
		count = 0;
	}
	if (text.length <= 0) {
		return text;
	}

	return pluralize(text, count, inclusive);
};

/**
 * Map through object keys and turn the value of an empty value to null
 *
 * @param obj - Object to map
 */
export const formatKeyValueNullOnEmpty = <T extends Object>(obj: T): T => {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => {
			if (isEmpty(value)) {
				return [key, null];
			}

			if (typeof value === 'object') {
				return [key, formatKeyValueNullOnEmpty(value)];
			}

			return [key, value];
		})
	) as T;
};

/**
 * Returns a string with ellipsis if the value is greater than the length
 *
 * @param value - String to format
 * @param length - Length of the string before adding ellipses
 */
export const formatEllipsis = (value: string | undefined | null, length: number = 10) => {
	if (value) {
		if (value.length > length) {
			return `${value.substring(0, length)}...`;
		}

		return value;
	} else {
		return undefined;
	}
};

/**
 * Format string to number
 *
 * @param value - String to format
 * @param fallback - Fallback value if the value is not a number
 */
export const formatNumber = (value: string | number | undefined | null, fallback?: number) => {
	switch (typeof value) {
		case 'string':
			return Number(value.replace(/[^0-9.-]+/g, ''));
		case 'number':
			return value;
		default:
			return fallback ?? 0;
	}
};

/**
 * Returns a code representation of a string
 *
 * @param value - String to format
 * @returns {string}
 */
export const formatCode = (value: string = '') => {
	return value.replace(/[^A-Za-z0-9_-\s]/g, '').replace(/\s+/g, '-');
};

/**
 * Format a number to a percentage
 *
 * @param value - Number to format
 * @returns {number}
 */
export const formatPercentage = (value?: number | null, digits: number = 2) => {
	if (value) {
		return (value * 100).toFixed(digits);
	} else {
		return 0;
	}
};
