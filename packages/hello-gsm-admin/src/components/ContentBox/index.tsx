import { css } from '@emotion/react';
import application from 'Api/application';
import auth from 'Api/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  isDuringFinalResult,
  isStartFinalResult,
  isStartFirstResult,
} from 'shared/acceptable';
import useStore from 'Stores/StoreContainer';
import { ApplicantType } from 'Types/application';
import * as S from './style';

interface ContentType {
  content: ApplicantType;
}

const ContentBox: React.FC<ContentType> = ({
  content: {
    name,
    cellphoneNumber,
    application: {
      applicationIdx,
      finalResultScreening,
      firstResultScreening,
      guardianCellphoneNumber,
      isDocumentReception,
      registrationNumber,
      schoolName,
      screening,
      teacherCellphoneNumber,
      application_score,
    },
  },
}) => {
  const [isFirstResult, setIsFirstResult] = useState<boolean>(false);
  const [isFinalResult, setIsFinalResult] = useState<boolean>(false);
  const [firstResult, setFirstResult] = useState<'미정' | '합격' | '불합격'>(
    '미정',
  );
  const finalResult: '합격' | '불합격' = finalResultScreening
    ? '합격'
    : '불합격';
  const [score, setScore] = useState<number | null>(
    parseFloat(application_score?.personalityEvaluationScore ?? '') || null,
  );
  const [documentReception, setDocumentReception] = useState<boolean>(true);
  const {
    showScoreModal,
    setShowScoreModal,
    setModalName,
    modalRegistrationNumber,
    setModalRegistrationNumber,
    scoreModalValue,
    setScoreModalValue,
  } = useStore();

  const formattedCellphoneNumber = cellphoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3',
  );
  const formattedGuardianCellphoneNumber = guardianCellphoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3',
  );
  const formattedTeacherCellphoneNumber =
    teacherCellphoneNumber !== 'null'
      ? teacherCellphoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      : '검정고시';

  useEffect(() => {
    // 1차 시험 결과를 조화할 수 있는 날짜
    setIsFirstResult(isStartFirstResult);
    // 2차 시험 결과를 조회할 수 있는 날짜
    setIsFinalResult(isStartFinalResult);
  }, []);

  useEffect(() => {
    setDocumentReception(isDocumentReception);
  }, [isDocumentReception]);

  useEffect(() => {
    setFirstResult(
      !isFirstResult ? '미정' : firstResultScreening ? '합격' : '불합격',
    );
  }, [isFirstResult]);

  useEffect(() => {
    if (!showScoreModal) {
      if (modalRegistrationNumber === registrationNumber) {
        setScore(scoreModalValue);
      }
    }
  }, [showScoreModal]);

  useEffect(() => {
    setScore(
      parseFloat(application_score?.personalityEvaluationScore ?? '') || null,
    );
  }, [application_score]);

  const documentSubmission = async () => {
    // 1차 서류제출 여부를 할당하는 기간
    if (isStartFirstResult) {
      return toast.error('서류제출 여부 할당 기간이 아닙니다.');
    }
    const data = {
      registrationNumber: registrationNumber,
    };
    try {
      await application.document(data);
      setDocumentReception(documentReception => !documentReception);
    } catch (error: any) {
      // accessToken 없을 시에 accessToken 발급 후 서류 제출 여부 요청
      if (error.response.status === 401) {
        try {
          // accessToken 발급
          await auth.refresh();
          documentSubmission();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  };

  const resultStyle = (result: '미정' | '합격' | '불합격') => {
    switch (result) {
      case '미정':
        return css`
          background: #625e6f;
          color: rgba(31, 31, 31, 0.86);
          cursor: default;
        `;
      case '합격':
        return css`
          background: #19baff;
          color: #ffffff;
          cursor: default;
        `;
      case '불합격':
        return css`
          background: #ff4747;
          color: #ffffff;
          cursor: default;
        `;
    }
  };

  const scoreButtonClick = () => {
    if (
      // 2차 성적을 입력하는 기간
      isDuringFinalResult
    ) {
      return toast.error('2차 성적 입력 기간이 아닙니다.');
    }
    if (firstResult === '불합격') {
      return toast.error('불합격자는 2차 성적 입력이 불가능합니다.');
    }
    setModalRegistrationNumber(registrationNumber);
    setModalName(name);
    setShowScoreModal();
    setScoreModalValue(score);
  };

  return (
    <S.ContentBox>
      <S.Content>
        <S.RegistrationNumber>{applicationIdx}</S.RegistrationNumber>
        <S.isDocumentReception>
          <S.DocumentReceptionText documentReception={documentReception}>
            {documentReception ? '· 제출' : '· 미제출'}
          </S.DocumentReceptionText>
        </S.isDocumentReception>
        <S.Name>{name}</S.Name>
        <S.Screening>{screening}</S.Screening>
        <S.SchoolName>
          {schoolName !== 'null' ? schoolName : '검정고시'}
        </S.SchoolName>
        <S.PhoneNumber>{formattedCellphoneNumber}</S.PhoneNumber>
        <S.GuardianNumber>{formattedGuardianCellphoneNumber}</S.GuardianNumber>
        <S.TeacherNumber>{formattedTeacherCellphoneNumber}</S.TeacherNumber>
      </S.Content>
      <S.Button css={() => resultStyle(firstResult)}>{firstResult}</S.Button>
      {isFinalResult ? (
        <S.Button css={() => resultStyle(finalResult)}>{finalResult}</S.Button>
      ) : (
        <S.Button onClick={scoreButtonClick}>{score ?? '입력'}</S.Button>
      )}
    </S.ContentBox>
  );
};

export default ContentBox;
