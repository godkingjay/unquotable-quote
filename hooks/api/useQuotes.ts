import { API } from "@/lib/api";
import { APIGetEncryptedQuoteType } from "@/lib/api/quote.api";
import { useMutation } from "@tanstack/react-query";

type useQuotesProps = {
    onGetEncryptedQuote?: (data: APIGetEncryptedQuoteType) => void;
    onGetEncryptedQuoteSuccess?: (
        response: Awaited<ReturnType<typeof API.quotes.GET_Encrypted>>,
    ) => void;
    onGetEncryptedQuoteError?: (error: Error) => void;
};

const useQuotes = ({
    onGetEncryptedQuote,
    onGetEncryptedQuoteSuccess,
    onGetEncryptedQuoteError,
}: useQuotesProps) => {
    const getEncryptedQuoteMutation = useMutation({
        mutationFn: API.quotes.GET_Encrypted,
        onMutate: async (data) => {
            onGetEncryptedQuote?.(data);
        },
        onSuccess: (response) => {
            onGetEncryptedQuoteSuccess?.(response);
        },
        onError: (error) => {
            onGetEncryptedQuoteError?.(error);
        },
    });

    return {
        getEncryptedQuoteQuery: getEncryptedQuoteMutation,
    };
};

export default useQuotes;
