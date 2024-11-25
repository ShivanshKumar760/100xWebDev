import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
const BlogDetail=()=>{
    const parms=useParams();
    const {id}=parms;
    const navigate=useNavigate();
    const [ data, error, isLoading ] = useFetch('http://localhost:3000/blogs/' + id);
    const blog=data;
    const handleClick = () => {
        fetch('http://localhost:3000/blogs/' + id, {
          method: 'DELETE'
        }).then(() => {
          navigate('/');
        }) 
      }
      return (
        <div className="blog-details">
          { isLoading && <div>Loading...</div> }
          { error && <div>{ error }</div> }
          { blog && (
            <article>
              <h2>{ blog.title }</h2>
              <p>Written by { blog.author }</p>
              <div>{ blog.body }</div>
              <button onClick={handleClick}>delete</button>
            </article>
          )}
        </div>
      );
};

export default BlogDetail;