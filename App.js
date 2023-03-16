import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack  = createStackNavigator();

import { HomeScreen} from "./screens/HomeScreen"
import { CreateAccount} from "./screens/CreateAccount"
import Details from './screens/Details';
import SignIn from './screens/SignIn';
import ClockHistory from './screens/ClockHistory'
import ResetClock from './screens/ResetClock'
import AllStaff from './screens/AllStaff'
//console.reportErrorsAsExceptions = false;


export default function App() {
  return (
   <NavigationContainer>
    <AuthStack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    >
      <AuthStack.Screen name="HomeScreen" component={HomeScreen}/>
      <AuthStack.Screen name="CreateAccount" component={CreateAccount}/>
      <AuthStack.Screen name="Details" component={Details}/>
      <AuthStack.Screen name="SignIn" component={SignIn}/>
      <AuthStack.Screen name="ClockHistory" component={ClockHistory}/>
      <AuthStack.Screen name="ResetClock" component={ResetClock}/>
      <AuthStack.Screen name="AllStaff" component={AllStaff}/>
    </AuthStack.Navigator>
   </NavigationContainer>
  );
}

