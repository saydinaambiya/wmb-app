import {StyleSheet} from "react-native";
import {constantColor} from "../../shared/theme/constantColor";

const styles = StyleSheet.create({
    button: (disabled, isDelete) => ({
        backgroundColor: isDelete ? constantColor.softGreenColor : constantColor.greenColor,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        opacity: disabled ? 0.5 : 1
    }),

    buttonText: {
        color: constantColor.whiteColor,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default styles;