import { ContentBox, Logout, MainpageHeader, ScoreModal } from 'components';
import type { NextPage } from 'next';
import * as S from './style';
import useStore from 'Stores/StoreContainer';
import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApplicantsType, ApplicantType } from 'Types/application';
import application from 'Api/application';
import auth from 'Api/auth';

const MainPage: NextPage<ApplicantsType> = ({ data }) => {
  const [applicationList, setApplicationList] = useState<ApplicantType[]>(data);
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false);
  const pageIndexRef = useRef<number>(2);
  const searchRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { showScoreModal } = useStore();

  const getList = useCallback(async () => {
    const keyword = searchRef.current?.value;
    try {
      const { data }: ApplicantsType = await application.getList(
        pageIndexRef.current,
        keyword,
      );
      setApplicationList(list => [...list, ...data]);
      pageIndexRef.current += 1;
      setIsPageEnd(data.length < 10 ? true : false);
    } catch (error: any) {
      // accessToken 없을 시에 accessToken 발급 후 가져오기 요청
      if (error.response.status === 401) {
        try {
          // accessToken 발급
          await auth.refresh();
          getList();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  }, []);

  const search = useCallback(async () => {
    const keyword = searchRef.current?.value;
    // setPageIndex(2);
    try {
      const { data }: ApplicantsType = await application.getList(1, keyword);
      pageIndexRef.current = 2;
      setApplicationList(data);
      setIsPageEnd(data.length < 10 ? true : false);
    } catch (error: any) {
      // accessToken 없을 시에 accessToken 발급 후 검색 결과 요청
      if (error.response.status === 401) {
        try {
          // accessToken 발급
          await auth.refresh();
          search();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  }, []);

  const handleObserver = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        console.log('observe');
        await getList();
        observer.observe(entry.target);
      }
    },
    [getList],
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;

    console.log('effect');
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    loadMoreRef.current && observer.observe(loadMoreRef.current);

    return () => observer && observer.disconnect();
  }, [handleObserver, search]);

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <S.MainPage>
      {showScoreModal && <ScoreModal />}
      <Global
        styles={css`
          body {
            overflow: ${showScoreModal ? 'hidden' : 'visible'};
          }
        `}
      />
      <S.MainPageContent>
        <S.FunctionBox>
          <Logout />
          <S.Searchbox>
            <S.SearchInput
              placeholder="검색어를 입력하세요"
              ref={searchRef}
              onKeyPress={enterEvent}
            />
            <S.SearchButton onClick={search}>검색</S.SearchButton>
          </S.Searchbox>
          <S.Print
            onClick={() => {
              console.log(isPageEnd);
              console.log(pageIndexRef.current);
            }}
          >
            수험표 출력
          </S.Print>
        </S.FunctionBox>
        <MainpageHeader />
        <S.ContentList>
          {applicationList.map((content, index: number) => (
            <ContentBox content={content} key={index} />
          ))}
          <S.Target ref={loadMoreRef} />
        </S.ContentList>
      </S.MainPageContent>
      <S.BlueBall />
      <S.SkyBlueBall />
    </S.MainPage>
  );
};

export default MainPage;
