import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {addressReducer} from "./addressSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        app: appReducer,
        address: addressReducer
    }
})

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
