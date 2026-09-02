import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

export default function SOSScreen({ navigation }) {
  const [countdown, setCountdown] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // --------------------------------
  // START SOS
  // --------------------------------

  const startSOS = () => {
    if (isHolding || countdown !== null) return;

    setIsHolding(true);

    let seconds = 3;

    setCountdown(seconds);

    countdownRef.current = setInterval(() => {
      seconds -= 1;

      if (seconds <= 0) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;

        setCountdown(0);
        setIsHolding(false);

        callEmergency();
      } else {
        setCountdown(seconds);
      }
    }, 1000);
  };

  // --------------------------------
  // CANCEL SOS
  // --------------------------------

  const cancelSOS = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setCountdown(null);
    setIsHolding(false);
  };

  // --------------------------------
  // CALL EMERGENCY
  // --------------------------------

  const callEmergency = async () => {
    try {
      const phoneNumber = "tel:112";

      const supported = await Linking.canOpenURL(phoneNumber);

      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert(
          "Unable to make call",
          "Your device could not open the phone app. Please dial 112 manually."
        );
      }
    } catch (error) {
      console.log("Emergency call error:", error);

      Alert.alert(
        "Emergency Call",
        "Please dial 112 manually for emergency assistance."
      );
    }
  };

  // --------------------------------
  // CLEAN UP TIMERS
  // --------------------------------

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // --------------------------------
  // SUPPORT
  // --------------------------------

  const contactSupport = () => {
    Alert.alert(
      "HomeAidConnect Support",
      "For urgent emergencies, please contact 112. HomeAidConnect Support is available for app-related assistance."
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#8b15b9"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Emergency SOS
        </Text>

        <View style={styles.headerSpacer} />

      </View>


      {/* MAIN CONTENT */}

      <View style={styles.content}>

        {/* SHIELD */}

        <View style={styles.shieldContainer}>

          <View style={styles.shieldCircle}>

            <Ionicons
              name="shield-checkmark"
              size={38}
              color="#8b15b9"
            />

          </View>

        </View>


        {/* TITLE */}

        <Text style={styles.title}>
          Are you in danger?
        </Text>

        <Text style={styles.subtitle}>
          We're here to help you get emergency
          assistance quickly.
        </Text>


        {/* SOS BUTTON */}

        <Pressable
          style={[
            styles.sosButton,
            isHolding && styles.sosButtonActive,
          ]}
          onPressIn={startSOS}
          onPressOut={() => {
            if (countdown !== null && countdown > 0) {
              cancelSOS();
            }
          }}
        >

          {countdown !== null && countdown > 0 ? (

            <>

              <Text style={styles.countdown}>
                {countdown}
              </Text>

              <Text style={styles.countdownText}>
                RELEASE TO CANCEL
              </Text>

            </>

          ) : (

            <>

              <Ionicons
                name="warning"
                size={43}
                color="#fff"
              />

              <Text style={styles.sosText}>
                SOS
              </Text>

            </>

          )}

        </Pressable>


        {/* INSTRUCTION */}

        <Text style={styles.instruction}>
          {countdown !== null && countdown > 0
            ? "Emergency call starting..."
            : "Press and hold for 3 seconds"}
        </Text>


        {/* LOCATION CARD */}

        <View style={styles.infoCard}>

          <View style={styles.infoIcon}>

            <Ionicons
              name="location"
              size={23}
              color="#8b15b9"
            />

          </View>

          <View style={styles.infoTextContainer}>

            <Text style={styles.infoTitle}>
              Location sharing
            </Text>

            <Text style={styles.infoSubtitle}>
              Your location can be shared with
              emergency responders.
            </Text>

          </View>

          <View style={styles.statusDot} />

        </View>


        {/* SUPPORT */}

        <Pressable
          style={styles.supportButton}
          onPress={contactSupport}
        >

          <Ionicons
            name="call-outline"
            size={24}
            color="#8b15b9"
          />

          <Text style={styles.supportText}>
            HomeAidConnect Support
          </Text>

        </Pressable>


        {/* CANCEL / GO BACK */}

        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.cancelText}>
            I don't need help
          </Text>

        </Pressable>

      </View>

    </View>
  );
}


// STYLES

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f9f7fc",
  },


  // HEADER

  header: {
    height: 105,
    paddingTop: 38,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#54275f",
  },

  headerSpacer: {
    width: 45,
  },


  // CONTENT

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 30,
  },


  // SHIELD

  shieldContainer: {
    marginBottom: 18,
  },

  shieldCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#f1e3f7",
    justifyContent: "center",
    alignItems: "center",
  },


  // TITLE

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#241b27",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },


  // SOS

  sosButton: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#d62828",
    justifyContent: "center",
    alignItems: "center",

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  sosButtonActive: {
    transform: [{ scale: 0.94 }],
  },

  sosText: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 2,
  },

  countdown: {
    color: "#fff",
    fontSize: 65,
    fontWeight: "900",
  },

  countdownText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    marginTop: -5,
  },


  instruction: {
    marginTop: 18,
    fontSize: 14,
    color: "#777",
    fontWeight: "600",
  },


  // LOCATION

  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f4eafa",
    justifyContent: "center",
    alignItems: "center",
  },

  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2a222d",
    marginBottom: 3,
  },

  infoSubtitle: {
    fontSize: 12,
    color: "#777",
    lineHeight: 17,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#18c768",
    marginLeft: 8,
  },


  // SUPPORT

  supportButton: {
    width: "100%",
    height: 55,
    marginTop: 14,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#8b15b9",
    backgroundColor: "#fff",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  supportText: {
    marginLeft: 9,
    fontSize: 15,
    fontWeight: "700",
    color: "#8b15b9",
  },


  // CANCEL

  cancelButton: {
    marginTop: 18,
    padding: 10,
  },

  cancelText: {
    fontSize: 14,
    color: "#777",
    textDecorationLine: "underline",
  },

});