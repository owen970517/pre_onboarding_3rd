# 원티드 프론트엔드 프리온보딩 인턴십 3주차 개인과제

## 1. 실행 방법

### `제공해주신 api 연결`
- git clone https://github.com/walking-sunset/assignment-api.git
- npm install 
- npm start 

- git clone https://github.com/owen970517/pre_onboarding_3rd.git
- npm install
- npm start

## 2. 사용한 라이브러리
- React
- TypeScript
- redux-toolkit 
- react-router-dom
- styled-components


## 3. 실행 화면
<div align="center" >
    <img width='600px' height='600px' src="https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-3-11/assets/75247323/15827013-ae13-45f0-aafe-6587cbab7768" />
</div>

## 4. 주요 기능

### `검색어 추천`
> - 사용자의 편의를 위해 질환명에 대한 검색어 추천 기능을 제공합니다.
> - 입력한 검색어에 대응하는 추천 검색어가 없을 경우, 검색어 없음 안내 문구를 출력합니다.

### `추천 검색어 API 호출별 로컬 캐싱`
> - 사용자의 입력값이 없거나 한글 음절이 완성되지 않은 경우(즉, 자음 또는 모음만 입력된 경우), 데이터 요청을 하지 않아 불필요한 **네트워크 트래픽을 최소화**합니다.
> - 디바운스 기법을 활용하여 500ms 동안 타이핑 멈춤 감지 시에만 데이터를 실제로 요구함으로써 **서버와 클라이언트 간의 부담**을 줄입니다.
> - 모든 API 응답은 **로컬에서 캐싱**되며, 이후 동일한 요청이 발생하면 API를 호출하는 대신 캐시에서 데이터를 가져옵니다.

### `키보드만으로 추천 검색어 이동`
> - 사용자가 추천된 검색어 중 **원하는 항목으로 이동하고 선택**할 수 있도록, 위/아래 방향키(ArrowUp/ArrowDown)와 엔터 키의 조합을 활용할 수 있습니다.

## 구현 방법

### 1. 로컬 캐싱 구현 
    - cache storage api를 사용
    - isCachedExpired 함수를 만들어 expire_time이 지났는지 확인
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/pre_onboarding_3rd/blob/21eea234ee1edbbaf3dcb2a3ccf53f5525b0fa73/src/utils/cacheStorage.ts#L4-L11
        </ul>
    </div>
</details>

    - getCachedList 함수
        - caches.open('search-cache'): 'search-cache'라는 이름의 캐시를 엽니다. 만약 이 이름의 캐시가 이미 있으면 그것을 반환하고, 없으면 새로 만들어 반환합니다.
        - cache.match(value): 주어진 값과 일치하는 첫 번째 응답을 찾습니다.
        - 일치하는 응답이 있다면, isExpired(response) 이 함수로 response 객체가 만료되었는지 아닌지를 판별
        - 만약 응답이 만료되었다면 (if (isExpired(response)) {...}), 해당 요청을 캐시에서 삭제하고 null을 반환합니다.
        - 만약 응답이 아직 유효하다면 (else {...}), 해당 응답 객체를 그대로 반환합니다.
        - 일치하는 응답이 없다면 null을 반환합니다.
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/pre_onboarding_3rd/blob/21eea234ee1edbbaf3dcb2a3ccf53f5525b0fa73/src/utils/cacheStorage.ts#L13-L28
        </ul>
    </div>
</details>

    - setCacheList
        - 전달 받은 변수 이름의 캐시를 엽니다. 만약 이 이름의 캐시가 이미 있으면 그것을 반환하고, 없으면 새로 만들어 반환합니다.
        - HTTP 헤더 객체를 생성합니다.
        - HTTP 헤더에 'SET_DATE'라는 필드를 추가하고, 현재 시간을 ISO 형식의 문자열로 변환하여 그 값으로 설정합니다.
        - 주어진 데이터를 JSON 문자열로 변환하고, 앞서 설정한 헤더와 함께 응답 객체를 생성합니다.
        - 주어진 값을 키로 사용하여 앞서 생성한 응답 객체를 캐시에 저장합니다.
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/pre_onboarding_3rd/blob/21eea234ee1edbbaf3dcb2a3ccf53f5525b0fa73/src/utils/cacheStorage.ts#L30-L36
        </ul>
    </div>
</details>

### 2. 입력마다 API 호출하지 않도록 횟수 줄이는 방법
    - 캐싱을 통해 동일한 입력값이 있을 경우 캐싱된 값을 호출하도록 구현
    - 입력값이 아무것도 없을 경우 호출 안함 
    - useDebounce 커스텀 훅을 사용하여, 설정한 시간 후 호출되도록 출력
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/pre_onboarding_3rd/blob/21eea234ee1edbbaf3dcb2a3ccf53f5525b0fa73/src/hooks/useDebounce.ts#L3-L17
        </ul>
    </div>
</details>

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

    - 검색어 입력 시 추천 검색어가 없다면 '검색어 없음' 출력
    - 추천 검색어가 있을 경우 상위 7개만 보여주도록 구현, 위/아래 방향키로 이동 및 엔터키 입력 구현
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/pre_onboarding_3rd/blob/21eea234ee1edbbaf3dcb2a3ccf53f5525b0fa73/src/containers/SearchPreview.tsx#L23-L41
        </ul>
    </div>
</details>


## 6. 폴더 구조
```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┣ 📂constants
 ┣ 📂containers
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂stores
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ```