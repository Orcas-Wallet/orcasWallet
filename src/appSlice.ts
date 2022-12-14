import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
    name: string
}

const initialState: AppState = {
    name: 'app'
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload
        }
    }
})

export const {updateName} = appSlice.actions

export const appReducer = appSlice.reducer