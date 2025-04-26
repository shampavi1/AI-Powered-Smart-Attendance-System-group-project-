// HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define your navigation parameter types
type RootStackParamList = {
  HomeScreen: undefined;
  PhotoScreen: { photoUri: string };
};

// Create a properly typed navigation hook
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  // Use the typed navigation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const takePhoto = async () => {
    try {
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Camera permission is required.');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      console.log("Camera result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri;
        console.log("Navigation to PhotoScreen with URI:", photoUri);
        navigation.navigate('PhotoScreen', { photoUri });
      }
    } catch (error: any) {
      // Type assertion to handle the unknown error type
      console.error("Camera error:", error);
      
      // Safely handle the error message
      const errorMessage = error && typeof error.message === 'string' 
        ? error.message 
        : 'An unknown error occurred';
        
      alert('Failed to take photo: ' + errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a Photo</Text>
      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 18 },
});