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

export default function ProfileScreen({ navigation }) {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
  
    // i'll add a small transition
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  };

  const saveProfileImage = async () => {
    try {
      const savedData = await AsyncStorage.getItem("customerData");
  
      const customerData = savedData
        ? JSON.parse(savedData)
        : {};
  
      customerData.profileImage = imageUri;
  
      await AsyncStorage.setItem(
        "customerData",
        JSON.stringify(customerData)
      );
  
    } catch (error) {
      console.log("Error saving profile image:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCustomerData();
    }, [])
  );

  useEffect(() => {
    loadCustomerData();
  }, []);
  
  const loadCustomerData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("customerData");
  
      if (savedData) {
        const customerData = JSON.parse(savedData);
  
        setUserName(customerData.userName || "");
        setEmail(customerData.email || "");
        setLocation(customerData.location || "");
        setPhoneNumber(customerData.phoneNumber || "");
  
        if (customerData.profileImage) {
          setProfileImage(customerData.profileImage);
        }
      }
    } catch (error) {
      console.log("Error loading customer data:", error);
    }
  };

  // OPEN GALLERY
  const pickProfileImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert("Permission to access your gallery is required.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
    
      setProfileImage(imageUri);
    
      await saveProfileImage(imageUri);
    }
  };

  return (

    <View style={styles.screen}>

      {/* HEADER */}

      <View style={styles.header}>

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


        <Text style={styles.headerTitle}>
          Settings
        </Text>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >


        {/* PROFILE CARD */}

        <View style={styles.profileCard}>

          {/* PROFILE IMAGE */}

          <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.defaultProfileImage}>
              <Ionicons
                name="person-outline"
                size={65}
                color="#b77acb"
              />
            </View>
          )}
        </View>


          {/* CUSTOMER INFORMATION */}

          <View style={styles.profileInfo}>

            <View style={styles.nameRow}>

            <Text style={styles.name}>
            {userName || "Customer"}
            </Text>

              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#8b15b9"
              />

            </View>


            {/* EMAIL */}

            <View style={styles.contactRow}>

              <Ionicons
                name="mail-outline"
                size={18}
                color="#8b15b9"
              />

         <Text style={styles.email}>
         {email || "No email available"}
         </Text>

            </View>


            {/* PHONE */}

            <View style={styles.contactRow}>

              <Ionicons
                name="call-outline"
                size={18}
                color="#8b15b9"
              />

              <Text style={styles.contactText}>
              {phoneNumber || "Contact not available"}
              </Text>

            </View>


            {/* LOCATION */}

            <View style={styles.contactRow}>

              <Ionicons
                name="location-outline"
                size={18}
                color="#8b15b9"
              />

        <Text style={styles.location}>
        {location || "Location not set"}
        </Text>


            </View>


            {/* EDIT */}

            <Pressable
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >

              <Text style={styles.editButtonText}>
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


        {/* MY ACTIVITIES */}

        <Text style={styles.sectionTitle}>
          My Activities
        </Text>


        <View style={styles.menuCard}>

          {/* BOOKINGS */}

          <ProfileMenuItem
            icon="calendar-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="My Bookings"
            subtitle="View your upcoming and past bookings"
            onPress={() =>
              navigation.navigate("Bookings")
            }
          />


          {/* CASHBACK */}

          <ProfileMenuItem
            icon="wallet-outline"
            iconColor="#20a85a"
            backgroundColor="#e4f8e9"
            title="Wallet"
            subtitle="Check your cashback balance and history"
            onPress={() =>
              navigation.navigate("Cashback")
            }
          />


          {/* SAVED PROFESSIONALS */}

          <ProfileMenuItem
            icon="heart-outline"
            iconColor="#e83e67"
            backgroundColor="#ffe6ed"
            title="Saved Professionals"
            subtitle="View professionals you have saved"
            onPress={() =>
              navigation.navigate("SavedProfessionals")
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
              navigation.navigate("SavedAddresses")
            }
          />

        </View>


        {/* ACCOUNT */}

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
            onPress={() => {}}
          />


          {/* PAYMENT METHODS */}

          <ProfileMenuItem
            icon="card-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="Payment Methods"
            subtitle="Manage your cards and payment options"
            onPress={() => {}}
          />


          {/* NOTIFICATIONS */}

          <ProfileMenuItem
            icon="notifications-outline"
            iconColor="#eab308"
            backgroundColor="#fff7d9"
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() => {}}
          />


          {/* PRIVACY */}

          <ProfileMenuItem
            icon="shield-checkmark-outline"
            iconColor="#20a85a"
            backgroundColor="#e4f8e9"
            title="Privacy & Security"
            subtitle="Manage your privacy and security"
            onPress={() => {}}
          />

        </View>


        {/* SUPPORT */}

        <Text style={styles.sectionTitle}>
          Support
        </Text>


        <View style={styles.menuCard}>

          {/* HELP */}

          <ProfileMenuItem
            icon="help-circle-outline"
            iconColor="#438de8"
            backgroundColor="#e7f1ff"
            title="Help & Support"
            subtitle="Get help and find answers"
            onPress={() => {}}
          />


          {/* CONTACT */}

          <ProfileMenuItem
            icon="headset-outline"
            iconColor="#8b15b9"
            backgroundColor="#f1e4ff"
            title="Contact Us"
            subtitle="Reach out to our support team"
            onPress={() => {}}
          />


          {/* RATE */}

          <ProfileMenuItem
            icon="star-outline"
            iconColor="#eab308"
            backgroundColor="#fff7d9"
            title="Rate HomeAidConnect"
            subtitle="Share your experience with us"
            onPress={() => {}}
          />

        </View>


        {/* LOG OUT */}
      <View style={styles.logoutWrapper}>
      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? (
          <>
            <Text style={styles.logoutText}>Logging out...</Text>
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
            <Text style={styles.logoutText}>Logout</Text>
          </>
        )}
      </Pressable>
    </View>


      </ScrollView>

    </View>
  );
}


/* REUSABLE PROFILE MENU ITEM*/

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
            backgroundColor: backgroundColor,
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

      <View style={styles.menuTextContainer}>

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
   STYLES
 */

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#faf8fc",
  },


  /* HEADER */

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
    marginRight: 120
  },


  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },


  /* PROFILE CARD */

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


  /* PROFILE IMAGE */

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


  /* PROFILE INFORMATION */

  profileInfo: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },

  customerName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#19131b",
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


  /* EDIT BUTTON */

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
    gap: 5,
  },

  editButtonText: {
    color: "#8b15b9",
    fontSize: 13,
    fontWeight: "700",
  },


  /* SECTION */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#18131b",
    marginBottom: 10,
    marginTop: 5,
  },


  /* MENU CARD */

  menuCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8e2eb",
    borderRadius: 20,
    paddingVertical: 5,
    marginBottom: 24,
    overflow: "hidden",
  },


  /* MENU ITEM */

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


  /* LOGOUT */

  logoutButton: {
    height: 55,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#ffc5cf",
    backgroundColor: "#fff5f6",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
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
  },

});