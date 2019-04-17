import React, { useContext, useReducer } from "react";

import TodoContext from "../context";
import ITodo from "../interfaces/todo";

interface ITodoItemProps {
  todo: ITodo;
}

interface ITodoListProps {
  todos: ITodo[];
}

const TodoItem: React.SFC<ITodoItemProps> = ({ todo }) => {
  const dispatch = useContext(TodoContext);

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

const TodoList: React.SFC<ITodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
