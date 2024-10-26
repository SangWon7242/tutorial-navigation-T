import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Pressable,
  Text,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

const useTodoState = () => {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = { id, content: newContent, regDate: dateToStr(new Date()) };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  return { addTodo };
};

const TodoWriteScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodoState();

  const handleAddTodo = () => {
    if (!todo.trim()) {
      Alert.alert("할 일을 입력해주세요.");
      return;
    }

    addTodo(todo);
    navigation.navigate("TodoList", { todo });
    setTodo("");
  };

  return (
    <>
      <TextInput
        multiline
        placeholder="할 일을 작성해주세요."
        style={{
          height: 200,
          padding: 10,
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 10,
          margin: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
        value={todo}
        onChangeText={setTodo}
      />
      <View style={style.btnBox}>
        <Pressable style={style.pressable} onPress={handleAddTodo}>
          <Text style={style.text}>작성</Text>
        </Pressable>
        <Pressable
          style={style.pressable}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={style.text}>취소</Text>
        </Pressable>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 5,
  },
  pressable: {
    borderRadius: 2,
    borderWidth: 3,
    width: "40%",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
});

export default TodoWriteScreen;
