import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabConfig from "./config/tabConfig";
import { TodosProvider } from "./components/TodosProvider";
import { Text, View, SafeAreaView, StatusBar, Image } from "react-native";

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        {/* StatusBar 설정 추가 */}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerContainer}>
          <View style={styles.headerInner}>
            <View style={styles.logoBox}>
              <Image
                source={require("./assets/images/logo.jpg")}
                style={styles.logo}
              />
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

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
              options={{
                title: routeConfig.title,
                header: () => <CustomHeader title={routeConfig.title} />,
              }}
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
  safeArea: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoBox: {
    flexGrow: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  titleBox: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
