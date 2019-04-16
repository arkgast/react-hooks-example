import React, { Component } from 'react';

const initialTodos = [
  {
    id: 'a',
    task: 'Learn Node.js',
    complete: true
  }, {
    id: 'b',
    task: 'Learn Firebase',
    complete: true
  }, {
    id: 'c',
    task: 'Learn React-Hooks',
    complete: false
  }
]

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          {initialTodos.map(todo => (
            <li key={todo.id}>
              <label>{todo.task}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
