import axios from "axios"

/*eslint-disable*/
const MainSection = ({facts,setFacts,setFetchTrigger}) => {
  const updateVote=async (id,voteType,e)=>{
            console.log("Update")
            try {
                const response=await axios.put(import.meta.env.VITE_BACKEND_API+"/api/facts/update/"+id,{
                    voteType:voteType
                });
                console.log("Hey");
                console.log(response);
                if(response)
                {
                    setFetchTrigger((prev)=>prev+1);
                }
            } catch (error) {
                console.log(error);
            }
  }
  return (
    <section>
    <ul>
        {facts?.map((fact,index)=>{
            return (
                <li className="facts" key={index}>
                <p>{fact.fact}<a className="source" href={fact.source} target="_blank">(Source)</a></p>
                <span className="category">{fact.category}</span>
                <div className="vote-buttons">
                    <button onClick={(e)=>{
                        updateVote(fact._id,"votesIntresting",e)
                    }}>👍{fact.votesIntresting}</button>
                    <button onClick={(e)=>{
                        updateVote(fact._id,"votesMindBlowing",e)
                    }}>🤯{fact.votesMindBlowing}</button>
                    <button onClick={(e)=>{
                        updateVote(fact._id,"votesFalse",e)
                    }}>⛔️{fact.votesFalse}</button>
                </div>
            </li>
            )
        })}
      
    </ul>
</section>
  )
}

export default MainSection