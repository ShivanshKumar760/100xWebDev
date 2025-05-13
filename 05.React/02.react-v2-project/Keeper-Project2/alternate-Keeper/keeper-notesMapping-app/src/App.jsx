import { useState } from 'react'
import Header from './components/header';
import Footer from './components/footer';
import Notes from './components/Notes';
import "./App.css";
import notes from '../data/NoteData';

function App() {

  return (
    <>
      <Header/>
      {/* <Notes note={{id:0,title:"My note",content:"Test note this is"}}/> */}
      {notes.map((noteElement)=>{
        console.log(noteElement.key);
        return(<Notes key={noteElement.key} note={noteElement}/>);})}
      <Footer/>
    </>
    
  );
}

export default App
