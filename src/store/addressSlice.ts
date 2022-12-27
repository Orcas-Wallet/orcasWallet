import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addressState {
    chainAddressSelectorVisiable: boolean
    selectedAddress: string,
    selectedChain: string
}

const initialState: addressState = {
    chainAddressSelectorVisiable: false,
    selectedAddress: '',
    selectedChain: '',
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        toggleChainAddressSelectorVisiable(state, action: PayloadAction<boolean>) {
            console.log(action)
            state.chainAddressSelectorVisiable = action.payload
        },
        updateSelectedChain(state, action: PayloadAction<string>) {
            state.selectedChain = action.payload
        },
        updateSelectedAddress(state, action: PayloadAction<string>) {
            state.selectedAddress = action.payload
        }
    }
})

export const { toggleChainAddressSelectorVisiable } = addressSlice.actions

export const addressReducer = addressSlice.reducer