import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CustomerHomeScreen from "../Screens/CustomerHomeScreen";
import ArtisanHomeScreen from "../Screens/ArtisanHomeScreen";
import BookingScreen from "../Screens/BookingScreen";
import MessageScreen from "../Screens/MessageScreen";
import SOSScreen from "../Screens/SOSScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ArtisanProfileScreen from "../Screens/ArtisanProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigation({ userType = "customer" }) {
  const isArtisan = userType === "artisan";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8b15b9",
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 70,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={
          isArtisan
            ? ArtisanHomeScreen
            : CustomerHomeScreen
        }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        initialParams={{ userType }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.sosButton}>
              <Ionicons
                name="alert-circle"
                size={25}
                color="#fff"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={
          isArtisan
            ? ArtisanProfileScreen
            : ProfileScreen
        }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    width: 35,
    height: 35,
    borderRadius: 29,
    backgroundColor: "#8b15b9",
    alignItems: "center",
    justifyContent: "center",
  },
});