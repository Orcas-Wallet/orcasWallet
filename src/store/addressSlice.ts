import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenListByAddress } from "../services/alchemy";
import { CHAIN_TYPE, IAddressInfo } from "../types";
import { TTokens } from "../utils/tokens/const";

export interface addressState {
    chainAddressSelectorVisiable: boolean
    selectedAddress: IAddressInfo,
    selectedChain: string,
    tokenBalance: Partial<Record<TTokens, string>>,

}

const initialState: addressState = {
    chainAddressSelectorVisiable: false,

    selectedAddress: {
        index: 0,
        name: "",
        address: "",
        chain: CHAIN_TYPE.ETHEREUM
    },
    selectedChain: CHAIN_TYPE.ETHEREUM,
    tokenBalance: {
        Tether: "0",
        Ethereum: "0",
        WETH: "0",
        "USD Coin": "0"
    },
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        toggleChainAddressSelectorVisiable(state, action: PayloadAction<boolean>) {
            state.chainAddressSelectorVisiable = action.payload
        },
        updateSelectedChain(state, action: PayloadAction<string>) {
            state.selectedChain = action.payload
        },
        updateSelectedAddress(state, action: PayloadAction<IAddressInfo>) {
            state.selectedAddress = action.payload
        },
        updateTokenBalance(state, action: PayloadAction<Record<TTokens, string>>) {
            state.tokenBalance = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTokenBalance.fulfilled, (state, action) => {
            state.tokenBalance = action.payload
        })
    },
})
export const fetchTokenBalance = createAsyncThunk(
    'address/coinBalance',
    async (address: string, thunkAPI) => {
        const balance = await getTokenListByAddress(address)
        console.log(balance)
        return balance
    }
)

export const { toggleChainAddressSelectorVisiable, updateSelectedChain, updateSelectedAddress, updateTokenBalance } = addressSlice.actions

export const addressReducer = addressSlice.reducer