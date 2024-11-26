const Notes=(props)=>{
    const {noteArray}=props;
    return(
        noteArray.map((noteElement)=>{
        return(
        <div className="note" key={noteElement.id}>
                <h1>{noteElement.title}</h1>
                <p>{noteElement.content}</p>
        </div>);})
        );
};


export default Notes;