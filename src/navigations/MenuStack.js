import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import Menu from "../screens/Menu/Menu";
import AddMenu from "../screens/Menu/AddMenu/AddMenu";
import EditMenu from "../screens/Menu/EditMenu/EditMenu";

const Stack = createStackNavigator();

const MenuStack = () => {
    return (
        <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerLeft: () => null,
                }
                }
            />
            <Stack.Screen name="AddMenu" component={AddMenu}/>
            <Stack.Screen name="EditMenu" component={EditMenu}/>
        </Stack.Navigator>
    )
}

export default MenuStack;