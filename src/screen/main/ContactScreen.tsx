import React, { useEffect, useState } from 'react';
import { TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

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
import { setValue } from '../../utils/LocalStorage';

const ContactScreen = () => {
    const { contacts, setContacts } = useAppContext();
    const [ addState, setAddState ] = useState(false);

    const [ contactName, setContactName ] = useState('');
    const [ contactAddr, setContactAddr ] = useState('');

    const addContact = async () => {
        if(addState) {
            if(!validAddress(contactAddr)) {
                Alert.alert("Invalid Address", "Please enter a valid recipient address.", [], { cancelable: true });
                return;
            }

            if(contactName == '') {
                Alert.alert("Invalid Name", "Please enter a valid recipient name.", [], { cancelable: true });
                return;
            }

            const _temp = contacts?.filter((con) => {
                if(con.address === contactAddr || con.name === contactName) {
                    return true;
                }
            })

            if(_temp?.length) {
                Alert.alert("Invalid Name or Address", "Please enter a valid recipient name or address.", [], { cancelable: true });
                return;
            }

            const _contacts = contacts || [];

            _contacts.push({
                name: contactName,
                address: contactAddr
            })

            setContacts(_contacts);
            await setValue("polkadot-contacts", _contacts);

            setAddState(false);
            setContactAddr('');
            setContactName('');
        } else {
            setAddState(true);
        }
    }

    const cancelAdd = () => {
        setContactAddr('');
        setContactName('');
        setAddState(false);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{flex: 1, backgroundColor: '#080A0C', padding: spaceX}}>
                {addState && <View style={{flexDirection: "column", paddingBottom: spaceX}}>
                    <Text style={{ fontSize: 14, color: 'white', marginBottom: spaceS }}>Name</Text>
                    <TextInput
                        value={contactName}
                        onChangeText={(text: string) => setContactName(text)}
                        style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 16,
                            color: '#eee',
                            textAlign: 'center',
                            backgroundColor: '#fff0',
                            marginBottom: spaceX
                        }}
                    />
                    <Text style={{ fontSize: 14, color: 'white', marginBottom: spaceS }}>Address</Text>
                    <TextInput
                        value={contactAddr}
                        onChangeText={(text: string) => setContactAddr(text)}
                        style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 16,
                            color: '#eee',
                            textAlign: 'center',
                            backgroundColor: '#fff0',
                            marginBottom: spaceX
                        }}
                    />
                </View>}
                <View style={{padding: spaceM, flexDirection: "row", justifyContent: "center"}}>
                    {addState && <Button buttonColor='#333' icon={"cancel"} mode="contained" 
                        onPress={() => cancelAdd()} 
                        style={{ margin: spaceM }}>
                        Cancel
                    </Button>}
                    <Button buttonColor='#333' icon={"plus"} mode="contained" 
                        onPress={() => addContact()} 
                        style={{ margin: spaceM }}>
                        Add
                    </Button>
                </View>
                <FlatList
                    style={{ width: '100%', paddingHorizontal: spaceX}}
                    data={contacts}
                    keyExtractor={(item) => item.address}
                    //@ts-ignore
                    renderItem={(item) => (
                        <TouchableOpacity>
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
            </View>
        </ScrollView>
    )
}

export default ContactScreen;