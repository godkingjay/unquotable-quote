import { create } from 'zustand';

import { EncryptedQuoteType, GameQuoteFieldCharacterType, GameQuoteFieldWordType } from '@/types/game';

type GameInstanceInitOptions = {
	life?: number;
};

type GameInstanceStoreState = EncryptedQuoteType & {
	life: number;
	maxLife: number;
	options: GameInstanceInitOptions;
	fieldsCount: number;
	decryptedText: string | null;
	count: number;
	length: number;
	fields: GameQuoteFieldWordType[];
	inputs: Record<string, string>;
	isSolved: boolean;
	isLost: boolean;
	isGameOver: boolean;
};

type GameInstanceStoreActions = {
	init: (game: EncryptedQuoteType, options?: GameInstanceInitOptions) => void;
	incrementCount: () => void;
	resetGameInstance: () => void;
	setGameInstance: (game: EncryptedQuoteType) => void;
	setCharacterValue: (letter: string, value: string) => void;
	checkDecryptedText: () => void;
};

const defaultGameInstance: GameInstanceStoreState = {
	life: 5,
	maxLife: 5,
	options: {
		life: 5,
	},
	fieldsCount: 0,
	decryptedText: null,
	count: 0,
	text: null,
	author: null,
	map: {},
	length: 0,
	fields: [],
	inputs: {},
	isSolved: false,
	isLost: false,
	isGameOver: false,
};

export const useGameInstanceStore = create<GameInstanceStoreState & GameInstanceStoreActions>((set) => ({
	...defaultGameInstance,
	init: (game, options) => {
		const reversedMap = Object.fromEntries(Object.entries(game.map).map(([key, value]) => [value, key]));

		let currentCharacterIndex = 0;
		let currentFieldIndex = 0;

		let fields: GameQuoteFieldWordType[] = [];
		fields =
			game.text?.split(' ').map((word, index) => {
				const fieldWord: GameQuoteFieldWordType = {
					index,
					word,
					characters: [
						...word.split('').map((value, index) => {
							const fieldCharacter: GameQuoteFieldCharacterType = {
								index: currentCharacterIndex,
								fieldIndex: value.match(/[A-Za-z]/) ? currentFieldIndex : -1,
								type: (() => {
									if (value.match(/[A-Za-z]/)) return 'letter';
									else if (value.match(/[0-9]/)) return 'number';
									else if (value.match(/[\s]/)) return 'space';
									else if (value.match(/[\-\']/)) return 'join';
									else return 'symbol';
								})(),
								letter: value,
								isError: false,
								isCorrect: false,
								value: '',
							};

							currentCharacterIndex += 1;

							if (value.match(/[A-Za-z]/)) {
								currentFieldIndex += 1;
							}

							return fieldCharacter;
						}),
						{
							index: word.length,
							fieldIndex: -1,
							type: 'space',
							letter: '',
							isError: false,
							isCorrect: false,
							value: '',
						},
					],
				};

				return fieldWord;
			}) ?? [];

		const decryptedText = game?.text
			?.split('')
			.map((letter) => {
				return reversedMap[letter] || letter;
			})
			.join('');

		let inputs = {};
		inputs = Object.keys(reversedMap).reduce((acc: Record<string, string>, key) => {
			acc[key] = '';
			return acc;
		}, {});

		set({
			life: options?.life ?? defaultGameInstance.life,
			maxLife: options?.life ?? defaultGameInstance.maxLife,
			options: options ?? defaultGameInstance.options,
			text: game.text,
			author: game.author,
			map: reversedMap,
			length: game.text?.length ?? 0,
			decryptedText,
			fields,
			inputs,
			fieldsCount: currentFieldIndex,
		});
	},
	incrementCount: () => set((state) => ({ count: state.count + 1 })),
	resetGameInstance: () => set(defaultGameInstance),
	setGameInstance: (game) => {
		set({
			text: game.text,
			author: game.author,
			map: game.map,
		});
	},
	setCharacterValue: (letter: string, value: string) =>
		set((state) => {
			const fields = state.fields.map((word) => {
				return {
					...word,
					characters: word.characters.map((character) => {
						if (character.letter === letter) {
							return {
								...character,
								value,
							};
						}
						return character;
					}),
				};
			});

			let inputs: Record<string, string> = state.inputs;

			inputs[letter] = value;

			return {
				fields,
				inputs,
			};
		}),
	checkDecryptedText: () => {
		set((state) => {
			let hasError = false;

			const fields = state.fields.map((word) => {
				return {
					...word,
					characters: word.characters.map((character) => {
						const correctMatch = state.map[character.letter];

						if (character.value === '') {
							return {
								...character,
								isError: false,
								isCorrect: false,
							};
						} else if (character.value === correctMatch) {
							return {
								...character,
								isError: false,
								isCorrect: true,
							};
						} else {
							hasError = true;

							return {
								...character,
								isError: true,
								isCorrect: false,
							};
						}
					}),
				};
			});

			let isSolved = true;
			let isLost = hasError && state.life - 1 <= 0 ? true : false;

			Object.keys(state.inputs).forEach((key: string) => {
				if (state.map[key] !== state.inputs[key as string]) {
					isSolved = false;
				}
			});

			const isGameOver = isLost || isSolved;

			return {
				fields,
				life: hasError ? state.life - 1 : state.life,
				isSolved,
				isLost,
				isGameOver,
			};
		});
	},
}));
