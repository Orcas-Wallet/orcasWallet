import * as LocalAuthentication from 'expo-local-authentication'
import sss from 'shamirs-secret-sharing';
export const shortenAddress = (address: string, length = 5) => {
    return address.slice(0, length) + "..." + address.slice(-length)
}
export const shortNumber = (num: number, length = 2) => {
    if (!num) {
        return 0
    }
    if (typeof num === "number") {
        return num.toFixed(length)
    } else {
        return num
    }
}
export const resentStorageKey = (account: string) => {
    if (account) {
        return `resent_${shortenAddress(account)}`
    }
}
export const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export const localAuth = async () => {
    const res = await LocalAuthentication.authenticateAsync({})
    if (res.success) {
        return true
    }
}

export const getShares = async (key: string): Promise<Array<string>> => {
    const secret = Buffer.from(key)
    const shares = sss.split(secret, { shares: 3, threshold: 2 })
    return shares.map((s) => s.toString('base64'))
}
export const recoverShare = (shares: string[]) => {
    return sss.combine(shares.map((s) => Buffer.from(s, 'base64'))).toString()
}
