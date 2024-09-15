import { useState, useEffect } from 'react';
import API_URL from './keys';  // Your API URL or endpoint

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await  fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message:term
                    }),
                });


                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }

                const result = await response.json();
                setData(result);  // This will contain the live data from the API
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (term) {
            fetchData();  // Call the API fetch function only if there's a search term
        }
    }, [term]);

    return { data, loading, error };
};

export default useGoogleSearch;
