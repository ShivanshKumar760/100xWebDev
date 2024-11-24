import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home=()=>{let [blogs,setBlogs]=useState(null);
    function handleDelete(id)
    {let newBlogs= blogs.filter((blog)=>{
            if(blog.id !== id)
            {return blog}; });setBlogs(newBlogs);}
    function setttingData(data){setBlogs(data)};
    useEffect(function(){
        console.log("This component is rendered");
        alert("Component mounted and rendered");
        fetch("http://localhost:3000/blogs")
        .then((response)=>{
            console.log(response);
            // console.log(response.json());-->this respons.json() returns a promise 
            //so returning it and consoling it will return two promise and .then() wont be 
            //able to handle two promise 
            return response.json();
        }).then((responseJson_Data)=>{
            setttingData(responseJson_Data);
        })},[]);
    return(<div className="home">
            <h1>Home Content</h1>
            {/* Logical conditioning in Component cause 
            blog is initially null and fetching is async process so it takes time 
            and for that period of time unitl we set the blog value with the server
            data it will stay null so it will create error in rendering so we 
            add logical and so that when both parameter are true render this component 
            and null-> is false  */}
           {blogs && <BlogList blogsArray={blogs} handleDelete={handleDelete} title="All Blogs"/>}
        </div>);
};
export default Home;