import { useContext, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as LocalStorage from '../utils/LocalStorage';
import { useAppContext } from '../context/AppContext';
import { setValue } from '../utils/LocalStorage';

// Import the logo image
const logoImage = require('../assets/logo.png');

// Define the FirstScreen component
const FirstScreen = () => {
  // Get the navigation object from React Navigation
  const navigation = useNavigation();

  // Get user address from AppContext
  const { accounts } = useAppContext();

  // Use the useEffect hook to navigate based on user address
  useEffect(() => {
    // Set a timeout to simulate a delay before navigation
    setTimeout(() => {
      // Check if user address is not provided or undefined
      if (accounts == null || accounts?.length == 0) {
        // Navigate to WaitingScreen if user address is not available
        //@ts-ignore
        navigation.navigate('WaitingScreen');
      } else {
        // Navigate to LoginScreen if user address is available
        //@ts-ignore
        navigation.navigate('LoginScreen');
      }

      setValue("polkadot-wallet", accounts);
    }, 3000);
  }, [accounts]);

  // Render the FirstScreen component
  return (
    <View style={styles.container}>
      {/* Display the logo image */}
      <Image source={logoImage} style={styles.logo} />
    </View>
  );
};

// Define the styles for FirstScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080A0C',
    padding: 8,
  },
  logo: {
    width: '60%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

// Export the FirstScreen component as the default export
export default FirstScreen;
