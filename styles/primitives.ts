import { tv } from "tailwind-variants";

export const textStyles = tv({
    base: "tracking-tight inline",
    variants: {
        color: {
            "gradient-red": "from-[#ff8080] to-[#ff4040]",
            "gradient-violet": "from-[#FF1CF7] to-[#b249f8]",
            "gradient-yellow": "from-[#FF705B] to-[#FFB457]",
            "gradient-blue": "from-[#5EA2EF] to-[#0072F5]",
            "gradient-cyan": "from-[#00b7fa] to-[#01cfea]",
            "gradient-green": "from-[#6FEE8D] to-[#17c964]",
            "gradient-pink": "from-[#FF72E1] to-[#F54C7A]",
            "gradient-foreground": "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
        },
        size: {
            xs: "text-xs lg:text-sm",
            sm: "text-sm lg:text-base",
            md: "text-base lg:text-lg",
            lg: "text-lg lg:text-xl",
            xl: "text-xl lg:text-2xl",
            "2xl": "text-2xl lg:text-3xl",
            "3xl": "text-3xl lg:text-4xl",
            "4xl": "text-4xl lg:text-5xl",
        },
        fullWidth: {
            true: "w-full block",
        },
    },
    defaultVariants: {
        size: "sm",
    },
    compoundVariants: [
        {
            color: [
                "gradient-red",
                "gradient-violet",
                "gradient-yellow",
                "gradient-blue",
                "gradient-cyan",
                "gradient-green",
                "gradient-pink",
                "gradient-foreground",
            ],
            class: "bg-clip-text text-transparent bg-gradient-to-b",
        },
    ],
});
