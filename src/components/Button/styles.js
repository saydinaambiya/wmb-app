import { StyleSheet } from "react-native";
import { color } from "../../shared/theme/color";

const styles = StyleSheet.create({
    button: (disabled) => ({
        backgroundColor: color.greenColor,
        borderRadius:20,
        padding: 15,
        margin: 10,
        opacity: disabled ? 0.5 : 1
    }),

    buttonText: {
        color: color.whiteColor,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default styles;