import React, { createContext, useState, useEffect, useRef } from "react";
import { dateToStr } from "../utils/utils";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const testTodo = [
    {
      id: 1,
      content: "테니스 치기",
      retDate: dateToStr(new Date()),
    },
    {
      id: 2,
      content: "리액트 네이티브 공부하기",
      retDate: dateToStr(new Date()),
    },
    {
      id: 3,
      content: "할 일 앱 구현하기",
      retDate: dateToStr(new Date()),
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

  const removeTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index != -1) {
      removeTodo(index);
    }
  };

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return null;
    }

    return todos[index];
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
