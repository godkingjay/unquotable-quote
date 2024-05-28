import React from "react";

import { GameWindow } from "@/components/game";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game",
};

const Game = () => {
    return (
        <section className="pb-16">
            <GameWindow />
        </section>
    );
};

export default Game;
