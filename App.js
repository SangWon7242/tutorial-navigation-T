import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabConfig from "./config/tabConfig";
import { TodosProvider } from "./components/TodosProvider";

const Tab = createBottomTabNavigator();

export default function App() {
  // useTodosState 재렌더링이 되어 데이터가 유지 되지 않음
  // const todosState = useTodosState();

  const screenOption = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      // tabConfig에서 config name이 스크린 name이랑 일치하는지 확인
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );

      const iconName = focused
        ? routeConfig.focusedIcon
        : routeConfig.unFocusedIcon;

      const IconComponent = routeConfig.iconCompnent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    headerStyle: {
      // Android
      elevation: 8,
      // iOS
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
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
    <TodosProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOption}>
          {tabConfig.map((routeConfig) => (
            <Tab.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{ title: routeConfig.title }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </TodosProvider>
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
