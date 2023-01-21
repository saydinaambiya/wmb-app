import { Text, TextInput, View } from "react-native"
import styles from "./styles";

const FormInput = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChange}
                keyboardType={props.type}
                secureTextEntry={props.isPassword}
            />
        </View>
    )
}

export default FormInput;