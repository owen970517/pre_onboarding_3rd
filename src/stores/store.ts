import { configureStore } from "@reduxjs/toolkit";
import searchSlice from './searchList'

export const store = configureStore({
    reducer : {
        searchList : searchSlice,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;