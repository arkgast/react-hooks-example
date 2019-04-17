import React, { useReducer } from "react";

import ITodo from "../interfaces/todo";

interface ITodoItemProps {
  todo: ITodo;
  dispatch(obj: any): void;
}

interface ITodoListProps {
  todos: ITodo[];
  dispatch(obj: any): void;
}

const TodoItem: React.SFC<ITodoItemProps> = ({ dispatch, todo }) => {
  const handleChange = (currentTodo: ITodo) => () => {
    dispatch({
      id: currentTodo.id,
      type: currentTodo.complete ? "UNDO_TODO" : "DO_TODO"
    });
  };

  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange(todo)}
        />
        {todo.task}
      </label>
    </li>
  );
};

const TodoList: React.SFC<ITodoListProps> = ({ dispatch, todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
