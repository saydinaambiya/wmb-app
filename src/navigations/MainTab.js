import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon/Icon";
import MenuStack from "./MenuStack";
import TableStack from "./TableStack";
import CustomerStack from "./CustomerStack";
import Settings from "../screens/Settings/Settings";

const Tabs = createBottomTabNavigator();
const MainTab = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="MenuStack"
                component={MenuStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => <Icon name={focused ? "restaurant" : "restaurant-outline"} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="TableStack"
                component={TableStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => <Icon name={focused ? "wallet" : "wallet-outline"} />
                }}
            />
            <Tabs.Screen
                name="CustomerStack"
                component={CustomerStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => <Icon name={focused ? "people" : "people-outline"} />
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => <Icon name={focused ? "settings" : "settings-outline"} />
                }}
            />
        </Tabs.Navigator>
    )
}

export default MainTab;