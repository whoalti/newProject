/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { RootStack } from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (Platform.OS === 'android'){
      SplashScreen.hide();

    }
  }, [])
  

  return (
    <NavigationContainer>


    <RootStack />
    </NavigationContainer>
  );
}

export default App;
