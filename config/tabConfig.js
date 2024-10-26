import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TodoSearchScreen from "../screens/TodoSearchScreen";
import TodoWriteScreen from "../screens/TodoWriteScreen";
import TodoListScreen from "../screens/TodoListScreen";
import MyPageScreen from "../screens/MyPageScreen";

const tabConfig = [
  {
    name: "Home",
    title: "홈",
    component: HomeScreen,
    focusedIcon: "home-variant",
    unFocusedIcon: "home-variant-outline",
    iconCompnent: MaterialCommunityIcons,
  },
  {
    name: "TodoSearch",
    title: "검색",
    component: TodoSearchScreen,
    focusedIcon: "search-sharp",
    unFocusedIcon: "search-outline",
    iconCompnent: Ionicons,
  },
  {
    name: "TodoWrite",
    title: "할 일 작성",
    component: TodoWriteScreen,
    focusedIcon: "application-edit",
    unFocusedIcon: "application-edit-outline",
    iconCompnent: MaterialCommunityIcons,
  },
  {
    name: "TodoList",
    title: "할 일 리스트",
    component: TodoListScreen,
    focusedIcon: "list-sharp",
    unFocusedIcon: "list-outline",
    iconCompnent: Ionicons,
  },
  {
    name: "MyPage",
    title: "내 페이지",
    component: MyPageScreen,
    focusedIcon: "person-circle-sharp",
    unFocusedIcon: "person-circle-outline",
    iconCompnent: Ionicons,
  },
];

export default tabConfig;
