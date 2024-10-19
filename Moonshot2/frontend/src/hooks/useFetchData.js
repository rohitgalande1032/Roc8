import { useState, useEffect } from 'react';

const useFetchData = (filters) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/data?${new URLSearchParams(filters)}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    return { data, loading };
};

export default useFetchData;
