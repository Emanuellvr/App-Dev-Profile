import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FunctionComponent = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
