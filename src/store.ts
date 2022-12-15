import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {useDispatch, useSelector} from "react-redux";
import {EqualityFn} from "react-redux/src/types";

export const store = configureStore({
    reducer: {
        app: appReducer
    }
})

type RootState = ReturnType<typeof store.getState>

export const useAppSelector: <Selected = unknown>(
    selector: (state: RootState) => Selected,
    equalityFn?: EqualityFn<Selected>
) => Selected = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>