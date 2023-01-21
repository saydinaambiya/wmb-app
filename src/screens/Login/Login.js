import {Keyboard, Text, View} from "react-native"
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import {color} from "../../shared/theme/color";

const Login = (props) => {

    const onNavigate = () => {
        props.navigation.navigate("Main");
    }

    return (
        <View
            onTouchStart={Keyboard.dismiss}
            style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.whiteColor,
            paddingHorizontal: 10,
        }}>
            <View
                style={{backgroundColor:'#fff', padding:10, borderRadius:20}}
            >
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24, color: color.blackColor}}>Login Your Account</Text>
                <FormInput
                    label="Email"
                />
                <FormInput
                    label="Password"
                />
                <Button
                    text="Login"
                    onPress={onNavigate}
                />
            </View>
        </View>
    )

}

export default Login