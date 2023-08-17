import * as React from 'react';
import { Text, View, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { spaceM, spaceS, spaceL, spaceX } from '../../styles';

const SecureWalletScreen = () => {
    const [step, setStep] = React.useState(0);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor:'#080A0C' }}>
            {
                step === 0 ? (
                    <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                        {/* Step 0: Introduction */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: '60%', aspectRatio: 1, resizeMode: 'center' }} source={require('../../assets/shell-check.png')} />
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: 'white', marginBottom: 10 }}>Secure your Wallet</Text>
                            <Text style={{ fontSize: 14, color: '#8FA2B7', textAlign: 'center', marginBottom: 5 }}>Don't risk losing your funds. protect your wallet by saving your <Text style={{ color: '#5F97FF' }}>Seed phrase</Text> in a place you trust.</Text>
                            <Text style={{ fontSize: 14, color: '#8FA2B7', textAlign: 'center' }}>It's the only way to recover your wallet if you get locked out of the app or get a new device.</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Remind Me Later</Text>
                        </View>
                        <CustomButton isActive={true} buttonText={"Start"} onPressAction={() => {
                            setStep(1)
                        }} />
                    </View>
                ) : (
                    <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                        {/* Step 1: Secure Your Wallet */}
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'column', marginBottom: spaceX }}>
                                <Text style={{ fontSize: 18, color: '#54F0D1', marginBottom: spaceX, textAlign: 'center' }}>Secure your Wallet</Text>
                                <Text style={{ fontSize: 14, color: '#8FA2B7', textAlign: 'left' }}>Secure your wallet's <Text style={{ color: '#5F97FF' }}>"Seed phrase"</Text></Text>
                            </View>
                            {/* Manual Secure */}
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', marginBottom: spaceX }}>
                                <Text style={{ color: 'white', fontSize: 16, marginBottom: spaceS }}>Manual</Text>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>Write down your seed phrase on a piece of paper and store in a safe place.</Text>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>Security level: Very strong</Text>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ backgroundColor: '#76E268', width: '15%', height: 5, marginRight: 5 }} />
                                    <View style={{ backgroundColor: '#76E268', width: '15%', height: 5, marginRight: 5 }} />
                                    <View style={{ backgroundColor: '#76E268', width: '15%', height: 5, marginRight: 5 }} />
                                </View>
                            </View>
                            {/* Risks */}
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', marginBottom: spaceX }}>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>Risks are:</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* You lose it</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* You forget where you put it</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* Someone else finds it</Text>
                            </View>
                            {/* Other Options */}
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', marginBottom: spaceX }}>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>Other options: Doesn't have to be paper!</Text>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>Tips:</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* You forget where you put it</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* You forget where you put it</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>* Someone else finds it</Text>
                            </View>
                        </View>
                        {/* Continue Button */}
                        <CustomButton isActive={true} buttonText={"Continue"} onPressAction={() => {
                            //@ts-ignore
                            navigation.navigate('CreateWalletScreen');
                        }}/>
                    </View>
                )
            }
        </View>
    )
}

export default SecureWalletScreen;
