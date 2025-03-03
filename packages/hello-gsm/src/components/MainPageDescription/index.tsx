import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as S from './style';
import * as I from 'Assets/svg';
import { MainDescStatusType } from 'type/user';
import { useRouter } from 'next/router';
import device from 'shared/config';
import {
  endApply,
  endFirstResult,
  isFirstResult,
  isShowResult,
  isStartFirstResult,
  startApply,
  startFirstResult,
} from 'shared/Date/firstScreening';
import { startFinalTest } from 'shared/Date/secondScreening';
import { formatDate } from 'Utils/Format';
import formatMajor from 'Utils/Format/formatMajor';
import { EvaluationStatusType } from 'type/application';
import useStore from 'Stores/StoreContainer';

const MainPageDescription: React.FC<MainDescStatusType> = ({
  selectedIndex,
  data,
}) => {
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

  const [isFirstPeriod, setIsFirstPeriod] = useState<boolean>(isFirstResult);
  const [isShowResultPeriod, setIsSetResultPeriod] =
    useState<boolean>(isShowResult);
  const firstResult = resetResult(data?.admissionStatus.firstEvaluation);
  const finalResult = resetResult(data?.admissionStatus.secondEvaluation);
  const [pass, setPass] = useState<boolean | undefined>(undefined);
  const [index, setIndex] = useState<number>(1);
  const name = data?.admissionInfo.applicantName ?? '';
  const registrationNumber = data?.admissionStatus.registrationNumber ?? '';
  const majorResult = data?.admissionStatus.finalMajor ?? '';

  const { push } = useRouter();
  const { logged } = useStore();

  useEffect(() => {
    setPass(isFirstPeriod ? firstResult : finalResult);
  }, [finalResult, firstResult, isFirstPeriod]);

  useEffect(() => {
    // 입학 전형이 끝난 이후
    isShowResultPeriod ? setIndex(selectedIndex) : setIndex(0);

    if (selectedIndex === 5) {
      if (pass !== undefined) {
        // 1차 전형 합격 날짜
        isStartFirstResult && (data?.admissionStatus.isFinalSubmitted ?? false)
          ? setIndex(5)
          : setIndex(7);
      } else {
        if (logged) {
          setIndex(7);
        } else {
          isShowResultPeriod ? setIndex(6) : setIndex(0);
        }
      }
    }
  }, [data, logged, pass, selectedIndex]);

  switch (index) {
    case 1:
      return (
        <S.Description>
          <S.DescriptionLine>
            1. 인터넷 접수 후 출력하여 작성교사, 지원자, 보호자 및 학교장 직인을
            날인하여
          </S.DescriptionLine>
          <S.DescriptionLine>
            원서접수 기간 내에 공문 및 방문 제출하여야 합니다.
          </S.DescriptionLine>
          <S.DescriptionLine
            css={css`
              margin-top: 3.125rem;
            `}
          >
            2. 입력사항에 오류가 있거나 허위로 입력한 경우 접수가 취소될 수
            있으며,
          </S.DescriptionLine>
          <S.DescriptionLine>
            이에 따른 책임은 지원자에게 있습니다.
          </S.DescriptionLine>
          <S.DescriptionLine
            css={css`
              margin-top: 3.125rem;
            `}
          >
            3. 접수번호는 원서 최종 제출 후 자동으로 부여됩니다.
          </S.DescriptionLine>
          <S.PostScript
            css={css`
              margin-top: 3.125rem;
            `}
          >
            {formatDate(startApply)}(월) ~ {formatDate(endApply)}(목)
          </S.PostScript>
        </S.Description>
      );
    case 2:
      return (
        <S.Description>
          <S.DescriptionLine>
            작성하신 입학 원서와 그 외 서류들을 서류를 후 확인 부분을
            서명합니다.
          </S.DescriptionLine>
          <S.DescriptionLine>
            모두 작성하신 후 {formatDate(startApply, 'notYear')}(월) 부터 {''}
            {formatDate(endApply, 'notYear')}(목)까지 교무실 원서접수처에
          </S.DescriptionLine>
          <S.DescriptionLine>제출해야합니다.</S.DescriptionLine>
          <S.PostScript>광주광역시 광산구 송정동 상무대로 312</S.PostScript>
        </S.Description>
      );
    case 3:
      return (
        <S.Description>
          <S.DescriptionLine>
            1차 서류 심사에서는 내신과 봉사시간, 출결현황을 점수로 환산하여
          </S.DescriptionLine>
          <S.DescriptionLine>
            정원의 1.3배의 인원을 발표합니다.
          </S.DescriptionLine>
          <S.PostScript>
            {formatDate(startFirstResult, 'hours')}(월) 발표
          </S.PostScript>
        </S.Description>
      );
    case 4:
      return (
        <S.Description>
          <S.DescriptionLine>
            2차 평가에서는 소프트웨어마이스터고등학교 학업수행에 필요한 기본
            자질과 능력을
          </S.DescriptionLine>
          <S.DescriptionLine>
            중심으로 직무적성 소양평가를 치릅니다.
          </S.DescriptionLine>
          <S.PostScript>
            {formatDate(startFinalTest)}(금) 직무적성 소양평가 진행 (오후 1시
            강당)
          </S.PostScript>
        </S.Description>
      );
    case 5:
      return isFirstPeriod ? (
        pass ? (
          <S.Description>
            <S.DescriptionLine>
              {name}님 2024학년도 광주소프트웨어마이스터고등학교
            </S.DescriptionLine>
            <S.DescriptionLine>
              <S.Blue>1차 합격</S.Blue>하셨습니다.
            </S.DescriptionLine>
            <S.PostScript>접수 번호 {registrationNumber}</S.PostScript>
            <S.Celebration>
              <I.Celebration />
            </S.Celebration>
          </S.Description>
        ) : (
          <S.Description>
            <S.DescriptionLine>
              {name}님 2024학년도 광주소프트웨어마이스터고등학교
            </S.DescriptionLine>
            <S.DescriptionLine>
              1차 서류 심사 결과 <S.Red>불합격</S.Red>하셨습니다.
            </S.DescriptionLine>
            <S.PostScript>접수 번호 {registrationNumber}</S.PostScript>
          </S.Description>
        )
      ) : pass ? (
        <S.Description>
          <S.DescriptionLine>
            {name}님 2024학년도 광주소프트웨어마이스터고등학교
          </S.DescriptionLine>
          <S.DescriptionLine>
            {formatMajor(majorResult)}에 <S.Blue>최종 합격</S.Blue> 하셨습니다.
          </S.DescriptionLine>
          <S.PostScript>
            제출서류 : 입학등록동의서 1부(11.7.월까지),
            <br />
            건강진단서 1부(11.14.월까지)공문과 방문접수에 한함.
          </S.PostScript>
          <S.PostScript>접수 번호 {registrationNumber}</S.PostScript>
          <S.Button onClick={() => push('/최종합격자_제출_서류.hwpx')}>
            <I.DownloadIcon />
            <S.ButtonText>제출서류</S.ButtonText>
          </S.Button>
          <S.Celebration
            css={css`
              @media ${device.tablet} {
                display: none;
              }
            `}
          >
            <I.Celebration />
          </S.Celebration>
        </S.Description>
      ) : (
        <S.Description>
          <S.DescriptionLine>
            {name}님 2024학년도 광주소프트웨어마이스터고등학교
          </S.DescriptionLine>
          <S.DescriptionLine>
            <S.Red>최종 불합격</S.Red>하셨습니다.
          </S.DescriptionLine>
          <S.PostScript>접수 번호 {registrationNumber}</S.PostScript>
        </S.Description>
      );
    case 6:
      return (
        <S.Description>
          <S.DescriptionLine>
            결과 발표 확인을 위해선 로그인이 필요합니다.
          </S.DescriptionLine>
          <Link href="/auth/signin" passHref>
            <S.Login>로그인</S.Login>
          </Link>
        </S.Description>
      );
    case 7:
      return (
        <S.Description>
          <S.DescriptionLine>
            1차 서류 심사와 인적성소양평가를 통해 최종 합격자를 발표합니다.
          </S.DescriptionLine>
          <S.PostScript>
            {formatDate(endFirstResult, 'hours')}(수) 최종 결과 발표
          </S.PostScript>
        </S.Description>
      );
    default:
      return (
        <S.Description>
          <S.DescriptionLine>지금은 지원 기간이 아닙니다.</S.DescriptionLine>
        </S.Description>
      );
  }
};

export default MainPageDescription;
