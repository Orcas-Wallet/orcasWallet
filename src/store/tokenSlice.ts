import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TokenMetadataResponse } from "alchemy-sdk";
import { getTokenPrice } from "../services/coingecko";
import { ITokenInfo } from "../types";
import { TTokens } from "../utils/tokens/const";

export interface tokenState {
    ethPrice: string,
    tokenPrice: Record<TTokens, { "usd": string }>,
    selectedToken: ITokenInfo,
    tokenMetaDatas: TokenMetadataResponse[],
}

const initialState: tokenState = {
    ethPrice: "0",
    tokenPrice: {
        Tether: { usd: '1' },
        Ethereum: { usd: '0' },
        WETH: { usd: '0' },
        "USD Coin": { usd: '1' }
    },
    selectedToken: null,
    tokenMetaDatas: []
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateSelectedToken(state, action: PayloadAction<ITokenInfo>) {
            state.selectedToken = action.payload
        },
        updateTokenPrice(state, action: PayloadAction<Record<TTokens, { "usd": string }>>) {
            state.tokenPrice = { ...state.tokenPrice, ...action.payload }
            state.ethPrice = state.tokenPrice.Ethereum.usd
        },

    }
})

export const { updateSelectedToken, updateTokenPrice } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer