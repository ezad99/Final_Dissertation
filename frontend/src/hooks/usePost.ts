import React, {useState, useCallback} from "react";

export const usePost = <BodyData, ResponseData>(query: string,headers?: HeadersInit):
{
    post: (data: BodyData) => Promise<void>;
    loading: boolean;
    error: string | null;
    responseData: ResponseData | null;
} => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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

                setResponseData(json);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        },
        [headers, query]
    )
    return {responseData, loading, error, post}
}