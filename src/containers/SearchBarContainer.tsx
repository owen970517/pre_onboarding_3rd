import React from 'react'
import styled from 'styled-components'
import { useInput } from '../hooks/useInput'

const SearchBarContainer = () => {
  const { searchValue, handleSearchValue, handleInputFocus, handleInputBlur,handleSearched } = useInput();

  return (
    <Wrapper onSubmit={(e) => handleSearched(e)}>
      <input placeholder='질환명을 입력하시오' type='text' value ={searchValue} onChange={(e) => handleSearchValue(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur}/>
      <button>검색</button>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display :flex;
  justify-content: center;
  align-items: center;
`

export default SearchBarContainer