import React, { useState, useReducer } from "react";
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

const initialState = "ALL";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "UNDO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case "ADD_TODO":
      return [...state, { task: action.task, id: action.id, complete: false }];
    default:
      throw new Error();
  }
};

const SimpleUseState = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState("");
  const [filter, dispatchFilter] = useReducer(filterReducer, initialState);

  const handleInputChange = e => {
    const inputValue = e.target.value;
    setTask(inputValue);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (task) {
      dispatchTodos({ type: "ADD_TODO", task, id: uuid() });
    }

    setTask("");
  };

  const handleTodoChange = todo => {
    dispatchTodos({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id
    });
  };

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "ALL") {
      return true;
    }
    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }
    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <h2>Simple useState - TODO list</h2>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todos.complete}
                onChange={() => handleTodoChange(todo)}
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
        <button type="button" name="show-all" onClick={handleShowAll}>
          SHOW ALL
        </button>
        <button type="button" name="show-complete" onClick={handleComplete}>
          SHOW COMPLETE
        </button>
        <button type="button" name="show-incomplete" onClick={handleIncomplete}>
          SHOW INCOMPLETE
        </button>
      </ul>
    </div>
  );
};
export default SimpleUseState;
