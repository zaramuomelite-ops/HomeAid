import {Text, View, Image, StyleSheet, Pressable,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeHeader({
       greeting,
       userName,
       location,
       toggleTheme,
       darkMode,
       onNotificationPress,
       navigation,
}){

  const [profileImage, setProfileImage] = useState(null);

  const loadProfileImage = async () => {
    try {
      const savedData = await AsyncStorage.getItem("customerData");
  
      if (savedData) {
        const customerData = JSON.parse(savedData);
  
        setProfileImage(customerData.profileImage || null);
      }
    } catch (error) {
      console.log("Error loading profile image:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileImage();
    }, [])
  );

  const handleProfilePress = () => {
    navigation.navigate("EditProfile")
  };

    return (
        <View style = {styles.container}>

            <View style = {styles.topRow}>

             <Pressable onPress={handleProfilePress}>

            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}

              />
            ) : (
              <Ionicons
                name="person-circle"
                size={48}
                color="#8b15b9"
              />
            )}
            </Pressable> 
                    
                 <View style = {styles.greetMe}>
                    <Text style = {styles.greeting}>
                        {greeting}
                      </Text>

                      <Text style = {styles.name}>
                        {userName} 👋 
                      </Text>
                 </View>
                  
                  <View style={styles.rightIcons}>
                  
                

                  <Pressable
                    style = {styles.notification}
                    onPress={onNotificationPress}>
                    <Ionicons
                     name = "notifications-outline"
                     size={26}
                     color = "#8b15b9"
                     />
                </Pressable>
   
                </View>
            </View>

               

               <View style = {styles.locationRow}>
               <Ionicons
                name="location"
                size={18}
                color="#8b15b9"
                />

                <Text style = {styles.location}>
                    {location}
                </Text>
               </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
      marginTop: 60,
      paddingHorizontal: 20,
    },
  
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  
    profileImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: "#8b15b9",
    },
  
    rightIcons: {
      alignItems: "center",
    },
  
    notification: {
      width: 42,
      height: 42,
      marginTop: 16,
      borderRadius: 15,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#8b15b9",
  
      elevation: 3,
  
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
  
    greeting: {
      marginTop: 1,
      fontSize: 16,
      fontWeight: "bold",
      color: "#0a0a0a",
    },

    greetMe: {
      marginRight: 100,
    },

   
    name: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#54275f",
      marginTop: 5,
    },
  
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10
    },
  
    location: {
      marginLeft: 2,
      marginTop: 1,
      fontSize: 15,
      color: "#777",
    },
  
  });