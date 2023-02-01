import _axios, { AxiosInstance, AxiosResponse } from 'axios'
import { myCrypto } from './crypto'
import { createRandom } from './generic'
import { store } from '../store'
import { getData, storeData } from './storage'
import { createEthWallets } from './walletAdapter/ethereum'

interface IResponseStatus {
    status: 'success' | 'fail'
}

type IBaseResponseData<T = any> = IResponseStatus & T

interface IWallet {
    name: string
    addr: string
    status: string
}

interface RegisterEmailRequestData {
    session_id: string
    // sha256
    cipher_email: string
    // 公钥
    account: string
    // sha256
    cipher_account: string
}

export interface IPendingAccount
    extends RegisterEmailRequestData,
    Awaited<ReturnType<typeof createRandom>> {
    email: string
}

export class Api {
    private axios: AxiosInstance

    constructor() {
        this.axios = _axios.create({
            baseURL:
                process.env.NODE_ENV === 'development'
                    ? 'https://demo.keysafe.network'
                    : 'https://demo.keysafe.network',
        })
        this.axios.interceptors.response.use((res: AxiosResponse<IResponseStatus>) => {
            if (res.status !== 200) throw res
            if (res.data.status === 'fail') throw res.data
            return res
        })
    }

    async getWallets() {
        const access_token = await this.getAccessToken()

        interface RequestData {
            access_token: string
        }

        const data = { access_token } as RequestData

        type ResponseData = IBaseResponseData<{ wallets: IWallet[] }>
        const res = await this.axios.post<ResponseData>(`ks/wallet_info`, data)
        return res.data.wallets
    }

    async getKeystore(text: string) {
        // @TODO
        const account = ''

        interface RequestData {
            account: string
            cipher_text: string
            cipher_signature: string
        }

        const [cipher_text, cipher_signature] = await Promise.all([this.hash(text), this.sign(text)])
        const data = {
            account,
            cipher_text,
            cipher_signature,
        } as RequestData

        type ResponseData = IBaseResponseData<{
            keystore: {
                account: string
                cipher_email: string
                cipher_share: string
                hashed_email: string
                access_token: string
            }
        }>
        const res = await this.axios.post<ResponseData>(`ks/key_info`, data)
        return res.data.keystore
    }

    async registerEmail(email: string): Promise<IPendingAccount> {


        const account = createRandom()
        const [session_id, cipher_account, cipher_email] = await Promise.all([
            this.hash(account.publicKey),
            account.publicKey,
            email,
        ])
        const data = {
            session_id,
            cipher_email,
            account: account.publicKey,
            cipher_account,
        } as RegisterEmailRequestData

        type ResponseData = IBaseResponseData<{}>
        const res = await this.axios.post<ResponseData>(`ks/register_email`, data)
        console.log(res, "res")
        if (res.data.status === 'fail') throw new Error(`register email failed ${res.data}`)
        return {
            email,
            ...data,
            ...account,
        }
    }

    async confirmRegister(code: string) {
        const pending = store.getState().account.pendingAccount
        if (!pending) throw new Error(`register email first.`)

        // split pending.mnemonic
        const s3 = ''
        interface RequestData {
            session_id: string
            account: string
            cipher_code: string
            cipher_share: string
            hashed_email: string
            cipher_email: string
        }

        const [cipher_code, cipher_share, hashed_email] = await Promise.all([code, s3, this.hash(pending.email)])
        const data = {
            session_id: pending.session_id,
            account: pending.account,
            cipher_code,
            cipher_share,
            cipher_email: pending.cipher_email,
            hashed_email: hashed_email,
        } as RequestData

        type ResponseData = IBaseResponseData<{
            access_token: string
        }>

        const res = await this.axios.post<ResponseData>(`ks/register_email_confirm`, data)
        if (res.data.status === 'fail') throw new Error(`confirm register failed ${res.data}`)
        const access_token = res.data.access_token
        const ws = await createEthWallets(2, pending.mnemonic)
        await this.createWallets(ws, access_token)
        storeData("mnemonic", pending.mnemonic)
        storeData("access_token", access_token)

        return {
            wallets: ws,
            access_token
        }
    }

    async loginWithToken(access_token: string) {
        type ResponseData = IBaseResponseData<
            {
                wallets: Array<
                    {
                        name: string,
                        addr: string,
                        status: string
                    }>
            }
        >
        const data = { access_token }
        const res = await this.axios.post<ResponseData>(`ks/wallet_info`, data)
        console.log(res)
        return res.data.wallets
    }

    // @TODO
    private async getAccessToken() {
        return ''
    }
    async createWallets(_ws, access_token) {
        type ResponseData = IBaseResponseData<{}>
        console.log(_ws)
        const wallets = _ws.map((_w) => ({
            name: _w.name,
            addr: _w.address,
            index: _w.index.toString(),
            status: "0"
        }))
        const res = await this.axios.post<ResponseData>(`/ks/create_wallet`, {
            access_token,
            wallets
        })
        console.log(res)

    }

    // @TODO
    private async sign(text: string) {
        return ''
    }
    private async loginWithEmail() {

    }
    async loginWithSignature() {
        const s1 = await getData('share1')
        const s2 = await getData('share2')
        // const s3 = await this.getKeystore()

    }

    private async hash(content: string) {
        return myCrypto.sha256(content)
    }
    private async splitM(str) {
        const s1 = str.slice(0, 10)
        const s2 = str.slice(10)
        const s3 = s2
        return [s1, s2, s3]
    }
}

export const api = new Api()
