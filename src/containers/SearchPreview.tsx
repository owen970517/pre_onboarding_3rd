import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import { searchActions } from '../stores/searchList';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { isValidInput } from '../utils/ValidInput';
import { useSearchedList } from '../hooks/useSearchedList';
import { useInput } from '../hooks/useInput';
import LatestList from '../components/LatestList';
import RecommendList from '../components/RecommendList';
import PreviewList from '../components/PreviewList';

const SearchPreview = () => {
  const dispatch = useDispatch();
  const { searchValue,filtredList,nowIndex,searchedList,isFocus } = useSelector((state:RootState) => state.searchList)
  const {handleSearched} = useInput()
  const debouncedValue = useDebounce(searchValue,400)
  const isValid = isValidInput(debouncedValue)
  const {isLoading} = useSearchedList(debouncedValue,isValid)
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === 'ArrowUp' && nowIndex >= 0 ) {
        event.preventDefault();
        dispatch(searchActions.setNowIndex(nowIndex-1));
      } 
      if (event.key === 'ArrowDown' && nowIndex <= filtredList.slice(0,6).length -1  ) {
        dispatch(searchActions.setNowIndex(nowIndex+1));
      }
      if (event.key ==='Enter' && nowIndex >= 0 ) {
        handleSearched(event,filtredList[nowIndex].sickNm)
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nowIndex, dispatch, filtredList]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        dispatch(searchActions.setIsFocus(false))
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      {isFocus &&
        <RecommendContainer ref={searchRef}>
          {isLoading && <SectionTitle>검색중...</SectionTitle>}
          {searchedList.length !== 0 && debouncedValue === '' && <LatestList/> }
          {searchedList.length ===0 && !debouncedValue && <SectionTitle>최근 검색어가 없습니다.</SectionTitle>}
          {debouncedValue === '' && <RecommendList/>}
          {filtredList.length <= 0 && debouncedValue !== '' && !isLoading ? <SectionTitle>검색어 없음</SectionTitle> :<PreviewList/>}
        </RecommendContainer>
      }
    </>
  )
}

const RecommendContainer = styled.div`
  padding: 20px 0;
  margin-top: 5px;
  width: 490px;
  border-radius: 30px;
  background-color: #ffffff;
  svg {
    color: gray;
  }
`;

const SectionTitle = styled.div`
  width: 90%;
  padding: 15px 4px 8px 4px;
  margin: 6px auto;
  font-size: 12px;
  font-weight: 700;
  color: #53585d;
`;


export default SearchPreview