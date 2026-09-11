import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// REUSE YOUR EXISTING COMPONENTS
import HomeHeader from "../components/HomeHeader";

export default function ArtisanHomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const loadArtisanData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("artisanData");
  
        if (savedData) {
          const artisanData = JSON.parse(savedData);
  
          setUserName(artisanData.userName || "");
  
          setLocation(
            artisanData.location ||
              `${artisanData.city || ""}, ${artisanData.state || ""}`
          );
  
          setRegistrationComplete(
            artisanData.registrationComplete === true
          );
        }
      } catch (error) {
        console.log("Error loading artisan data:", error);
      }
    };
  
    loadArtisanData();
  }, []);

  function getGreeting(){
    const hour = new Date().getHours()

    if (hour < 12) return "Good Morning,";
    if (hour < 17) return "Good Afternoon,";

    return "Good Evening,"
  }


  const services = [
    {
      name: "Plumbing",
      icon: "water-outline",
    },
    {
      name: "Electrical",
      icon: "flash-outline",
    },
    {
      name: "Carpentry",
      icon: "hammer-outline",
    },
  ];

  return (
    <View style={styles.screen}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* EXISTING HEADER */}
        <HomeHeader
          greeting={getGreeting()}
          userName={userName}
          location={location}
          navigation={navigation}
          userType="artisan"
        />

      {!registrationComplete && (
        <Pressable
          style={styles.incompleteCard}
          onPress={() => navigation.navigate("ArtisanVerification")}
        >
          <View style={styles.incompleteIcon}>
            <Ionicons
              name="warning-outline"
              size={24}
              color="#bb2d39"
            />
          </View>

          <View style={styles.incompleteContent}>
            <Text style={styles.incompleteTitle}>
              Registration incomplete
            </Text>

            <Text style={styles.incompleteSubtitle}>
              Complete your professional profile to start receiving jobs.
            </Text>

            <View style={styles.completeRow}>
              <Text style={styles.completeText}>
                Complete registration
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#5b2dbb"
              />
            </View>
          </View>
        </Pressable>
      )}

        {/* AVAILABILITY CARD */}
        <View style={styles.availabilityCard}>

          <View style={styles.availabilityLeft}>

            <View style={styles.availabilityIcon}>
              <View style={styles.availabilityDot} />
            </View>

            <View style={styles.availabilityTextContainer}>
            <Text style={styles.availabilityTitle}>
            {!registrationComplete
              ? "Complete your profile"
              : isAvailable
              ? "You're Available"
              : "You're Unavailable"}
          </Text>

          <Text style={styles.availabilitySubtitle}>
            {!registrationComplete
              ? "Complete your professional verification before you can receive jobs."
              : isAvailable
              ? "Customers can request your services right now."
              : "Customers can't request your services right now."}
          </Text>
         </View>

          </View>

      <Switch
        value={registrationComplete && isAvailable}
        onValueChange={setIsAvailable}
        disabled={!registrationComplete}
        trackColor={{
          false: "#d6d0df",
          true: "#39bb2db7",
        }}
        thumbColor="#fff"
        ios_backgroundColor="#d6d0df"
      />
        </View>


        {/* TODAY'S OVERVIEW */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Today's Overview
          </Text>
        </View>

        <View style={styles.overviewRow}>

          {/* JOBS TODAY */}
          <View style={styles.overviewCard}>

            <View style={styles.overviewIconContainer}>
              <Ionicons
                name="briefcase-outline"
                size={34}
                color="#5b2dbb"
              />
            </View>

            <View>
              <Text style={styles.overviewNumber}>
                0
              </Text>

              <Text style={styles.overviewLabel}>
                Jobs Today
              </Text>
            </View>

          </View>


          {/* NEW REQUESTS */}
          <View style={styles.overviewCard}>

            <View style={styles.overviewIconContainer}>
              <Ionicons
                name="document-text-outline"
                size={34}
                color="#5b2dbb"
              />
            </View>

            <View>
              <Text style={styles.overviewNumber}>
                0
              </Text>

              <Text style={styles.overviewLabel}>
                New Requests
              </Text>
            </View>

          </View>

        </View>


        {/* YOUR SERVICES */}
        <View style={styles.servicesHeader}>

          <Text style={styles.sectionTitle}>
            Your Services
          </Text>

          <Pressable
            onPress={() => navigation.navigate("ManageServices")}
            style={styles.manageButton}
          >
            <Text style={styles.manageText}>
              Manage
            </Text>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#5b2dbb"
            />
          </Pressable>

        </View>


        {/* SERVICES CARD */}
        <View style={styles.servicesCard}>

          {services.map((service, index) => (

            <Pressable
              key={service.name}
              style={[
                styles.serviceRow,
                index !== services.length - 1 &&
                  styles.serviceBorder,
              ]}
              onPress={() =>
                navigation.navigate("ManageServices")
              }
            >

              <View style={styles.serviceIconContainer}>
                <Ionicons
                  name={service.icon}
                  size={34}
                  color="#5b2dbb"
                />
              </View>

              <Text style={styles.serviceName}>
                {service.name}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={24}
                color="#73737c"
                style={styles.serviceArrow}
              />

            </Pressable>

          ))}

        </View>

      </ScrollView>


    </View>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    paddingBottom: 120,
    marginTop: 2
  },

  // AVAILABILITY
  availabilityCard: {
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 25,
    backgroundColor: "#f8f4ff",
    borderWidth: 1,
    borderColor: "#eee5ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  availabilityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  availabilityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: "#eee7ff",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 18,
  },

  availabilityDot: {
    width: 28,
    height: 28,
    borderRadius: 19,

    backgroundColor: "#39bb2db7",
  },

  availabilityTextContainer: {
    flex: 1,
  },

  availabilityTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5b2dbb",
    marginBottom: 8,
  },

  availabilitySubtitle: {
    fontSize: 12,
    lineHeight: 25,
    color: "#646475",
    maxWidth: 250,
  },

  // SECTION
  sectionHeader: {
    marginHorizontal: 22,
    marginTop: 5,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#182033",
  },

  // OVERVIEW
  overviewRow: {
    flexDirection: "row",
    gap: 15,

    marginHorizontal: 22,
  },

  overviewCard: {
    flex: 1,
    width: 15,
    height: 75,

    backgroundColor: "#ffffff",

    borderRadius: 24,

    paddingHorizontal: 18,
    paddingVertical: 25,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,

    elevation: 3,
  },

  overviewIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 3,
    backgroundColor: "#f0eaff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 2,
  },

  overviewNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5b2dbb",
    marginHorizontal: 15,
    marginVertical: 1,
  },

  overviewLabel: {
    fontSize: 10,
    color: "#686877",
   
  },

  // SERVICES
  servicesHeader: {
    marginHorizontal: 22,
    marginTop: 40,
    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  manageButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  manageText: {
    color: "#5b2dbb",
    fontSize: 15,
    fontWeight: "700",
  },

  servicesCard: {
    marginHorizontal: 22,
    marginVertical: 10,
    backgroundColor: "#ffffff",

    borderRadius: 25,

    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,

    elevation: 3,
  },

  serviceRow: {
    minHeight: 90,

    flexDirection: "row",
    alignItems: "center",
  },

  serviceBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,

    backgroundColor: "#f0eaff",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 22,
  },

  serviceName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#182033",
  },

  serviceArrow: {
    marginLeft: "auto",
  },

  // REGISTRATION
  incompleteCard: {
    marginHorizontal: 22,
    marginTop: 20,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#ca629f3f",
    borderWidth: 1,
    borderColor: "#c0576e9f",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  
  incompleteIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#f0eaff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  
  incompleteContent: {
    flex: 1,
  },
  
  incompleteTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5b2dbb",
    marginBottom: 6,
  },
  
  incompleteSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#686877",
    marginBottom: 12,
  },
  
  completeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  completeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5b2dbb",
    marginRight: 5,
  },

});