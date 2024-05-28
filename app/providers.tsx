"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";

import { HotToastProvider, ReactQueryProvider } from "@/providers";
import { NextUIProvider } from "@nextui-org/system";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();

    return (
        <ReactQueryProvider>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider {...themeProps}>
                    {children}
                    <HotToastProvider />
                </NextThemesProvider>
            </NextUIProvider>
        </ReactQueryProvider>
    );
}
