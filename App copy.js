import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


import { HomeScreen} from "./screens/HomeScreen"
export default function App() {
  return (
    <TailwindProvider>
   <View className="flex-1 justify-center items-center bg-red-500 font-bold">
    <View className='mt-10 mx-auto'>
      <Text className='font-bold'>Open up App.js to start working on your app! TAILWIND</Text>
      <Text className='font-bold'>Open up App.js to start working on your app! TAILWIND</Text>
      <Text className='font-bold'>Open up App.js to start working on your app! TAILWIND</Text>
      <StatusBar style="auto" />
      </View>
    </View>
    </TailwindProvider>
  );
}

