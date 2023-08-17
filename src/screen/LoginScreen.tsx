import { Image, View, Text, StyleSheet, Alert } from "react-native"
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

import { useContext, useEffect, useState } from "react";
import { getValue } from "../utils/LocalStorage";
import { spaceX } from "../styles";

// Import the logo image
const logoImage = require('../assets/logo.png');

const LoginScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword ] = useState("");
    const [showPassword, setShowPassword ] = useState(false);
    const [passValue, setPassValue] = useState("");

    useEffect(() => {
        const getAuth = async () => {
            const auth = await getValue("polkadot-auth");
            setPassValue(auth.password);
        }
        getAuth()
    },[])
    
    const handleChange = (value : any) =>{
        setPassword( value);
    }

    const handleLogin = () =>{
        if(passValue == password) {
            //@ts-ignore
            navigation.navigate('HomeTab');
        } else {
            Alert.alert("warnning", "Incorrect password",[], {cancelable: true});
        }
    }
    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                height: '20%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={logoImage} style={styles.logo} />
                <View style={{ width: '80%', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                    <TextInput
                        mode="flat"
                        label="Enter PassWord"
                        placeholder=""
                        textColor='white'
                        placeholderTextColor={'#6A84A0'}
                        secureTextEntry={!showPassword}
                        style={{
                            backgroundColor: '#0000',
                            borderColor: '#181E25',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginBottom: spaceX,
                        }}
                        value={password}
                        onChangeText={(v) =>handleChange(v)}
                        right={<TextInput.Icon icon="eye" onPress={()=>setShowPassword(!showPassword)}/>}
                    />
                </View>

                <View style={{ marginBottom: 20 }} />
                <CustomButton isActive={true} buttonText={"LogIn"} onPressAction={() => {handleLogin()
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#080A0C',
        padding: 8,
        flexDirection: 'column'
    },
    logo: {
        width: '60%',
        aspectRatio: 1,
        resizeMode: 'center'
    }
});

export default LoginScreen;