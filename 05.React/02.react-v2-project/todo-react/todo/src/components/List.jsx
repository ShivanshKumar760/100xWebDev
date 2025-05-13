import TodoItem from "./TodoItem";

const List=(props)=>{
    const {todo}=props;
    console.log(todo);
    return(
    <div>
        <ul>
          {todo.map((todoItem,index) => (
            <TodoItem key={index} todoItem={todoItem}/>
          ))}
        </ul>
      </div>
    )
    
}

export default List;