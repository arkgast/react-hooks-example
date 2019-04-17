import React, { useReducer, useState } from "react";
import uuid from "uuid";

import AddTodo from "./components/AddTodo";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";
import ITodo from "./interfaces/todo";
import filterReducer from "./reducers/filter";
import todoReducer from "./reducers/todo";

const initialTodos: ITodo[] = [];

const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

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
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} dispatch={dispatchTodos} />
      <AddTodo dispatch={dispatchTodos} />
    </div>
  );
};

export default App;
