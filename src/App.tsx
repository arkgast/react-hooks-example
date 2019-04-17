import React, { useReducer, useState } from "react";
import uuid from "uuid";

const initialTodos = [
  {
    complete: true,
    id: uuid(),
    task: "Learn Node.js"
  },
  {
    complete: true,
    id: uuid(),
    task: "Learn Firebase"
  },
  {
    complete: false,
    id: uuid(),
    task: "Learn React-Hooks"
  }
];

const filterReducer = (state: any, action: any) => {
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

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [todos, setTodo] = useState(initialTodos);
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    if (task) {
      const todo = {
        complete: false,
        id: uuid(),
        task
      };
      setTodo(todos.concat(todo));
    }
    setTask("");
    event.preventDefault();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleChangeCheckbox = (todoId: string) => () => {
    setTodo(
      todos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
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
      <div>
        <button onClick={handleShowAll}>Show All</button>
        <button onClick={handleShowComplete}>Show Complete</button>
        <button onClick={handleShowIncomplete}>Show Incomplete</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={task} onChange={handleChangeInput} />
      </form>
    </div>
  );
};

export default App;
