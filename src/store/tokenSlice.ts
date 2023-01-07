import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenInfo } from "../types";

export interface tokenState {
    selectedToken: ITokenInfo,
}

const initialState: tokenState = {
    selectedToken: null,
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateSelectedToken(state, action: PayloadAction<ITokenInfo>) {
            state.selectedToken = action.payload
        }
    }
})

export const { updateSelectedToken } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer