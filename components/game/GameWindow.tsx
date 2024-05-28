"use client";

import React from "react";
import toast from "react-hot-toast";

import useQuotes from "@/hooks/api/useQuotes";
import { cn, formatUpperCase } from "@/lib";
import { useGameInstanceStore } from "@/lib/zustand";
import { GameQuoteFieldCharacterType, GameQuoteFieldWordType } from "@/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

import { HeartFilledIcon } from "../icons";
import { GameOverModal } from "../modal";

type GameWindowProps = {};

const GameWindow = React.forwardRef<HTMLDivElement, GameWindowProps>(
    (props, ref) => {
        const game = useGameInstanceStore();

        const decryptButtonRef = React.useRef<HTMLButtonElement>(null);

        const [currentCharacterField, setCurrentCharacterField] =
            React.useState("");

        const [isLoading, setIsLoading] = React.useState(false);
        const { getEncryptedQuoteQuery } = useQuotes({
            onGetEncryptedQuote(data) {
                setIsLoading(true);
            },
            onGetEncryptedQuoteSuccess: (response) => {
                game.init(response.data, game.options);
                toast.dismiss("get-encrypted-quote");
                setIsLoading(false);
            },
            onGetEncryptedQuoteError(error) {
                toast.error(error.message, {
                    id: "get-encrypted-quote",
                    duration: 2000,
                    position: "top-center",
                });
                setIsLoading(false);
            },
        });

        const startNewGame = React.useCallback(async () => {
            getEncryptedQuoteQuery.mutate({});
        }, [getEncryptedQuoteQuery]);

        const initialGameMounted = React.useRef(false);

        React.useEffect(() => {
            if (!initialGameMounted.current) {
                initialGameMounted.current = true;
                startNewGame();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const getCurrentCharacterField = (index: number): HTMLInputElement => {
            return document.getElementById(
                `character-field-${index}`,
            ) as HTMLInputElement;
        };

        const getPreviousCharacterField = (
            index: number,
        ): HTMLInputElement | null => {
            const fieldElement = document.getElementById(
                `character-field-${index - 1}`,
            ) as HTMLInputElement;

            const isDisabled = fieldElement?.disabled;

            if (fieldElement && !isDisabled) {
                return fieldElement;
            } else if (index > 0) {
                return getPreviousCharacterField(index - 1);
            } else {
                return null;
            }
        };

        const getNextCharacterField = (
            index: number,
        ): HTMLInputElement | null => {
            const fieldElement = document.getElementById(
                `character-field-${index + 1}`,
            ) as HTMLInputElement;

            const isDisabled = fieldElement?.disabled;

            if (fieldElement && !isDisabled) {
                return fieldElement;
            } else if (index < game.fieldsCount - 1) {
                return getNextCharacterField(index + 1);
            } else {
                return null;
            }
        };

        const renderCharacterField = (
            character: GameQuoteFieldCharacterType,
        ) => {
            switch (character.type) {
                case "letter": {
                    return (
                        <div
                            key={character.index}
                            className="flex flex-col items-center justify-center text-inherit"
                        >
                            <Input
                                id={`character-field-${character.fieldIndex}`}
                                variant="bordered"
                                radius="sm"
                                color={character.isError ? "danger" : "primary"}
                                isDisabled={character.isCorrect}
                                isInvalid={character.isError}
                                className={cn("h-10 w-[120%] text-inherit", {
                                    "!text-red-500": character.isError,
                                })}
                                classNames={{
                                    input: "text-center text-lg text-inherit",
                                    mainWrapper: "!p-0",
                                    innerWrapper: "!p-0",
                                    inputWrapper: "!p-0",
                                }}
                                value={character.value}
                                onChange={(e) => {
                                    game.setCharacterValue(
                                        character.letter,
                                        formatUpperCase(
                                            e.target.value.split("").pop() ||
                                                "",
                                        ),
                                    );
                                }}
                                onKeyDown={(e) => {
                                    switch (e.key) {
                                        case "Enter": {
                                            decryptButtonRef.current?.click();
                                            const currentCharacter =
                                                getCurrentCharacterField(
                                                    character.fieldIndex,
                                                );
                                            if (currentCharacter) {
                                                currentCharacter?.focus();
                                            }
                                            break;
                                        }
                                        case "Backspace": {
                                            game.setCharacterValue(
                                                character.letter,
                                                "",
                                            );
                                            break;
                                        }
                                        case "ArrowLeft": {
                                            const previousCharacter =
                                                getPreviousCharacterField(
                                                    character.fieldIndex,
                                                );

                                            if (previousCharacter) {
                                                previousCharacter?.focus();
                                            }
                                            break;
                                        }
                                        case "ArrowRight": {
                                            const nextCharacter =
                                                getNextCharacterField(
                                                    character.fieldIndex,
                                                );

                                            if (nextCharacter) {
                                                nextCharacter?.focus();
                                            }
                                            break;
                                        }
                                    }
                                }}
                            />
                            <p
                                className={cn("opacity-75", {
                                    "opacity-50": character.isCorrect,
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
                            className={cn(
                                "inline-flex h-10 items-end pb-1 text-lg text-inherit",
                                {
                                    "text-center": character.type === "join",
                                },
                            )}
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
                    className={cn("inline-flex w-6 flex-row", {
                        "w-1":
                            character.type === "join" ||
                            character.type === "symbol",
                        "w-5": character.type === "space",
                    })}
                >
                    {renderCharacterField(character)}
                </div>
            ));
        };

        return (
            <div
                ref={ref}
                id="game-window"
                className="flex flex-col items-center justify-center gap-4"
            >
                <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: game.maxLife }).map((_, index) => (
                        <HeartFilledIcon
                            key={index}
                            size={32}
                            className={cn({
                                "text-red-500": index < game.life,
                                "text-default-300": index >= game.life,
                            })}
                        />
                    ))}
                </div>

                <Card
                    radius="lg"
                    shadow="none"
                    className="min-h-14 w-full max-w-3xl border border-divider"
                >
                    <CardBody className="flex flex-col gap-2 p-4">
                        {isLoading || !game.initialized ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            <>
                                <div className="inline-flex flex-wrap justify-center text-wrap text-center text-lg">
                                    {game?.fields.map((field) => (
                                        <div
                                            key={String(field.index)}
                                            id={`word-${field.index}`}
                                            className="mb-2 inline-flex flex-row gap-2"
                                        >
                                            {renderWordField(field)}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-right text-base italic opacity-50">
                                    - {game.author}
                                </p>
                            </>
                        )}
                    </CardBody>
                </Card>

                <div className="mt-4 flex flex-col-reverse flex-wrap items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        variant="solid"
                        color="default"
                        isDisabled={isLoading}
                        onPress={startNewGame}
                        className="w-full sm:w-auto"
                    >
                        New Game
                    </Button>

                    <Button
                        ref={decryptButtonRef}
                        size="lg"
                        variant="solid"
                        color="primary"
                        isDisabled={isLoading}
                        onPress={game.checkDecryptedText}
                        className="w-full sm:w-auto"
                    >
                        Decrypt
                    </Button>
                </div>

                <GameOverModal
                    hideCloseButton
                    isOpen={game.isGameOver}
                    startingNewGame={isLoading}
                    startNewGame={startNewGame}
                />
            </div>
        );
    },
);
GameWindow.displayName = "GameWindow";

const MemoizedGameWindow = React.memo(GameWindow);

export { MemoizedGameWindow as GameWindow };
