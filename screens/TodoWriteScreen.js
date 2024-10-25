import { Button, TextInput } from "react-native";
import React, { useState } from "react";

const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="할 일을 작성해주세요."
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={todo}
        onChangeText={setTodo}
      />
      <Button
        title="작성"
        onPress={() => {
          navigation.navigate({
            name: "Details",
            params: { todo },
            merge: true,
          });
        }}
      />
    </>
  );
};

export default TodoWriteScreen;
