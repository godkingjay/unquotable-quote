'use client';

import React from 'react';

import { cn, formatUpperCase } from '@/lib';
import { API } from '@/lib/api';
import { useGameInstanceStore } from '@/lib/zustand';
import { GameQuoteFieldCharacterType, GameQuoteFieldWordType } from '@/types';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useQuery } from '@tanstack/react-query';

import { HeartFilledIcon } from '../icons';
import { Card, CardBody } from '@nextui-org/card';
import { Spinner } from '@nextui-org/spinner';

type GameWindowProps = {};

const GameWindow = React.forwardRef<HTMLDivElement, GameWindowProps>((props, ref) => {
	const game = useGameInstanceStore();

	const decryptButtonRef = React.useRef<HTMLButtonElement>(null);

	const { isLoading, error, refetch } = useQuery({
		queryKey: ['getQuote'],
		queryFn: async () => {
			const response = await API.quotes.GET_Encrypted({});

			game.init(response.data, game.options);

			return response.data;
		},
		refetchOnWindowFocus: false,
	});

	const newGame = React.useCallback(() => {
		refetch();
	}, []);

	const renderCharacterField = (character: GameQuoteFieldCharacterType) => {
		switch (character.type) {
			case 'letter': {
				return (
					<div
						key={character.index}
						className='text-inherit flex flex-col items-center justify-center gap-2'
					>
						<Input
							id={`character-field-${character.fieldIndex}`}
							variant='underlined'
							max={1}
							maxLength={1}
							aria-error={character.isError}
							aria-correct={character.isCorrect}
							isDisabled={character.isCorrect}
							isInvalid={character.isError}
							className={cn('h-10 text-inherit w-[120%]', {
								'!text-red-500': character.isError,
							})}
							classNames={{
								input: 'text-center text-lg text-inherit -mb-2',
								mainWrapper: '!p-0',
								innerWrapper: '!p-0',
								inputWrapper: '!p-0',
							}}
							value={character.value}
							onChange={(e) => {
								game.setCharacterValue(character.letter, formatUpperCase(e.target.value));
							}}
							onKeyDown={(e) => {
								switch (e.key) {
									case 'Enter': {
										decryptButtonRef.current?.click();
										const currentCharacter = document.getElementById(
											`character-field-${character.fieldIndex}`
										) as HTMLInputElement;
										if (currentCharacter) {
											currentCharacter?.focus();
										}
										break;
									}
									case 'ArrowLeft': {
										const getPreviousCharacterField = (index: number): HTMLInputElement => {
											return document.getElementById(
												`character-field-${index - 1}`
											) as HTMLInputElement;
										};

										const previousCharacter = getPreviousCharacterField(character.fieldIndex);

										if (previousCharacter) {
											previousCharacter?.focus();
										}
										break;
									}
									case 'ArrowRight': {
										const getNextCharacterField = (index: number): HTMLInputElement => {
											return document.getElementById(
												`character-field-${index + 1}`
											) as HTMLInputElement;
										};

										const nextCharacter = getNextCharacterField(character.fieldIndex);

										if (nextCharacter) {
											nextCharacter?.focus();
										}
										break;
									}
								}
							}}
						/>
						<p
							className={cn({
								'opacity-50': character.isCorrect,
							})}
						>
							{character.letter}
						</p>
					</div>
				);
			}
			default: {
				return (
					<p
						key={character.index}
						className={cn('text-lg inline-flex items-end pb-1 text-inherit h-10', {
							'text-center': character.type === 'join',
						})}
					>
						{character.letter}
					</p>
				);
			}
		}
	};

	const renderWordField = (word: GameQuoteFieldWordType) => {
		return word.characters.map((character) => (
			<div
				key={String(character.index)}
				id={`character-${character.index}`}
				aria-label={`character-${character.letter}-${character.index}`}
				className={cn('inline-flex flex-row w-5', {
					'w-1': character.type === 'join' || character.type === 'symbol',
					'w-5': character.type === 'space',
				})}
			>
				{renderCharacterField(character)}
			</div>
		));
	};

	return (
		<div
			ref={ref}
			id='game-window'
			className='flex flex-col gap-4 justify-center items-center'
		>
			<div className='flex flex-row flex-wrap items-center justify-center gap-2'>
				{Array.from({ length: game.maxLife }).map((_, index) => (
					<HeartFilledIcon
						key={index}
						size={32}
						className={cn({
							'text-red-500': index < game.life,
							'text-default-300': index >= game.life,
						})}
					/>
				))}
			</div>

			<Card
				radius='lg'
				shadow='none'
				className='max-w-3xl border border-divider'
			>
				<CardBody className='flex flex-col gap-2 p-4'>
					{isLoading ? (
						<>
							<Spinner />
						</>
					) : (
						<>
							<div className='text-lg inline-flex flex-wrap text-wrap text-center justify-center'>
								{game?.fields.map((field) => (
									<div
										key={String(field.index)}
										id={`word-${field.index}`}
										className='inline-flex flex-row gap-2 mb-2'
									>
										{renderWordField(field)}
									</div>
								))}
							</div>
							<p className='text-base opacity-50 text-right italic'>- {game.author}</p>
						</>
					)}
				</CardBody>
			</Card>

			<div className='flex mt-4 flex-col-reverse md:flex-row flex-wrap items-center justify-center gap-4'>
				<Button
					size='lg'
					variant='solid'
					color='default'
					isDisabled={isLoading}
					onPress={newGame}
				>
					New Game
				</Button>

				<Button
					ref={decryptButtonRef}
					size='lg'
					variant='solid'
					color='primary'
					isDisabled={isLoading}
					onPress={game.checkDecryptedText}
				>
					Decrypt
				</Button>
			</div>
		</div>
	);
});
GameWindow.displayName = 'GameWindow';

const MemoizedGameWindow = React.memo(GameWindow);

export { MemoizedGameWindow as GameWindow };
