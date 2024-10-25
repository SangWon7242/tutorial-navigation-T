import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabConfig from "./config/tabConfig";

const Tab = createBottomTabNavigator();

export default function App() {
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
        {tabConfig.map((routeConfig) => (
          <Tab.Screen
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
