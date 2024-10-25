import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="새 할 일 작성"
        onPress={() => navigation.navigate("TodoWrite")}
      />
    </View>
  );
};

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

const DetailsScreen = ({ navigation, route }) => {
  const todo = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>{JSON.stringify(todo)}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
