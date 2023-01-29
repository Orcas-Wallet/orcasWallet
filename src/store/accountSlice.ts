import { combineReducers, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, IPendingAccount } from '../services/api'
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
            state.isLogin = true
            state.pendingAccount = undefined
            state.wallets = createEthWallets(account.mnemonic, account.wallet_account)
        }).addCase(confirmRegister.rejected, (state) => {
            state.access_token = ''
            state.pendingAccount = undefined
        })
    },
})

export const registerAccount = createAsyncThunk('account/registerAccount', async (email: string) => {
    return api.registerEmail(email)
})

export const confirmRegister = createAsyncThunk('account/confirmRegister', async (code: string) => {
    return api.confirmRegister(code)
})

export const selectCurrentAccount = (state: RootState) => state.account.account

export const { enableFaceId } = accountSlice.actions

export const accountReducer = accountSlice.reducer
