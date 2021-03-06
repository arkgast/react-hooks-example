import React, { useReducer, useState } from "react";
import uuid from "uuid";

import AddTodo from "./components/AddTodo";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";
import DispatchContext from "./context";
import ITodo from "./interfaces/todo";
import filterReducer from "./reducers/filter";
import todoReducer from "./reducers/todo";

const initialTodos: ITodo[] = [];

const getFilteredTodos = (todos: ITodo[], filter: string) => {
  return todos.filter(todo => {
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
};

const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const filteredTodos = getFilteredTodos(todos, filter);

  const dispatch = (action: any) =>
    [dispatchTodos, dispatchFilter].forEach(fn => fn(action));

  return (
    <DispatchContext.Provider value={dispatch}>
      <Filter />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </DispatchContext.Provider>
  );
};

export default App;
