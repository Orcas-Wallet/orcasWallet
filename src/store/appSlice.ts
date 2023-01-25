import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    name: string
}

const initialState: AppState = {
    name: 'app',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const { updateName } = appSlice.actions

export const appReducer = appSlice.reducer