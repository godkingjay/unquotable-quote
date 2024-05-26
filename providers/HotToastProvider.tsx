'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { CheckmarkIcon, ErrorIcon, LoaderIcon, ToasterProps, useToaster } from 'react-hot-toast';

import { Card, CardBody } from '@nextui-org/card';

export type HotToastProvider = ToasterProps;

export const HotToastProvider = () => {
	const { toasts, handlers } = useToaster();
	const { startPause, endPause, calculateOffset, updateHeight } = handlers;

	const toastClassName: HTMLDivElement['className'] = 'mr-2';

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				padding: 10,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				zIndex: 999999,
			}}
			onMouseEnter={startPause}
			onMouseLeave={endPause}
		>
			{toasts.map((toast, index) => {
				const offset = calculateOffset(toast, {
					reverseOrder: false,
				});

				const ref = (el: any) => {
					if (el && !toast.height) {
						const height = el.getBoundingClientRect().height;
						updateHeight(toast.id, height);
					}
				};

				const offsetStyle = (() => {
					switch (toast.position) {
						case 'top-left':
							return { top: 10, left: 10, transform: `translateY(${offset}px)` };
						case 'top-right':
							return { top: 10, right: 10, transform: `translateY(${offset}px)` };
						case 'top-center':
							return { top: 10, left: '50%', transform: `translateX(-50%) translateY(${offset}px)` };
						case 'bottom-left':
							return { bottom: 10, left: 10, transform: `translateY(-${offset}px)` };
						case 'bottom-right':
							return { bottom: 10, right: 10, transform: `translateY(-${offset}px)` };
						case 'bottom-center':
							return { bottom: 10, left: '50%', transform: `translateX(-50%) translateY(-${offset}px)` };
						default:
							return { top: 10, left: '50%', transform: `translateX(-50%) translateY(${offset}px)` };
					}
				})();

				const renderIcon = () => {
					if (toast.icon) {
						return toast.icon;
					} else {
						switch (toast.type) {
							case 'blank':
								return null;
							case 'error':
								return (
									<ErrorIcon
										className={clsx(toastClassName)}
										primary={toast.iconTheme?.primary ?? 'red'}
										secondary={toast.iconTheme?.secondary ?? 'white'}
									/>
								);
							case 'success':
								return (
									<CheckmarkIcon
										className={clsx(toastClassName)}
										primary={toast.iconTheme?.primary ?? '#40d040'}
										secondary={toast.iconTheme?.secondary ?? 'white'}
									/>
								);
							case 'loading':
								return (
									<LoaderIcon
										className={clsx(toastClassName)}
										primary={toast.iconTheme?.primary ?? 'blue'}
										secondary={toast.iconTheme?.secondary ?? 'white'}
									/>
								);
							default:
								return '';
						}
					}
				};

				return (
					<Card
						key={toast.id}
						ref={ref}
						{...(toast.ariaProps && toast.ariaProps)}
						style={{
							transition: 'all 0.2s',
							...offsetStyle,
							opacity: toast.visible ? 1 : 0,
							pointerEvents: toast.visible ? 'all' : 'none',
							...toast.style,
						}}
						className={clsx('max-w-md text-sm absolute w-auto', toast.className)}
					>
						<CardBody>
							<div className='flex flex-row items-center gap-0'>
								<div className=''>{renderIcon()}</div>
								<motion.p className='flex flex-col whitespace-pre-wrap break-words'>
									{toast.message as ReactNode}
								</motion.p>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};
