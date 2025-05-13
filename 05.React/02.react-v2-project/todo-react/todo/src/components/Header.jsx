import { useState } from "react";
import Form from './Form'
import List from './List'
const Header=()=>{
    const [updatedTodo, updateTodo] = useState([]);
    function updateTodoStatus(todo){
      updateTodo(todo);
    }
    return(
        <div className="container">
            <div className="heading">
            <h1>To-Do List</h1>
            </div>   
            <Form updateTodoStatus={updateTodoStatus}/>
            <List todo={updatedTodo} />
        </div> 
    );
}

export default Header;