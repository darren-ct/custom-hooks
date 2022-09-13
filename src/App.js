import { useState, useMemo } from "react";
import useQuery from "./customHooks/useQuery";
import useMutation from "./customHooks/useMutation";
import Loader from "./components/Loader";

const DUMMY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTMwMDcxMDgyLCJleHBpcmVzIjoiMWQiLCJleHAiOjE2NjI1MzAxNTc0ODJ9.K9_Aoxwc-XnatRP0LWXsOfD639AIA7TdTKTKimfT02A";

function App() {
  const[input,setInput] = useState("")
  const {data, loading, refetchData} = useQuery(null,{url:"https://dumbmerchbe.herokuapp.com/api/v1/categories",token:DUMMY_TOKEN});
  const {loading:loading2, postData} = useMutation(refetchData, {url:"https://dumbmerchbe.herokuapp.com/api/v1/category",token:DUMMY_TOKEN})

  // Function
  const renderList = () => {
    console.log("this is rerendered");
    
    //render
    if(data) return data.categories.map(category => <li key={category.id}>{category.name}</li>)
  };

  const memoizedList = useMemo(() => renderList(), [data]);
  
  // 
  if(loading || loading2) return <Loader/>

  return (
    <div className="App">
        <p>Post New Category</p>
        <input placeholder="Add new category" onChange={(e)=>{setInput(e.target.value)}} value={input}/>
        <button onClick={()=>{postData({"name":input})}}>POST NEW CATEGORY</button>

        {/* Line */}
        <div className="line"></div>

        <p style={{marginBottom:"12px"}}>My Categories</p>
        <ul>
           {memoizedList}
        </ul>
    </div>
  );
}

export default App;
