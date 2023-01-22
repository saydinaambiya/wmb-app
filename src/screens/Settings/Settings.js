import {Text, View} from "react-native"
import Button from "../../components/Button/Button";
import {removeToken} from "../../utils/token";

const Settings = (props) => {

    const onLogout = async () => {
        await removeToken();
        props.navigation.navigate("Auth");
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Button
                text="Logout"
                onPress={onLogout}
            />
        </View>
    )
}

export default Settings;