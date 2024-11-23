import { useState } from "react";

const Home=()=>{
    let [blogs,setBlogs]=useState([
        {id:1,title:"My new Website",body:"Lorem ipsum...",author:"Shivansh"},
        {id:2,title:"Welcome Party",body:"Lorem ipsum...",author:"Alex"},
        {id:3,title:"Web dev top tips",body:"Lorem ipsum...",author:"Mike"}
      ]);
    return (<div>
        <h1>Home Content</h1>
        {blogs.map((blog,index)=>{
            return(<div key={blog.id} className="blog-preview">
                <h2>{blog.title} at {index}</h2>
                <p>{blog.body}</p>
                <p>Written by {blog.author}</p>
            </div>)
        })}
    </div>);
};

export default Home;