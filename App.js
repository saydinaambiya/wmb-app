import { SafeAreaView, StatusBar } from "react-native";
import RootNavigation from "./src/navigations/RootNavigation";
import { StyleSheet } from "react-native";
import Login from "./src/screens/Login/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RootNavigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
});