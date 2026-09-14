import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen({
  navigation,
  route,
}) {
  // ====
  // DETERMINE USER TYPE
  // ====

  const userType =
    route?.params?.userType || "customer";

  const isArtisan = userType === "artisan";

  // ====
  // USER INFORMATION
  // ====

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // ARTISAN ONLY
  const [profession, setProfession] = useState("");

  const [profileImage, setProfileImage] =
    useState(null);

  // ====
  // EDITING
  // ====

  const [editingField, setEditingField] =
    useState(null);

  const [editValue, setEditValue] =
    useState("");

  // ====
  // STORAGE KEY
  // ====

  const storageKey = isArtisan
    ? "artisanData"
    : "customerData";

  // ====
  // LOAD USER DATA
  // ====

  useEffect(() => {
    loadUserData();
  }, [userType]);

  const loadUserData = async () => {
    try {
      const savedData =
        await AsyncStorage.getItem(storageKey);

      if (!savedData) {
        return;
      }

      const data = JSON.parse(savedData);

      setUserName(data.userName || "");

      setEmail(data.email || "");

      setLocation(
        data.location ||
          `${data.city || ""}${
            data.city && data.state
              ? ", "
              : ""
          }${data.state || ""}`
      );

      setPhoneNumber(
        data.phoneNumber || ""
      );

      setGender(
        data.gender || ""
      );

      setBirthDate(
        data.birthDate ||
          data.dateOfBirth ||
          data.date_of_birth ||
          ""
      );

      setProfileImage(
        data.profileImage || null
      );

      // ARTISAN ONLY
      if (isArtisan) {
        setProfession(
          data.profession || ""
        );
      }
    } catch (error) {
      console.log(
        "Error loading user data:",
        error
      );
    }
  };

  // ====
  // SAVE PROFILE IMAGE
  // ====

  const saveProfileImage = async (imageUri) => {
    try {
      const savedData =
        await AsyncStorage.getItem(storageKey);

      const data = savedData
        ? JSON.parse(savedData)
        : {};

      data.profileImage = imageUri;

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(data)
      );

      setProfileImage(imageUri);
    } catch (error) {
      console.log(
        "Error saving profile image:",
        error
      );
    }
  };

  // ====
  // OPEN GALLERY
  // ====

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

  // ====
  // START EDITING
  // ====

  const startEditing = (
    field,
    value
  ) => {
    setEditingField(field);
    setEditValue(value || "");
  };

  // ====
  // FIELD DISPLAY NAME
  // ====

  const getFieldTitle = (field) => {
    switch (field) {
      case "userName":
        return "Username";

      case "phoneNumber":
        return "Phone Number";

      case "email":
        return "Email";

      case "location":
        return "Location";

      case "profession":
        return "Profession";

      case "gender":
        return "Gender";

      case "birthDate":
        return "Date of Birth";

      default:
        return "";
    }
  };

  // ====
  // SAVE EDITED INFORMATION
  // ====

  const saveEdit = async () => {
    if (!editValue.trim()) {
      return;
    }

    try {
      const savedData =
        await AsyncStorage.getItem(storageKey);

      const data = savedData
        ? JSON.parse(savedData)
        : {};

      // Save the edited field
      data[editingField] =
        editValue.trim();

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(data)
      );

      // 
      // UPDATE SCREEN IMMEDIATELY
      // 

      if (editingField === "userName") {
        setUserName(
          editValue.trim()
        );
      }

      if (
        editingField === "phoneNumber"
      ) {
        setPhoneNumber(
          editValue.trim()
        );
      }

      if (editingField === "email") {
        setEmail(
          editValue.trim()
        );
      }

      if (
        editingField === "location"
      ) {
        setLocation(
          editValue.trim()
        );
      }

      if (
        editingField === "gender"
      ) {
        setGender(
          editValue.trim()
        );
      }

      if (
        editingField === "birthDate"
      ) {
        setBirthDate(
          editValue.trim()
        );
      }

      // ARTISAN PROFESSION
      if (
        editingField === "profession"
      ) {
        setProfession(
          editValue.trim()
        );
      }

      setEditingField(null);
      setEditValue("");
    } catch (error) {
      console.log(
        "Error saving user information:",
        error
      );
    }
  };

  // ====
  // SCREEN
  // ====

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.screen}>

        {/* ==
            HEADER
        == */}

        <View style={styles.header}>

          <Pressable
            style={styles.headerButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={27}
              color="#8b15b9"
            />
          </Pressable>

          <Text
            style={styles.headerTitle}
          >
            My Profile
          </Text>

          <View
            style={styles.headerSpacer}
          />

        </View>


        {/* ==
            SCROLL VIEW
        == */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled"
        >

          {/* 
              PROFILE CARD
           */}

          <View
            style={styles.profileCard}
          >

            {/* PROFILE IMAGE */}

            <View
              style={
                styles.profileImageContainer
              }
            >

              {profileImage ? (

                <Image
                  source={{
                    uri: profileImage,
                  }}
                  style={
                    styles.profileImage
                  }
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


              {/* CAMERA BUTTON */}

              <Pressable
                style={
                  styles.cameraButton
                }
                onPress={
                  pickProfileImage
                }
              >
                <Ionicons
                  name="camera"
                  size={19}
                  color="#fff"
                />
              </Pressable>

            </View>

          </View>


          {/* 
              PERSONAL INFORMATION
           */}

          <View
            style={
              styles.informationCard
            }
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Personal Information
            </Text>


            {/* 
                USERNAME
             */}

            <Pressable
              style={styles.infoRow}
              onPress={() =>
                startEditing(
                  "userName",
                  userName
                )
              }
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Username
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                  numberOfLines={1}
                >
                  {userName ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                />

              </View>

            </Pressable>


            {/* 
                PROFESSION — ARTISAN ONLY
             */}

            {isArtisan && (

              <Pressable
                style={
                  styles.infoRow
                }
                onPress={() =>
                  startEditing(
                    "profession",
                    profession
                  )
                }
              >

                <Text
                  style={
                    styles.infoLabel
                  }
                >
                  Profession
                </Text>

                <View
                  style={
                    styles.valueContainer
                  }
                >

                  <Text
                    style={
                      styles.infoValue
                    }
                    numberOfLines={1}
                  >
                    {profession ||
                      "Not set"}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#999"
                  />

                </View>

              </Pressable>

            )}


            {/* 
                PHONE NUMBER
             */}

            <Pressable
              style={styles.infoRow}
              onPress={() =>
                startEditing(
                  "phoneNumber",
                  phoneNumber
                )
              }
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Phone Number
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                  numberOfLines={1}
                >
                  {phoneNumber ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                />

              </View>

            </Pressable>


            {/* 
              EMAIL
             */}

            <Pressable
              style={styles.infoRow}
              onPress={() =>
                startEditing(
                  "email",
                  email
                )
              }
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Email
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                  numberOfLines={1}
                >
                  {email ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                />

              </View>

            </Pressable>


            {/* 
                GENDER — LOCKED
             */}

            <View
              style={styles.infoRow}
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Gender
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                >
                  {gender ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#999"
                />

              </View>

            </View>


            {/* 
                DATE OF BIRTH — LOCKED
             */}

            <View
              style={styles.infoRow}
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Date of Birth
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                >
                  {birthDate ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#999"
                />

              </View>

            </View>


            {/* 
                LOCATION
             */}

            <Pressable
              style={[
                styles.infoRow,
                styles.lastRow,
              ]}
              onPress={() =>
                startEditing(
                  "location",
                  location
                )
              }
            >

              <Text
                style={
                  styles.infoLabel
                }
              >
                Location
              </Text>

              <View
                style={
                  styles.valueContainer
                }
              >

                <Text
                  style={
                    styles.infoValue
                  }
                  numberOfLines={1}
                >
                  {location ||
                    "Not set"}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                />

              </View>

            </Pressable>

          </View>


          {/* 
              EDIT BOX
           */}

          {editingField && (

            <View
              style={styles.editBox}
            >

              <Text
                style={
                  styles.editTitle
                }
              >
                Edit{" "}
                {getFieldTitle(
                  editingField
                )}
              </Text>


              <TextInput
                value={editValue}
                onChangeText={
                  setEditValue
                }
                autoFocus
                style={
                  styles.editInput
                }
                placeholder={
                  `Enter new ${getFieldTitle(
                    editingField
                  ).toLowerCase()}`
                }
                placeholderTextColor="#999"
              />


              <View
                style={
                  styles.editButtons
                }
              >

                {/* CANCEL */}

                <Pressable
                  style={
                    styles.cancelButton
                  }
                  onPress={() => {
                    setEditingField(
                      null
                    );

                    setEditValue("");
                  }}
                >

                  <Text
                    style={
                      styles.cancelText
                    }
                  >
                    Cancel
                  </Text>

                </Pressable>


                {/* SAVE */}

                <Pressable
                  style={
                    styles.saveButton
                  }
                  onPress={saveEdit}
                >

                  <Text
                    style={
                      styles.saveText
                    }
                  >
                    Save
                  </Text>

                </Pressable>

              </View>

            </View>

          )}

        </ScrollView>

      </View>
    </KeyboardAvoidingView>
  );
}


/* ====
   STYLES
==== */

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

  headerSpacer: {
    width: 45,
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
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 25,
    marginHorizontal: 10,
  },


  /* 
     PROFILE IMAGE
 */

  profileImageContainer: {
    width: 105,
    height: 105,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
     CAMERA
 */

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#8b15b9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 3,
  },


  /* 
     INFORMATION CARD
 */

  informationCard: {
    backgroundColor: "#f8effb",
    borderWidth: 1,
    borderColor: "#eadcf0",
    borderRadius: 23,
    marginHorizontal: 15,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingTop: 20,
  },


  /* 
     SECTION TITLE
 */

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#54275f",
    marginBottom: 8,
  },


  /* 
     INFORMATION ROW
 */

  infoRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    width: 105,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  valueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 10,
  },

  infoValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    color: "#222",
    marginRight: 10,
  },


  /* 
     EDIT BOX
 */

  editBox: {
    backgroundColor: "#f8effb",
    borderWidth: 1,
    borderColor: "#eadcf0",
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 15,
    padding: 18,
  },

  editTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#54275f",
    marginBottom: 10,
  },

  editInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d9c5df",
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#faf8fc",
  },

  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },

  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  cancelText: {
    color: "#666",
    fontWeight: "600",
  },

  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#8b15b9",
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },

});