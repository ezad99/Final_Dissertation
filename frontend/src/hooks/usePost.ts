import {useState, useCallback} from "react";

export const usePost = <BodyData, ResponseData>(query: string,headers?: HeadersInit):
{
    post: (data: BodyData) => Promise<void>;
    loading: boolean;
    error: string | null;
    responseData: ResponseData | null;
} => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)

    const post = useCallback(
        async(data: BodyData) => {
            try {
                setLoading(true)
                const response = await fetch(query, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers,
                });
                const json = await response.json();
                console.group("Response from backend:", json);

                setResponseData(json);
                setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        },
        [headers, query]
    )
    return {responseData, loading, error, post}
}