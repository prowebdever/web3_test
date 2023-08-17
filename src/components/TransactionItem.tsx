import { View, Text, TouchableOpacity } from "react-native";
import { TransactionType } from "utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import { spaceM, spaceS, spaceL, spaceX } from "../styles";
import { useContext } from 'react';
import AppContext from "../context/AppContext";
import { shortBalance, timestampToDate } from "../utils/common";

const TransactionItem = ({ index, item, clickTransaction }: {index: number, item: TransactionType, clickTransaction: Function }) => {
    return (
        <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', padding: 5, marginBottom: spaceM }}>
            <View>
                <Text style={{ fontSize: 14, color: 'gray' }}>{timestampToDate(item.time)}</Text>
            </View>
            <TouchableOpacity onPress={() => { clickTransaction(item.id) }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', padding: 5 }}>
                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            item.action === 'Received' ?
                                <MaterialIcons name="call-received" size={32} color="#aaa" /> :
                                <MaterialIcons name="call-made" size={32} color="#aaa" />
                        }
                    </View>
                    <View style={{ flex: 3, alignSelf: 'flex-start' }}>
                        <Text style={{ marginEnd: spaceS, color: 'white', marginBottom: spaceM }}>{item.action === "Received" ? "Received" : "Sent"} {item.tokenID}</Text>
                        <Text style={{ color: item.status === 'Confirmed' ? 'green' : item.status === 'Cancelled' ? 'red' : 'white' }}>{item.status}</Text>
                    </View>
                    <View style={{ flex: 3, alignSelf: 'flex-end' }}>
                        <Text style={{ color: 'white', textAlign: 'right', marginBottom: spaceM }}>{`${shortBalance(item.balance)} ${item.tokenID}`}</Text>
                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'right' }}>${shortBalance(item.usdBalance)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TransactionItem;
