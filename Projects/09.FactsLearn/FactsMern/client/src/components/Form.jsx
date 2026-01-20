/*eslint-disable*/
import { useState } from "react";
import axios from "axios";
const Form = ({setFacts,fetchTrigger,setFetchTrigger}) => {
const [wordLimit,setWordLimt]=useState(200);
const [wordCount, setWordCount] = useState(0);
const [charCount, setCharCount] = useState(0);
const [newFact,setNewFact]=useState("");
const [source,setSource]=useState("");
const [cat,setCat]=useState("");
const handleSubmition=async (e)=>{
    e.preventDefault();
    if(!source.startsWith("https")){
        alert("Not Valid Source ,Link should start with https ex-https:://example.com");
        return;
    }
    try{
        const response=await axios.post(import.meta.env.VITE_BACKEND_API+"/api/facts/create",{
            fact:newFact,source:source,category:cat
        });
        console.log(response);
        if(response){
            // setFacts((prev)=>[...prev,response.data])
            setFetchTrigger(fetchTrigger+1)
            alert("Facts added")
        }
    }catch(error){
        console.log(error);
        console.log(error.message);
        alert("Oops Error Occured! Please check the console");
    }
}

return (
    <form className="fact-form" onSubmit={(e) => handleSubmition(e)}>
        <input  type="text" placeholder="share a fact with the world" value={newFact} onChange={
            (e)=>{
                const value=e.target.value;
                 // Split text into words
                // const words = value.trim().split(/\s+/).filter(word => word.length > 0);
                if(value.length<=wordLimit)
                {
                    setNewFact(value);
                    setCharCount(value.length);
                }else {
                    // If user exceeds limit, allow only up to wordLimit words
                    // const trimmedValue = words.slice(0, wordLimit).join(' ');
                    setNewFact(value.slice(0,wordLimit));
                    setCharCount(wordLimit);
                }
                
            }
        }/>
        <span>Word count: {charCount}/{wordLimit}</span>
        <input type="text" placeholder="Trustworthy source..." value={source} onChange={
            (e)=>{
                const value=e.target.value;
                setSource(value);
            }
        }/>
        <select onChange={(e)=>{setCat(e.target.value)}}>
            <option value="">Choose category</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Society">Society</option>
        </select>
        <button className="btn btn-large">Post</button>
    </form>
  )
}

export default Form