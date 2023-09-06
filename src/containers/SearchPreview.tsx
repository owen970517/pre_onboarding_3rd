import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import { searchActions } from '../stores/searchList';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { isValidInput } from '../utils/ValidInput';
import { getSearchedList } from '../apis/search';


const SearchPreview = () => {
  const dispatch = useDispatch();
  const { searchValue,filtredList,nowIndex,searchedList,isFocus } = useSelector((state:RootState) => state.searchList)
  const debouncedValue = useDebounce(searchValue,400)
  const isValid = isValidInput(debouncedValue)

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        if(isValid || debouncedValue === '') {
          const response = await getSearchedList(debouncedValue);
          dispatch(searchActions.setFilteredList(response));
          dispatch(searchActions.setNowIndex(-1));
        } 
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };
    fetchAPI();
  }, [debouncedValue, dispatch, isValid]);

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === 'ArrowUp' && nowIndex > -1 ) {
        dispatch(searchActions.setNowIndex(nowIndex - 1));
      } 
      if (event.key === 'ArrowDown' && nowIndex <= filtredList.slice(0,6).length -1  ) {
        dispatch(searchActions.setNowIndex(nowIndex + 1));
      }
      if (event.key ==='Enter' && nowIndex >= 0 ) {
        dispatch(searchActions.setSearchedList(filtredList[nowIndex].sickNm))
        dispatch(searchActions.setIsFocus(false))
        dispatch(searchActions.setSearchValue(''))
        alert(`${filtredList[nowIndex].sickNm}을 검색했습니다.`)
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nowIndex, dispatch, filtredList]);

  return (
    <>
      {isFocus &&
        <Wrapper>
          { searchedList.length <= 0 ?  
            <h1>최근 검색어가 없습니다.</h1>:
            <>
              {searchedList.map((item,index) => (
                <p key={index}>{item}</p>
              ))}
            </> 
          }
          {filtredList.length <= 0 ? 
            <h1>검색어 없음</h1> :
          <StyledList>
            {filtredList.slice(0,7).map((filter,index) => (
              <StyledListItem key={filter.sickCd} $isselected={index === nowIndex}>{filter.sickNm}</StyledListItem>
            ))}
          </StyledList>
          }
        </Wrapper>
      }
    </>
  )
}

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &.selected {
    background-color: rgba(128, 128, 128, 0.1);
  }
  span {
    margin-left: 20px;
  }
`;

const StyledListItem = styled.li<{$isselected:boolean}>`
  padding: 10px;
  cursor: pointer;

  background-color: ${(props) => (props.$isselected ? '#007bff' : 'transparent')};
  color: ${(props) => (props.$isselected ? '#fff' : 'inherit')};

  &:hover {
    background-color: #007bff;
    color : #fff;
  }
`;


export default SearchPreview