// PhotoScreen.tsx
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define your navigation parameter types
type RootStackParamList = {
  HomeScreen: undefined;
  PhotoScreen: { photoUri: string };
};

// Define the route prop type
type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'PhotoScreen'>;

type PhotoScreenProps = {
  route: PhotoScreenRouteProp;
};

export default function PhotoScreen({ route }: PhotoScreenProps) {
  const { photoUri } = route.params;
  
  useEffect(() => {
    console.log("PhotoScreen received URI:", photoUri);
  }, [photoUri]);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: photoUri }} 
        style={styles.image}
        onLoadStart={() => console.log("Image loading started")}
        onLoad={() => console.log("Image loaded successfully")}
        onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '90%', height: '70%', resizeMode: 'contain' },
});