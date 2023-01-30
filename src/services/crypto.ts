import * as ExpoCrypto from "expo-crypto";

export class MyCrypto {
  md5(data: string) {
    return this.digest(data, ExpoCrypto.CryptoDigestAlgorithm.MD5);
  }

  sha256(data: string) {
    return this.digest(data, ExpoCrypto.CryptoDigestAlgorithm.SHA256);
  }

  private digest(data: string, algorithm: ExpoCrypto.CryptoDigestAlgorithm) {
    return ExpoCrypto.digestStringAsync(algorithm, data);
  }
}

export const myCrypto = new MyCrypto();

export const getMd5 = async (str: string) => {
  return myCrypto.md5(str);
};