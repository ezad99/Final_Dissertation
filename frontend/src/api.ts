import { BASE_API_URL } from "../config";
import {useState, useEffect} from 'react';
import { ApiResponse } from "./types";

const useFetch = (url: string, options: RequestInit = {}) => {
    //State variables used to track the data, loading status, and errors
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //useEffect hook to handle the API call
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_API_URL + url, {...options});

                //Check if response is succesful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result); //Set the fetched data
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); //Handle Errors
                } else {
                    setError("Unknown Error")
                }
                
            } finally {
                setLoading(false);
                }

            };
            fetchData(); //Call the function
    }, [url, options]);

    return {data, loading, error};
};

export default useFetch;

// const fetchData = async (endpoint: string) => {
//     try {
//       const response = await fetch(BASE_API_URL + endpoint);
//       const jsonData = await response.json();
//       setData(jsonData.message);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
