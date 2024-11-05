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

// const fetchData = async (endpoint: string) => {
//     try {
//       const response = await fetch(BASE_API_URL + endpoint);
//       const jsonData = await response.json();
//       setData(jsonData.message);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

// const useFetch = (url: string, shouldFetch: boolean, options: RequestInit = {}) => {
//     //State variables used to track the data, loading status, and errors
//     const [data, setData] = useState<ApiResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     //useEffect hook to handle the API call
//     useEffect(() => {
//         const fetchData = async () => {
//             if(!shouldFetch) return;

//             try {
//                 const response = await fetch(BASE_API_URL + url, {...options});

//                 //Check if response is succesful
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const result = await response.json();
//                 setData(result); //Set the fetched data
//             } catch (err) {
//                 if (err instanceof Error) {
//                     setError(err.message); //Handle Errors
//                 } else {
//                     setError("Unknown Error")
//                 }
                
//             } finally {
//                 setLoading(false);
//                 }

//             };
//             fetchData(); //Call the function
//     }, [url, options, shouldFetch]);

//     return {data, loading, error};
// };

// export default useFetch;
