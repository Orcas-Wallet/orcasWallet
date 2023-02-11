import AsyncStorage from "@react-native-async-storage/async-storage"
import iCloudStorage from 'react-native-icloudstore';

export const storeData = async (storage_Key, value) => {
    try {
        await AsyncStorage.setItem(storage_Key, value)
    } catch (e) {
        // saving error
    }
}
export const appendData = async (storage_Key, value) => {
    console.log(storage_Key, value, "storage_Key, value")
    try {
        let listStr = await getData(storage_Key)
        const list = JSON.parse(listStr || "[]")
        const tar = list.find((v) => v.toLowerCase() === value.toLowerCase())
        if (!tar) {
            list.push(value)
            await storeData(storage_Key, JSON.stringify(list))
        }
    } catch (error) {

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

export const storeICloudData = async (storage_Key, value) => {
    return AsyncStorage.setItem(storage_Key, value)
}
export const getICloudData = async (storage_Key) => {
    const value = await AsyncStorage.getItem(storage_Key)
    if (value !== null) {
        return value
    } else {
        throw new Error('Not existed')
    }
}