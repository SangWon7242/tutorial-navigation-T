import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";

const backgroundImage = require("../assets/images/todoBgImg.jpg");

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default HomeScreen;
