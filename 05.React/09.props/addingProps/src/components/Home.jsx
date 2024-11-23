import { useState } from "react";
import BlogList from "./BlogList";
const Home=()=>{
    let [blogs,setBlogs]=useState([
        {id:1,title:"My new Website",body:"Lorem ipsum...",author:"Shivansh"},
        {id:2,title:"Welcome Party",body:"Lorem ipsum...",author:"Alex"},
        {id:3,title:"Web dev top tips",body:"Lorem ipsum...",author:"Mike"}
      ]);

    function handleDelete(id)
    {
       let newBlogs= blogs.filter((blog)=>{
            if(blog.id !== id)
            {return blog};
        });

        setBlogs(newBlogs);
    }
    return(
        <div className="home">
            <h1>Home Content</h1>
           
            <BlogList blogsArray={blogs} handleDelete={handleDelete}/>
        </div>
        
    );
};

export default Home;