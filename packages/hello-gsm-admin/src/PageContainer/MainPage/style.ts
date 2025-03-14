import styled from '@emotion/styled';

export const MainPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const MainPageContent = styled.div`
  margin-left: calc(13.8125rem + 2rem);
  width: 80vw;
  margin-top: 5.25rem;
`;

export const FunctionBox = styled.div`
  width: 100%;
  height: 2.8125rem;
  display: flex;
  justify-content: space-between;
`;

export const CountBox = styled.div`
  width: 13.125rem;
  height: 100%;
  background: #ffffff;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: #0f0921;
`;

export const Searchbox = styled.div`
  width: 40.625rem;
  height: 100%;
  background: #ffffff;
  border-radius: 0.625rem;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 35rem;
  border: none;
  padding-left: 1.5625rem;
  border-radius: 0.625rem;
  outline: none;
  font-weight: 900;
  font-size: 1.125rem;
  ::placeholder {
    font-weight: 500;
    font-size: 1.125rem;
    color: rgba(0, 0, 0, 0.48);
  }
`;

export const SearchButton = styled.div`
  width: 5.625rem;
  height: 100%;
  background: #19baff;
  border-radius: 0.625rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ButtonBox = styled.div`
  width: 18.75rem;
  display: flex;
  justify-content: space-between;
`;

export const Print = styled.a`
  width: 8.75rem;
  height: 100%;
  background: #19baff;
  border-radius: 0.625rem;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const ContentList = styled.div`
  margin-bottom: 5.0625rem;
  height: 43rem;
`;
