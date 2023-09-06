import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { searchActions } from "../stores/searchList";

export const useInput = () => {
    const dispatch = useDispatch();
    const { searchValue, nowIndex } = useSelector((state:RootState) => state.searchList)
    const handleSearchValue = (value:string) => {
        dispatch(searchActions.setSearchValue(value))
    }
    const handleInputFocus = () => {
        dispatch(searchActions.setIsFocus(true));
    };
    const handleInputBlur = () => {
        dispatch(searchActions.setIsFocus(false));
    };
    const handleSearched = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (nowIndex < 0) {
          dispatch(searchActions.setSearchedList(searchValue))
          dispatch(searchActions.setSearchValue(''));
          alert(`${searchValue}를 검색하셨습니다.`)
        }
      }
    return {
      searchValue,
      handleSearchValue,
      handleInputFocus,
      handleInputBlur,
      handleSearched
    };
};