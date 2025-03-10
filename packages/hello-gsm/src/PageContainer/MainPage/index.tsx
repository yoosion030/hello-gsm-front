import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import * as S from './style';
import {
  MainPageDescription,
  BubbleButton,
  MainResultModal,
  MainNonLoginModal,
  LinkButton,
} from 'components';
import { css, useTheme } from '@emotion/react';
import useStore from 'Stores/StoreContainer';
import device from 'shared/config';
import {
  applyAcceptable,
  endApply,
  isFirstResult,
  isShowResult,
  startApply,
} from 'shared/Date/firstScreening';
import { formatDate } from 'Utils/Format';
import { ApplicationDataType, EvaluationStatusType } from 'type/application';

const contentSelects = [
  '원서 작성',
  '입학 원서 제출',
  '1차 서류 전형',
  '2차 평가',
  '결과 발표',
];

const MainPage: NextPage<ApplicationDataType> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [isPC, setIsPC] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAcceptable, setIsAcceptable] = useState<boolean>(false);
  const [isFirstResultPeriod, setIsFirstResultPeriod] =
    useState<boolean>(isFirstResult);
  const [isShowResultPeriod, setIsShowResultPeriod] =
    useState<boolean>(isShowResult);
  const [pass, setPass] = useState<boolean | undefined>(undefined);

  const resetResult = (result?: EvaluationStatusType): boolean | undefined => {
    switch (result) {
      case 'FALL':
        return false;
      case 'PASS':
        return true;
      case 'NOT_YET':
        return undefined;
    }
    return undefined;
  };
  const firstResult = resetResult(data?.admissionStatus.firstEvaluation);
  const finalResult = resetResult(data?.admissionStatus.secondEvaluation);

  useEffect(() => {
    setPass(isFirstResultPeriod ? firstResult : finalResult);
  }, [finalResult, firstResult, isFirstResultPeriod]);

  const {
    showMainNonLoginModal,
    setShowMainNonLoginModal,
    showMainResultModal,
    setShowMainResultModal,
    logged,
  } = useStore();

  const selectedStyle = (index: number) =>
    selectedIndex === index &&
    css`
      color: #ffffff;
      font-weight: 700;
      font-size: '1.5rem';
      padding: 0;
      &:before,
      &:after {
        content: 'ㅣ';
      }
      @media ${device.tablet} {
        padding: 0;
      }
      @media ${device.mobile} {
        padding: 0;
      }
    `;

  const theme = useTheme();
  useEffect(() => {
    setIsMobile(window.innerWidth < 640 ? true : false);
    setIsAcceptable(applyAcceptable);
    setIsPC(
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi|mobi/i.test(
        navigator.userAgent,
      ),
    );
    window.onresize = () => {
      setIsMobile(window.innerWidth < 640 ? true : false);
    };
  }, []);

  useEffect(() => {
    if (logged !== undefined)
      setShowMainNonLoginModal(
        // 1차 합격 발표 날짜
        isShowResultPeriod &&
          !logged &&
          localStorage.getItem('mainNonLoginModalInvisible') !==
            new Date().getDate().toString(),
      );
  }, [isShowResultPeriod, logged, setShowMainNonLoginModal]);

  useEffect(() => {
    if (pass !== undefined)
      setShowMainResultModal(
        // 1차 합격 발표 날짜
        isShowResultPeriod &&
          localStorage.getItem('mainResultModalInvisible') !==
            new Date().getDate().toString(),
      );
  }, [isShowResultPeriod, pass, setShowMainResultModal]);

  return (
    <S.MainPage>
      {showMainResultModal && (
        <MainResultModal
          name={data?.admissionInfo.applicantName ?? ''}
          pass={pass}
          isMobile={isMobile}
          majorResult={data?.admissionStatus.finalMajor ?? null}
        />
      )}
      {showMainNonLoginModal && <MainNonLoginModal />}
      <S.MainContent>
        <div>
          <S.Title>
            꿈과 끼를 마음껏{' '}
            <span
              css={css`
                color: ${theme.color.primary.sky};
              `}
            >
              Up!
            </span>{' '}
            할 수 있는 <br />
            광주소프트웨어마이스터고등학교
          </S.Title>
          <S.Description>
            광주소프트웨어마이스터고등학교 입학 지원 시스템
          </S.Description>
          {isPC ? (
            isAcceptable ? (
              !data?.admissionStatus?.isFinalSubmitted ? (
                <LinkButton
                  href={logged ? '/information' : '/auth/signin'}
                  color={theme.color.primary.sky}
                >
                  📑 원서접수 하러가기
                </LinkButton>
              ) : (
                <LinkButton color={theme.color.primary.lime} disabled>
                  ✅ 접수 완료
                </LinkButton>
              )
            ) : (
              <LinkButton disabled>
                하단의 해당 기간에만 접수가능합니다
              </LinkButton>
            )
          ) : (
            <LinkButton disabled>🖥️ 원서 접수는 pc로만 가능해요</LinkButton>
          )}

          <div>
            <S.Underline />
            <S.TermWrapper>
              <S.ApplyTerm
                css={css`
                  list-style: initial;
                  list-style-position: inside;
                  font-weight: 600;
                `}
              >
                접수 기간
              </S.ApplyTerm>
              <S.ApplyTerm>
                {formatDate(startApply)}(월) ~ {formatDate(endApply)}(목)
              </S.ApplyTerm>
            </S.TermWrapper>
          </div>
        </div>

        <BubbleButton link="/최종합격자_제출_서류.hwpx">
          📑 최종합격자 제출 서류 안내
        </BubbleButton>
        <S.GuideAnchor href="/절차_가이드.pdf" target="_blank" rel="noreferrer">
          ℹ️ 원서 접수 방법 미리보기
        </S.GuideAnchor>
        <BubbleButton link="/지원자_제출_서류.hwpx">
          📑 지원자 제출 서류 안내
        </BubbleButton>
        <BubbleButton link="/calculator/choose">
          🧾 모의 성적 계산해보기
        </BubbleButton>
        <BubbleButton link="/manual">
          ❓️ 여러 계정으로 로그인 하는 방법
        </BubbleButton>

        <S.ContentBox>
          {!isMobile ? (
            <S.ContentHeader>
              {contentSelects.map((content, index) => (
                <S.ContentSelect
                  key={index}
                  css={selectedStyle(index + 1)}
                  onClick={() => setSelectedIndex(index + 1)}
                >
                  {content}
                </S.ContentSelect>
              ))}
            </S.ContentHeader>
          ) : (
            <S.ContentHeader>
              <S.ContentHeaderLine>
                {contentSelects
                  .filter((_, index) => index < 3)
                  .map((content, index) => (
                    <S.ContentSelect
                      key={index}
                      css={selectedStyle(index + 1)}
                      onClick={() => setSelectedIndex(index + 1)}
                    >
                      {content}
                    </S.ContentSelect>
                  ))}
              </S.ContentHeaderLine>
              <S.ContentHeaderLine>
                {contentSelects
                  .filter((_, index) => index > 2)
                  .map((content, index) => (
                    <S.ContentSelect
                      key={index}
                      css={selectedStyle(index + 4)}
                      onClick={() => setSelectedIndex(index + 4)}
                    >
                      {content}
                    </S.ContentSelect>
                  ))}
              </S.ContentHeaderLine>
            </S.ContentHeader>
          )}
          <MainPageDescription selectedIndex={selectedIndex} data={data} />
        </S.ContentBox>
      </S.MainContent>
      <S.GreenBall />
      <S.BigBlueBall />
      <S.YellowBall />
      <S.OrangeBall />
      <S.SmallBlueBall />
      <S.MintBall />
      <S.NanoBlueBall />
    </S.MainPage>
  );
};

export default MainPage;
