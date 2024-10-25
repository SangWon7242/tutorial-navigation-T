import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

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

const TodoSearchScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>TodoSearch</Text>
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

const TodoListScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>TodoList</Text>
    </View>
  );
};

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

const MyPageScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>MyPage</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  const tapConfig = [
    {
      name: "Home",
      component: HomeScreen,
      focusedIcon: "home-variant",
      unFocusedIcon: "home-variant-outline",
      iconCompnent: MaterialCommunityIcons,
    },
    {
      name: "TodoSearch",
      component: TodoSearchScreen,
      focusedIcon: "search-sharp",
      unFocusedIcon: "search-outline",
      iconCompnent: Ionicons,
    },
    {
      name: "TodoWrite",
      component: TodoWriteScreen,
      focusedIcon: "application-edit",
      unFocusedIcon: "application-edit-outline",
      iconCompnent: MaterialCommunityIcons,
    },
    {
      name: "TodoList",
      component: TodoListScreen,
      focusedIcon: "list-sharp",
      unFocusedIcon: "list-outline",
      iconCompnent: Ionicons,
    },
    {
      name: "MyPage",
      component: MyPageScreen,
      focusedIcon: "person-circle-sharp",
      unFocusedIcon: "person-circle-outline",
      iconCompnent: Ionicons,
    },
  ];

  const screenOption = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      // tapConfig에서 config name이 스크린 name이랑 일치하는지 확인
      const routeConfig = tapConfig.find(
        (config) => config.name === route.name
      );

      const iconName = focused
        ? routeConfig.focusedIcon
        : routeConfig.unFocusedIcon;

      const IconComponent = routeConfig.iconCompnent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#0163d2",
    tabBarInactiveTintColor: "black",
    tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 10,
      fontWeight: 600,
    },
    tabBarStyle: {
      height: 70,
      paddingTop: 5,
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        {tapConfig.map((routeConfig) => (
          <Tab.Screen
            key={routeConfig.name}
            name={routeConfig.name}
            component={routeConfig.component}
          />
        ))}
      </Tab.Navigator>
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
