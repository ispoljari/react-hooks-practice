import React, { useState } from "react";
import uuid from "uuid/v4";

const initialTodos = [
  {
    id: uuid(),
    task: "Learn React",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn Firebase",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn GraphQL",
    complete: false
  }
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState("");

  const handleInputChange = e => {
    const inputValue = e.target.value;
    setTask(inputValue);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (task) {
      setTodos([...todos, { id: uuid(), task, complete: false }]);
    }

    setTask("");
  };

  const handleTodoChange = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }

        return todo;
      })
    );
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todos.complete}
                onChange={() => handleTodoChange(todo.id)}
                style={{
                  display: "none"
                }}
              />
              <span
                style={{
                  textDecoration: todo.complete ? "line-through" : "none"
                }}
              >
                {todo.task}
              </span>
            </label>
          </li>
        ))}
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={task} onChange={handleInputChange} />
          <button type="submit">Add</button>
        </form>
      </ul>
    </div>
  );
};
export default App;
