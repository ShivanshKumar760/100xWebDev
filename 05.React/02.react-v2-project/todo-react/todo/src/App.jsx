import { useState } from 'react'
import './App.css'
import Header from './components/Header'


function App() {
  const [updatedTodo, updateTodo] = useState([]);
  function updateTodoStatus(todo){
    updateTodo(todo);
  }

  return (
    <>
      <Header/>
    </>
  )
}

export default App
