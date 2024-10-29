import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = () => {
  const { todos, removeTodo } = useContext(TodosContext);

  const removeConfirm = (id, reset) => {
    Alert.alert(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: () => removeTodo(id),
          style: "destructive",
        },
        {
          text: "취소",
          onPress: () => reset(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => reset(),
      }
    );
  };

  return (
    <View style={styles.container}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} style={{ marginTop: 5 }}>
            <ListItem.Swipeable
              bottomDivider
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable
                  onPress={() => reset()}
                  style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                >
                  <Icon name="update" color="white" />
                </Pressable>
              )}
              rightContent={(reset) => (
                <Pressable
                  onPress={() => removeConfirm(todo.id, reset)}
                  style={{ ...styles.pressableBtn, backgroundColor: "red" }}
                >
                  <Icon name="delete" color="white" />
                </Pressable>
              )}
            >
              <ListItem.Content>
                <ListItem.Title>번호 : {todo.id}</ListItem.Title>
                <ListItem.Subtitle>작성날짜 : {todo.regDate}</ListItem.Subtitle>
                <ListItem.Subtitle>할일 : {todo.content}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>할 일이 없습니다</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 3,
  },
  listBox: {
    borderWidth: 2,
  },
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TodoListScreen;
