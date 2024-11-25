import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home=()=>{
    let [blogs,setBlogs]=useState(null);
    let [isLoading,setLoading]=useState(true);
    let [error,setError]=useState(null);
    function handleDelete(id)
    {let newBlogs= blogs.filter((blog)=>{
        if(blog.id !== id)
        {
        return blog}; 
        });
        setBlogs(newBlogs);}
    function setttingData(data){setBlogs(data)};
    useEffect(function()
    {setTimeout(function(){
        fetch("http://localhost:3000/blogs").then((response)=>{ 
        console.log(response);
        if(response.ok)
        {
            return response.json();
        }})
        .then((responseJson_Data)=>{
            setttingData(responseJson_Data);
            setLoading(false);
            setError(null);
        }).catch((err)=>{
            err.message="Could not fetch the data for that resource!";
            console.log(err.message);
            setLoading(false);
            setError(err.message);
        });
    },2000);
    },[]);
    return(
        <div className="home">
            <h1>Home Content</h1>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogsArray={blogs} handleDelete={handleDelete} title="All Blogs"/>}
        </div>);
};

export default Home;