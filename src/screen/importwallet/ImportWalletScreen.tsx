import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { validateSeed, generateWalletFromMnemonic, checkPasswordStrength } from '../../utils/createWallet';
import { getValue, setValue } from '../../utils/LocalStorage';
import { useAppContext } from '../../context/AppContext';
import { spaceS, spaceM, spaceL, spaceX } from "../../styles";

const ImportWalletScreen = ({route}) => {
    // State variables for displaying/hiding sensitive information
    const [showSeed, setShowSeed] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [passwordStatus, setPasswordStatus] = React.useState("Must be at least 8 characters");

    const { isNew } = route.params;
    // State variable for enabling Face ID
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    // Access context for setting user address and seed
    const { accounts, setAccounts } = useAppContext();
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const navigation = useNavigation();

    // Function to handle the import wallet process
    const importWallet = async (values: { seed: string, password: string, confirmPass: string }) => {
        const { seed, password, confirmPass } = values;

        // Check if the entered seed phrase is valid
        const isValidSeed = validateSeed(seed);
        if (!isValidSeed) {
            Alert.alert("Warning", "Entered seed phrase is not valid");
            return;
        }

        // Compare the password and confirm password
        if (password !== confirmPass) {
            Alert.alert("Warning", "Password does not match");
            return;
        }

        // Check if password is empty
        if (isNew && password === "") {
            Alert.alert("Error", "Password is empty");
            return;
        }

        // Save the password in local storage
        if (isNew) {
                setValue("polkadot-auth", {
                password: password,
            });
        }

        // Generate wallet from the provided seed
        const address = generateWalletFromMnemonic(seed);

        // Set user address and seed in the app context
        const _accounts = accounts || [];
        setAccounts([ ..._accounts, {
            address: address,
            seed: seed,
            name: `Account ${_accounts.length + 1}`
        }
        ]);

        // Navigate to the HomeTab screen
        //@ts-ignore
        navigation.navigate('HomeTab');
    };

    return (
        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#080A0C' }}>
            <Formik
                initialValues={{ seed: '', password: '', confirmPass: '' }}
                onSubmit={values => importWallet(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                        <View style={{}}>
                            {/* Seed Phrase Input */}
                            <TextInput
                                mode="flat"
                                label="Seed Phrase"
                                placeholder=""
                                textColor='white'
                                placeholderTextColor={'#6A84A0'}
                                secureTextEntry={!showSeed}
                                value={values.seed}
                                onChangeText={handleChange('seed')}
                                style={{
                                    backgroundColor: '#0000',
                                    borderColor: '#181E25',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    marginBottom: spaceX,
                                }}
                                right={<TextInput.Icon icon="eye" onPress={() => setShowSeed(!showSeed)}/>}
                            />
                            {isNew && <View>
                            {/* Password Input */}
                            <TextInput
                                mode="flat"
                                label="New Password"
                                placeholder=""
                                textColor='white'
                                placeholderTextColor={'#6A84A0'}
                                secureTextEntry={!showPassword}
                                value={values.password}
                                onChangeText={(text) => {
                                    handleChange("password")(text);

                                    // Check password strength and set message accordingly
                                    const strength = checkPasswordStrength(text);
                                    if (strength < 5) {
                                        setPasswordStatus("Must be at least 8 characters");
                                    } else if (strength < 7) {
                                        setPasswordStatus("Password strength: Weak");
                                    } else if (strength < 8) {
                                        setPasswordStatus("Password strength: Good");
                                    } else if (strength < 9) {
                                        setPasswordStatus("Password strength: Strong");
                                    } else {
                                        setPasswordStatus("Password strength: Very Strong");
                                    }
                                }}
                                style={{
                                    backgroundColor: '#0000',
                                    borderColor: '#181E25',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)}/>}
                            />
                            <Text
                                style={{
                                color: "#8FA2B7",
                                fontSize: 12,
                                textAlign: "left",
                                marginBottom: spaceX,
                                marginLeft: 16,
                                }}
                            >
                                {passwordStatus}
                            </Text>
                            {/* Confirm Password Input */}
                            <TextInput
                                mode="flat"
                                label="Confirm Password"
                                placeholder=""
                                textColor='white'
                                placeholderTextColor={'#6A84A0'}
                                onChangeText={handleChange('confirmPass')}
                                secureTextEntry={!showConfirm}
                                value={values.confirmPass}
                                style={{
                                    backgroundColor: '#0000',
                                    borderColor: '#181E25',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    marginBottom: spaceX,
                                }}
                                right={<TextInput.Icon icon="eye" onPress={() => setShowConfirm(!showConfirm)}/>}
                            />
                            </View>}
                            {/* Switch for using Face ID */}
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                marginBottom: spaceX, padding: 10,
                            }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>Sign in with Face ID?</Text>
                                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                            </View>
                            {/* Terms and Conditions */}
                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginBottom: spaceX, padding: 10,
                            }}>
                                <Text style={{ color: '#8FA2B7' }}>By proceeding, you agree to these <Text style={{ color: '#5F97FF', textDecorationLine: 'underline' }}>Terms and Conditions.</Text></Text>
                            </View>
                        </View>
                        {/* Import Button */}
                        <CustomButton isActive={true} buttonText='Import' onPressAction={handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default ImportWalletScreen;
