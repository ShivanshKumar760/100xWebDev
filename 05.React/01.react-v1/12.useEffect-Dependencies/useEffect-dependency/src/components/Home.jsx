import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home=()=>{
    let [blogs,setBlogs]=useState([
        {id:1,title:"My new Website",body:"Lorem ipsum...",author:"Shivansh"},
        {id:2,title:"Welcome Party",body:"Lorem ipsum...",author:"Alex"},
        {id:3,title:"Web dev top tips",body:"Lorem ipsum...",author:"Mike"}
      ]);
    let [name,setName]=useState("Mario");
    function handleDelete(id)
    {
       let newBlogs= blogs.filter((blog)=>{
            if(blog.id !== id)
            {return blog};
        });

        setBlogs(newBlogs);
    }
//     useEffect(function(){
//         console.log("This component is rendered");
//         alert("Component mounted and rendered");
//     },[/*empty array as dependency hence the useEffect will render onlu onec if anything changes
// in component it wont render again*/]);
    useEffect(function(){
        console.log("This component is rendered");
        alert("Component mounted and rendered");
    },[name]);
    return(
        <div className="home">
            <h1>Home Content</h1>
           <BlogList blogsArray={blogs} handleDelete={handleDelete} title="All Blogs"/>
            <p>{name}</p>
            <button onClick={()=>{setName("luigi")}}>Change Name</button>
        </div>
        
    );
};

export default Home;