import { axiosClient } from "@/lib/utils";

export type APIGetEncryptedQuoteType = {
    controller?: AbortController;
};

export const getEncryptedQuote = async ({
    controller,
}: APIGetEncryptedQuoteType) => {
    try {
        const url = `/quotes?dt=${new Date().toISOString()}`;

        const response = await axiosClient.get(url, {
            signal: controller?.signal,
        });

        return response;
    } catch (error: any) {
        if (controller?.signal.aborted) {
            throw new Error("Request aborted");
        }

        const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Getting quotes failed";

        throw new Error(errorMessage);
    }
};
