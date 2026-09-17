import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

import { verifyOTP, resendOTP } from "../api/auth";

import PrimaryButton from "../components/PrimaryButton";


export default function OTPVerificationScreen({
  navigation,
  route,
}) {
  // OTP

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);

  // ROUTE PARAMS

  const { userType, email, phoneNumber } =
    route.params || {};

  // RESEND TIMER

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // FORMAT TIMER

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // OTP INPUT

  function handleOtpChange(text, index) {
    const cleanText = text.replace(/[^0-9]/g, "");

    const newOtp = [...otp];

    newOtp[index] = cleanText;

    setOtp(newOtp);

    if (
      cleanText &&
      index < 5
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // VERIFY

  async function verifyHandler() {
    const otpCode = otp.join("");
  
    if (otpCode.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }
  
    try {
      console.log("VERIFYING OTP:", {
        email,
        otp: otpCode,
      });
  
      const response = await verifyOTP({
        email: email,
        otp: otpCode,
      });
  
      console.log("OTP VERIFIED:", response);
  
      if (userType === "customer") {
        navigation.replace("CustomerHome");
      } else if (userType === "artisan") {
        navigation.replace("ArtisanHome", {
          status: "received",
        });
      }
    } catch (error) {
      console.log("OTP VERIFICATION FAILED:", error);
  
      alert(
        error.message || "Invalid OTP. Please try again."
      );
    }
  }

  // RESEND CODE

  async function handleResendCode() {
    if (timeLeft > 0) {
      return;
    }
  
    try {
      console.log("RESENDING OTP TO:", email);
  
      const response = await resendOTP(email);
  
      console.log("OTP RESENT:", response);
  
      alert(
        response?.message || "A new OTP has been sent to your email."
      );
  
      // Restart timer
      setTimeLeft(60);
  
      // Clear previous OTP
      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
  
      // Focus first box
      inputRefs.current[0]?.focus();
  
    } catch (error) {
      console.log("OTP RESEND FAILED:", error);
  
      alert(
        error.message || "Could not resend OTP. Please try again."
      );
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : 20
      }
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>

          {/* BACK BUTTON */}

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

          {/* LOGO */}

          <Image
            style={styles.logo}
            source={require("../assets/Images/logo.png")}
          />

          {/* TITLE */}

          <Text style={styles.title}>
            Verify to proceed
          </Text>

          {/* SUBTITLE */}

          <Text style={styles.subtitle}>
            Enter your 6-digit verification code
          </Text>

          <Text style={styles.sentText}>
            We've sent a verification code to
          </Text>

          {/* EMAIL / PHONE */}

          <Text style={styles.phone}>
            {email || phoneNumber}
          </Text>

          {/* OTP BOXES */}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) =>
                  (inputRefs.current[index] = ref)
                }
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) =>
                  handleOtpChange(text, index)
                }
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    !digit &&
                    index > 0
                  ) {
                    inputRefs.current[
                      index - 1
                    ]?.focus();
                  }
                }}
              />
            ))}
          </View>

          {/* RESEND */}

          <Text style={styles.resend}>
            Didn't receive the code?
          </Text>

          <Pressable
            onPress={handleResendCode}
            disabled={timeLeft > 0}
          >
            <Text
              style={[
                styles.resendButton,
                timeLeft > 0
                  ? styles.resendDisabled
                  : styles.resendEnabled,
              ]}
            >
              Resend Code
            </Text>
          </Pressable>

          {/* TIMER */}

          {timeLeft > 0 && (
            <Text style={styles.timer}>
              Resend code in {formatTime()}
            </Text>
          )}

          {/* VERIFY BUTTON */}

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

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ebcce823",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  innerContainer: {
    width: "100%",
    alignItems: "center",
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
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    color: "#555",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },

  sentText: {
    marginTop: 8,
    color: "#777",
    textAlign: "center",
  },

  phone: {
    marginTop: 5,
    color: "#8b15b9",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 35,
  },

  otpBox: {
    width: 48,
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

  resend: {
    marginTop: 5,
    color: "#666",
  },

  resendButton: {
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
  },

  resendDisabled: {
    color: "#aaa",
  },

  resendEnabled: {
    color: "#8b15b9",
  },

  timer: {
    color: "#777",
    fontSize: 13,
    marginBottom: 20,
  },
});