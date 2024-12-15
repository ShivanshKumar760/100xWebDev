import { Link } from "react-router-dom";
const BlogList=(props)=>{
    console.log(props);
    const {blogsArray}=props;
    const blogHeadline=props.title
  
    return (
        <div className="blog-list">
            <h1>{blogHeadline}</h1>
        {blogsArray.map((blog,index)=>{
            return(<div key={blog._id} className="blog-preview card">
                <Link to={`/get/blog/${blog._id}`}>
                    <h2>{blog.title} at {index}</h2>
                    <p>Written by {blog.author}</p>
                </Link>
                {/* Using the function prop in onClick event trigger method */}
                {/* <button onClick={()=>{handleDelete(blog.id)}}>Delete</button> */}
        </div>)
        })}
        </div>);

}

export default BlogList;