import { StyleSheet, 
         Text, 
         View, 
           } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./Screens/WelcomeScreen";
import ChoiceScreen from "./Screens/ChoiceScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return(
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

  </Stack.Navigator>
 </NavigationContainer>
  )
}

const styles = StyleSheet.create({});
