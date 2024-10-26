import React, { createContext, useState, useRef } from "react";
import { dateToStr } from "../utils/utils";

const TodosContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = { id, content: newContent, regDate: dateToStr(new Date()) };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  console.log(todos);

  return (
    <TodosContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
