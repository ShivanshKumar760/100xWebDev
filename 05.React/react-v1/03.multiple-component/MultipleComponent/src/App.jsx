import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
function App() {
  let greetingObject={
    greet:"Welcome to site",
    time:new Date().toLocaleTimeString(
      'en-IN', 
      { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric'}
    )
  }
  return (
    <>
    <Navbar/>
    <div className='greet'>
    <h1>Hey,{greetingObject.greet} and time is :{greetingObject.time}</h1>
    </div>
     <div className='content'>
        <Home/>
    </div>
    
    </>
  )
}

export default App;
