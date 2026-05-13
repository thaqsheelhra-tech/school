import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [role, setRole] = useState(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0f172a" />
        {role ? (
          <AppNavigator role={role} onLogout={() => setRole(null)} />
        ) : (
          <LoginScreen onLogin={setRole} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
