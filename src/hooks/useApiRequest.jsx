import { useEffect, useState } from "react";

const useApiRequest = (apiFunction, ...args) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        apiFunction(...args)
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err)
                setError({status: 404, msg: "Something went wrong."})
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [...args]);

    return {data, isLoading, error};
}

export default useApiRequest;