import { useEffect, useState } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Main from './components/Main'
import axios from 'axios'
function App() {
  const [facts, setFacts] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0); // ✅ Add a trigger state

  const getFacts=async ()=>{
    const response = await axios.get(import.meta.env.VITE_BACKEND_API+"/api/facts")
    // console.log(response);
    if(Array.isArray(response.data)){
      // console.log("Under")
      // console.log(response.data);
      setFacts(response.data)
    }
    else{
      setFacts([])
    }
    
  }
  //call the functiion first time the screen loads
  useEffect(()=>{
    getFacts();
 
  },[fetchTrigger]);

  console.log(facts);
  return (
    <>
      <div className="center-container">
          <Header/>
          <Form setFacts={setFacts} setFetchTrigger={setFetchTrigger}/>
          <Main facts={facts} setFacts={setFacts} fetchTrigger={fetchTrigger} setFetchTrigger={setFetchTrigger}/>
      </div>
    </>
  )
}

export default App
