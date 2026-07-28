import {Text, View, Images,StyleSheet} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>The LOCK SCREEN</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebcce823",
      },
})