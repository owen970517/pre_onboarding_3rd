import React from 'react'
import styled from 'styled-components';
import SearchIcon from './SearchIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { useInput } from '../hooks/useInput';

const LatestList = () => {
    const {searchedList} = useSelector((state:RootState) => state.searchList)
    const {handleSearched} = useInput()

  return (
    <>
    <SectionTitle>최근 검색어</SectionTitle>
    {searchedList.map((item,index) => (
      <LastestContainer key={index} >
        <SearchIcon size={16}/>
        <LatestItem 
        onClick={(e) => handleSearched(e,item)}
        >{item}</LatestItem>
      </LastestContainer>
    ))}
  </> 
  )
}

const SectionTitle = styled.div`
  width: 90%;
  padding: 15px 4px 8px 4px;
  margin: 6px auto;
  font-size: 12px;
  font-weight: 700;
  color: #53585d;
`;

const LastestContainer = styled.div`
  padding: 10px 25px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #d3d4d6;
  }
`

const LatestItem = styled.p`
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
`
export default LatestList