// Pre-built frontend JavaScript
const { useState, useEffect } = React;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodoTitle }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const incompleteTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  if (loading) {
    return React.createElement("div", { className: "loading" }, "Loading...");
  }

  return React.createElement(
    "div",
    { className: "todo-app" },
    React.createElement(
      "header",
      null,
      React.createElement("h1", null, "📝 Todo App"),
      React.createElement(
        "p",
        { className: "subtitle" },
        "Built with Bun + React"
      )
    ),
    React.createElement(
      "form",
      { onSubmit: addTodo, className: "add-todo-form" },
      React.createElement("input", {
        type: "text",
        value: newTodoTitle,
        onChange: (e) => setNewTodoTitle(e.target.value),
        placeholder: "What needs to be done?",
        className: "todo-input",
      }),
      React.createElement(
        "button",
        { type: "submit", className: "add-button" },
        "Add Todo"
      )
    ),
    React.createElement(
      "div",
      { className: "todos-container" },
      incompleteTodos.length > 0 &&
        React.createElement(
          "div",
          { className: "todo-section" },
          React.createElement("h2", null, `Active (${incompleteTodos.length})`),
          React.createElement(
            "ul",
            { className: "todo-list" },
            incompleteTodos.map((todo) =>
              React.createElement(
                "li",
                { key: todo.id, className: "todo-item" },
                React.createElement("input", {
                  type: "checkbox",
                  checked: todo.completed,
                  onChange: () => toggleTodo(todo.id),
                  className: "todo-checkbox",
                }),
                React.createElement(
                  "span",
                  { className: "todo-title" },
                  todo.title
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => deleteTodo(todo.id),
                    className: "delete-button",
                  },
                  "×"
                )
              )
            )
          )
        ),
      completedTodos.length > 0 &&
        React.createElement(
          "div",
          { className: "todo-section" },
          React.createElement(
            "h2",
            null,
            `Completed (${completedTodos.length})`
          ),
          React.createElement(
            "ul",
            { className: "todo-list" },
            completedTodos.map((todo) =>
              React.createElement(
                "li",
                { key: todo.id, className: "todo-item completed" },
                React.createElement("input", {
                  type: "checkbox",
                  checked: todo.completed,
                  onChange: () => toggleTodo(todo.id),
                  className: "todo-checkbox",
                }),
                React.createElement(
                  "span",
                  { className: "todo-title" },
                  todo.title
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => deleteTodo(todo.id),
                    className: "delete-button",
                  },
                  "×"
                )
              )
            )
          )
        ),
      todos.length === 0 &&
        React.createElement(
          "div",
          { className: "empty-state" },
          React.createElement(
            "p",
            null,
            "No todos yet. Add one above to get started!"
          )
        )
    ),
    React.createElement(
      "footer",
      { className: "stats" },
      React.createElement("span", null, `${incompleteTodos.length} remaining`),
      React.createElement("span", null, "•"),
      React.createElement("span", null, `${todos.length} total`)
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TodoApp));
