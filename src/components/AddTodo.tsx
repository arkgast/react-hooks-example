import React, { useContext, useState } from "react";
import uuid from "uuid";

import DispatchContext from "../context";

const AddTodo: React.SFC = () => {
  const dispatch = useContext(DispatchContext);
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (task) {
      dispatch({ type: "ADD_TODO", task });
    }

    setTask("");
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={task} onChange={handleChangeInput} />
    </form>
  );
};

export default AddTodo;
