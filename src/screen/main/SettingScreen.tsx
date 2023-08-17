import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import { spaceM, spaceS, spaceL, spaceX } from '../../styles';

const SettingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#080A0C', padding: spaceM }}>
            <Text style={{ fontSize: 18, color: 'white', marginBottom: spaceX }}>Import Wallet</Text>
            <Button buttonColor='#333' icon={"add"} mode="contained" 
                onPress={() => { 
                    //@ts-ignore
                    navigation.navigate('ImportWalletScreen', {isNew: false})
                }} 
                style={{ margin: spaceM }}>
                Import Existing Wallet
            </Button>
            <Button buttonColor='#333' icon={"add"} mode="contained" 
                onPress={() => { 
                    //@ts-ignore
                    navigation.navigate('ConfirmSeedScreen', {isNew: false})
                }}
                style={{ margin: spaceM }}>
                Create New Wallet
            </Button>
        </View >
    )
}

export default SettingScreen;