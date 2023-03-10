import React from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import {getToken} from "../../utils/token";

const Splash = (props) => {
    const onNavigate = async () => {
        const token = await getToken();
        if (token) {
            props.navigation.navigate("Main");
        } else {
            props.navigation.navigate("Auth");
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            onNavigate()
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Text>WMB</Text>
            <Text>v.1.0</Text>
        </View>
    )
}
export default Splash;