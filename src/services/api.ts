import _axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { myCrypto } from './crypto'
import { createRandom } from './generic'
import { store } from '../store'
import { getData, getICloudData, storeData, storeICloudData } from './storage'
import { createSingleWallet, generateEthWallets } from './walletAdapter/ethereum'
import { updateLoading } from '../store/appSlice'
import { getShares, recoverShare } from '../utils/utils'
import { STORAGEKEYS } from './storage/storeKeyMap'

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
    cipher_email?: string
    account?: string
    // sha256
    cipher_account?: string
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
        this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
            store.dispatch(updateLoading(true))
            return config
        })
        this.axios.interceptors.response.use((res: AxiosResponse<IResponseStatus>) => {
            store.dispatch(updateLoading(false))
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
        const [s1, s2, s3] = await getShares(pending.mnemonic)

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
        const wallets = await generateEthWallets(2, pending.mnemonic)
        await this.createWallets(wallets, access_token)
        await storeData(STORAGEKEYS.MNEMONIC, pending.mnemonic)
        await storeData(STORAGEKEYS.ACCESS_TROKEN, access_token)
        await storeData(STORAGEKEYS.SHARE1, s1)
        await storeICloudData(STORAGEKEYS.SHARE2, s2)

        return {
            wallets,
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
        const s1 = await getData(STORAGEKEYS.SHARE1)
        const s2 = await getICloudData(STORAGEKEYS.SHARE2)
        const mnemonic = await recoverShare([s1, s2])
        const wallet = await createSingleWallet(mnemonic)
        const sigMetaData = 'test'
        const sig = await wallet.signMessage(sigMetaData)
        type ResponseData = IBaseResponseData<{}>
        const account = wallet.publicKey
        const res = await this.axios.post<ResponseData>(`/ks/key_info`, { account, cipher_signature: sig, cipher_text: sigMetaData })
        console.log(res)

    }

    private async hash(content: string) {
        return myCrypto.sha256(content)
    }
    async recoverEmail(code: string) {
        type ResponseData = IBaseResponseData<{}>
        const pending = store.getState().account.pendingAccount

        const [cipher_code, hashed_email] = await Promise.all([
            this.hash(code),
            pending.email,
        ])
        await this.axios.post<ResponseData>(`/ks/recover_email`, {
            "session_id": pending.session_id,
            hashed_email,
            "cipher_email": pending.email,
            cipher_code
        })
    }
    async getRecoverEmailCode(email: string) {
        const s1 = await getData(STORAGEKEYS.SHARE1)
        const s2 = await getICloudData(STORAGEKEYS.SHARE2)
        const mnemonic = await recoverShare([s1, s2])
        const wallet = await createSingleWallet(mnemonic)
        const sessionId = await this.hash(wallet.publicKey)
        type ResponseData = IBaseResponseData<{}>
        const [session_id, cipher_email] = await Promise.all([
            this.hash(wallet.publicKey),
            wallet.publicKey,
        ])
        await this.axios.post<ResponseData>(`/ks/recover_email_confirm`, {
            session_id,
            cipher_email: cipher_email,
        })
        return {
            cipher_email,
            email,
            sessionId,
        }
    }
}

export const api = new Api()
