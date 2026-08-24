import {Text, View, Image,StyleSheet, Pressable, ScrollView} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { Ionicons } from "@expo/vector-icons";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function CustomerSignupScreen({navigation}) {
  const [userName, setUserName] = useState ("")
  const [phoneNumber, setPhoneNumber] = useState ("")
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [confirmPassword, setConfirmPassword] = useState ("")

  const [nameError, setNameError] = useState ("")
  const [phoneError, setPhoneError] = useState ("")
  const [emailError, setEmailError] = useState ("")
  const [passwordError, setPasswordError] = useState ("")
  const [confirmPasswordError, setConfirmPasswordError] = useState ("")
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  function signUpHandler() {
   let valid = true

   if (userName.trim() === ""){
    setNameError ("This field is required");
    valid = false;
   }else if (!nameRegex.test(userName.trim())){
    setNameError("Letters only");
    valid = false
   } else {
    setNameError("")
   }

   if (phoneNumber.trim() === ""){
    setPhoneError ("This field is required");
    valid = false
   }else if(!phoneRegex.test(phoneNumber.trim())){
    setPhoneError ("Enter a valid 10-digit phone number");
    valid = false

   }else{
    setPhoneError("")
   }

   if (email.trim() === ""){
    setEmailError("This field is required");
    valid = false;
   }else if (!emailRegex.test(email.trim())){
    setEmailError("Enter a valid email");
    valid = false;
   }else{
    setEmailError("")
   }

   if (password.trim() === ""){
    setPasswordError ("This field is required");
    valid = false
   }else if (password.length < 8){
    setPasswordError("Password should be at least 8 characters")
    valid = false;
   }else if (!passwordRegex.test(password.trim())){
    setPasswordError("Password not strong enough");
    valid = false
   }else{
    setPasswordError("")
   }

   if (confirmPassword.trim() === ""){
    setConfirmPasswordError ("This field is required");
    valid = false
   }else if (password !== confirmPassword){
    setConfirmPasswordError("passwords do not match");
    valid = false
   }else{
    setConfirmPasswordError("")
   }

   if(valid){
    setLoading(true);

    setTimeout(async () => {
      await AsyncStorage.setItem(
        "customerData",
        JSON.stringify({
          userName,
          phoneNumber,
          email,
          location: "Lagos, Nigeria"
        })
      );

      setLoading(false)
      navigation.navigate("OTPVerification",{
        phoneNumber,
      });
    }, 2000)
    }
  }
    return (
        <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
            <Pressable
            style = {styles.back}
            onPress={() => navigation.goBack()}>

                <Ionicons
                name="arrow-back"
                size= {30}
                color={"#8b15b9"}/>
            </Pressable>
              <Image style={styles.logo}
                     source={require("../assets/Images/logo.png")} 
                                 /> 
         
         <Text style={styles.title}>
              Create Your Account
            </Text>

            <Text style={styles.subtitle1}>
              Join <Text style={styles.sub}>HomeAidConnect</Text> today and start
            </Text>

            <Text style={styles.subtitle2}>
              connecting with trusted professionals near you.
            </Text>
          
            <InputField
              label="User Name"
              placeholder="Enter your full name"
              icon="person-outline"
              value={userName}
              error={!!nameError}
              errorMessage={nameError}
              onChangeText={(text) =>
                            setUserName(text.replace(/[^A-Za-z\s'-]/g, ""))}
            />
           
           <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              icon="call-outline"
              keyboardType= "number-pad"
              showCountryCode
              value={phoneNumber}
              error={!!phoneError}
              errorMessage={phoneError}
              onChangeText={setPhoneNumber}
            />

          <InputField
              label="Email Address"
              placeholder="Enter your email"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              error={!!emailError}
              errorMessage={emailError}
          />

          <InputField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              error={!!passwordError}
              errorMessage={passwordError}
           />


          <InputField
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
          />

        <PrimaryButton
        onPress={signUpHandler}
        disabled = {loading}
        loading = {loading}
        >
        Create Account
        </PrimaryButton>

        <View style={styles.divide}>
          <View style={styles.line}/>
          <Text style={styles.or}>or</Text>
          <View style={styles.line}/>
        </View>

        <View style={styles.card}>

          <Text style={styles.question}>
          Already have an account?
          </Text>

            <PrimaryButton
            style={styles.logIn}
            textColor="#222"
            onPress={()=>navigation.goBack()}
            icon="log-in-outline"
            >
              Log In 
            </PrimaryButton>

        </View>
                          
        </ScrollView>
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

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#54275f",
    textAlign: "center",
    marginTop: 1,
  },
  
  subtitle1: {
    fontSize: 13,
    color: "#6f6a7d",
    textAlign: "center",
    marginTop: 5,
  },

  subtitle2: {
    fontSize: 13,
    color: "#6f6a7d",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
  },

  
  forget: {
    marginLeft: 230,
    marginBottom:20,
    marginTop: 1,
    color: "#9226a0",
    textDecorationLine: "underline"
  },


  sub: {
    color: "#9226a0",
    fontWeight: "bold"
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

  question: {
    marginLeft: 90,
    marginTop: 10,
    marginBottom: 10,
  },

  card: {
   backgroundColor: "#8a15b911",
   width: 350,
   borderRadius: 15
  },

  logIn: {
    marginBottom: 20,
    marginHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#ebcce823",
    borderColor:  "#8b15b9",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 15,
  },

  text: {
    marginRight: 50
  },
})