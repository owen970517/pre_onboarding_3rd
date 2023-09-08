import React from 'react'
import SearchPreview from '../containers/SearchPreview';
import SearchBarContainer from '../containers/SearchBarContainer';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeContainer>
      <HomeHeader>
        국내 모든 임상실험 검색하고 <br /> 온라인으로 참여하기
      </HomeHeader>
      <SearchSection>
        <SearchBarContainer/>
        <SearchPreview/>
      </SearchSection>
    </HomeContainer>
  )
}

const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

const HomeHeader = styled.h1`
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 1.6;
    margin-bottom: 20px;
`;
const SearchSection = styled.section`

`;
export default Home