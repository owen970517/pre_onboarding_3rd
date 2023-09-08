import React from 'react'
import { useInput } from '../hooks/useInput'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import styled from 'styled-components'
import SearchIcon from './SearchIcons'

const PreviewList = () => {
    const { filtredList,nowIndex} = useSelector((state:RootState) => state.searchList)
    const {handleSearched} = useInput()
  return (
    <>
        {filtredList.slice(0,7).map((filter,index) => (
            <ListConatiner key={filter.sickCd}  $isselected={index === nowIndex}>
                <SearchIcon size={16}/>
                <StyledListItem 
                onClick={(e) => handleSearched(e,filter.sickNm)}>
                {filter.sickNm}
                </StyledListItem>
            </ListConatiner>
        ))}
    </>
  )
}

const ListConatiner = styled.div<{$isselected:boolean}>`
  padding: 10px 25px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.$isselected ? '#d3d4d6' : 'transparent')};
  &:hover {
    background-color: #d3d4d6;
  }
`
const StyledListItem = styled.p`
  margin-left: 10px;
  color: #53585d;
  cursor: pointer;
`;

export default PreviewList