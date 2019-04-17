import React, { useReducer, useState } from "react";
import uuid from "uuid";

import { ITodo } from "./todo.interface";

const initialTodos: ITodo[] = [
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

const todoReducer = (state: ITodo[], action: any) => {
  switch (action.type) {
    case "DO_TODO": {
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        }
        return todo;
      });
    }
    case "UNDO_TODO": {
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        }
        return todo;
      });
    }
    case "ADD_TODO": {
      const todo: ITodo = {
        complete: false,
        id: uuid(),
        task: action.task
      };
      return state.concat(todo);
    }
    default:
      return state;
  }
};

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
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    if (task) {
      const todo: ITodo = {
        complete: false,
        id: uuid(),
        task
      };
      dispatchTodos({ type: "ADD_TODO", task });
    }
    setTask("");
    event.preventDefault();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleChangeCheckbox = (todo: ITodo) => () => {
    dispatchTodos({
      id: todo.id,
      type: todo.complete ? "UNDO_TODO" : "DO_TODO"
    });
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
                onChange={handleChangeCheckbox(todo)}
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
