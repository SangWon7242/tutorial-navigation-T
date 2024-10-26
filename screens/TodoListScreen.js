import { Text, View, StyleSheet } from "react-native";

const TodoListScreen = ({ navigation, route }) => {
  const { todos } = route.params?.todosState || { todos: [] };

  return (
    <View style={styles.container}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} style={styles.listBox}>
            <Text>번호 : {todo.id}</Text>
            <Text>작성날짜 : {todo.regDate}</Text>
            <Text>할일 : {todo.content}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  listBox: {
    borderRadius: 10,
    borderWidth: 2,
    width: "90%",
    flex: 0.13,
    padding: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default TodoListScreen;
