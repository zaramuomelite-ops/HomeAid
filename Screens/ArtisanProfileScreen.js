import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ArtisanProfileScreen({ navigation }) {
  //
  // ARTISAN DATA
  //

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [registrationComplete, setRegistrationComplete] =
    useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  //
  // LOAD ARTISAN DATA
  //

  const loadArtisanData = async () => {
    try {
      const savedData =
        await AsyncStorage.getItem("artisanData");

      if (!savedData) {
        return;
      }

      const artisanData = JSON.parse(savedData);

      setUserName(artisanData.userName || "");

      setEmail(artisanData.email || "");

      setPhoneNumber(
        artisanData.phoneNumber || ""
      );

      setLocation(
        artisanData.location ||
          `${artisanData.city || ""}${
            artisanData.city && artisanData.state
              ? ", "
              : ""
          }${artisanData.state || ""}`
      );

      setProfession(
        artisanData.profession || ""
      );

      setRegistrationComplete(
        artisanData.registrationComplete === true
      );

      if (artisanData.profileImage) {
        setProfileImage(
          artisanData.profileImage
        );
      }
    } catch (error) {
      console.log(
        "Error loading artisan data:",
        error
      );
    }
  };


  useFocusEffect(
    useCallback(() => {
      loadCustomerData();
    }, [])
  );

  useEffect(() => {
    loadArtisanData();
  }, []);

  useEffect(() => {
    const unsubscribe =
      navigation.addListener("focus", () => {
        loadArtisanData();
      });

    return unsubscribe;
  }, [navigation]);

  //
  // SAVE PROFILE IMAGE
  //

  const saveProfileImage = async (imageUri) => {
    try {
      const savedData =
        await AsyncStorage.getItem("artisanData");

      const artisanData = savedData
        ? JSON.parse(savedData)
        : {};

      artisanData.profileImage = imageUri;

      await AsyncStorage.setItem(
        "artisanData",
        JSON.stringify(artisanData)
      );

      setProfileImage(imageUri);
    } catch (error) {
      console.log(
        "Error saving profile image:",
        error
      );
    }
  };

  //
  // PICK PROFILE IMAGE
  //

  const pickProfileImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Gallery Permission Required",
          "HomeAid Connect needs access to your gallery so you can choose a profile picture."
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (
        !result.canceled &&
        result.assets?.length > 0
      ) {
        const imageUri =
          result.assets[0].uri;

        setProfileImage(imageUri);

        await saveProfileImage(imageUri);
      }
    } catch (error) {
      console.log(
        "Error selecting profile image:",
        error
      );
    }
  };

  //
  // LOGOUT
  //

  const handleLogout = async () => {
    setLoggingOut(true);

    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  };

  //
  // EDIT PROFILE
  //

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      userType: "artisan",
    });
  };

  //
  // BOOKINGS
  //

  const handleBookings = () => {
    navigation.navigate("Bookings", {
      userType: "artisan",
    });
  };

  //
  // COMING SOON
  //

  const showComingSoon = (title) => {
    Alert.alert(
      title,
      "This feature will be available soon."
    );
  };

  //
  // SCREEN
  //

  return (
    <View style={styles.screen}>

      {/*
          HEADER
     */}

      <View style={styles.header}>

        {/* BACK BUTTON */}

        <Pressable
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="#8b15b9"
          />
        </Pressable>


        {/* TITLE */}

        <Text style={styles.headerTitle}>
          Settings
        </Text>


        {/* SETTINGS BUTTON */}

        <Pressable
          style={styles.settingsButton}
          onPress={() =>
            showComingSoon("Settings")
          }
        >
          <Ionicons
            name="settings"
            size={28}
            color="#fff"
          />
        </Pressable>

      </View>


      {/*
          CONTENT
     */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ===
            PROFILE CARD
        === */}

        <View style={styles.profileCard}>

          {/* PROFILE IMAGE */}

          <Pressable
            style={styles.profileImageContainer}
            onPress={pickProfileImage}
          >

            {profileImage ? (

              <Image
                source={{
                  uri: profileImage,
                }}
                style={styles.profileImage}
              />

            ) : (

              <View
                style={
                  styles.defaultProfileImage
                }
              >
                <Ionicons
                  name="person"
                  size={65}
                  color="#b77acb"
                />
              </View>

            )}

          </Pressable>


          {/* PROFILE INFORMATION */}

          <View style={styles.profileInfo}>

            {/* NAME */}

            <View style={styles.nameRow}>

              <Text
                style={styles.name}
                numberOfLines={1}
              >
                {userName || "Artisan"}
              </Text>

              {registrationComplete && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#8b15b9"
                />
              )}

            </View>


            {/* PROFESSION */}

            <View style={styles.contactRow}>

              <Ionicons
                name="briefcase-outline"
                size={18}
                color="#8b15b9"
              />

              <Text
                style={styles.contactText}
                numberOfLines={1}
              >
                {profession ||
                  "Profession not available"}
              </Text>

            </View>


            {/* EMAIL */}

            <View style={styles.contactRow}>

              <Ionicons
                name="mail-outline"
                size={18}
                color="#8b15b9"
              />

              <Text
                style={styles.contactText}
                numberOfLines={1}
              >
                {email ||
                  "No email available"}
              </Text>

            </View>


            {/* PHONE */}

            <View style={styles.contactRow}>

              <Ionicons
                name="call-outline"
                size={18}
                color="#8b15b9"
              />

              <Text
                style={styles.contactText}
                numberOfLines={1}
              >
                {phoneNumber ||
                  "Contact not available"}
              </Text>

            </View>


            {/* LOCATION */}

            <View style={styles.contactRow}>

              <Ionicons
                name="location-outline"
                size={18}
                color="#8b15b9"
              />

              <Text
                style={styles.contactText}
                numberOfLines={1}
              >
                {location ||
                  "Location not set"}
              </Text>

            </View>


            {/* EDIT PROFILE */}

            <Pressable
              style={styles.editButton}
              onPress={handleEditProfile}
            >

              <Text
                style={styles.editButtonText}
              >
                Edit Profile
              </Text>

              <Ionicons
                name="create-outline"
                size={17}
                color="#8b15b9"
              />

            </Pressable>

          </View>

        </View>


        {/* ===
            MY ACTIVITIES
        === */}

        <Text style={styles.sectionTitle}>
          My Activities
        </Text>


        <View style={styles.menuCard}>

          {/* MY BOOKINGS */}

          <ProfileMenuItem
            icon="calendar-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="My Requests"
            subtitle="View your upcoming and past bookings"
            onPress={handleBookings}
          />


          {/* WALLET */}

          <ProfileMenuItem
            icon="wallet-outline"
            iconColor="#20a85a"
            backgroundColor="#e4f8e9"
            title="Wallet"
            subtitle="Check your earnings and payment history"
            onPress={() =>
              showComingSoon("Wallet")
            }
          />


          {/* SAVED PROFESSIONALS */}

          <ProfileMenuItem
            icon="heart-outline"
            iconColor="#e83e67"
            backgroundColor="#ffe6ed"
            title="Saved Customers"
            subtitle="View professionals you have saved"
            onPress={() =>
              showComingSoon(
                "Saved Professionals"
              )
            }
          />


          {/* SAVED ADDRESSES */}

          <ProfileMenuItem
            icon="location-outline"
            iconColor="#ef8a21"
            backgroundColor="#fff0dd"
            title="Saved Addresses"
            subtitle="Manage your saved service addresses"
            onPress={() =>
              showComingSoon(
                "Saved Addresses"
              )
            }
          />

        </View>


        {/* ===
            ACCOUNT
        === */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>


        <View style={styles.menuCard}>

          {/* PERSONAL INFORMATION */}

          <ProfileMenuItem
            icon="person-outline"
            iconColor="#467be8"
            backgroundColor="#e7efff"
            title="Personal Information"
            subtitle="Manage your personal details"
            onPress={handleEditProfile}
          />


          {/* PAYMENT METHODS */}

          <ProfileMenuItem
            icon="card-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="Payment Methods"
            subtitle="Manage your cards and payment options"
            onPress={() =>
              showComingSoon(
                "Payment Methods"
              )
            }
          />


          {/* NOTIFICATIONS */}

          <ProfileMenuItem
            icon="notifications-outline"
            iconColor="#eab308"
            backgroundColor="#fff7d9"
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() =>
              showComingSoon(
                "Notifications"
              )
            }
          />


          {/* PRIVACY & SECURITY */}

          <ProfileMenuItem
            icon="shield-checkmark-outline"
            iconColor="#20a85a"
            backgroundColor="#e4f8e9"
            title="Privacy & Security"
            subtitle="Manage your privacy and security"
            onPress={() =>
              showComingSoon(
                "Privacy & Security"
              )
            }
          />

        </View>


        {/* ===
            SUPPORT
        === */}

        <Text style={styles.sectionTitle}>
          Support
        </Text>


        <View style={styles.menuCard}>

          {/* HELP & SUPPORT */}

          <ProfileMenuItem
            icon="help-circle-outline"
            iconColor="#438de8"
            backgroundColor="#e7f1ff"
            title="Help & Support"
            subtitle="Get help and find answers"
            onPress={() =>
              showComingSoon(
                "Help & Support"
              )
            }
          />


          {/* CONTACT US */}

          <ProfileMenuItem
            icon="headset-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="Contact Us"
            subtitle="Reach out to our support team"
            onPress={() =>
              showComingSoon("Contact Us")
            }
          />


          {/* RATE */}

          <ProfileMenuItem
            icon="star-outline"
            iconColor="#eab308"
            backgroundColor="#fff7d9"
            title="Rate HomeAidConnect"
            subtitle="Share your experience with us"
            onPress={() =>
              showComingSoon(
                "Rate HomeAidConnect"
              )
            }
          />

        </View>


        {/* ===
            LOGOUT
        === */}

        <View style={styles.logoutWrapper}>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={loggingOut}
          >

            {loggingOut ? (

              <>
                <Text
                  style={styles.logoutText}
                >
                  Logging out...
                </Text>

                <ActivityIndicator
                  size="small"
                  color="#e05b70"
                />
              </>

            ) : (

              <>
                <Ionicons
                  name="log-out-outline"
                  size={21}
                  color="#e05b70"
                />

                <Text
                  style={styles.logoutText}
                >
                  Logout
                </Text>
              </>

            )}

          </Pressable>

        </View>

      </ScrollView>

    </View>
  );
}


/*
   REUSABLE PROFILE MENU ITEM */

function ProfileMenuItem({
  icon,
  iconColor,
  backgroundColor,
  title,
  subtitle,
  onPress,
}) {
  return (
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
      android_ripple={{
        color: "#eee",
      }}
    >

      {/* ICON */}

      <View
        style={[
          styles.menuIcon,
          {
            backgroundColor:
              backgroundColor,
          },
        ]}
      >

        <Ionicons
          name={icon}
          size={24}
          color={iconColor}
        />

      </View>


      {/* TEXT */}

      <View
        style={styles.menuTextContainer}
      >

        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>

      </View>


      {/* ARROW */}

      <Ionicons
        name="chevron-forward"
        size={21}
        color="#777"
      />

    </Pressable>
  );
}


/*
   STYLES */

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#faf8fc",
  },


  /*
     HEADER
 */

  header: {
    height: 100,
    paddingTop: 35,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#18131b",
  },

  settingsButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#bdbdbd",
    borderWidth: 7,
    borderColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
  },


  /*
     CONTENT
 */

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },


  /*
     PROFILE CARD
 */

  profileCard: {
    backgroundColor: "#f8effb",
    borderWidth: 1,
    borderColor: "#eadcf0",
    borderRadius: 23,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },


  /*
     PROFILE IMAGE
 */

  profileImageContainer: {
    width: 105,
    height: 105,
    position: "relative",
    marginRight: 16,
  },

  profileImage: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 4,
    borderColor: "#fff",
  },

  defaultProfileImage: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#ead7f0",
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },


  /*
     PROFILE INFORMATION
 */

  profileInfo: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#19131b",
    marginRight: 5,
    flexShrink: 1,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  contactText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 7,
    flex: 1,
  },


  /*
     EDIT BUTTON
 */

  editButton: {
    height: 38,
    paddingHorizontal: 13,
    borderWidth: 1.5,
    borderColor: "#b77acb",
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  editButtonText: {
    color: "#8b15b9",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 5,
  },


  /*
     SECTION
 */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#18131b",
    marginBottom: 10,
    marginTop: 5,
  },


  /*
     MENU CARD
 */

  menuCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8e2eb",
    borderRadius: 20,
    paddingVertical: 5,
    marginBottom: 24,
    overflow: "hidden",
  },


  /*
     MENU ITEM
 */

  menuItem: {
    minHeight: 78,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  menuTextContainer: {
    flex: 1,
    paddingRight: 8,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#211a22",
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    lineHeight: 17,
  },


  /*
     LOGOUT
 */

  logoutButton: {
    height: 55,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#ffc5cf",
    backgroundColor: "#fff5f6",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  logoutWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 2,
    marginBottom: 15,
  },

  logoutText: {
    color: "#e63859",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },

});