import {Text, View, Image,StyleSheet} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style= {styles.text}>The LOCK SCREEN </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebcce823",
        alignItems: "center",
       
      },

   text: {
    marginTop: 200,
   },
})