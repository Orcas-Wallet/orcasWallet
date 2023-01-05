import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (storage_Key, value) => {
    try {
        await AsyncStorage.setItem(storage_Key, value)
    } catch (e) {
        // saving error
    }
}


export const getData = async (storage_Key) => {
    try {
        const value = await AsyncStorage.getItem(storage_Key)
        if (value !== null) {
            return value
        } else {
            throw new Error('Not existed')
        }
    } catch (e) {
        console.log(e)
    }
}