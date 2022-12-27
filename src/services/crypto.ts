import * as Crypto from 'expo-crypto';

export const getMd5 = async (str: string) => {
    return Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        str
    )
}