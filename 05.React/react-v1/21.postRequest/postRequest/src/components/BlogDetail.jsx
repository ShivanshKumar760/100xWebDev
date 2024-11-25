import { useParams } from "react-router-dom"

const BlogDetail=()=>{
    const parms=useParams();
    const {id}=parms;
    return(
        <div className="blog-details">
            <h2>Blog detail for id:{id}</h2>
        </div>    
    )
};

export default BlogDetail;