import PrimaryButton from "../components/PrimaryButton";
import HomeHeader from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import CategoryCard from "../components/CategoryCard"
import ProfessionalCard from "../components/ProfessionalCard";
import SectionTitle from "../components/SectionTitle";
import { Carousel } from "react-native-reanimated-carousel";
import { StyleSheet, 
         Text, 
         View, 
         Image, } from 'react-native'; 
import { ScrollView } from "react-native";
import { useEffect, useRef, useState } from 'react';
import  AsyncStorage from '@react-native-async-storage/async-storage';

const services =[
  { title: "Electrician", icon: "flash" },
  { title: "Plumber", icon: "water" },
  { title: "Cleaner", icon: "sparkles" },
  { title: "Painter", icon: "color-fill" },
  { title: "Carpenter", icon: "hammer" },
  { title: "Gardener", icon: "leaf"}
];

const professionals = [
  {
   name: "David Okafor",
   profession:"Electrician",
   rating:"4.9",
   distance:"1.2 km",
   image:require("../assets/Images/electrician.jpg")
  },
  {
    name:"Michael James",
    profession:"Plumber",
    rating:"4.8",
    distance:"2.1 km",
    image:require("../assets/Images/plumber.jpg"),
  },
  {
    name:"Sarah Williams",
    profession:"Cleaner",
    rating:"4.7",
    distance:"2.8 km",
    image:require("../assets/Images/cleaner.jpg"),
  },
  {
    name:"Leaf Legend Crew",
    profession:"Gardeners",
    rating:"4.6",
    distance:"3.0 km",
    image:require("../assets/Images/gardener.jpg"),
  },

];

export default function CustomerHomeScreen({navigation}) {
const [darkMode, setDarkMode] = useState(false)
const [search, setSearch] = useState("")
const servicesScrollRef = useRef(null)
const scrollOffset = useRef(0)
const servicesWidth = useRef(0)

const filteredServices = services.filter((service) =>
  service.title.toLowerCase().includes(search.toLowerCase())
);

const filteredProfessionals = professionals.filter((professional) =>
  professional.name.toLowerCase().includes(search.toLowerCase()) ||
  professional.profession.toLowerCase().includes(search.toLowerCase())
);

const [customer, setCustomer] = useState({
    userName: "",
    location: "",
})

useEffect(() => {
    loadCustomer();
}, [])

useEffect(() => {
  if (filteredServices.length === 0) return;

  const interval = setInterval(() => {
    scrollOffset.current += 1;

    if (
      servicesWidth.current > 0 &&
      scrollOffset.current >= servicesWidth.current
    ) {
      scrollOffset.current = 0;

      servicesScrollRef.current?.scrollTo({
        x: 0,
        animated: false,
      });

      return;
    }

    servicesScrollRef.current?.scrollTo({
      x: scrollOffset.current,
      animated: false,
    });
  }, 30);

  return () => clearInterval(interval);
}, [filteredServices]);

  async function loadCustomer(){
   const data = await AsyncStorage.getItem("customerData")

   if (data){
    setCustomer(JSON.parse(data));
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

  return (

      <ScrollView 
             contentContainerStyle={styles.container}
             showsVerticalScrollIndicator={false}>
  
    <View style = {styles.container}>
      <HomeHeader
        greeting={getGreeting()}
        userName={customer.userName}
        location={customer.location}
        darkMode={darkMode}
        navigation={navigation}
        userType="customer"
        toggleTheme={toggleTheme}
        onNotificationPress={() => {}}
        />

      <SearchBar
      value = {search}
      onChangeText={setSearch}
      onFilterPress={() => {}}/>


      <SectionTitle
        title = "Popular Services"
        onPress = {() => {navigation.navigate("AllServices")}}
        />
      
      <ScrollView
         ref = {servicesScrollRef}
         horizontal
         showsHorizontalScrollIndicator = {false}
         contentContainerStyle= {{
          paddingHorizontal: 20,
          marginTop: 15,
         }}
         
         onContentSizeChange={(width)=> {
            servicesWidth.current = width/2;
         }}>

        { filteredServices.length > 0 ? (
        [ ...filteredServices, ...filteredServices].map((service, index) => (
            <CategoryCard
              key={index}
              title={service.title}
              icon={service.icon}
            />
          ))
       ): (
        <Text style= {styles.noResult}>
        No Result Found 🔎
        </Text>
       ) }
    </ScrollView>
          

      
      <SectionTitle
          title="Top Professionals"
          showSeeAll={false}
        />

    <View style= {styles.professionals}>
      { filteredProfessionals.length > 0 ? (
      filteredProfessionals.map((professional) => (
        <ProfessionalCard
          key={professional.name}
          name={professional.name}
          profession={professional.profession}
          rating={professional.rating}
          distance={professional.distance}
          image={professional.image}
          onPress={() => navigation.navigate("Bookings", {
            professional: professional,
          })} 
        />
      ))
    ): (
      <Text style= {styles.noResult}>
        No Result Found 🔎
      </Text>
    )
}
</View>
       
  </View>

  </ScrollView>

)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ebcce823",
        alignItems: "stretch",
       
      },

    noResult: {
      fontSize: 16,
      color: "#777",
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },

    professionals: {
      width: "100%",
      alignItems: "center",
    },

})