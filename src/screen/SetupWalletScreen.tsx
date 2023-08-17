import { Image, View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

// Import wallet logo image
const walletLogo = require('../assets/wallet.png');

// Wallet setup screen component
const SetupWalletScreen = () => {
  // Get navigation object from React Navigation
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      {/* Display wallet logo */}
      <Image source={walletLogo} style={styles.logo} />
      <View style={styles.contentContainer}>
        {/* Title section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallet Setup</Text>
        </View>
        {/* Import Wallet button */}
        <CustomButton
          isActive={false}
          buttonText={'Import Using Seed Phrase'}
          onPressAction={() => {
            //@ts-ignore
            navigator.navigate('ImportWalletScreen', {isNew: true});
          }}
        />
        <View style={styles.buttonSpacer} />
        {/* Create New Wallet button */}
        <CustomButton
          isActive={true}
          buttonText={'Create a New Wallet'}
          onPressAction={() => {
            //@ts-ignore
            navigator.navigate('CreatePasswordScreen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#080A0C',
    padding: 8,
    flexDirection: 'column',
  },
  logo: {
    width: '60%',
    aspectRatio: 1,
    resizeMode: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 36,
  },
  buttonSpacer: {
    marginBottom: 20,
  },
});

export default SetupWalletScreen;
