import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home=()=>{
    let [blogs,setBlogs]=useState(null);
    let [isLoading,setLoading]=useState(true);
    function handleDelete(id)
    {
        let newBlogs= blogs.filter((blog)=>{
        if(blog.id !== id)
        {
        return blog}; 
        });
        setBlogs(newBlogs);
    }
    function setttingData(data){setBlogs(data)};
    useEffect(function()
    {setTimeout(function(){
        fetch("http://localhost:3000/blogs").then((response)=>{ return response.json();})
        .then((responseJson_Data)=>{
            setttingData(responseJson_Data);
            setLoading(false);
        });
    },2000);
    },[]);
    return(
        <div className="home">
            <h1>Home Content</h1>
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogsArray={blogs} handleDelete={handleDelete} title="All Blogs"/>}
        </div>);
};

export default Home;