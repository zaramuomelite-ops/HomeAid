import { StyleSheet, 
         Text, 
         View, 
         Image, } from 'react-native'; 
import { ScrollView } from "react-native";
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from "../components/PrimaryButton";
import HomeHeader from '../components/HomeHeader';
import  AsyncStorage from '@react-native-async-storage/async-storage';


export default function ArtisanHomeScreen({navigation}) {
    const [darkMode, setDarkMode] = useState(false)

    const [artisan, setArtisan] = useState({
        userName: "",
        location: "",
    })

    useEffect(() => {
        loadArtisan();
    }, [])

    async function loadArtisan(){
        const data = await AsyncStorage.getItem("artisanData")
     
        if (data){
         setArtisan(JSON.parse(data));
        }
       }
     
     
       function toggleTheme(){
         setDarkMode(!darkMode);
       }
     
       function getGreeting(){
         const hour = new Date().getHours()
     
         if (hour < 12) return "Good Morning,";
         if (hour < 17) return "Good Afternoon,";
     
         return "Good Evening,"
       }
    }
       return (
     
           <ScrollView 
                  contentContainerStyle={styles.container}
                  showsVerticalScrollIndicator={false}>
       
         <View style = {styles.container}>
           <HomeHeader
             greeting={getGreeting()}
             userName={artisan.userName}
             location={artisan.location}
             darkMode={darkMode}
             navigation={navigation}
             toggleTheme={toggleTheme}
             onNotificationPress={() => {}}
             />

          </View>
         </ScrollView>
        )
