import {Text, View, Image, StyleSheet, Pressable,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeHeader({
       greeting,
       userName,
       location,
       toggleTheme,
       darkMode,
       onNotificationPress,
}){
    return (
        <View style = {styles.container}>
          
                  <Pressable 
                      style={styles.toggle}
                      onPress={toggleTheme}>

                    <Ionicons
                       name={darkMode ? "sunny" : "moon"}
                       size={25}
                       color="#8b15b9"/>
                  </Pressable>

            <View style = {styles.topRow}>
              
                   <Image
                      source={require("../assets/Images/logo.png")}
                      style = {styles.logo}/>
                    
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
      marginTop: 85,
      paddingHorizontal: 20,
    },
  
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  
    logo: {
      width: 50,
      height: 50,
      backgroundColor: "#cccccc96",
      borderRadius: 20,
      borderWidth: 1,
      marginRight: 28,
      borderColor: "#8b15b9",
      resizeMode: "contain",
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

    toggle: {
      marginTop: -30,
      marginBottom: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#8b15b9",

      elevation: 1,
  
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