import {StyleSheet} from "react-native";
import {color} from "../../shared/theme/color";

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color:color.blackColor
    },
    textInput: {
        fontSize: 20,
        padding: 10,
        // borderWidth: 1,
        borderRadius: 20,
        backgroundColor: color.whiteColor
    }
})

export default styles;