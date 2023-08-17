import TransactionItem from '../../components/TransactionItem';
import { useState, useContext, useEffect } from 'react';
import { Linking } from "react-native"
import { View, FlatList, Dimensions, TouchableOpacity, Clipboard } from 'react-native';
import { TransactionType } from '../../utils/types';
import { Button, Text } from 'react-native-paper';
import { spaceM, spaceS, spaceL, spaceX } from '../../styles';
import { BottomSheet } from 'react-native-btr';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useGetAccountBalance, useGetAccountTransactions } from '../../hooks/useChainInfo';
import { shortAddress, timestampToDate } from '../../utils/common';
import { AccountType } from '../../utils/types';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';

const WalletScreen = () => {
    const { accounts, accountInfos } = useAppContext();

    const navigation = useNavigation();
    const [viewRecieve, setView] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    const clickTransaction = (index: number) => {
        const transactions = currentAccount?.transactions;
        const count = transactions?.length;
        for (let i = 0; i < count; i ++) {
            if (index === transactions[i].id) {
                setCurrentTransaction(transactions[i]);
                return;
            }
        }

        setCurrentTransaction(null);
    }

    useEffect(()=>{
        const init = () => {

            if(currentAccount == null && accountInfos.length > 0) {
                setCurrentAccount(accountInfos[0]);
            }
        }
        
        init();
    }, [accountInfos]);

    // const transactionData = useGetAccountTransactions(currentAccount.address);
    // const balance = useGetAccountBalance(currentAccount.address);

    const openBrowser = async (extrinsic) => {
        const url = "https://westend.subscan.io/extrinsic/" + extrinsic;
        const supported = await Linking.canOpenURL(url);
      
        if (supported) {
          await Linking.openURL(url);
        } else {
        }
    };

    const copyToClipboard = (text: string) =>{
        Clipboard.setString(text);
    }

    const getTotalAmount = () => {
        if(currentTransaction) {
            if(currentTransaction.action === "Sent") {
                return parseFloat(currentTransaction.balance) + parseFloat(currentTransaction.netFee.toFixed(3));
            } else {
                return currentTransaction.balance;
            }
        }

        return 0;
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
        <View style={{ flex: 1, backgroundColor: '#080A0C' }}>
            {/* Header */}
            <LinearGradient
                colors={['rgba(200,0,200,0.4)', 'rgba(200,200,0,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.1, y: 0.1 }}
                style={{ backgroundColor: '#080A0C', justifyContent: 'center', alignItems: 'center' }}
            >
                <View style={{ alignItems: 'center', padding: 10, marginTop: spaceX }}>
                    {/* <Text style={{ fontSize: 18, color: 'white', marginBottom: spaceX * 2 }}>WND</Text> */}
                    <Picker
                        selectedValue={currentAccount?.account.name}
                        style={{ color: "white", fontSize: 16, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', marginBottom: spaceX }}
                        onValueChange={(value, index) => chooseAccount(value)}
                    >
                        {accounts?.map((acc) => (
                            <Picker.Item color="black" label={acc.name} value={acc.name}/>
                        ))}
                    </Picker>

                    <Text style={{ fontSize: 32, color: '#abdbe3', marginBottom: spaceX }}>{currentAccount?.balance} WND</Text>
                    <Text style={{ fontSize: 16, color: '#aaa', marginBottom: spaceM }}>$0</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spaceX }}>
                        <Button buttonColor='#333' icon={"call-made"} mode="contained" 
                            onPress={() => { 
                                //@ts-ignore
                                navigation.navigate('SendScreen')
                            }} 
                            style={{ marginEnd: spaceM }}>
                            Send
                        </Button>
                        <Button buttonColor='#333' icon={"call-received"} mode="contained" 
                            onPress={() => { 
                                setView(true)
                            }}>
                            Receive
                        </Button>
                    </View>
                </View>
            </LinearGradient>
            <FlatList
                style={{ width: '100%', padding: spaceS }}
                data={currentAccount?.transactions}
                keyExtractor={(item: TransactionType) => item.id}
                //@ts-ignore
                renderItem={(item: TransactionType) => <TransactionItem {...item} clickTransaction={clickTransaction} />}
            />
            {/* Transaction Bottomsheet */}
            <BottomSheet
                visible={!!currentTransaction}
                onBackButtonPress={() => { clickTransaction(-1) }}
                onBackdropPress={() => { clickTransaction(-1) }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#111', padding: spaceX, marginTop: spaceX }}>
                    <View style={{ alignItems: 'center', marginBottom: spaceM }}>
                        <Text style={{ fontSize: 14, color: '#fff' }}>{currentTransaction?.action} {currentTransaction?.tokenID}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: spaceX }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#555' }}>Status</Text>
                            <Text style={{ fontSize: 14, color: currentTransaction?.status === 'Confirmed' ? 'green' : currentTransaction?.status === 'Cancelled' ? 'red' : 'white' }}>{currentTransaction?.status}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#555', textAlign: 'right' }}>Date</Text>
                            <Text style={{ fontSize: 14, color: '#aaa', textAlign: 'right' }}>{ timestampToDate(currentTransaction?.time)}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: spaceX }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#555' }}>From</Text>
                            <Text style={{ fontSize: 14, color: '#aaa' }}>{shortAddress(currentTransaction?.from)}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#555', textAlign: 'right' }}>To</Text>
                            <Text style={{ fontSize: 14, color: '#aaa', textAlign: 'right' }}>{shortAddress(currentTransaction?.to)}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: spaceX }}>
                        <Text style={{ fontSize: 14, color: '#555' }}>Nonce</Text>
                        <Text style={{ fontSize: 14, color: '#aaa' }}>#{currentTransaction?.nounce}</Text>
                    </View>

                    <View style={{ backgroundColor: '#222', flexDirection: 'column', borderRadius: 15, margin: spaceS, justifyContent: 'space-between' }}>
                        {currentTransaction?.action == 'Sent' && <View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <View style={{ flexDirection: 'column', padding: spaceX }}>
                                    <Text style={{ color: 'white', marginBottom: spaceM }}>Amount</Text>
                                    <Text style={{ color: 'white' }}>Network fee</Text>
                                </View>
                                <View style={{ flexDirection: 'column', padding: spaceX }}>
                                    <Text style={{ color: 'white', textAlign: 'right', marginBottom: spaceM }}>{currentTransaction?.balance + `${currentTransaction?.tokenID}`}</Text>
                                    <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'right' }}>{currentTransaction?.netFee.toFixed(3) + `${currentTransaction?.tokenID}`}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray', marginBottom: spaceS }}></View>
                        </View>}
                        <View style={{flexDirection:'row', justifyContent: 'space-between', padding: spaceX }}>
                            <Text style={{ color: 'white', marginBottom: spaceM }}>Total Amount</Text>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'white', textAlign: 'right', marginBottom: spaceS }}>{getTotalAmount() + currentTransaction?.tokenID}</Text>
                                <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'right' }}>{'$' + currentTransaction?.usdBalance}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', margin: spaceX }}
                        onPress={()=>{
                            openBrowser(currentTransaction.extrinsicIdx);
                        }}
                    >
                        <Text style={{ color: '#54F0D1' }}>View on Mainnet</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet >
            {/* receive bottomshett */}
            <BottomSheet
                visible={viewRecieve}
                onBackButtonPress={() => { setView(false) }}
                onBackdropPress={() => { setView(false) }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#111', padding: spaceX }}>
                    <View style={{ alignItems: 'center', marginBottom: spaceM }}>
                        <Text style={{ fontSize: 14, color: '#fff' }}>{shortAddress(currentAccount?.account.address)}</Text>
                    </View>                   
                    <TouchableOpacity style={{ alignItems: 'center', margin: spaceX }} onPress={()=> copyToClipboard(currentAccount?.account.address)}>
                        <Text style={{ color: '#54F0D1' }}>copy address</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet >
        </View >
    )
}

export default WalletScreen;