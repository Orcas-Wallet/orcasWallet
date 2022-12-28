import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAIN_TYPE, IAddressInfo } from "../types";

export interface addressState {
    chainAddressSelectorVisiable: boolean
    selectedAddress: IAddressInfo,
    selectedChain: string
}

const initialState: addressState = {
    chainAddressSelectorVisiable: false,
    selectedAddress: {
        name: "",
        address: "",
        chain: CHAIN_TYPE.ETHEREUM
    },
    selectedChain: CHAIN_TYPE.ETHEREUM,
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
            console.log(action.payload)
            state.selectedAddress = action.payload
        }
    }
})

export const { toggleChainAddressSelectorVisiable, updateSelectedChain, updateSelectedAddress } = addressSlice.actions

export const addressReducer = addressSlice.reducer