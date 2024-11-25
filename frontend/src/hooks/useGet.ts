import {useState, useEffect} from 'react';

const useGet = <T,>(query: string,mapFunction:(rawData: any) => T) => {
    // State variables to track data, loading status, errors
    const [data, setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=> {
        const fetchData = async() => {
            try {
                setLoading(true); // set loading to true to indicate that data is being fetched

                const response = await fetch(query);
                const json = await response.json();

                setData(mapFunction(json)); // shape data to our model

                setLoading(false); // set loading to false to indicate that api call has ended
            } catch (error: any) {
                setError(error.message);
                setLoading(false); // set loading to false to indicate that the api call has ended
            }
        };
        fetchData()
    },[mapFunction, query])
    return {data, loading, error}
};

export default useGet;
