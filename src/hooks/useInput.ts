import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { searchActions } from "../stores/searchList";

export const useInput = () => {
    const dispatch = useDispatch();
    const { searchValue } = useSelector((state:RootState) => state.searchList)
    const handleSearchValue = (value:string) => {
      dispatch(searchActions.setSearchValue(value))
    }
    const handleInputFocus = () => {
      dispatch(searchActions.setIsFocus(true));
    };
    const handleSearched = (e?:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLParagraphElement, MouseEvent> | KeyboardEvent, item?:string) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }
      const searchedValue = item ? item : searchValue
      if (searchedValue !== '') {
        dispatch(searchActions.setSearchedList(searchedValue))
        dispatch(searchActions.setSearchValue(''));
        alert(`${searchedValue}를 검색하셨습니다.`)
      }
    }

    return {
      searchValue,
      handleSearchValue,
      handleInputFocus,
      handleSearched
    };
};