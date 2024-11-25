import useFetch from "./useFetch";
import BlogList from "./BlogList";
const Home=()=>{
    const [ data,isLoading ,error] = useFetch('http://localhost:3000/blogs')
    const blogs=data;
   
    // function setttingData(data){setBlogs(data)};
   
    return(
        <div className="home">
            <h1>Home Content</h1>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogsArray={blogs} title="All Blogs"/>}
        </div>);
};

export default Home;