/*eslint-disable*/
import axios from "axios";
const Sidebar = ({setFacts}) => {
  const categories=[
    {cat:"Technology",color:"#0d6efd"},
    {cat:"Science",color:"rgb(22, 163, 74)"},
    {cat:"Finance",color:"rgb(239, 68, 68)"},
    {cat:"Society",color:"rgb(234, 179, 8)"},
    {cat:"Entertainment",color:"rgb(219, 39, 119)"},
    {cat:"Health",color:"rgb(20, 184, 166)"},
    {cat:"History",color:"rgb(249, 115, 22)"},
    {cat:"News",color:"rgb(139, 92, 246)"}]

    const handleCatFilter=async (e,id)=>{
      console.log(id)
      e.preventDefault();
      try {
        const response=await axios.get(import.meta.env.VITE_BACKEND_API+"/api/facts/category/"+id)
        if(response.data.message)
        {
          if(response.data.message==="No facts found")
          {
            alert("No fact found for this category");
            return;
          }
        }
        setFacts(response.data);
      } catch (error) {
        console.log(error) 
      }
    }


    const fetchAll=async ()=>{
      const response = await axios.get(import.meta.env.VITE_BACKEND_API+"/api/facts")
      console.log("Response is comming...");
      console.log(response);
      console.log(response.data);
      setFacts(response.data)
    }
  return (
    <aside>
    <ul>
        <li className="category-list"><button className="btn btn-all-categories" style={{backgroundColor: "linear-gradient(135deg,#3b82f6,#f0a818,#ef4444,#16a34a,#eab308)"}} onClick={fetchAll}>All</button></li>
        {categories.map((catg,index)=>(
                    <li className="category-list" key={index}>
                      <button className="btn btn-category" style={{backgroundColor: catg.color}} onClick={(e)=>{handleCatFilter(e,catg.cat)}}>{catg.cat}</button>
                    </li>
      ))}
       
    </ul>
</aside>
  )
}

export default Sidebar



