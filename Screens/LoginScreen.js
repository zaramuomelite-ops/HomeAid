import {Text, 
        View,
        Image,
        StyleSheet, 
        ScrollView, 
        KeyboardAvoidingView,
        Platform} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [emailError, setEmailError] = useState ("");
  const [passwordError, setPasswordError] = useState ("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [loading, setLoading] = useState(false)

  async function loginHandler() {
    let valid = true;

    if (email.trim() === "") {
      setEmailError("This field is required");
      valid = false;
    } else if (!emailRegex.test(email.trim())){
      setEmailError("Enter a valid email address.");
      valid = false
    } else {
      setEmailError("")
    }

    if (password.trim() === ""){
      setPasswordError("This field is required");
      valid = false;
    } else if (password.length < 8){
      setPasswordError("Password should be at least 8 characters")
      valid = false;
    } else {
      setPasswordError("")
    } 

    if(!valid) return;

const customerData = await AsyncStorage.getItem("customerData");
const artisanData = await AsyncStorage.getItem("artisanData");

let user = null;
let userType = null;

    // Check customer
    if (customerData) {
      const customer = JSON.parse(customerData);

      if (
        email === customer.email &&
        password === customer.password
      ) {
        user = customer;
        userType = "customer";
      }
    }

    // Check artisan
    if (!user && artisanData) {
      const artisan = JSON.parse(artisanData);

      if (
        email === artisan.email &&
        password === artisan.password
      ) {
        user = artisan;
        userType = "artisan";
      }
    }

    // No matching account
    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (userType === "customer") {
        navigation.navigate("CustomerHome");
      } else if (userType === "artisan") {
        navigation.navigate("ArtisanHome");
      }
    }, 2000);
          
  }

    return (
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
   
        <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps = "handled"
              >
               
               <Pressable 
                        style ={styles.back}
                        onPress={() => navigation.goBack()}>
                  <Ionicons
                    name = "arrow-back"
                    size = {30}
                    color = "#8b15b9"
                    />
                  </Pressable>
              <Image style={styles.logo}
                     source={require("../assets/Images/logo.png")} 
                     /> 
            <InputField
              label = "Email Address"
              value = {email}
              onChangeText = {setEmail}
              error = {!!emailError}
              errorMessage = {emailError}
              placeholder = "Enter your Email"
              icon ="mail"
              />

            <InputField 
            label = "Password"
            value = {password}
            onChangeText = {setPassword}
            placeholder = "Enter your Password" 
            secureTextEntry={true}
            error = {!!passwordError}
            errorMessage = {passwordError}/>

            <Text style={styles.forget}>Forgot Password </Text>

            <PrimaryButton
            style={styles.logIn}
            onPress={loginHandler}
            disabled = {loading}
            loading = {loading}>
            
              Log In</PrimaryButton>

          <View style={styles.divide}>
            <View style={styles.line}/>
              <Text style={styles.or}>or</Text>
            <View style={styles.line}/>
          </View>

        <View style={styles.card}>
          <Text style={styles.question}> Don't Have An Account? </Text>

          <PrimaryButton 
                style={styles.signUp}
                textColor = "#222"
                onPress={() => navigation.navigate("CustomerSignup")}
                icon= "person-add">
                    Sign Up as a Customer</PrimaryButton>

                <PrimaryButton 
                style={styles.register}
                textColor = "#222"
                onPress={() => navigation.navigate("ArtisanRegister")}
                icon = "construct">
                    Register as an Artisan/Worker</PrimaryButton>
        </View>

        <View style={styles.divide}>
            <View style={styles.line}/>
              <Text style={styles.or}>For the Dev</Text>
            <View style={styles.line}/>
          </View>

        <View style={styles.card}>
        <Text style={styles.question}>Continue as a Dev?</Text>

        <PrimaryButton
          style={styles.signUp}
          textColor = "#222"
          onPress={() => navigation.replace("CustomerHome")}
          icon="person"
        >
          Continue as Customer
        </PrimaryButton>

        <PrimaryButton
          style={styles.register}
          textColor = "#222"
          onPress={() => navigation.replace("ArtisanHome")}
          icon="construct"
        >
    Continue as Artisan/Worker
  </PrimaryButton>
</View>

       </ScrollView>
       </KeyboardAvoidingView>
    )
  }


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ebcce823",
        alignItems: "center",
      },

      logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        
      },
      
    
      back: {
        alignSelf: "flex-start",
        marginTop: 50,
        marginLeft: 20,
    
      },

      forget: {
        marginLeft: 230,
        marginBottom:20,
        marginTop: 6,
        color: "#9226a0",
        textDecorationLine: "underline"
      },

      divide: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginVertical: 20,
      },

      line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc"
      },

      or: {
        marginHorizontal: 10,
        color: "#666",
      },

      signUp: {
        marginBottom: 20,
        marginTop: 20,
        paddingTop: 15,
        marginLeft: 15,
        marginRight: 30,
        paddingBottom: 15,
        backgroundColor: "#ebcce823",
        borderColor:  "#8b15b9",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 15,
        
      },

      register: {
        marginBottom: 20,
        marginLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#ebcce823",
        borderColor:  "#8b15b9",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 15,
    
      },

      question: {
        marginLeft: 100,
        marginTop: 10
      },

      card: {
       backgroundColor: "#8a15b911",
       width: 350,
       borderRadius: 15,
       marginBottom: 20,
      },
  
})