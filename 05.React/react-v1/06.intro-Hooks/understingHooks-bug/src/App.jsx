import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
function App() {
  let user="User";
  let greetingObject={
    greet:"Welcome to site",
    time:new Date().toLocaleTimeString(
      'en-IN', 
      { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric'}
    )
  }
  function handleClick(eventObject)
  {
    console.log(eventObject);
    console.log(eventObject.target);
    user="User😊";
  }
  return (
    <>
    <Navbar/>
    <div className='greet'>
          <h1>Hello {user},{greetingObject.greet} and time is :{greetingObject.time}</h1>
    </div>
     <div className='content'>
        <Home/>
        <button onClick={handleClick}>Click ME</button>
    </div>
    
    </>
  )
}

export default App;
