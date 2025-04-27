import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
