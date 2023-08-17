import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput, Switch, Checkbox } from 'react-native-paper';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    isActive?: boolean,
    buttonText: string,
    onPressAction?: () => void
}

const CustomButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPressAction} style={{ alignSelf: 'center', width: '90%' }}>
            <View style={{ height: 40, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {
                    props.isActive ?
                        <LinearGradient
                            colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ width: '100%', height: '100%', backgroundColor: '#202832', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>{props.buttonText}</Text>
                        </LinearGradient> :
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#202832', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>{props.buttonText}</Text>
                        </View>
                }
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton;
