import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Customer from "../screens/Customer/Customer";
import AddCustomer from "../screens/Customer/AddCustomer/AddCustomer";
import EditCustomer from "../screens/Customer/EditCustomer/EditCustomer";

const Stack = createStackNavigator();

const CustomerStack = () => {
    return (
        <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name="Customer" component={Customer} options={{
                headerLeft: () => null,
            }}/>
            <Stack.Screen name="AddCustomer" component={AddCustomer} />
            <Stack.Screen name="EditCustomer" component={EditCustomer} />
        </Stack.Navigator>
    )
}

export default CustomerStack;