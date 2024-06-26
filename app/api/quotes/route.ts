import { quotes } from "@/lib/globals";
import { formatUpperCase } from "@/lib/utils";

export async function POST() {
    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    const randomQuote = (() => {
        const quote = quotes.quotes[randomIndex];

        return {
            text: formatUpperCase(quote.text),
            author: quote.author,
            map: {},
        };
    })();

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const permutation = alphabet.split("").sort(() => Math.random() - 0.5);
    const map = new Map<string, string>();
    alphabet.split("").forEach((letter, index) => {
        map.set(letter, permutation[index]);
    });

    const encryptedQuote = randomQuote.text
        .split("")
        .map((letter) => {
            return map.get(letter) || letter;
        })
        .join("");

    for (const letter of alphabet) {
        if (!randomQuote.text.includes(letter)) {
            map.delete(letter);
        }
    }

    randomQuote.text = encryptedQuote;
    randomQuote.map = Object.fromEntries(map);

    return new Response(JSON.stringify(randomQuote), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
