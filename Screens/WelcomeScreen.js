import { StatusBar } from 'expo-status-bar'
import PrimaryButton from "../components/PrimaryButton"
import { StyleSheet, 
         Text, 
         View, 
         Image, } from 'react-native'; 

export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
       <StatusBar style='dark'/>
       <Image style={styles.logo}
             source={require("../assets/Images/logo.png")} /> 
      <Text 
        style={styles.subTitle}>Find trusted home professionals near you 
      </Text>
      <Image style={styles.logo2}
             source={require("../assets/Images/homiie.png")} />
      
      <View style={styles.getStarted}>
      <PrimaryButton 
      onPress={() => navigation.navigate ("Choice")}
      >
        Get Started
      </ PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#ebcce823",
  },
   
  getStarted: {
    marginTop: 350,
  },

  logo: {
    width: 300,
    height: 300,
    marginBottom: 5,
    resizeMode: "contain",
    elevation: 35,
    marginTop: 80,
  },

  subTitle: {
    color: "purple",
    fontStyle: "italic",
    fontSize: 15,
    fontWeight: "bold",
  },
   
  logo2: {
    width: 300,
    height: 200,
    position: "absolute",
    top: 180,
    left: 30,
    marginTop: 300,
  },
});
