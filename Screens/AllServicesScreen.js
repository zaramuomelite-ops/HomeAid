import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  import SearchBar from "../components/SearchBar";
  import CategoryCard from "../components/CategoryCard";
  import { useState } from "react";

  const services = [
    { title: "Electrician",icon: "flash", },
    { title: "Plumber",icon: "water", },
    { title: "Cleaner",icon: "sparkles", },
    { title: "Painter",icon: "color-fill", },
    { title: "Carpenter",icon: "hammer", },
    { title: "Gardener",icon: "leaf", },
    {title: "AC Repairs",icon: "snow",},
    {title: "Hairdresser",icon: "cut",},
    {title: "Laundry",icon: "shirt",},
    {title: "Tailor",icon: "shirt-outline",},
    {title: "Appliance Repair",icon: "build",},
    {title: "Exterminator",icon: "bug",}
  ];

  export default function AllServicesScreen({ navigation }) {

    const [search, setSearch] = useState("");
  
    const filteredServices = services.filter((service) =>
      service.title.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
  
        <Pressable
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#8b15b9"
          />
        </Pressable>
  
        <Text style={styles.title}>
          All Services
        </Text>
  
        <Text style={styles.subtitle}>
          Find the service you need
        </Text>
  
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onFilterPress={() => {}}
        />
  
        <Text style={styles.sectionTitle}>
          Services
        </Text>
  
        <View style={styles.grid}>
  
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              
            <View
                style={styles.serviceItem}
                key={service.title}>
                <CategoryCard
                title={service.title}
                icon={service.icon}
              />
            </View>
            ))
          ) : (
            <Text style={styles.noResults}>
              No services found 🔍
            </Text>
          )}
  
        </View>
  
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#ebcce823",
      flexGrow: 1,
    },
  
    back: {
      marginTop: 30,
      marginBottom: 15,
    },
  
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#54275f",
      marginHorizontal: 80,
      marginTop: -50,
    },
  
    subtitle: {
      fontSize: 15,
      color: "#777",
      marginTop: 5,
      marginBottom: 20,
      marginHorizontal: 70,
    },
  
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#54275f",
      marginTop: 25,
      marginBottom: 15,
    },
  
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginLeft: 15
    },

    serviceItem: {
      width: "30%",
      alignItems: "center",
      marginBottom: 25,
      marginHorizontal: 5,
    },
  
    noResults: {
      width: "100%",
      textAlign: "center",
      marginTop: 30,
      color: "#777",
      fontSize: 16,
    },
  });