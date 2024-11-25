const BlogList=(props)=>{
    console.log(props);
    const {blogsArray}=props;
    const {handleDelete}=props;//using decunstuction of object to exract out the handleDelete func 
    return (
        <div className="blog-list">
        {blogsArray.map((blog,index)=>{
            return(<div key={blog.id} className="blog-preview">
                <h2>{blog.title} at {index}</h2>
                <p>{blog.body}</p>
                <p>Written by {blog.author}</p>
                {/* Using the function prop in onClick event trigger method */}
                <button onClick={()=>{handleDelete(blog.id)}}>Delete</button>
        </div>)
        })}
        </div>);

}

export default BlogList;