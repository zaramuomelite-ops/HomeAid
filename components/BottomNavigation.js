import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CustomerHomeScreen from "../Screens/CustomerHomeScreen";
import ArtisanHomeScreen from "../Screens/ArtisanHomeScreen";

import BookingScreen from "../Screens/BookingScreen";
import MessageScreen from "../Screens/MessageScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SOSScreen from "../Screens/SOSScreen";

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
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >

      {/* HOME */}
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

      {/* BOOKINGS */}
      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
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

      {/* SOS */}
      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="alert-circle"
              size={38}
              color="#8b15b9"
            />
          ),
        }}
      />

      {/* MESSAGES */}
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

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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