import NextLink from 'next/link';

import { button as buttonStyles } from '@nextui-org/theme';
import { cn } from '@/lib';

export default function Home() {
	return (
		<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='inline-block max-w-lg text-center justify-center'>
				<h1>A NextJS Template</h1>
				<h3 className='font-normal text-default-500'>Subtitle</h3>
			</div>

			<div className='flex gap-3'>
				<NextLink
					href='/game'
					className={cn(
						buttonStyles({ variant: 'solid', radius: 'full', color: 'primary' }),
						'bg-gradient-to-br from-violet-500 to-pink-500'
					)}
				>
					START GAME
				</NextLink>
			</div>
		</section>
	);
}
