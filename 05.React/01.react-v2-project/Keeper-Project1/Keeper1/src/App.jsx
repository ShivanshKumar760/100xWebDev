import { useState } from 'react'
import Header from './components/header';
import Footer from './components/footer';
import Notes from './components/Notes';
import "./App.css";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Notes/>
      <Footer/>
    </>
    
  );
}

export default App
