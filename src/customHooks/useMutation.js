import axios from "axios";
import { useState } from "react";


const useMutation = (callback,{token,url}) => {
    // States
    const[loading,setLoading] = useState(false);

    // Function
    const postData = async(body) => {
        try {
           setLoading(true);
           await axios.post(url, body, {
            headers: {'Authorization':`Bearer ${token}`}
           });
           setLoading(false);
           
           // GET
           if(callback) callback();

        } catch(err) {
           console.log(err)
        }
    };

    return {loading,postData}
};

export default useMutation;