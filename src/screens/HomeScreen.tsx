import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const navigationItems = [
  { id: '1', title: 'Home' },
  { id: '2', title: 'Profile' },
  { id: '3', title: 'Fonts' },
  { id: '4', title: 'About' },
  { id: '5', title: 'Camera'}
];


function HomeScreen() : React.JSX.Element {
const navigation = useNavigation();

  const renderItem = ({ item }: { item: {id: string, title: string} }) => (
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(item.title)}>
      <Text style={styles.navText}>{item.title}</Text>
    </TouchableOpacity>
  );

    return (
    
     <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Event manager</Text>
        <FlatList
          data={navigationItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.navList}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#fff',  
  },
  content: {
    alignItems: 'center',
  },
  navList: {
    alignItems: 'center', 
    width: '100%',        
  },
  navItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f0f0f0', 
    borderRadius: 8,
    width: 200,                  
    alignItems: 'center',        
  },
  navText: {
    fontSize: 18,
    color: '#333',              
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});


export default HomeScreen;