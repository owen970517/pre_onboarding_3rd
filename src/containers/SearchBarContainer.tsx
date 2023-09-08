import React from 'react'
import styled from 'styled-components'
import { useInput } from '../hooks/useInput'
import SearchIcon from '../components/SearchIcons';

const SearchBarContainer = () => {
  const { searchValue, handleSearchValue, handleInputFocus,handleSearched } = useInput();

  return (
    <SearchBar onSubmit={(e) => handleSearched(e)}>
      <SearchIcon size={16} />
      <input placeholder='질환명을 입력하시오' type='text' value ={searchValue} onChange={(e) => handleSearchValue(e.target.value)} onFocus={handleInputFocus} />
      <button type='submit'>
        <SearchIcon size={16} />
      </button>
    </SearchBar>
  )
}

const SearchBar = styled.form`
  width: 490px;
  height: 75px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 25px;
  border-radius: 50px;
  border: none;
  box-sizing: border-box;
  & > svg {
    color: gray;
    flex: none;
  }

  input {
    width: 100%;
    border: none;
    margin-left: 10px;
    font-size: 17px;
    outline: none;
  }
  button {
    color: #ffffff;
    background-color: #007be9;
    border: 0;
    cursor: pointer;
    border-radius: 100%;
    width: 55px;
    height: 48px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
`

export default SearchBarContainer