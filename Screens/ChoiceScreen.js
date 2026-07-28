import {Text, View, StyleSheet,Image} from "react-native";
import PrimaryButton from "../components/PrimaryButton"

export default function ChoiceScreen(){
    return (
        <View style={styles.container}>
        
        <View style={styles.topSection}>
            <Image style={styles.logo}
                   source={require("../assets/Images/logo.png")} /> 
            <Text style={styles.title}>Get the help you </Text>
               <Text style={styles.title2}> need, when you need it </Text>
            <Text style={styles.text}>
                Trusted, verified and nearby home professionals at your service
            </Text>
            
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton style={styles.logIn}>
                    Log In</PrimaryButton>
                <PrimaryButton style={styles.signUp}>
                    Sign Up as a Customer</PrimaryButton>
                <PrimaryButton style={styles.register}>
                    Register as an Artisan/Worker</PrimaryButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: "#ebcce823",
      },
      
      topSection: {
        alignItems: "center",
        marginTop: 70,
      },
      
      logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
      },
      
      title: {
        fontSize: 30,
        fontWeight: "900",
      },
      
      title2: {
        fontSize: 30,
        fontWeight: "900",
      },
      
      text: {
        textAlign: "center",
        marginHorizontal: 25,
        marginTop: 10,
      },
      
      buttonContainer: {
        marginTop: 100,
        alignItems: "center",
        marginLeft: 30,
        marginRight: 30,
        
      },
      
      logIn:{
        marginBottom: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,
      },

      signUp: {
        marginBottom: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#ebcce823",
        borderColor:  "#8b15b9",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 15,
      },

      register: {
        marginBottom: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#ebcce823",
        borderColor:  "#8b15b9",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 15,
      },


    
})