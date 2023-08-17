import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import { spaceM, spaceS, spaceL, spaceX } from '../../styles';

const SettingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#080A0C', padding: spaceM }}>
            <Button buttonColor='#333' icon={"plus"} mode="contained" 
                onPress={() => { 
                    //@ts-ignore
                    navigation.navigate('ImportWalletScreen', {isNew: false})
                }} 
                style={{ margin: spaceM }}>
                Import Existing Wallet
            </Button>
            <Button buttonColor='#333' icon={"plus"} mode="contained" 
                onPress={() => { 
                    //@ts-ignore
                    navigation.navigate('ConfirmSeedScreen', {isNew: false})
                }}
                style={{ margin: spaceM }}>
                Create New Wallet
            </Button>
            <View style={{ height: 0.5, backgroundColor: 'gray', margin: spaceM }}></View>
            <Button buttonColor='#333' icon={"account-box"} mode="contained" 
                onPress={() => { 
                    //@ts-ignore
                    navigation.navigate('ContactScreen')
                }} 
                style={{ margin: spaceM }}>
                Contact
            </Button>
        </View >
    )
}

export default SettingScreen;