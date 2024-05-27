import dynamic from 'next/dynamic';
import React from 'react';

const GameWindow = dynamic(() => import('@/components/game').then((mod) => mod.GameWindow), {
	loading: () => <></>,
});

const Game = () => {
	return (
		<section className='pb-16'>
			<GameWindow />
		</section>
	);
};

export default Game;
