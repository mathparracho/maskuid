import React from 'react';
import { View, StyleSheet } from 'react-native';

const Navbar = () => {
  return(
    <View>
    <View style={styles.navbarContainer} />
    <View style={styles.navbarContainer2} />
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    height: 50,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#53118F',
    position: 'absolute',
    bottom: 0,
  },
  navbarContainer2: {
    width: '100%',
    height: 40,
    backgroundColor: '#53118F',
    position: 'absolute',
    bottom: 0,
  }
});
