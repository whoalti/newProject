/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  

  return (
    <NavigationContainer>


    <RootStack />
    </NavigationContainer>
  );
}

export default App;
