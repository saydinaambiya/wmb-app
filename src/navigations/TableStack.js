import { createStackNavigator, TransitionPresets } from "@react-navigation/stack/";
import Table from "../screens/Table/Table";
import AddTable from "../screens/Table/AddTable/AddTable";
import EditTable from "../screens/Table/EditTable/EditTable";

const Stack = createStackNavigator();

const TableStack = () => {
    return (
        <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name="Table" component={Table} options={{
                headerLeft: () => null,
            }}/>
            <Stack.Screen name="AddTable" component={AddTable} />
            <Stack.Screen name="EditTable" component={EditTable} />
        </Stack.Navigator>
    )
}

export default TableStack;