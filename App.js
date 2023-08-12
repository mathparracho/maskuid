import React, { useEffect, useState, useCallback  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/HomeScreen';
import { AddPostScreen } from './screens/AddPostScreen';
import Header from './components/Header'; // Import the Header component
import Navbar from './components/Navbar'; // Import the Navbar component

import { StatusBar } from 'expo-status-bar';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';

const Stack = createStackNavigator();


const App = () => {

  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  });



  return (
    <NavigationContainer>
      <StatusBar animated = {true} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          header: () => <Header navigation={navigation} />, // Pass the navigation prop to the Header component
          headerStyle: {
            backgroundColor: 'blue', // Customize the header background color as needed
          },
          headerTintColor: 'white', // Customize the header text color as needed
          headerTitleAlign: 'center', // Center the title text
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;