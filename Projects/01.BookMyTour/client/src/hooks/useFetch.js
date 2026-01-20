import {useState,useEffect} from "react";
import axios from "axios";
function useFetch(url)
{
    const [data,setData]=useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(false);
    useEffect(() => 
    {
        const fetchData = async () => 
        {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } 
            catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);//will take place every time there is change in url
    
      const reFetch = async () => {
        setLoading(true);
        try {
          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };//will take place every time we call it
    
      return { data, loading, error, reFetch };
}

export default useFetch;