import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Login from "../screens/Login/Login";

const Stack = createStackNavigator();

const AuthStack = () => {
    return(
    <Stack.Navigator
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false
        }}
    >
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
        )
}

export default AuthStack;