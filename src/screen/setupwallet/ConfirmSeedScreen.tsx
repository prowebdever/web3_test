import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { generateMnemonic, generateWalletFromMnemonic } from '../../utils/createWallet';
import AppContext, { useAppContext } from '../../context/AppContext';
import { spaceM, spaceS, spaceL, spaceX } from '../../styles';

// Function to get a random seed phrase
const getRandomSeedPhrase = (seeds: string[]) => {
    const length = seeds.length;
    const randomIndex = Math.round(Math.random() * (length - 1));
    const selectedWord = seeds[randomIndex];
    const filteredSeeds = generateMnemonic().slice(0, 6);
    const randomIndexToReplace = Math.round(Math.random() * 5);
    filteredSeeds[randomIndexToReplace] = selectedWord;
    return { randomIndex, selectedWord, filteredSeeds };
};

const ConfirmSeedScreen = () => {
    const [step, setStep] = React.useState(0);
    const [inputAnswer, setInputAnswer] = React.useState("");
    const [selectedWordIndex, setSelectedWordIndex] = React.useState(0);
    const [subSeedPhrase, setSubSeedPhrase] = React.useState<string[]>([]);
    const [userSeedPhrase, setUserSeedPhrase] = React.useState<string[]>([]);

    const { accounts, setAccounts } = useAppContext();

    React.useEffect(() => {
        const seeds = generateMnemonic();
        const { randomIndex, selectedWord, filteredSeeds } = getRandomSeedPhrase(seeds);
        setUserSeedPhrase(seeds);
        setSelectedWordIndex(randomIndex);
        setSubSeedPhrase(filteredSeeds);
    }, []);

    const navigation = useNavigation();

    const SeedWord = ({ word, blurred = false, index }: { word: string, blurred?: boolean, index: string }) => (
        <View style={{ width: 130, height: 30, backgroundColor: '#181E25', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: spaceS }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{!blurred ? index + word : '***'}</Text>
        </View>
    );

    const handleCheck = () => {
        // Check if the input matches the selected seed word
        if (userSeedPhrase[selectedWordIndex] === inputAnswer) {
            const { randomIndex, filteredSeeds } = getRandomSeedPhrase(userSeedPhrase);
            setSubSeedPhrase(filteredSeeds);
            setStep(step + 1);
            setSelectedWordIndex(randomIndex);
            setInputAnswer("");
        } else {
        }

        // Once successfully completed, store the mnemonic in storage and navigate to the wallet page.
    };

    return (
        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#080A0C' }}>
            {/* Step 0 and 1 */}
            {(step === 0 || step === 1) && (
                <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                    {/* Instructions */}
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, color: '#54F0D1', textAlign: 'center', marginBottom: 10 }}>Write Down Your Seed Phrase</Text>
                        <Text style={{ fontSize: 14, color: '#8FA2B7', textAlign: 'left', marginBottom: 5 }}>This is your seed phrase. Write it down on paper and keep it secure. You'll need to re-enter it in the correct order on the next step.</Text>
                    </View>
                    {/* Seed words */}
                    <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginLeft: spaceS, marginRight: spaceS }}>
                        {userSeedPhrase.map((word: string, index: number) => (
                            <SeedWord key={index} word={word} index={(index + 1) + "."} blurred={step === 0} />
                        ))}
                        {step === 0 && (
                            <View style={{ backgroundColor: '#222531ee', borderRadius: 10, width: '100%', height: '100%', position: 'absolute', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Tap to reveal your seed phrase</Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>Ensure no one is watching your screen.</Text>
                                </View>
                                <TouchableOpacity onPress={() => setStep(1)}>
                                    <View style={{ width: 100, height: 50, backgroundColor: '#202832', justifyContent: 'center', alignItems: 'center', borderRadius: 30, flexDirection: 'row' }}>
                                        <Ionicons name="eye" size={20} color="#3D8DFF" />
                                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 10 }}>View</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <CustomButton isActive={step === 0 ? false : true} buttonText={"Next"} onPressAction={() => {
                        if (step === 1) {
                            setStep(2);
                        }
                    }} />
                </View>
            )}

            {/* Step 2 to 4 */}
            {(step > 1 && step <= 4) && (
                <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                    {/* Confirmation instructions */}
                    <View style={{ flexDirection: 'column', marginLeft: 30, marginRight: 30 }}>
                        <Text style={{ fontSize: 18, color: '#54F0D1', textAlign: 'center', marginBottom: 10 }}>Confirm Seed Phrase</Text>
                        <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center', marginBottom: 5 }}>Select each word in the order it was presented to you</Text>
                    </View>
                    {/* Display selected word */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, color: '#6A84A0' }}>{selectedWordIndex + 1}.{inputAnswer}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '50%' }}>
                            {[2, 3, 4].map((value, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        backgroundColor: value <= step ? '#3D8DFF' : '#3D8DFF00',
                                        flex: 1,
                                        height: 3,
                                        marginRight: 5
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                    {/* Available seed words */}
                    <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginLeft: spaceS, marginRight: spaceS, borderRadius: 10, borderColor: '#FFFFFF22', borderWidth: 1 }}>
                        {subSeedPhrase.map((word: string, idx: number) => (
                            <TouchableOpacity key={idx} onPress={() => setInputAnswer(word)}>
                                <SeedWord word={word} index='' />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <CustomButton isActive={inputAnswer === "" ? false : true} buttonText={"Next"} onPressAction={handleCheck} />
                </View>
            )}

            {/* Step 5 */}
            {step > 4 && (
                <View style={{ padding: 20, justifyContent: 'space-around', height: '100%' }}>
                    {/* Success message */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: '60%', aspectRatio: 1, resizeMode: 'center' }} source={require('../../assets/circle-check.png')} />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: '80%', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#54F0D1', marginBottom: 20 }}>Success!</Text>
                        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', marginBottom: 5 }}>You've successfully protected your wallet. Remember to keep your seed phrase safe; it's your responsibility!</Text>
                    </View>
                    <CustomButton
                        isActive={true}
                        buttonText={"Next"}
                        onPressAction={() => {
                            const seed = userSeedPhrase.join(" ");
                            const address = generateWalletFromMnemonic(seed);
                            const _accounts = accounts || [];
                            //@ts-ignore
                            setAccounts([..._accounts, {
                                address: address,
                                seed: seed,
                                name: `Account ${_accounts.length + 1}`
                            }
                            ]);
                            //@ts-ignore
                            navigation.navigate('HomeTab');
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default ConfirmSeedScreen;
