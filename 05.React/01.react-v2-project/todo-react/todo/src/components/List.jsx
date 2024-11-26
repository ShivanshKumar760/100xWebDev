const List=(props)=>{
    const {todo}=props;
    console.log(todo);
    return(
    <div>
        <ul>
          {todo.map((todoItem,index) => (
            <li key={index}>{todoItem}</li>
          ))}
        </ul>
      </div>
    )
    
}

export default List;