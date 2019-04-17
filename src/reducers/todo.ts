import uuid from "uuid";
import ITodo from "../interfaces/todo";

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

export default todoReducer;
