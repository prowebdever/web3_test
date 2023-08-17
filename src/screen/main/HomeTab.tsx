import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import WalletScreen from './WalletScreen';
import SendScreen from './SendScreen';
import SwapScreen from './SwapScreen';
import SettingScreen from './SettingScreen';

const HomeTabStack = createBottomTabNavigator();
const WalletStack = createStackNavigator();
const SwapStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const WalletStackScreen = () => {
    return (
        <WalletStack.Navigator
            initialRouteName='WalletScreen'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#080A0C',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center', // for android
            }}
        >
            <WalletStack.Screen
                name='WalletScreen'
                component={WalletScreen}
                options={{
                    headerShown: false
                }}
            />
            <WalletStack.Screen
                name='SendScreen'
                component={SendScreen}
                options={{
                    title: 'Send To',
                    headerShown: true,
                    headerTintColor: 'white',
                }}
            />
        </WalletStack.Navigator>
    )
}

const SwapStackScreen = () => {
    return (
        <SwapStack.Navigator 
            initialRouteName='SwapScreen'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#080A0C',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center', // for android
            }}
        >
            <SwapStack.Screen name='SwapScreen' component={SwapScreen} />
        </SwapStack.Navigator>
    )
}

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator 
            initialRouteName='SettingsScreen'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#080A0C',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center', // for android
            }}
        >
            <SwapStack.Screen name='SettingsScreen' component={SettingScreen} />
        </SettingsStack.Navigator>
    )
}

const HomeTab = () => {
    return (
        <HomeTabStack.Navigator
            initialRouteName='WalletStack'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#080A0C',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                tabBarStyle: {
                    backgroundColor: '#080A0C',
                    height: 64,
                    borderTopWidth: 0,
                    borderColor: '#000',
                    //@ts-ignore
                    tabBarActiveTintColor: '#76E268',
                    tabBarInactiveTintColor: 'white'
                }
            }}
        >
            <HomeTabStack.Screen
                name='WalletStack'
                component={WalletStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='wallet' size={24} color={color} />
                    )
                }}
            />
            <HomeTabStack.Screen
                name='SwapStack'
                component={SwapStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Swap',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='swap' size={24} color={color} />
                    )
                }}
            />
            <HomeTabStack.Screen
                name='SettingsStack'
                component={SettingsStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name='setting' size={24} color={color} />
                    )
                }}
            />
        </HomeTabStack.Navigator>
    )
}

export default HomeTab;