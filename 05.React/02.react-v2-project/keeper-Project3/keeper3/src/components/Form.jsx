import { useState } from "react"

const Form=(props)=>{
const [note,setNote]=useState({title: "",content: "" });
const [inputNote,setInputNote]=useState({title: "",content: "" })
    function handleChange(event) {
        console.log(event);
        const { name, value } = event.target;
        setInputNote((prevNote) => {return { ...prevNote,[name]: value};});
        setNote((prevNote) => {return { ...prevNote,[name]: value};});
    }

    function submitNote(event)
    {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
          });
          event.preventDefault();
    }

   return (
        <div>
          <form onSubmit={submitNote}>
            <input
              name="title"
              onChange={handleChange}
              value={inputNote.title}
              placeholder="Title"
            />
            <textarea
              name="content"
              onChange={handleChange}
              value={inputNote.content}
              placeholder="Take a note..."
              rows="3"
            />
            <button type="submit">Add</button>
          </form>
        </div>);

}

export default Form;