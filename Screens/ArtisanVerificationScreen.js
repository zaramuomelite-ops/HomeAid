import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  import { useState } from "react";
  
  export default function ArtisanVerificationScreen({
    navigation,
    route,
  }) {
    const [status, setStatus] = useState(
      route?.params?.status || "received"
    );
  
    const renderContent = () => {
      // APPLICATION RECEIVED
      if (status === "received") {
        return (
          <>
            <View style={styles.iconCircle}>
              <Ionicons
                name="checkmark"
                size={45}
                color="#6C4AB6"
              />
            </View>
  
            <Text style={styles.title}>
              Application Received
            </Text>
  
            <Text style={styles.description}>
              Your artisan application has been successfully
              received and is currently being reviewed by our
              team.
            </Text>
  
            <View style={styles.infoCard}>
              <Ionicons
                name="time-outline"
                size={25}
                color="#6C4AB6"
              />
  
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>
                  Review Process
                </Text>
  
                <Text style={styles.infoText}>
                  Your application will be reviewed within
                  48 hours.
                </Text>
              </View>
            </View>
  
            <View style={styles.infoCard}>
              <Ionicons
                name="mail-outline"
                size={25}
                color="#6C4AB6"
              />
  
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>
                  Stay Updated
                </Text>
  
                <Text style={styles.infoText}>
                  We'll send you an email once your application
                  has been reviewed.
                </Text>
              </View>
            </View>
  
            <Text style={styles.bottomText}>
              You can safely close the app while your
              application is being reviewed.
            </Text>
  
            <Pressable
              style={styles.button}
              onPress={() => setStatus("pending")}
            >
              <Text style={styles.buttonText}>
                Continue
              </Text>
            </Pressable>
          </>
        );
      }
  
      // APPLICATION PENDING
      if (status === "pending") {
        return (
          <>
            <View style={styles.iconCircle}>
              <Ionicons
                name="hourglass-outline"
                size={43}
                color="#6C4AB6"
              />
            </View>
  
            <Text style={styles.title}>
              Application Under Review
            </Text>
  
            <Text style={styles.description}>
              We're currently reviewing your artisan
              application.
            </Text>
  
            <View style={styles.statusCard}>
              <View style={styles.statusRow}>
                <View style={styles.statusIcon}>
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color="#6C4AB6"
                  />
                </View>
  
                <View>
                  <Text style={styles.statusTitle}>
                    Application Received
                  </Text>
  
                  <Text style={styles.statusSubtext}>
                    Successfully submitted
                  </Text>
                </View>
              </View>
  
              <View style={styles.verticalLine} />
  
              <View style={styles.statusRow}>
                <View style={styles.statusIcon}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="#6C4AB6"
                  />
                </View>
  
                <View>
                  <Text style={styles.statusTitle}>
                    Under Review
                  </Text>
  
                  <Text style={styles.statusSubtext}>
                    Our team is reviewing your application
                  </Text>
                </View>
              </View>
  
              <View style={styles.verticalLine} />
  
              <View style={styles.statusRow}>
                <View style={styles.pendingCircle}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={17}
                    color="#999"
                  />
                </View>
  
                <View>
                  <Text style={styles.statusTitle}>
                    Approval
                  </Text>
  
                  <Text style={styles.statusSubtext}>
                    Waiting for review to be completed
                  </Text>
                </View>
              </View>
            </View>
  
            <View style={styles.emailNotice}>
              <Ionicons
                name="mail-outline"
                size={22}
                color="#6C4AB6"
              />
  
              <Text style={styles.emailText}>
                You'll receive an email when your application
                has been reviewed.
              </Text>
            </View>
          </>
        );
      }
  
      // APPLICATION APPROVED
      if (status === "approved") {
        return (
          <>
            <View style={styles.iconCircle}>
              <Ionicons
                name="checkmark-circle"
                size={48}
                color="#6C4AB6"
              />
            </View>
  
            <Text style={styles.title}>
              You're Approved! 🎉
            </Text>
  
            <Text style={styles.description}>
              Congratulations! Your artisan application has
              been approved.
            </Text>
  
            <View style={styles.successCard}>
              <Ionicons
                name="sparkles-outline"
                size={28}
                color="#6C4AB6"
              />
  
              <Text style={styles.successText}>
                You're now ready to start receiving jobs from
                customers on HomeAidConnect.
              </Text>
            </View>
  
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.replace("ArtisanHome")
              }
            >
              <Text style={styles.buttonText}>
                Continue to Home
              </Text>
  
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#fff"
              />
            </Pressable>
          </>
        );
      }
  
      // APPLICATION REJECTED
      if (status === "rejected") {
        return (
          <>
            <View style={styles.rejectedIconCircle}>
              <Ionicons
                name="close"
                size={43}
                color="#B54A4A"
              />
            </View>
  
            <Text style={styles.title}>
              Application Not Approved
            </Text>
  
            <Text style={styles.description}>
              Unfortunately, your artisan application could
              not be approved at this time.
            </Text>
  
            <View style={styles.rejectedCard}>
              <Text style={styles.rejectedTitle}>
                Reason
              </Text>
  
              <Text style={styles.rejectedText}>
                Some information provided in your application
                needs to be reviewed or updated.
              </Text>
            </View>
  
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.replace("ArtisanRegister")
              }
            >
              <Text style={styles.buttonText}>
                Resubmit Application
              </Text>
            </Pressable>
          </>
        );
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* TOP ICON */}
          <View style={styles.topIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color="#6C4AB6"
            />
          </View>
  
          {/* MAIN CONTENT */}
          <View style={styles.mainContent}>
            {renderContent()}
          </View>
  
          {/* TEMPORARY TEST BUTTONS */}
          {/* REMOVE THESE LATER */}
  
          <View style={styles.testButtons}>
            <Text style={styles.testTitle}>
              TEST STATUS
            </Text>
  
            <View style={styles.testRow}>
              <Pressable
                style={styles.testButton}
                onPress={() => setStatus("received")}
              >
                <Text style={styles.testButtonText}>
                  Received
                </Text>
              </Pressable>
  
              <Pressable
                style={styles.testButton}
                onPress={() => setStatus("pending")}
              >
                <Text style={styles.testButtonText}>
                  Pending
                </Text>
              </Pressable>
  
              <Pressable
                style={styles.testButton}
                onPress={() => setStatus("approved")}
              >
                <Text style={styles.testButtonText}>
                  Approved
                </Text>
              </Pressable>
  
              <Pressable
                style={styles.testButton}
                onPress={() => setStatus("rejected")}
              >
                <Text style={styles.testButtonText}>
                  Rejected
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAF8FC",
    },
  
    content: {
      flex: 1,
      paddingHorizontal: 22,
      paddingTop: 20,
    },
  
    topIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: "#F0EAF9",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 20,
    },
  
    mainContent: {
      flex: 1,
    },
  
    iconCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#F0EAF9",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 22,
    },
  
    rejectedIconCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#FBECEC",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 22,
    },
  
    title: {
      fontSize: 27,
      fontWeight: "700",
      color: "#222",
      textAlign: "center",
      marginBottom: 12,
    },
  
    description: {
      fontSize: 15,
      lineHeight: 23,
      color: "#777",
      textAlign: "center",
      marginBottom: 25,
    },
  
    infoCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 17,
      padding: 17,
      marginBottom: 13,
    },
  
    infoTextContainer: {
      flex: 1,
      marginLeft: 13,
    },
  
    infoTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#222",
      marginBottom: 4,
    },
  
    infoText: {
      fontSize: 13,
      lineHeight: 19,
      color: "#777",
    },
  
    bottomText: {
      fontSize: 13,
      color: "#888",
      textAlign: "center",
      lineHeight: 19,
      marginTop: 10,
      marginBottom: 20,
    },
  
    button: {
      height: 55,
      borderRadius: 15,
      backgroundColor: "#6C4AB6",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      marginTop: 15,
    },
  
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  
    statusCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      padding: 20,
      marginBottom: 18,
    },
  
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    statusIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#F0EAF9",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 13,
    },
  
    pendingCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#F2F2F2",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 13,
    },
  
    verticalLine: {
      height: 25,
      width: 1,
      backgroundColor: "#DDD",
      marginLeft: 20,
      marginVertical: 4,
    },
  
    statusTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#222",
    },
  
    statusSubtext: {
      fontSize: 12,
      color: "#888",
      marginTop: 3,
    },
  
    emailNotice: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F0EAF9",
      borderRadius: 15,
      padding: 15,
    },
  
    emailText: {
      flex: 1,
      fontSize: 13,
      color: "#555",
      lineHeight: 19,
      marginLeft: 10,
    },
  
    successCard: {
      backgroundColor: "#F0EAF9",
      borderRadius: 18,
      padding: 20,
      alignItems: "center",
      marginBottom: 20,
    },
  
    successText: {
      fontSize: 14,
      lineHeight: 21,
      color: "#555",
      textAlign: "center",
      marginTop: 10,
    },
  
    rejectedCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 17,
      padding: 18,
      marginBottom: 15,
    },
  
    rejectedTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#222",
      marginBottom: 7,
    },
  
    rejectedText: {
      fontSize: 13,
      color: "#777",
      lineHeight: 20,
    },
  
    testButtons: {
      paddingBottom: 15,
    },
  
    testTitle: {
      fontSize: 10,
      color: "#AAA",
      textAlign: "center",
      marginBottom: 7,
    },
  
    testRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 5,
    },
  
    testButton: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: "#E9E2F4",
    },
  
    testButtonText: {
      fontSize: 9,
      color: "#6C4AB6",
    },
  });