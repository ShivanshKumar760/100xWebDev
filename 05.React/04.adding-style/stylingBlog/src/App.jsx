import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
function App() {
  return (
    <>
    <Navbar/>
    <div className='greet'>
          <h1>Hey</h1>
    </div>
     <div className='content'>
        <Home/>
    </div>
    
    </>
  )
}

export default App;
