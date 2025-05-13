import {Link} from "react-router-dom";
const Notes=(props)=>{
    const {noteArray}=props;
    function handleDelete(index)
    {
        props.deleteNote(index);
    }   
    return(
        noteArray.map((noteElement,index)=>{
               
        return(
        <div className="note" key={index}>
                <h1>{noteElement.title}</h1>
                <p>{noteElement.content}</p>
                {/* <button onClick={()=>{props.deleteNote(index)}}>Delete</button> */}
                <button onClick={()=>{handleDelete(index)}}>Delete</button>
        </div>);})
        );
};


export default Notes;