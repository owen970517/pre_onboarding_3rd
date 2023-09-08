import { createSlice } from "@reduxjs/toolkit";
import { searchProps } from "../types/search";

const initialSearchState = {
    nowIndex : -1,
    searchValue : '' ,
    isFocus : false,
    searchedList : [] as string[],
    searchList : [] as searchProps[],
    filtredList : []  as searchProps[],
}

const searchSlice = createSlice({
    name : 'searchState',
    initialState :initialSearchState,
    reducers : {
        setNowIndex(state,action) {
            state.nowIndex = action.payload
        },
        setSearchValue(state,action) {
            state.searchValue = action.payload
        },
        setIsFocus(state,action) {
            state.isFocus = action.payload
        },
        setSearchedList(state,action) {
            const addItem = action.payload
            const existingIndex = state.searchedList.indexOf(addItem)
            if (existingIndex !== -1) {
                state.searchedList.splice(existingIndex,1)
            }
            if (state.searchedList.length >= 7) {
                state.searchedList.pop()
            }
            state.searchedList = [action.payload,...state.searchedList]
        },
        setSearchList(state,action) {
            state.searchList = action.payload
        },
        setFilteredList(state,action) {
            state.filtredList = action.payload
        }
    }
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer