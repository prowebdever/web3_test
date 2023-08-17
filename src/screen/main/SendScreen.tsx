import { FontAwesome } from '@expo/vector-icons';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { BigNumber } from 'bignumber.js';
import CustomButton from '../../components/CustomButton';
import React, { useEffect, useState } from 'react';
import { Image, TextInput, Text, View, FlatList, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from 'react-native';

import { TransactionType } from 'utils/types';

import { Divider, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { spaceM, spaceS, spaceL, spaceX } from '../../styles';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import { useAppContext } from '../../context/AppContext';
import { shortAddress } from '../../utils/common';
import { validAddress } from '../../utils/createWallet';

const LoadingModal = ({ visible }) => {
    return (
      <Modal transparent={true} visible={visible}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
  

const SendScreen = () => {
    const { accounts, accountInfos, contacts } = useAppContext();

    const [ amountTosend, setAmountTosend ] = useState(0);
    const [ addressFrom, setAddressFrom ] = useState("");
    const [ addressTo, setAddressTo ] = useState("");

    const [ currentAccount, setCurrentAccount ] = useState(null);
    const [ favoriteAddrs, setFavoriteAddrs ] = useState(null);

    const [ isLoading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(0);
    const navigation = useNavigation();

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'lightgray',
            text: 'black',
            borderColor: 'green',
        },
    };

    useEffect(() => {
        if(currentAccount == null && accountInfos.length > 0) {
            setCurrentAccount(accountInfos[0]);
        }
    }, [accountInfos])

    useEffect(() => {
        const getFavoriteAddrs = () => {
            const _favAddrs = [];
            const ownAddr = currentAccount?.account.address;
            setAddressFrom(ownAddr);
            const _temp = currentAccount?.transactions.map((tran) => (ownAddr === tran.from ? tran.to : tran.from));
            _temp?.forEach(element => {
                if(_favAddrs.indexOf(element) < 0) {
                    _favAddrs.push(element);
                }
            });

            setFavoriteAddrs(_favAddrs.slice(0, 5));
        }

        getFavoriteAddrs();
    }, [currentAccount])

    const handlSend = async () =>{
        try{
            
            const totalAmountToSend = new BigNumber(amountTosend).plus(0.24); // Add transaction fee
            if (totalAmountToSend.isGreaterThan(currentAccount?.balance)) {
                Alert.alert("Insufficient Balance", "You don't have enough balance to complete this transaction.", [], { cancelable: true });
                return;
            }

            setLoading(true);
            const provider = new WsProvider('wss://westend-rpc.polkadot.io');
            const api = await ApiPromise.create({ provider });
            const keyring = new Keyring();
            const sender = keyring.addFromUri(currentAccount?.account.seed);
            const _amount = new BigNumber(amountTosend).multipliedBy(10**12).toString()
            const transfer = api.tx.balances.transfer(addressTo, _amount);
            const hash = await transfer.signAndSend(sender);

            Alert.alert("Success", `You just sent ${amountTosend} WND to ${addressTo}.`,
            [
            ],
            { cancelable: true }
            )
            setLoading(false)
            // @ts-ignore
            navigation.navigate("WalletScreen")
        } catch(e) {
            Alert.alert(
                "Failed", `transfer failed. check transaction`,
                [],
                { cancelable: true }
            )
            setLoading(false);
        }
    }

    const chooseAccount = (name) => {
        const count = accountInfos?.length;
        for (let i = 0; i < count; i ++) {
            if(accountInfos[i].account.name === name) {
                setCurrentAccount(accountInfos[i])
                return;
            }
        }

        setCurrentAccount(null);
    }
    return (
        <PaperProvider theme={theme}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex: 1, backgroundColor: '#080A0C', paddingBottom: spaceX}}>
                    {
                        page === 0 ?
                            <View>
                                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'column' }}>
                                    <View style={{ marginTop:spaceX, marginHorizontal: spaceX }}>
                                        <Text style={{ color: 'white', textAlign: 'left', marginBottom: spaceM }}>From</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <MaterialIcons name="account-circle" size={48} color="white" />
                                            </View>
                                            <View style={{flex: 3, padding: spaceM, flexDirection: "column"}}>
                                            <Picker
                                                selectedValue={currentAccount?.account.name}
                                                style={{ color: "white", fontSize: 14, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', marginBottom: spaceM }}
                                                onValueChange={(value, index) => chooseAccount(value)}
                                            >
                                                {accounts?.map((acc) => (
                                                    <Picker.Item color="black" label={acc.name} value={acc.name}/>
                                                ))}
                                            </Picker>
                                                <Text style={{ fontSize: 12, color: 'gray', textAlign: 'left' }}>{shortAddress(currentAccount?.account.address)}</Text>
                                            </View>
                                            <View style={{flex:3, justifyContent: 'center'}}>
                                                <Text style={{ fontSize: 14, color: 'gray', padding: spaceM, textAlign: 'right' }}>{currentAccount?.balance + " WND"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/* To */}
                                    <View style={{ marginTop:spaceX, marginHorizontal: spaceX }}>
                                        <Text style={{ color: 'white', marginBottom: spaceM }}>To</Text>
                                        <View style={{}}>
                                            <TextInput
                                                value={addressTo.toString()}
                                                onChangeText={(text: string) => setAddressTo(text)}
                                                style={{
                                                    borderColor: 'gray',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    fontSize: 16,
                                                    color: '#eee',
                                                    textAlign: 'center',
                                                    backgroundColor: '#fff0'
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{ color: 'white', textAlign: 'left', padding: spaceX }}>Contact Address</Text>
                                    <FlatList
                                        style={{ width: '100%', paddingHorizontal: spaceX}}
                                        data={contacts}
                                        keyExtractor={(item) => item.address}
                                        //@ts-ignore
                                        renderItem={(item) => (
                                            <TouchableOpacity onPress={()=>setAddressTo(item.item.address)}>
                                                <View style={{flexDirection: "row", marginBottom: spaceM}}>
                                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                                        <MaterialIcons name="account-circle" size={48} color="white" />
                                                    </View>
                                                    <View style={{flex: 4, padding: spaceM, flexDirection: "column"}}>
                                                        <Text style={{ color: 'white', marginBottom: spaceM, textAlign: 'left' }}>{item.item.name}</Text>
                                                        <Text style={{ fontSize: 12, color: 'gray', textAlign: 'left' }}>{shortAddress(item.item.address)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    <Text style={{ color: 'white', textAlign: 'left', padding: spaceX }}>Recent Address</Text>
                                    <FlatList
                                        style={{ width: '100%', paddingHorizontal: spaceX}}
                                        data={favoriteAddrs}
                                        keyExtractor={(item) => item}
                                        //@ts-ignore
                                        renderItem={(item) => (
                                            <TouchableOpacity onPress={()=>setAddressTo(item.item)}>
                                                <View style={{flexDirection: "row", marginBottom: spaceM}}>
                                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                                        <MaterialIcons name="account-circle" size={48} color="white" />
                                                    </View>
                                                    <View style={{flex: 4, padding: spaceM, flexDirection: "column"}}>
                                                        <Text style={{ color: 'white', marginBottom: spaceM, textAlign: 'left' }}>Contact {item.index + 1}</Text>
                                                        <Text style={{ fontSize: 12, color: 'gray', textAlign: 'left' }}>{shortAddress(item.item)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                <CustomButton isActive={true} buttonText="Next" onPressAction={() => {
                                    // Validate recipient's address
                                    if (!validAddress(addressTo)) {
                                        Alert.alert("Invalid Address", "Please enter a valid recipient address.", [], { cancelable: true });
                                        return;
                                    }

                                    setPage(1)
                                }} />
                            </View > 
                            :
                            <View>
                                <View>
                                    <View style={{ marginBottom: spaceX * 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', margin: spaceM }}>Amount</Text>
                                            <TextInput
                                                value={amountTosend.toString()}
                                                onChangeText={(text: string) => setAmountTosend(Number.isNaN(Number(text)) ? 0 : Number(text))}
                                                keyboardType='numeric'
                                                style={{
                                                    borderColor: 'gray',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    fontSize: 16,
                                                    color: '#eee',
                                                    textAlign: 'center',
                                                    backgroundColor: '#fff0'
                                                }}
                                            />
                                    </View>
                                    {/* From */}
                                    <View style={{ width: '100%', flexDirection: 'column', paddingLeft: spaceX }}>
                                        <Text style={{ color: 'white' }}>From</Text>
                                        <View style={{ flexDirection: 'row', padding: spaceM }}>
                                        <Text style={{ color: '#aaa' }}>{addressFrom}</Text>
                                        </View>
                                    </View>
                                    {/* To */}
                                    <View style={{ width: '100%', flexDirection: 'column', paddingLeft: spaceX }}>
                                        <Text style={{ color: 'white' }}>To</Text>
                                        <View style={{ flexDirection: 'row', padding: spaceM }}>
                                            <Text style={{ color: '#aaa' }}>{addressTo}</Text>
                                        </View>
                                    </View>
                                    {/* Details */}
                                    <View style={{ margin: spaceX, flexDirection: 'column', borderRadius: 20, backgroundColor: '#222', padding: spaceM }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spaceM }}>
                                            <Text style={{ color: '#aaa' }}>Amount</Text>
                                            <Text style={{ color: '#aaa' }}>{amountTosend} WND</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spaceM }}>
                                            <Text style={{ color: '#aaa' }}>Network fee<Text style={{ marginLeft: spaceM, color: 'blue' }}>Edit</Text></Text>
                                            <Text style={{ color: '#aaa' }}>0.2405 WND</Text>
                                        </View>
                                        <Divider style={{ backgroundColor: '#555', marginBottom: spaceM }} />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spaceM }}>
                                            <Text style={{ color: 'white', fontSize: 14 }}>Total Amount</Text>
                                            <View style={{}}>
                                                <Text style={{ color: 'white', fontSize: 14, marginBottom: spaceS }}>{Number(amountTosend) + 0.24} WND</Text>
                                                <Text style={{ textAlign: 'right', color: '#aaa', fontSize: 12 }}>$0</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <CustomButton isActive={true} buttonText="Send" onPressAction={() => {
                                    handlSend();
                                }} />
                            </View>
                    }
                    <View style = {styles.container}>
                        <LoadingModal visible={isLoading} />
                    </View >
                </View>
            </ScrollView>
        </PaperProvider>
    )
}

export default SendScreen;