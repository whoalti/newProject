import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FontsScreen from '../screens/FontsScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createNativeStackNavigator();

export function RootStack(){
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} /> 
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Fonts" component={FontsScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator> 
    )
}