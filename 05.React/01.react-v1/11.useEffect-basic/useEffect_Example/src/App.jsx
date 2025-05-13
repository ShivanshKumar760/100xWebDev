import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
function App() {
  let [user,setUser]=useState(true);//hook added to control state of variable 
 //useState
  let greetingObject={greet:"Welcome to site",time:new Date().toLocaleTimeString(
      'en-IN', 
      { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric'})};
  function handleClick(eventObject)
  {
    console.log(eventObject);
    console.log(eventObject.target);
    //setUser("User😊")
    setUser((user)=>{// user="User😊"
      if(!user)//false-->true state
      {return user=true;}
      else{return !user;}});}
  alert("Hello");
  return (<>
    <Navbar/>
    <div className='greet'>
          <h1>Hello {user?"User":"User😊" },{greetingObject.greet} and time is :
          {greetingObject.time}</h1>
    </div>
     <div className='content'>
        <Home/>
        <br/>
        <button onClick={handleClick}>Click me to to toggle</button>
    </div>
    </>)};
export default App;
