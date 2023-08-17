import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Image sources
const images = {
  illustration: require('../assets/illus.png'),
  shellCheck: require('../assets/shell-check.png'),
  rocket: require('../assets/rocket.png'),
  diversity: require('../assets/property-diversity.png'),
  security: require('../assets/safe-security.png'),
  transaction: require('../assets/convenient-transaction.png'),
};

// Data for carousel items
const carouselData = [
  {
    id: 1,
    coverImage: images.illustration,
    bottomLabel: images.diversity,
  },
  {
    id: 2,
    coverImage: images.shellCheck,
    bottomLabel: images.security,
  },
  {
    id: 3,
    coverImage: images.rocket,
    bottomLabel: images.transaction,
  },
];

const WaitingScreen = () => {
  const navigator = useNavigation();

  // Render carousel item
  const renderCarouselItem = (data) => (
    <View key={data.id} style={styles.carouselItemContainer}>
      <View style={styles.carouselItemWrapper}>
        {/* Display cover image */}
        <Image style={styles.carouselImage} source={data.coverImage} />
        {/* Display bottom label image */}
        <Image style={styles.carouselLabel} source={data.bottomLabel} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Render carousel */}
      <Carousel
        pagination={PaginationLight}
        renderItem={renderCarouselItem}
        data={carouselData}
        loop
        autoplay
      />
      {/* Display custom button */}
      <CustomButton
        isActive={true}
        buttonText={'Get Started'}
        onPressAction={() => {
            //@ts-ignore
          navigator.navigate('SetupWalletScreen');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080A0C',
    width: '100%',
  },
  carouselItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    paddingTop: 50,
    height: height * 0.8,
  },
  carouselItemWrapper: {
    width: '80%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  carouselImage: {
    alignSelf: 'center',
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'center',
  },
  carouselLabel: {
    alignSelf: 'center',
    width: '60%',
    aspectRatio: 1,
    resizeMode: 'center',
  },
});

export default WaitingScreen;
