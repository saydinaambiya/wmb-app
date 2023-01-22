import {Keyboard, Text, View} from "react-native"
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import {constantColor} from "../../shared/theme/constantColor";
import React from "react";
import {saveToken} from "../../utils/token";
import useFetchMutation from "../../hook/useFetchMutation";
import {login} from "../../services/authApi";
import {validateEmail} from "../../utils/validateEmail";


const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({
        email: false,
        password: false
    })


    const onSuccess = async (token) => {
        if (token) {
            await saveToken(token);
            alert("Login Success")
            props.navigation.navigate("Main");
        } else {
            alert("Invalid email or password");
        }
    }

    const {fetchMutation, loading} = useFetchMutation(login, onSuccess)

    const emailHandler = (value) => {
        const isValid = validateEmail(value);
        setEmail(value);
        setError((prevState) => ({
            ...prevState, email: !isValid
        }));
    }

    const passwordHandler = (value) => {
        const isValid = value.length > 6;
        setPassword(value);
        setError((prevState) => ({
            ...prevState, password: !isValid
        }));
    }

    const onLogin = async () => {
        await fetchMutation({email, password});

    }

    return (
        <View
            onTouchStart={Keyboard.dismiss}
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
            }}>
            <View
                style={{backgroundColor: constantColor.whiteColor, padding: 10, borderRadius: 20}}
            >
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 24, color: constantColor.blackColor}}>Login
                    Your Account</Text>
                <FormInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={emailHandler}
                    type="email-address"

                />
                {error?.email && <Text style={{color: 'red', fontSize: 12}}>Invalid email</Text>}
                <FormInput
                    label="Password"
                    placeholder="Enter your password"
                    secure={true}
                    value={password}
                    onChange={passwordHandler}
                />
                {error?.password && <Text style={{color: 'red', fontSize: 12}}>Password min.6 characters</Text>}
                <Button
                    text={loading ? "Loading" : "Login"}
                    onPress={onLogin}
                    disabled={!(email && password) || loading}
                />
            </View>
        </View>
    )

}

export default Login