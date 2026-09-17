import {Text, 
        View, 
        Image,
        StyleSheet, 
        Pressable, 
        ScrollView,
        KeyboardAvoidingView,
        Platform,} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { Ionicons } from "@expo/vector-icons";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { registerUser } from "../api/auth";

export default function CustomerSignupScreen({navigation}) {
  const [userName, setUserName] = useState ("")
  const [phoneNumber, setPhoneNumber] = useState ("")
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [confirmPassword, setConfirmPassword] = useState ("")
  const [location, setLocation] = useState("")
  const [birthDate, setBirthDate] = useState ("")
  const [gender, setGender] = useState ("")

  const [nameError, setNameError] = useState ("")
  const [phoneError, setPhoneError] = useState ("")
  const [locationError, setLocationError] = useState ("")
  const [birthDateError, setBirthDateError] = useState ("")
  const [emailError, setEmailError] = useState ("")
  const [passwordError, setPasswordError] = useState ("")
  const [genderError, setGenderError] = useState ("")
  const [confirmPasswordError, setConfirmPasswordError] = useState ("")
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const birthDateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  async function signUpHandler() {
    let valid = true;
  
    // USERNAME
    if (userName.trim() === "") {
      setNameError("This field is required");
      valid = false;
    } else if (!nameRegex.test(userName.trim())) {
      setNameError("Letters only");
      valid = false;
    } else {
      setNameError("");
    }
  
    // LOCATION
    if (location.trim() === "") {
      setLocationError("This field is required");
      valid = false;
    } else {
      setLocationError("");
    }
  
    // DATE OF BIRTH
    if (birthDate.trim() === "") {
      setBirthDateError("This field is required");
      valid = false;
    } else if (!birthDateRegex.test(birthDate.trim())) {
      setBirthDateError("Use DD/MM/YYYY");
      valid = false;
    } else {
      setBirthDateError("");
    }
  
    // PHONE NUMBER
    if (phoneNumber.trim() === "") {
      setPhoneError("This field is required");
      valid = false;
    } else if (!phoneRegex.test(phoneNumber.trim())) {
      setPhoneError("Enter a valid 10-digit phone number");
      valid = false;
    } else {
      setPhoneError("");
    }
  
    // EMAIL
    if (email.trim() === "") {
      setEmailError("This field is required");
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }
  
    // GENDER
    if (gender === "") {
      setGenderError("Please select your gender");
      valid = false;
    } else {
      setGenderError("");
    }
  
    // PASSWORD
    if (password.trim() === "") {
      setPasswordError("This field is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters");
      valid = false;
    } else if (!passwordRegex.test(password.trim())) {
      setPasswordError("Password not strong enough");
      valid = false;
    } else {
      setPasswordError("");
    }
  
    // CONFIRM PASSWORD
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("This field is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }
  
    // STOP HERE IF FORM IS INVALID
    if (!valid) {
      return;
    }
  
    setLoading(true);
  
    try {
      // Convert gender to the value expected by the backend
      const backendGender =
        gender === "Male" ? "MALE" : "FEMALE";
  
      // Convert DD/MM/YYYY to YYYY-MM-DD
      const [day, month, year] = birthDate.split("/");
  
      const formattedBirthDate = `${year}-${month}-${day}`;
  
      // Prepare the data for Django
      const userData = {
        username: userName.trim(),
        email: email.trim(),
        password: password,
        password_confirm: confirmPassword,
        phone_number: `+234${phoneNumber.trim()}`,
        role: "CUSTOMER",
        gender: backendGender,
        location: location.trim(),
        date_of_birth: formattedBirthDate,
      };
  
      console.log("REGISTRATION DATA:", userData);
  
      // Send registration request to backend
      const response = await registerUser(userData);
  
      console.log("REGISTRATION SUCCESS:", response);
  
      // Save local customer information
      await AsyncStorage.setItem(
        "customerData",
        JSON.stringify({
          userName,
          phoneNumber,
          email,
          birthDate,
          location,
          gender,
        })
      );
  
      // Go to OTP screen
      navigation.navigate("OTPVerification", {
        userType: "customer",
        phoneNumber: phoneNumber,
        email: email,
      });
  
    } catch (error) {
      console.log("REGISTRATION FAILED:", error);
  
      alert(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
    return (
      <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
        <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps = "handled">
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
              label="Date Of Birth"
              placeholder="date/month/year"
              icon="calendar"
              value={birthDate}
              error={!!birthDateError}
              errorMessage={birthDateError}
              onChangeText={setBirthDate}
            />

           <InputField
              label="Location"
              placeholder="Enter your location"
              icon="location-outline"
              value={location}
              onChangeText={setLocation}
              error={!!locationError}
              errorMessage={locationError}
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

            <View style={styles.genderContainer}>

            <Text style={styles.genderLabel}>
              Gender
            </Text>

            <View style={styles.genderOptions}>

              <Pressable
                style={[
                  styles.genderOption,
                  gender === "Male" && styles.genderOptionSelected,
                ]}
                onPress={() => {
                  setGender("Male");
                  setGenderError("");
                }}
              >
                <Ionicons
                  name={
                    gender === "Male"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color="#8b15b9"
                />

                <Text style={styles.genderText}>
                  Male
                </Text>
              </Pressable>


              <Pressable
                style={[
                  styles.genderOption,
                  gender === "Female" && styles.genderOptionSelected,
                ]}
                onPress={() => {
                  setGender("Female");
                  setGenderError("");
                }}
              >
                <Ionicons
                  name={
                    gender === "Female"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color="#8b15b9"
                />

                <Text style={styles.genderText}>
                  Female
                </Text>
              </Pressable>

            </View>

            {genderError ? (
              <Text style={styles.errorText}>
                {genderError}
              </Text>
            ) : null}

            </View>

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

  genderContainer: {
    width: "90%",
    marginTop: 10,
    marginBottom: 30,
  },
  
  genderLabel: {
    fontSize: 15,
    fontWeight: "700",
    color:"#8b15b9",
    marginBottom: 10,
  },
  
  genderOptions: {
    flexDirection: "row",
    gap: 10,
  },
  
  genderOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  
  genderOptionSelected: {
    borderColor: "#8b15b9",
    backgroundColor: "#f8effb",
  },
  
  genderText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
  
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 6,
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
   borderRadius: 15,
   marginBottom: 20,
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