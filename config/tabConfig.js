import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TodoSearchScreen from "../screens/TodoSearchScreen";
import TodoWriteScreen from "../screens/TodoWriteScreen";
import TodoListScreen from "../screens/TodoListScreen";
import MyPageScreen from "../screens/MyPageScreen";

const tabConfig = [
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

export default tabConfig;
