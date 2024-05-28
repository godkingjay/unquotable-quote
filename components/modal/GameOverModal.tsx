"use client";

import Link from "next/link";
import { ElementRef, forwardRef, memo } from "react";

import { cn } from "@/lib";
import { useGameInstanceStore } from "@/lib/zustand";
import { textStyles } from "@/styles";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalProps } from "@nextui-org/modal";

type GameOverModalProps = Omit<ModalProps, "children"> & {
    startingNewGame: boolean;
    startNewGame: () => void;
};

const GameOverModal = forwardRef<ElementRef<typeof Modal>, GameOverModalProps>(
    ({ startingNewGame, startNewGame, ...props }, ref) => {
        const game = useGameInstanceStore();

        return (
            <Modal ref={ref} {...props}>
                <ModalContent>
                    <ModalBody className="flex flex-col gap-4 p-4">
                        <div className="my-4 flex w-full items-center justify-center">
                            <h2
                                className={cn(
                                    "w-full text-center font-bold drop-shadow-md",
                                    {
                                        [textStyles({
                                            size: "4xl",
                                            color: "gradient-green",
                                        })]: game.isSolved,
                                        [textStyles({
                                            size: "4xl",
                                            color: "gradient-red",
                                        })]: game.isLost,
                                    },
                                )}
                            >
                                {game.isSolved && "QUOTE COMPLETED!"}
                                {game.isLost && "YOU LOSE!"}
                            </h2>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Button
                                size="lg"
                                variant="solid"
                                color="primary"
                                isLoading={startingNewGame}
                                isDisabled={startingNewGame}
                                onPress={startNewGame}
                                className="w-full"
                            >
                                New Game
                            </Button>
                            <Button
                                as={Link}
                                href="/"
                                size="lg"
                                variant="solid"
                                color="default"
                                className="w-full"
                                isDisabled={startingNewGame}
                            >
                                Go Home
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    },
);
GameOverModal.displayName = "GameOverModal";

const MemoizedGameOverModal = memo(GameOverModal);

export { MemoizedGameOverModal as GameOverModal };
