import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Pressable,
  Text,
  Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import TodosContext from "../components/TodosProvider";

const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);

  const handleAddTodo = () => {
    if (!todo.trim()) {
      Alert.alert("할 일을 입력해주세요.");
      return;
    }

    addTodo(todo);
    navigation.navigate("TodoList");
    setTodo("");
  };

  return (
    <>
      <View style={style.writeContiner}>
        <View style={style.textInputBox}>
          <TextInput
            multiline
            placeholder="할 일을 작성해주세요."
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 10,
            }}
            value={todo}
            onChangeText={setTodo}
          />
        </View>
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
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textInputBox: {
    minHeight: 200,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
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
