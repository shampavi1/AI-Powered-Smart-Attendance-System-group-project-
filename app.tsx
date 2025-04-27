// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homescreen';
import PhotoScreen from './photoscreen';

// Define your navigation parameter types
type RootStackParamList = {
  HomeScreen: undefined;
  PhotoScreen: { photoUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="PhotoScreen" component={PhotoScreen} options={{ title: 'Your Photo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}