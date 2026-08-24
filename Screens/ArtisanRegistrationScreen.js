import {Text, View, Image,StyleSheet, Pressable, ScrollView} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function CustomerSignupScreen({navigation}) {
  const [userName, setUserName] = useState ("")
  const [phoneNumber, setPhoneNumber] = useState ("")
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [confirmPassword, setConfirmPassword] = useState ("")
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [nameError, setNameError] = useState ("")
  const [phoneError, setPhoneError] = useState ("")
  const [emailError, setEmailError] = useState ("")
  const [passwordError, setPasswordError] = useState ("")
  const [confirmPasswordError, setConfirmPasswordError] = useState ("")
  const [professionError, setProfessionError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  function registerHandler() {
   let valid = true

   if (userName.trim() === ""){
    setNameError ("This field is required");
    valid = false;
   }else if (!nameRegex.test(userName.trim())){
    setNameError("Letters only");
    valid = false;
   }else{
    setNameError("");
   }

   if (phoneNumber.trim() === ""){
    setPhoneError ("This field is required");
    valid = false
   }else if (!phoneRegex.test(phoneNumber.trim())){
    setPhoneError("Enter a valid 10-digit phone number");
    valid = false;
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
   }else if (!passwordRegex.test(password.trim)){
    setPasswordError ("Password not strong enough");
    valid = false;
   }else{
    setPasswordError("")
   }

   if (confirmPassword.trim() === ""){
    setConfirmPasswordError ("This field is required");
    valid = false
   }else{
    setConfirmPasswordError("")
   }

   if (profession.trim() === ""){
    setProfessionError ("This field is required");
    valid = false
   }else{
    setProfessionError("")
   }

   if (experience.trim() === ""){
    setExperienceError ("This field is required");
    valid = false
   }else{
    setConfirmPasswordError("")
   }

   if (state.trim() === ""){
    setStateError ("This field is required");
    valid = false
   }else{
    setStateError("")
   }

   if (city.trim() === ""){
    setCityError ("This field is required");
    valid = false
   }else{
    setCityError("")
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
              Create Your Artisan Account
            </Text>

            <Text style={styles.subtitle1}>
              Join <Text style={styles.sub}>HomeAidConnect</Text> as a trusted Artisan
            </Text>

            <Text style={styles.subtitle2}>
             Today and start receiving service request today.
            </Text>
          
            <InputField
              label="User Name"
              placeholder="Enter your preferred name"
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
              onChangeText={setPhoneNumber}
              error={!!phoneError}
              errorMessage={phoneError}
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

        <InputField
            label="Profession"
            placeholder="e.g. Electrician"
            icon="construct-outline"
            value={profession}
            onChangeText={setProfession}
            error={!!professionError}
            errorMessage={professionError}
        />

        <InputField
            label="Years of Experience"
            placeholder="e.g. 2 Years"
            icon="briefcase-outline"
            value={experience}
            onChangeText={setExperience}
            error={!!experienceError}
            errorMessage={experienceError}
        />

        <InputField
            label="State"
            placeholder="Enter your state"
            icon="location-outline"
            value={state}
            onChangeText={setState}
            error={!!stateError}
            errorMessage={stateError}
        />

        <InputField
            label="City/LGA"
            placeholder="Enter your city"
            icon="location-outline"
            value={city}
            onChangeText={setCity}
            error={!!cityError}
            errorMessage={cityError}
        />

        <PrimaryButton
        onPress={registerHandler}
        >
        Register Account
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
    marginTop: 6,
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