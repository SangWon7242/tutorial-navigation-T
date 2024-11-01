import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = () => {
  const { todos, removeTodo } = useContext(TodosContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setModifiedContent(todo.content);
    reset();
    setModalVisible(true);
  };

  const closeModifyModal = () => {
    setModifiedContent(modifiedContent);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModifiedContent(modifiedContent);
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
                  onPress={() => openModifyModal(todo, reset)}
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
          <Pressable style={styles.modalBox}>
            <View style={styles.modalInner}>
              <View style={{ flexGrow: 1 }}>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="수정할 할 일을 입력해주세요."
                  value={modifiedContent}
                  onChangeText={setModifiedContent}
                  multiline
                />
              </View>
              <View style={styles.modalBtnBox}>
                <TouchableOpacity style={{}} onPress={closeModifyModal}>
                  <Text style={styles.modalBtnText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={closeModal}>
                  <Text style={styles.modalBtnText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
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
  modalBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    minHeight: 250,
  },
  modalInner: {
    flex: 1,
  },
  modalTextInput: {
    padding: 20,
  },
  modalBtnBox: {
    flex: 0.3,
    flexDirection: "row",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalBtnText: {
    marginRight: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default TodoListScreen;
