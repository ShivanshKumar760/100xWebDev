import { useState } from "react";

import "./App.css";

function Form({ todos, setTodos }) {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  function handleFormSubmit(e) {
    e.preventDefault();
    if (task === "") return;
    const newTask = {
      id: Date.now(),
      task: task,
      isCompleted: isCompleted,
    };
    setTodos([...todos, newTask]);
    setTask("");
    setIsCompleted(false);
  }
  return (
    <form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="radio"
        onClick={(e) => {
          e.preventDefault();
          setIsCompleted(!isCompleted);
        }}
      >
        {isCompleted ? "Completed" : "Not Completed"}
      </button>
      <button type="submit">Add Task</button>
    </form>
  );
}
function Todo({ todos, setTodos }) {
  console.log(todos);
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <h3
            style={{
              backgroundColor: todo.isCompleted ? "green" : "red",
            }}
          >
            {todo.task + index}
          </h3>
          <button
            onClick={(e, i = index) => {
              alert(i);
              const newTodos = [...todos];
              newTodos[i].isCompleted = !newTodos[i].isCompleted;
              setTodos(newTodos);
            }}
          >
            {todo.isCompleted ? "Completed" : "Not Completed"}
          </button>
        </div>
      ))}
    </div>
  );
}
function App() {
  let [todos, setTodos] = useState([]);
  // let [isCompleted, setIsCompleted] = useState(false);

  return (
    <>
      <Form todos={todos} setTodos={setTodos} />
      <Todo todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
