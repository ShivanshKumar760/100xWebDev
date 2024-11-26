import Header from "./Header"
import Form from "./Form"
import Notes from "./Notes"
import Footer from "./Footer"
import { useState } from "react"
const Home=()=>{
  const [notes, setNotes] = useState([])

  function addNote(newNoteItem)
  {
    const newNotesArray=[...notes,newNoteItem];
    setNotes(newNotesArray);
  }
  function deleteNote(id)
  {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return(
    <>
      <Header/>
      <Form onAdd={addNote}/>
      <Notes noteArray={notes}  deleteNote={deleteNote}/>
      <Footer/>  
    </>
  )


}

export default Home;