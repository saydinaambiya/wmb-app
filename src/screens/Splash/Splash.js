import React, { useRef } from "react";
import LottieView from "lottie-react-native"
import { View, Text } from "react-native";
import styles from "./styles";

const Splash = (props) => {
    const animation = useRef(null);
    const onNavigate = () => {
        props.navigation.navigate("Auth")
    }

        React.useEffect(() => {
            animation.current?.play();
            setTimeout(()=>{
            onNavigate()
            }, 3000)
        })

    return (
        <View style={styles.container}>
            <LottieView
                ref={animation}
                style={{
                    width: 300,
                    height: 300
                }}
                source={require('../../../assets/animation/logo.json')}
            />
            <Text>WMB</Text>
            <Text>v.1.0</Text>
        </View>
    )
}
export default Splash;