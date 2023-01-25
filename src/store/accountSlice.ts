import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, IPendingAccount } from '../services/api'
import { RootState } from './index'

export interface AccountState {
    name: string
    pendingAccount?: IPendingAccount
    currentIndex: number
    accounts: Array<{
        email: string
        access_token: string
        mnemonic: string
        privateKey: string
        publicKey: string
    }>
}

const initialState: AccountState = {
    name: 'account',
    currentIndex: -1,
    accounts: [],
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        removePendingAccount: (state) => {
            state.pendingAccount = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.pendingAccount = action.payload
            })
            .addCase(registerAccount.rejected, (state) => {
                state.pendingAccount = null
            })

        builder.addCase(confirmRegister.fulfilled, (state, action) => {
            const account = {
                email: state.pendingAccount.email,
                access_token: action.payload.access_token,
                mnemonic: state.pendingAccount.mnemonic,
                privateKey: state.pendingAccount.privateKey,
                publicKey: state.pendingAccount.publicKey,
            }
            if (state.currentIndex < 0) {
                state.currentIndex = 0
            }
            state.accounts = [
                ...state.accounts.slice(0, state.currentIndex),
                account,
                ...state.accounts.slice(state.currentIndex),
            ]
        })
    },
})

export const registerAccount = createAsyncThunk('account/registerAccount', async (email: string) => {
    return api.registerEmail(email)
})

export const confirmRegister = createAsyncThunk('account/confirmRegister', async (code: string) => {
    return api.confirmRegister(code)
})

export const selectCurrentAccount = (state: RootState) => state.account.accounts[state.account.currentIndex]

export const {} = accountSlice.actions

export const accountReducer = accountSlice.reducer
