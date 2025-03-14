import { useState } from 'react'
import Header from './components/header';
import Footer from './components/footer';
import Notes from './components/Notes';
import "./App.css";
import notes from '../data/NoteData';
// import notes from '../data/NoteData';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Notes noteArray={notes}/>
      <Footer/>
    </>
    
  );
}

export default App
