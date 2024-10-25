import { StyleSheet, Text, View, Button } from "react-native";

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

export default HomeScreen;
