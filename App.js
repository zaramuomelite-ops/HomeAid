import { StyleSheet, 
         Text, 
         View, 
           } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./Screens/WelcomeScreen";
import ChoiceScreen from "./Screens/ChoiceScreen";
import LoginScreen from './Screens/LoginScreen';
import CustomerRegistrationScreen from './Screens/CustomerSignupScreen';
import ArtisanRegistrationScreen from './Screens/ArtisanRegistrationScreen';
import CustomerSignupScreen from './Screens/CustomerSignupScreen';
import OTPVerificationScreen from './Screens/OTPVerificationScreen';
import CustomerHomeScreen from './Screens/CustomerHomeScreen';
import BottomNavigation from './components/BottomNavigation';
import AllServicesScreen from './Screens/AllServicesScreen';
import PaymentScreen from './Screens/PaymentScreen';
import EditProfileScreen from './Screens/EditProfileScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return(

<GestureHandlerRootView style = {{flex: 1}}>
 <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen 
      name='Welcome'
      component={WelcomeScreen}
      />

    <Stack.Screen 
      name='Choice'
      component={ChoiceScreen}
      />

    <Stack.Screen
    name='LogIn'
    component={LoginScreen} 
    />

    <Stack.Screen
    name = "CustomerSignup"
    component = {CustomerSignupScreen}
    />

    <Stack.Screen
     name = "ArtisanRegister"
     component = {ArtisanRegistrationScreen}
     />

   <Stack.Screen
     name = "OTPVerificationH"
     component = {OTPVerificationScreen}
     />

   <Stack.Screen
     name = "CustomerHome"
     component = {BottomNavigation}/>

    <Stack.Screen
     name = "AllServices"
     component = {AllServicesScreen}/>

     <Stack.Screen
     name= "Payment"
     component={PaymentScreen}/>

     <Stack.Screen
     name = "EditProfile"
     component={EditProfileScreen}/>


  </Stack.Navigator>
 </NavigationContainer>
 </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({});