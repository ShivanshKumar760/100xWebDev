import { useState } from 'react';
import CodeDisplay from './components/CodeDisplay';
import MessagesDisplay from './components/MessagesDisplay';

interface ChatData{
  role:string,
  content:string
};


function App() {
  const [value,setValue]=useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([])


  const getQuery=async ()=>{
    try {
        const options={
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({message:value})
      };
      const response=await fetch("http://localhost:3000/gen-sql",options);
      const data=await response.json();
      console.log(data);
      const userMessage={role:"user",content:value};
      setChat((prevChat)=>[...prevChat,data,userMessage]);
    } catch (error) {
      console.error(error);
      console.log("Could not get the sql query genrated!");
    }
  };

  const clearChat=()=>{
    setValue("");
    setChat([]);
  };
  const filteredUserMessages=chat.filter(message=>message.role==="user");
  const latestCode=chat.filter(message=>message.role==="assistant").pop();
  return (
    <>
      <div className='app'>
        <MessagesDisplay userMessages={filteredUserMessages}/>
        <input value={value} onChange={(e)=>setValue(e.target.value)}/>
        <CodeDisplay text={latestCode?.content || ""}/>
        <div className='button-container'>
          <button id="get-query" onClick={getQuery}>Get Query!</button>
          <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
        </div>
      </div>
    </>
  )
}

export default App
