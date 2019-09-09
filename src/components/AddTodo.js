import React, { useState, useContext } from "react";
import { TodoContext } from "./";
import uuid from "uuid/v4";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const { dispatchTodos } = useContext(TodoContext);

  const handleSubmit = event => {
    if (task) {
      dispatchTodos({ type: "ADD_TODO", task, id: uuid() });
    }
    setTask("");
    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
