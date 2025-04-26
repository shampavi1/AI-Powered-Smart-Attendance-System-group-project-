import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import App from './src/app'; // your main app UI

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
