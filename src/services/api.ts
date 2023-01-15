import _axios, { AxiosInstance, AxiosResponse } from "axios";
import { myCrypto } from "./crypto";

interface ResponseStatus {
  status: "success" | "fail";
}

type BaseResponseData<T = any> = ResponseStatus & T

interface IWallet {
  name: string;
  addr: string;
  status: string;
}

export class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = _axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? "https://demo.keysafe.network/"
          : "https://demo.keysafe.network/"
    });
    this.axios.interceptors.response.use((res: AxiosResponse<ResponseStatus>) => {
      if (res.status !== 200) throw res;
      if (res.data.status === "fail") throw res.data;
      return res;
    });
  }

  async getWallets() {
    const access_token = await this.getAccessToken();

    interface RequestData {
      access_token: string;
    }

    const data = { access_token } as RequestData;

    type ResponseData = BaseResponseData<{ wallets: IWallet[] }>
    const res = await this.axios.post<ResponseData>(`ks/wallet_info`, data);
    return res.data.wallets;
  }

  async getKeystore(text: string) {
    // @TODO
    const account = "";

    interface RequestData {
      account: string;
      cipher_text: string;
      cipher_signature: string;
    }

    const [cipher_text, cipher_signature] = await Promise.all([
      this.hash(text),
      this.sign(text)
    ]);
    const data = {
      account,
      cipher_text,
      cipher_signature
    } as RequestData;

    type ResponseData = BaseResponseData<{
      keystore: {
        account: string
        cipher_email: string
        cipher_share: string
        hashed_email: string
        access_token: string
      }
    }>
    const res = await this.axios.post<ResponseData>(`ks/key_info`, data);
    return res.data.keystore;
  }

  async registerEmail(email: string, account: string) {
    // @TODO
    const session = "";

    interface RequestData {
      session_id: string;
      account: string;
      cipher_account: string;
      cipher_email: string;
    }

    const [cipher_account, cipher_email] = await Promise.all([
      this.hash(account),
      this.hash(email)
    ]);
    const data = {
      session_id: session,
      account,
      cipher_account,
      cipher_email
    } as RequestData;

    type ResponseData = BaseResponseData
    const res = await this.axios.post<ResponseData>(`ks/register_email`, data);
    return res.data;
  }

  async confirmRegisterEmail(email: string, code: string, account: string, share: string) {
    // @TODO
    const session = "";

    interface RequestData {
      session_id: string;
      account: string;
      cipher_code: string;
      cipher_share: string;
      hashed_email: string;
      cipher_email: string;
    }

    const [cipher_code, cipher_share, cipher_email] = await Promise.all([
      this.hash(code),
      this.hash(share),
      this.hash(email)
    ]);
    const data = {
      session_id: session,
      account,
      cipher_code,
      cipher_share,
      cipher_email,
      hashed_email: cipher_email
    } as RequestData;

    type ResponseData = BaseResponseData<{
      access_token: string;
    }>
    const res = await this.axios.post<ResponseData>(`ks/register_email_confirm`, data);
    return res.data;
  }


  // @TODO
  private async getAccessToken() {
    return "";
  }

  // @TODO
  private async sign(text: string) {
    return "";
  }

  private async hash(content: string) {
    return myCrypto.sha256(content);
  }
}

export const api = new Api();
