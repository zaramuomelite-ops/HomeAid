import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import CustomerHomeScreen from "../Screens/CustomerHomeScreen";
import BookingScreen from "../Screens/BookingScreen";
import MessageScreen from "../Screens/MessageScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SOSScreen from "../Screens/SOSScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8b15b9",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeScreen}
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="alert-circle"
              size={size}
              color="#8b15b9"
            />
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

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 10,
  },

  sosButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#8b15b9",
    justifyContent: "center",
    alignItems: "center",

    marginTop: -30,

    borderWidth: 6,
    borderColor: "#fff",

    elevation: 8,
  },

  sosText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
  },
});