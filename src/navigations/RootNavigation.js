import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Splash from "../screens/Splash/Splash";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    ...TransitionPresets.ScaleFromCenterAndroid,
                    headerShown: false
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Main" component={MainTab}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;