import { View, 
         Text, 
         StyleSheet, 
         Image,
         Pressable, 
         TextInput, 
         ScrollView, 
         KeyboardAvoidingView,
         Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function OTPVerificationScreen({ navigation, route }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { userType } = route.params || {};
  const CORRECT_OTP = "08071"

  function handleOtpChange(text, index) {
    const newOtp = [...otp];
  
    newOtp[index] = text;
  
    setOtp(newOtp);
  
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }

  function verifyHandler() {
    const otpCode = otp.join("");
  
    if (otpCode.length !== 5) {
      alert("Please enter the 5-digit verification code.");
      return;
    } 

    if (otpCode !== CORRECT_OTP){
      alert("Incorrect Verification Code")
      return;
    }
  
    console.log("OTP Verified:", otpCode);
  
    if (userType === "customer") {
      navigation.replace("CustomerHome");
    } else if (userType === "artisan") {
      navigation.replace("ArtisanVerification", {
        status: "received",
      });
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle = {styles.container}
        showsVerticalScrollIndicator = {false}
        keyboardShouldPersistTaps = "handled"
        >
    <View style={styles.container}>
      <Pressable
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
           name="arrow-back"
           size={30}
          color="#8b15b9"
        />
      </Pressable>

      <Image
        style={styles.logo}
        source={require("../assets/Images/logo.png")}
      />

      <Text style={styles.title}>
        Verify Your Phone
      </Text>

      <Text style={styles.subtitle}>
        We've sent a verification code to
      </Text>
      
      <Text style={styles.phone}>
        +234 {phoneNumber}
      </Text>

      <View style={styles.otpContainer}>

        {otp.map((digit, index) => (

            <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                />

            ))}

        </View>

      <Text style={styles.resend}>
        Didn't receive the code?
      </Text>

      <Pressable>
        <Text style={styles.resendButton}>
          Resend Code
        </Text>
      </Pressable>

      <PrimaryButton
        onPress={verifyHandler}
      >
        Verify
      </PrimaryButton>
    </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ebcce823",
  },
  
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  back: {
    alignSelf: "flex-start",
    marginTop: 50,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#54275f",
    marginTop: 10,
  },

  subtitle: {
    marginTop: 10,
    color: "#777",
    textAlign: "center",
  },

  phone: {
    marginTop: 5,
    color: "#8b15b9",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },

  resend: {
    marginTop: 20,
    color: "#666",
  },

  resendButton: {
    marginBottom: 30,
    marginTop: 8,
    color: "#8b15b9",
    fontWeight: "bold",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 40,
  },
  
  otpBox: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "#8b15b9",
    borderRadius: 15,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#8b15b9",
  },
});