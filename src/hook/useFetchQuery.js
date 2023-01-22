import {useState, useEffect} from "react";

const useFetchQuery = (query, params) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fetching, setFetching] = useState(false);

    const refetch = () => {
        setFetching(true);
    }

    const fetchQuery = async () => {
        try {
            setLoading(true);
            const response = await query(params);
            setData(response.data);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (fetching) fetchQuery();
    }, [fetching]);

    useEffect(() => {
        fetchQuery();
    }, [params]);

    return {
        data, loading, error, refetch
    }
}

export default useFetchQuery;