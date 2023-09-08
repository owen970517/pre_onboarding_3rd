import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../stores/searchList";
import { getSearchedList } from "../apis/search";

export const useSearchedList = (debouncedValue:string,isValid:boolean) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchAPI = async () => {
        try {
          if (isValid || debouncedValue === '') {
            setIsLoading(true);
            const response = await getSearchedList(debouncedValue); 
            dispatch(searchActions.setFilteredList(response));
            dispatch(searchActions.setNowIndex(-1));
          }
        } catch (error) {
          console.error('API 호출 오류:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAPI();
    }, [debouncedValue, dispatch, isValid]);
  
    return {isLoading};
}