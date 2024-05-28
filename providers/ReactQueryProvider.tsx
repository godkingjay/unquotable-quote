"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1 * 1000,
            refetchOnWindowFocus: false,
        },
    },
});

type ReactQueryProviderProps = {
    children: React.ReactNode;
};

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
