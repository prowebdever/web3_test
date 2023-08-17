import * as React from 'react';
import { Text, View, Alert } from 'react-native';
import { TextInput, Switch, Checkbox } from 'react-native-paper';
import { Formik } from 'formik';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { spaceS, spaceX } from '../../styles';
import { setValue } from '../../utils/LocalStorage';
import { checkPasswordStrength } from '../../utils/createWallet';

const verticalSpacing = 20;

const CreatePasswordScreen = () => {
    // State variables for password visibility and strength message
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [passwordStatus, setPasswordStatus] = React.useState("Must be at least 8 characters");

    // State variables for enabling Face ID and checkbox
    const [isFaceIdEnabled, setIsFaceIdEnabled] = React.useState(false);
    const toggleFaceIdSwitch = () => setIsFaceIdEnabled(!isFaceIdEnabled);
    
    const [checkBoxChecked, setCheckBoxChecked] = React.useState(false);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#080A0C' }}>
            {/* Formik form for password creation */}
            <Formik
                initialValues={{ password: '', passwordConfirm: '' }}
                onSubmit={(values, actions) => {
                    // Compare the password and confirm password
                    if (values.password !== values.passwordConfirm) {
                        Alert.alert("Warning", "Password does not match");
                        return;
                    }

                    // Check if password is empty
                    if (values.passwordConfirm === "") {
                        Alert.alert("Error", "Password is empty");
                        return;
                    }

                    // Store the authentication values and navigate to the next screen
                    setValue("polkadot-auth", {password: values.password});
                    //@ts-ignore
                    navigation.navigate('SecureWalletScreen');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                        <View style={{}}>
                            {/* Password creation section */}
                            <View style={{
                                flexDirection: 'column', alignItems: 'center', marginBottom: verticalSpacing * 2, justifyContent: 'flex-start'
                            }}>
                                <Text style={{ color: '#70A2FF', fontSize: 16, marginBottom: 10 }}>Create Password</Text>
                                <Text style={{ color: '#8FA2B7', fontSize: 14, textAlign: 'center' }}>This password will unlock your wallet only on this service</Text>
                            </View>
                            {/* Input for new password */}
                            <TextInput
                                mode="flat"
                                label="New Password"
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
                                }}
                                value={values.password}
                                onChangeText={(text) => {
                                    handleChange("password")(text);
                  
                                    // Check password strength and set message accordingly
                                    const strength = checkPasswordStrength(text);
                                    if(strength < 5) {
                                        setPasswordStatus("Must be at least 8 characters");
                                    } else if(strength < 7) {
                                        setPasswordStatus("Password strength: Weak");
                                    } else if(strength < 8) {
                                        setPasswordStatus("Password strength: Good");
                                    } else if(strength < 9) {
                                        setPasswordStatus("Password strength: Strong");
                                    } else {
                                        setPasswordStatus("Password strength: Very Strong");
                                    }
                                }}
                                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
                            />
                            {/* Password strength message */}
                            <Text
                                style={{
                                    color: "#8FA2B7",
                                    fontSize: 12,
                                    textAlign: "left",
                                    marginBottom: verticalSpacing,
                                    marginLeft: 16,
                                }}
                            >
                                {passwordStatus}
                            </Text>
                            {/* Input for confirming password */}
                            <TextInput
                                mode="flat"
                                label="Confirm Password"
                                placeholder=""
                                textColor='white'
                                placeholderTextColor={'#6A84A0'}
                                secureTextEntry={!showConfirm}
                                style={{
                                    backgroundColor: '#0000',
                                    borderColor: '#181E25',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    marginBottom: spaceS,
                                }}
                                value={values.passwordConfirm}
                                onChangeText={handleChange('passwordConfirm')}
                                right={<TextInput.Icon icon="eye"  onPress={() => setShowConfirm(!showConfirm)} />}
                            />
                            {/* Display errors for password confirmation */}
                            <Text style={{ color: '#aaa', marginBottom: spaceX, }}>{errors.passwordConfirm}</Text>
                            {/* Enable Face ID switch */}
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                marginBottom: verticalSpacing, padding: 10,
                            }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>Enable Face ID?</Text>
                                <Switch value={isFaceIdEnabled} onValueChange={toggleFaceIdSwitch} />
                            </View>
                            {/* Checkbox for password recovery acknowledgment */}
                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginBottom: verticalSpacing, padding: 10,
                            }} onPointerDown={() => setCheckBoxChecked(!checkBoxChecked)}>
                                <Checkbox status={checkBoxChecked ? 'checked' : 'unchecked'} onPress={() => setCheckBoxChecked(!checkBoxChecked)} /><Text style={{ color: '#8FA2B7' }}>I understand that recovery of this password is not possible. <Text style={{ color: '#5F97FF', textDecorationLine: 'underline' }}>Learn more</Text></Text>
                            </View>
                        </View>
                        {/* Custom button for submitting password */}
                        <CustomButton isActive={true} buttonText={"Create Password"} onPressAction={() => {
                            handleSubmit();
                        }} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default CreatePasswordScreen;
