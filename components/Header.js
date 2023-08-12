import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image  } from 'react-native'; // Import StyleSheet
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'style-components';


const Header = ({ navigation }) => {
  const route = useRoute();

  const isHomeScreen = route.name === 'Home';

  const handleBackPress = () => {
    if (!isHomeScreen) {
      navigation.goBack();
    }
  };

  const printLogo = () => {
    if (isHomeScreen) {
      return <Image
      source={require('../assets/logo.png')} // Replace 'logo.png' with the actual image file name in your assets folder
      style={styles.logo}
      resizeMode="contain" // Adjust the resizeMode as needed
    />
    }
    else
    {
      return (
        <TouchableOpacity onPress={handleBackPress} style={styles.arrow}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )
    }
  };

  const printPostar = () => {
    return(
      <Text style={styles.postarButton}>POSTAR</Text>
    )
  };

  return (
    
    <View style={styles.headerContainer}>
      {printLogo()}
      <View style={styles.ellipse} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrow: {
    paddingTop: 30, // Add padding to the top to move the arrow down
    paddingLeft: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#53118F', // Customize the header background color as needed
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowColor: 'black',
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Customize the text color as needed
    textAlign: 'center', // Center the title text
  },
  postarButton: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Customize the text color as needed
    textAlign: 'right', // Center the title text
  },
  ellipse: {
    width: '100%',
    height: 100,
    borderRadius: 100,
    backgroundColor: '#53118F', // Use the same background color as the header to create a seamless transition
    position: 'absolute',
    zIndex: -1, // Move the ellipse behind other elements
  },
  logo: {
    width: "100%", // Set the width of the logo image
    height: 70, // Set the height of the logo image
  },
});
