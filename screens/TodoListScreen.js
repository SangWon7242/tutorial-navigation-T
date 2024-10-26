import { Text, View, Button } from "react-native";

const TodoListScreen = ({ navigation, route }) => {
  const { todos } = route.params?.todosState || { todos: [] };

  console.log(todos);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>TodoList</Text>
    </View>
  );
};

export default TodoListScreen;
