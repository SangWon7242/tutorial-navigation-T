import { Text, View, Button } from "react-native";

const DetailsScreen = ({ navigation, route }) => {
  const todo = route.params?.todo;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>게시글 : {todo}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
    </View>
  );
};

export default DetailsScreen;
