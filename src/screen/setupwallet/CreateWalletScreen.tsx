import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ViewToken } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ConfirmSeedScreen from './ConfirmSeedScreen';

const stepIndicatorStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#3D8DFF',
    separatorFinishedColor: '#3D8DFF',
    separatorUnFinishedColor: '#202832',
    stepIndicatorFinishedColor: '#3D8DFF',
    stepIndicatorUnFinishedColor: '#202832',
    stepIndicatorCurrentColor: '#3D8DFF',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#202832',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 5,
    currentStepLabelColor: '#3D8DFF'
}

const CreateWalletScreen = () => {
    const [currentPage, stCurrentPage] = useState(0);

    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#080A0C' }}>
            <View style={{ width: '100%', height: '10%', justifyContent: 'center' }}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={3}
                    direction='horizontal'
                    currentPosition={currentPage}
                    labels={["", "", ""]}
                    onPress={(step: number) => {
                        stCurrentPage(step)
                    }}
                />
            </View>
            <View style={{ width: '100%', height: '90%' }}>
                <ConfirmSeedScreen />
            </View>
        </View>
    )
};

export default CreateWalletScreen;