import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {addressReducer} from "./addressSlice";
import {tokenReducer} from "./tokenSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        app: appReducer,
        address: addressReducer,
        token: tokenReducer
    },
    middleware: [thunk],

})

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector