import React, { createContext, useState, useEffect, useRef } from "react";
import { dateToStr } from "../utils/utils";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const testTodo = [
    {
      id: 1,
      regDate: dateToStr(new Date()),
      content: "테니스 치기",
    },
    {
      id: 2,
      regDate: dateToStr(new Date()),
      content: "리액트 네이티브 공부하기",
    },
    {
      id: 3,
      regDate: dateToStr(new Date()),
      content: "할 일 앱 구현하기",
    },
  ];

  // const [todos, setTodos] = useState([]);
  // const lastTodoIdRef = useRef(0);

  const [todos, setTodos] = useState([...testTodo]);
  const lastTodoIdRef = useRef(testTodo.length);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = { id, content: newContent, regDate: dateToStr(new Date()) };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  // console.log(todos);

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const modifyTodo = (id, newContent) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );

    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
