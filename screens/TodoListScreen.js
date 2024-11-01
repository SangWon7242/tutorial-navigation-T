import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider";
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListItem = ({ todo, onModify, onRemove }) => {
  return (
    <View
      style={{
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <ListItem.Swipeable
        bottomDivider
        style={styles.listBox}
        leftContent={(reset) => (
          <Pressable
            onPress={() => onModify(todo, reset)}
            style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
          >
            <Icon name="update" color="white" />
          </Pressable>
        )}
        rightContent={(reset) => (
          <Pressable
            onPress={() => onRemove(todo.id, reset)}
            style={{ ...styles.pressableBtn, backgroundColor: "red" }}
          >
            <Icon name="delete" color="white" />
          </Pressable>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>번호 : {todo.id}</ListItem.Title>
          <ListItem.Subtitle>작성날짜 : {todo.regDate}</ListItem.Subtitle>
          {/* View로 감싸고 Text에 numberOfLines 적용 */}
          <View style={styles.contentContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.contentText}
            >
              할일 : {todo.content}
            </Text>
          </View>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};

const TodoModifyModal = ({
  modifiedContent,
  setModifiedContent,
  modalVisible,
  setModalVisible,
  closeModifyModal,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable onPress={closeModal} style={styles.modalContainer}>
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
  );
};

const TodoListScreen = () => {
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setModifiedContent(todo.content);
    setSelectedTodoId(todo.id);
    reset();
    setModalVisible(true);
  };

  const closeModifyModal = () => {
    if (selectedTodoId !== null) {
      modifyTodo(selectedTodoId, modifiedContent); // 수정된 내용 반영
    }

    setModalVisible(false);
    setSelectedTodoId(null);
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
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoListItem
              todo={item}
              onModify={openModifyModal}
              onRemove={removeConfirm}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          // FlatList는 각 항목별 식별하기 위한 고유키가 필요하다.
        />
      ) : (
        <Text style={styles.emptyText}>할 일이 없습니다</Text>
      )}
      <TodoModifyModal
        modifiedContent={modifiedContent}
        setModifiedContent={setModifiedContent}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        closeModifyModal={closeModifyModal}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 3,
  },
  listBox: {},
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "100%", // 필요한 경우 너비 설정
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
