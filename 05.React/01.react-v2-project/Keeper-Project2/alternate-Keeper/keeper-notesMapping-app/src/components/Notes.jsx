const Notes=(props)=>{
    const {note}=props;
    const Title=note.title;
    const Content=note.content;
    return(
        <div className="note" >
                <h1>{Title}</h1>
                <p>{Content}</p>
        </div>);
};


export default Notes;