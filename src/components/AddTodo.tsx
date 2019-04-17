import React, { useState } from "react";
import uuid from "uuid";

import ITodo from "../interfaces/todo";

interface IProps {
  dispatch(obj: any): void;
}

const AddTodo: React.SFC<IProps> = ({ dispatch }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (task) {
      const todo: ITodo = {
        complete: false,
        id: uuid(),
        task
      };
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
