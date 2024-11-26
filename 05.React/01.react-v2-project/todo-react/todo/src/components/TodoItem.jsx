import { useState } from "react";

const TodoItem=(props)=>{
    const {todoItem}=props;
    const [isDone,setIsDone]=useState(false);
    function handleClick()
    {
        setIsDone((prevValue)=>{
            return !prevValue;
        });
    }
    return(
    <div onClick={handleClick}>
        <li style={{ textDecoration:isDone && "line-through"}} >{todoItem}</li>
    </div>
    );
}

export default TodoItem;