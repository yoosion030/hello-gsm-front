import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import useStore from 'Stores/StoreContainer';
import * as S from './style';
import * as I from 'Assets/svg';
import { ApplicationListType, EvaluationStatusType } from 'Types/application';
import formatScreening from 'Utils/Libs/formatScreening';
import { Modal } from 'components';

interface ContentBoxProp {
  content: ApplicationListType;
}

type resultObjectType = {
  [key in EvaluationStatusType]: string;
};

const ContentBox: React.FC<ContentBoxProp> = ({
  content: {
    applicationId,
    applicantName,
    applicantPhoneNumber,
    teacherPhoneNumber,
    guardianPhoneNumber,
    screening,
    isFinalSubmitted,
    isPrintsArrived,
    schoolName,
    secondScore,
  },
}) => {
  const {
    firstEvaluationResult,
    setFirstEvaluationResult,
    secondEvaluationResult,
    setSecondEvaluationResult,
    finalSubmitted,
    setFinalSubmitted,
    scoreValue,
    setScoreValue,
  } = useStore();

  useEffect(() => {
    setFinalSubmitted(finalSubmitted);
    setFirstEvaluationResult(firstEvaluationResult);
    setSecondEvaluationResult(secondEvaluationResult);
    setScoreValue(secondScore);
  }, [finalSubmitted, firstEvaluationResult, secondEvaluationResult]);
  const [documentReception, setDocumentReception] = useState<boolean>(true);

  const formattedCellphoneNumber = applicantPhoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3',
  );
  const formattedGuardianCellphoneNumber = guardianPhoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3',
  );
  const formattedTeacherCellphoneNumber =
    teacherPhoneNumber !== null
      ? teacherPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      : '검정고시';

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);

  const resultStyle = {
    NOT_YET: css`
      color: #9e9e9e;
      cursor: default;
    `,
    PASS: css`
      color: #2174d8;
      cursor: default;
    `,
    FALL: css`
      color: #ff000f;
      cursor: default;
    `,
  };

  const formatResult = (result: EvaluationStatusType) => {
    const resultObject: resultObjectType = {
      PASS: '합격',
      FALL: '불합격',
      NOT_YET: '미정',
    };
    return resultObject[result];
  };

  const onCloseShowStatusModal = () => {
    setShowStatusModal(false);
  };

  return (
    <S.ContentBox>
      {showStatusModal && (
        <S.ModalContainer>
          <Modal
            name={applicantName}
            studentCode={applicationId}
            onClose={onCloseShowStatusModal}
          />
        </S.ModalContainer>
      )}
      <S.Content>
        <S.RegistrationNumber>
          {String(applicationId).padStart(4, '0')}
        </S.RegistrationNumber>
        <S.isDocumentReception>
          <S.DocumentReceptionText documentReception={documentReception}>
            · {isPrintsArrived ? '제출' : '미제출'}
          </S.DocumentReceptionText>
        </S.isDocumentReception>
        <S.Name>{applicantName}</S.Name>
        <S.Screening>{formatScreening(screening)}</S.Screening>
        <S.SchoolName>{schoolName ?? '검정고시'}</S.SchoolName>
        <S.PhoneNumber>{formattedCellphoneNumber}</S.PhoneNumber>
        <S.GuardianNumber>{formattedGuardianCellphoneNumber}</S.GuardianNumber>
        <S.TeacherNumber>{formattedTeacherCellphoneNumber}</S.TeacherNumber>
        <S.FirstResultText css={resultStyle[firstEvaluationResult]}>
          {formatResult(firstEvaluationResult)}
        </S.FirstResultText>
        <S.FinalScoreText
          css={css`
            color: ${scoreValue ? '#212121' : '#9E9E9E'};
          `}
        >
          {scoreValue ?? '미입력'}
        </S.FinalScoreText>
        <S.FinalResultText css={resultStyle[secondEvaluationResult]}>
          {formatResult(secondEvaluationResult)}
        </S.FinalResultText>
      </S.Content>
      <S.EditButtonBox>
        <S.EditButton onClick={() => setShowStatusModal(true)}>
          <I.BulbIcon />
          상태 수정
        </S.EditButton>
        <S.EditButton>
          <I.EditIcon />
          원서 수정
        </S.EditButton>
      </S.EditButtonBox>
    </S.ContentBox>
  );
};

export default ContentBox;
