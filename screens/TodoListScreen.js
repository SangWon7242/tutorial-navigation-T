import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = () => {
  const { todos, removeTodo } = useContext(TodosContext);
  const [modalVisible, setModalVisible] = useState(false);

  const openModifyModal = (reset) => {
    reset();
    setModalVisible(true);
  };

  const closeModifyModal = () => {
    setModalVisible(false);
  };

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
                  onPress={() => openModifyModal(reset)}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable onPress={closeModifyModal} style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
              수정 창
            </Text>
          </View>
        </Pressable>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default TodoListScreen;
