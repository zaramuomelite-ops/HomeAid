import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WelcomeScreen from "./Screens/WelcomeScreen";
import ChoiceScreen from "./Screens/ChoiceScreen";
import LoginScreen from "./Screens/LoginScreen";
import CustomerSignupScreen from "./Screens/CustomerSignupScreen";
import ArtisanRegistrationScreen from "./Screens/ArtisanRegistrationScreen";
import OTPVerificationScreen from "./Screens/OTPVerificationScreen";
import ArtisanVerificationScreen from "./Screens/ArtisanVerificationScreen";

import AllServicesScreen from "./Screens/AllServicesScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import ArtisanProfileScreen from "./Screens/ArtisanProfileScreen";

import BottomNavigation from "./components/BottomNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />

          <Stack.Screen
            name="Choice"
            component={ChoiceScreen}
          />

          <Stack.Screen
            name="LogIn"
            component={LoginScreen}
          />

          <Stack.Screen
            name="CustomerSignup"
            component={CustomerSignupScreen}
          />

          <Stack.Screen
            name="ArtisanRegister"
            component={ArtisanRegistrationScreen}
          />

          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
          />

          <Stack.Screen
            name="ArtisanVerification"
            component={ArtisanVerificationScreen}
          />

          <Stack.Screen
            name="AllServices"
            component={AllServicesScreen}
          />

          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
          />

          <Stack.Screen
            name="ArtisanProfile"
            component={ArtisanProfileScreen}
          />

          <Stack.Screen name="CustomerHome">
            {(props) => (
              <BottomNavigation
                {...props}
                userType="customer"
              />
            )}
          </Stack.Screen>

          {/* ARTISAN APP */}
          <Stack.Screen name="ArtisanHome">
            {(props) => (
              <BottomNavigation
                {...props}
                userType="artisan"
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});