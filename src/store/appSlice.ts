import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    name: string,
    loading: boolean
}

const initialState: AppState = {
    name: 'app',
    loading: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        updateLoading (state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

export const { updateName, updateLoading } = appSlice.actions

export const appReducer = appSlice.reducer