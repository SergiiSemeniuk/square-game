import { useEffect, useMemo, useState } from 'react';


export const useGame = () => {
    const [fetchData, setFetchData] = useState(null);

    const data = useMemo(() => {
        if (fetchData) {
            const variants = fetchData.filter(item => !item.name.includes("name"));
            return variants;
        }
    }, [fetchData]);

    useEffect(() => {
        fetch("https://60816d9073292b0017cdd833.mockapi.io/modes")
            .then((response) => response.json())
            .then((data) => setFetchData(data));
    },[]);


    return {
        data
    };
};