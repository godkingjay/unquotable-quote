export type EncryptedQuoteType = {
	text: string | null;
	author: string | null;
	map: Record<string, string>;
};

export type GameQuoteFieldCharacterType = {
	index: number;
	fieldIndex: number;
	type: string;
	letter: string;
	isError: boolean;
	isCorrect: boolean;
	value: string;
};

export type GameQuoteFieldWordType = {
	index: number;
	word: string;
	characters: GameQuoteFieldCharacterType[];
};
