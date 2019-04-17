import React, { useState } from "react";
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

const App = () => {
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

  return (
    <div>
      <ul>
        {todos.map(todo => (
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
