import { combineReducers, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers, utils } from 'ethers'
import { api, IPendingAccount } from '../services/api'
import { getData, storeData } from '../services/storage'
import { createEthWallets } from '../services/walletAdapter/ethereum'
import { CHAIN_TYPE } from '../types'
import { RootState } from './index'

interface IWallet {
    name: string,
    address: string,
    index: number,
    chain: CHAIN_TYPE
}
export interface AccountState {
    name: string
    pendingAccount?: IPendingAccount
    isLogin: boolean,
    isEnableFaceId: boolean,
    access_token: string,
    account: {
        email: string
        mnemonic: string
        privateKey: string
        publicKey: string,
        wallet_account: number
    } | null,
    wallets: Array<IWallet>
}

const initialState: AccountState = {
    name: 'account',
    access_token: "",
    account: null,
    isLogin: false,
    isEnableFaceId: false,
    wallets: []
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        removePendingAccount: (state) => {
            state.pendingAccount = undefined
        },
        enableFaceId: (state) => {
            state.isEnableFaceId = true
        },
        updateWallets: (state, payload: PayloadAction<IWallet[]>) => {
            state.wallets = payload.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.pendingAccount = action.payload
            })
            .addCase(registerAccount.rejected, (state) => {
                state.pendingAccount = undefined
                state.access_token = ''
            })

        builder.addCase(confirmRegister.fulfilled, (state, action) => {
            const account = {
                email: state.pendingAccount!.email,
                mnemonic: state.pendingAccount!.mnemonic,
                privateKey: state.pendingAccount!.privateKey,
                publicKey: state.pendingAccount!.publicKey,
                wallet_account: 5
            }
            state.account = account
            state.access_token = action.payload.access_token
            state.wallets = action.payload.wallets
            state.isEnableFaceId = false
            state.isLogin = true
            state.pendingAccount = undefined
        }).addCase(confirmRegister.rejected, (state) => {
            state.access_token = ''
            state.pendingAccount = undefined

        })

        builder.addCase(asyncStoredData.fulfilled, (state, action) => {
            state.access_token = action.payload.access_token!
            state.isEnableFaceId = Boolean(action.payload.isEnableFaceId)
        })
        builder.addCase(loginWithToken.fulfilled, (state, action) => {
            state.wallets = action.payload
            state.isLogin = true
        })
        builder.addCase(loginWithToken.rejected, (state) => {
            state.wallets = []
        })
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.isLogin = false
        })
    },
})

export const asyncStoredData = createAsyncThunk("account/asyncStoredData", async () => {
    const access_token = await getData("access_token")
    const isEnableFaceId = await getData("isEnableFaceId")
    return { access_token, isEnableFaceId }
})

export const registerAccount = createAsyncThunk('account/registerAccount', async (email: string) => {
    return api.registerEmail(email)
})

export const confirmRegister = createAsyncThunk('account/confirmRegister', async (code: string) => {
    return api.confirmRegister(code)
})
export const walletSync = createAsyncThunk('account/walletSync', async (code: string) => {
    const res = await api.confirmRegister(code)
    const mnemonic = await getData('mnemonic')
    if (mnemonic) {
        const [wallet] = createEthWallets(1, mnemonic)
    }
})
export const loginWithToken = createAsyncThunk('account/loginWithToken', async (access_token: string) => {
    const _w = await api.loginWithToken(access_token)
    const mnemonic = await getData("mnemonic")
    const wallets = createEthWallets(_w.length, mnemonic!)
    return wallets

})
export const logoutThunk = createAsyncThunk('account/logout', () => {
    return
})

export const selectCurrentAccount = (state: RootState) => state.account.account

export const { enableFaceId } = accountSlice.actions

export const accountReducer = accountSlice.reducer
