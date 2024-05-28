import NextLink from "next/link";

import { button as buttonStyles } from "@nextui-org/theme";
import { cn } from "@/lib";
import { textStyles } from "@/styles";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg justify-center text-center">
                <h1
                    className={cn(
                        "font-semibold",
                        textStyles({
                            color: "gradient-violet",
                            size: "4xl",
                        }),
                    )}
                >
                    Unquotable Quote
                </h1>
                <br />
                <h2
                    className={cn(
                        textStyles({
                            size: "md",
                        }),
                        "mt-2 inline-block text-foreground-500",
                    )}
                >
                    Decrypt the Quote
                </h2>
            </div>

            <div className="flex gap-3">
                <NextLink
                    href="/game"
                    className={cn(
                        buttonStyles({
                            variant: "solid",
                            radius: "full",
                            color: "primary",
                        }),
                        "bg-gradient-to-br from-violet-500 to-pink-500",
                    )}
                >
                    START GAME
                </NextLink>
            </div>
        </section>
    );
}
