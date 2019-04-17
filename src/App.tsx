import React, { useState } from 'react';
import uuid from 'uuid/v4'

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn Node.js',
    complete: true
  }, {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true
  }, {
    id: uuid(),
    task: 'Learn React-Hooks',
    complete: false
  }
]

const App = () => {
  const [todos, setTodo] = useState(initialTodos)
  const [task, setTask] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    if (task) {
      const todo = {
        id: uuid(),
        task,
        complete: false
      }
      setTodo(todos.concat(todo))
    }
    setTask('')
    event.preventDefault()
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
        <li key={todo.id}>
          <label>{todo.task}</label>
        </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={task} onChange={handleChangeInput} />
      </form>
    </div>
  );
}

export default App;
