'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';

import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';
import { SwitchProps, useSwitch } from '@nextui-org/switch';
import { useIsSSR } from '@react-aria/ssr';
import { VisuallyHidden } from '@react-aria/visually-hidden';

export interface ThemeSwitchProps {
	className?: string;
	classNames?: SwitchProps['classNames'];
}

export const ThemeSwitch = ({ className, classNames }: ThemeSwitchProps) => {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	const onChange = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	const { slots, isSelected, getInputProps, getWrapperProps } = useSwitch({
		isSelected: theme === 'light' || isSSR,
		'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
		onChange,
	});

	return (
		<>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<div
				{...getWrapperProps()}
				className={slots.wrapper({
					class: clsx(
						[
							'w-auto h-auto',
							'bg-transparent',
							'rounded-lg',
							'flex items-center justify-center',
							'group-data-[selected=true]:bg-transparent',
							'!text-default-500',
							'pt-px',
							'px-0',
							'mx-0',
						],
						classNames?.wrapper
					),
				})}
			>
				{!isSelected || isSSR ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
			</div>
		</>
	);
};
