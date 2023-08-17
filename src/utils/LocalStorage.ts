import AsyncStorage from '@react-native-async-storage/async-storage'

export const setValue = async (key: string, value: object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
}

export const getValue = async (key: string) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(key));
    } catch (error) {
    }
}

export const clearValue = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        
    }
}