import axios from "axios";
import {useState,useEffect} from "react";


const useQuery = (initial,{url,token}) => {
    // States
    const[data,setData] = useState(initial);
    const[loading,setLoading] = useState(false);

    // useEffect
    useEffect(()=>{
         fetchData()
    },[])

    // Function
    const fetchData = async() => {
        try {
           setLoading(true);
           const res = await axios.get(url,{
            headers: {'Authorization':`Bearer ${token}`}
           });
           setLoading(false);
           setData(res.data.data);

        } catch(err) {
           console.log(err)
        }
    };

    return {data,loading,refetchData:fetchData}
};

export default useQuery;