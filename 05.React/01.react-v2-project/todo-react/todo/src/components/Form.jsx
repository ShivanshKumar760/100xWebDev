import { useState } from "react"

const Form=(props)=>{
    const {updateTodoStatus}=props;
    const [todo,setTodo]=useState([]);
    const [inputTodo, setInputTodo] = useState("");
    function insertingTodo(e)
    {
        e.preventDefault();
        const newTodo=[...todo,inputTodo];
        setTodo(newTodo);
        setInputTodo(" ");
        updateTodoStatus(newTodo);

    }
    return(
    <form className="form" onSubmit={insertingTodo}>
        <input type="text" onChange={(e)=>{
            // setInputTodo(e.target.val);
            const val=e.target.value;
            setInputTodo(val)}} value={inputTodo}/>
        
        <button type="submit">
          <span>Add</span>
        </button>
    </form>    
    )
};
export default Form;

