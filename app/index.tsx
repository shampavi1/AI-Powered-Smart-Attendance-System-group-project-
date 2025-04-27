import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ImageSourcePropType,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Import your local image
const defaultProfileImage = require('../assets/images/logo.png');


export default function Home() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission is required to access the media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleExit = () => {
    BackHandler.exitApp(); // Android only
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <Text style={styles.header}>ATTENDANCE</Text>

{/* Profile or Default Icon */}
<Image
  source={profileImage ? { uri: profileImage } : defaultProfileImage}
  style={styles.image}
/>


      {/* Buttons */}
      <TouchableOpacity onPress={() => console.log('Take Photo')} style={styles.button}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Scan')} style={styles.button}>
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Get report')} style={styles.button}>
        <Text style={styles.buttonText}>Get Report</Text>
      </TouchableOpacity>

      {/* Exit Button */}
      <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  exitButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 20,
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
