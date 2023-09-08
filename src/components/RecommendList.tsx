import React from 'react'
import styled from 'styled-components'
import { useInput } from '../hooks/useInput'
import { RecommendListItems } from '../constants/api'

const RecommendList = () => {
    const {handleSearched} = useInput()
  return (
    <>
        <Styledhr />
        <SectionTitle>추천 검색어로 검색해보세요</SectionTitle>
        <RecommendLists>
        {RecommendListItems.map((item,index) => (
            <RecommendItem key={index} onClick={(e) => handleSearched(e,item)}>{item}</RecommendItem>
        ))}
        </RecommendLists>
    </>
  )
}
const RecommendLists = styled.div`
  padding : 10px;
  display: flex;
`

const RecommendItem = styled.p`
  margin-left: 10px;
  background-color: #b2f6f7;
  color : #007bff;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
`
const SectionTitle = styled.div`
  width: 90%;
  padding: 15px 4px 8px 4px;
  margin: 6px auto;
  font-size: 12px;
  font-weight: 700;
  color: #53585d;
`;

const Styledhr = styled.hr`
  width: 100%;
  border : 1px solid #d3d4d6;
`
export default RecommendList