import { useEffect, useState } from "react";
const axios = require("axios").default;

const Usefetch = (url, isCovidData) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const ourRequest = axios.CancelToken.source();//1
        async function fetchData() {
            try {
                    let res = await axios.get(url, {cancelToken: ourRequest.token});//2
                    console.log("res", res);
                    let data = res && res.data ? res.data : [];
                    setData(data);
                    setIsLoading(false);
                    setIsError(false);
            } catch (e) {
                console.log(e.name);
                console.log(e.message);
                setIsLoading(false);
                setIsError(true);
            }
            return () =>{
                ourRequest.cancel()
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};
export default Usefetch;
