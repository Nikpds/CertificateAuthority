import { useState, useEffect } from "react";

function useFetch(url) {
    const [result, setResult] = useState({
        data: null,
        loader: true
    });
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setResult({
            data: json,
            loader: false
        });
    }
    useEffect(() => {
        fetchUrl();
    }, []);

    return [result];
}
export { useFetch };
