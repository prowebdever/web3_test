import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "../screen/FirstScreen";
import LoginScreen from "../screen/LoginScreen";
import SetupWalletScreen from "../screen/SetupWalletScreen";
import HomeTab from '../screen/main/HomeTab';
import WaitingScreen from "../screen/WaitingScreen";
import ImportWalletScreen from "../screen/importwallet/ImportWalletScreen";
import CreateWalletScreen from "../screen/setupwallet/CreateWalletScreen";
import CreatePasswordScreen from "../screen/setupwallet/CreatePasswordScreen";
import SecureWalletScreen from "../screen/setupwallet/SecureWalletScreen";
import ConfirmSeedScreen from "../screen/setupwallet/ConfirmSeedScreen";
import ContactScreen from "../screen/main/ContactScreen";

// Create a Stack Navigator
const RootStack = createStackNavigator();

// App Navigator Component
const AppNavigator = () => {
    return (
        <RootStack.Navigator
            initialRouteName="FirstScreen"
            screenOptions={{
                // Styling for the header
                headerStyle: {
                    backgroundColor: '#080A0C',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center', // Align title in the center for Android
            }}
        >
            {/* Stack Screens */}
            <RootStack.Screen
                name="HomeTab"
                component={HomeTab}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            <RootStack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            <RootStack.Screen
                name="WaitingScreen"
                component={WaitingScreen}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            {/* Other screens with header and title customization */}
            <RootStack.Screen
                name="SetupWalletScreen"
                component={SetupWalletScreen}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            <RootStack.Screen
                name="CreatePasswordScreen"
                component={CreatePasswordScreen}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            <RootStack.Screen
                name="SecureWalletScreen"
                component={SecureWalletScreen}
                options={{
                    headerShown: false, // Hide the header
                }}
            />
            <RootStack.Screen
                name="ImportWalletScreen"
                component={ImportWalletScreen}
                options={{
                    headerShown: true, // Show the header
                    title: 'Import from Seed', // Customize the title
                }}
            />
            <RootStack.Screen
                name="CreateWalletScreen"
                component={CreateWalletScreen}
                options={{
                    headerShown: false, // Hide the header
                    title: '', // No title
                }}
            />
            <RootStack.Screen
                name="ConfirmSeedScreen"
                component={ConfirmSeedScreen}
                options={{
                    headerShown: true,
                    title: 'Create mew wallet',
                }}
            />
            <RootStack.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    headerShown: true,
                    title: 'Contact List',
                }}
            />
            <RootStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false, // Hide the header
                    title: '', // No title
                }}
            />
        </RootStack.Navigator>
    );
};

export default AppNavigator;
