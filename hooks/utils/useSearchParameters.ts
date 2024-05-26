'use client';

import React from 'react';

import { concatenate } from '@/lib/utils';
import { KeyValueSearchParameter } from '@/types';

type useSearchParamsProps = {
	prefix?: string;
	callback?: () => void;
};

const useSearchParams = ({ prefix, callback }: useSearchParamsProps) => {
	const updateSearchParams = React.useCallback(
		(
			keyValues: KeyValueSearchParameter[],
			option?: {
				reload?: boolean;
			}
		) => {
			const params = new URLSearchParams(window.location.search);
			keyValues.forEach(({ key, value: v }) => {
				let value = '';
				switch (typeof v) {
					case 'string':
						value = v;
						break;
					case 'number':
						value = v.toString();
						break;
					case 'boolean':
						value = v.toString();
						break;
					default:
						value = JSON.stringify(v);
						break;
				}
				params.set(concatenate('', prefix, key), value);
			});
			window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

			if ((option?.reload ?? true) && callback) {
				callback();
			}
		},
		[callback, prefix]
	);

	const removeSearchParams = React.useCallback(
		(
			keys: string[],
			option?: {
				reload?: boolean;
			}
		) => {
			const params = new URLSearchParams(window.location.search);
			keys.forEach((key) => {
				params.delete(concatenate('', prefix, key));
			});
			window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

			if ((option?.reload ?? true) && callback) {
				callback();
			}
		},
		[callback, prefix]
	);

	const getSearchParams = React.useCallback(() => {
		const params = new URLSearchParams(window.location.search);
		return params;
	}, []);

	const getSearchParam = React.useCallback(
		(key: string) => {
			const params = new URLSearchParams(window.location.search);
			return params.get(concatenate('', prefix, key));
		},
		[prefix]
	);

	return {
		updateSearchParams,
		removeSearchParams,
		getSearchParams,
		getSearchParam,
	};
};

export { useSearchParams };
