import React, { useEffect, useState } from 'react';
import * as S from './style';
import * as I from 'Assets/svg';
import * as C from 'components';
import status from 'Api/status';
import useStore from 'Stores/StoreContainer';
import {
  CommonApplicationResponseType,
  EvaluationStatusType,
  MajorType,
  ScreeningType,
} from 'Types/application';
import { toast } from 'react-toastify';

interface ModalProps {
  studentCode: number;
  name: string;
  onClose: () => void;
  isFinalSubmitted: boolean;
  setIsFinalSubmitted: (result: boolean) => void;
  isPrintsArrived: boolean;
  setIsPrintsArrived: (result: boolean) => void;
  firstEvaluation: EvaluationStatusType;
  setFirstEvaluation: (result: EvaluationStatusType) => void;
  secondEvaluation: EvaluationStatusType;
  setSecondEvaluation: (result: EvaluationStatusType) => void;
  secondScore: number;
  setSecondScore: (inputValue: number) => void;
  finalMajor: MajorType;
  setFinalMajor: (result: MajorType) => void;
}

const Modal: React.FC<ModalProps> = ({
  name,
  studentCode,
  onClose,
  isFinalSubmitted,
  setIsFinalSubmitted,
  isPrintsArrived,
  setIsPrintsArrived,
  firstEvaluation,
  setFirstEvaluation,
  secondEvaluation,
  setSecondEvaluation,
  secondScore,
  setSecondScore,
  finalMajor,
  setFinalMajor,
}) => {
  const [isClose, setIsClose] = useState<boolean>(true);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [selectedButtonId, setSelectedButtonId] = useState<number>(0);
  const [showModalResult, setShowModalResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0);

  const handleOptionSelect = () => {
    setIsClose(true);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const { selectedOption } = useStore();

  const handleButtonClick = (id: number) => {
    setIsButtonClicked(true);
    setSelectedButtonId(id);
  };

  const handleModalButtonClick = (
    selectedButtonId: number,
    userId: number,
    buttonTitle: '다음' | '확인',
  ) => {
    const isNumber = (value: number) => {
      return !isNaN(Number(value));
    };
    if (buttonTitle === '확인') {
      switch (selectedButtonId) {
        case 1:
          if (selectedOption === 1) {
            setIsPrintsArrived(true);
          } else {
            setIsPrintsArrived(false);
          }
          break;
        case 2:
          if (selectedOption === 1) {
            setFirstEvaluation('PASS');
          } else {
            setFirstEvaluation('FALL');
          }
          break;
        case 3:
          if (selectedOption === 1) {
            setSecondEvaluation('PASS');
          } else {
            setSecondEvaluation('FALL');
          }
          break;
        case 4:
          if (isNumber(inputValue)) {
            setSecondScore(inputValue);
            console.log(inputValue);
          } else {
            toast.error('입력하신 값이 숫자가 아닙니다.');
          }
          break;
      }

      const submittedApplyData: CommonApplicationResponseType = {
        isFinalSubmitted: isFinalSubmitted,
        isPrintsArrived: isPrintsArrived,
        firstEvaluation: firstEvaluation,
        secondEvaluation: secondEvaluation,
        screeningFirstEvaluationAt: 'GENERAL',
        screeningSecondEvaluationAt: 'GENERAL',
        registrationNumber: studentCode,
        secondScore: secondScore,
        finalMajor: finalMajor,
      };
      modifiedStatus(userId, submittedApplyData);
      handleCloseModal();
    } else {
      setShowModal(selectedButtonId);
      setIsButtonClicked(false);
      setShowModalResult(true);
      setIsButtonClicked(true);
    }
  };

  const modifiedStatus = async (
    userId: number,
    submittedApplyData: CommonApplicationResponseType,
  ) => {
    try {
      await status.putStatus(submittedApplyData, userId);
      toast.success('상태 수정이 완료되었어요.');
      handleCloseModal();
    } catch (error: any) {
      toast.error('상태 수정 저장 중 에러가 발생했어요. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <>
      {isClose && (
        <S.Modal
          style={{
            width: showModal !== 0 ? '28.5rem' : '55.5rem',
          }}
        >
          <S.XIcon
            style={{
              width: showModal !== 0 ? '28.5rem' : '55.5rem',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
              }}
              onClick={handleCloseModal}
            >
              <I.ModalCloseIcon />
            </div>
          </S.XIcon>
          {showModalResult ? (
            <></>
          ) : (
            <S.TitleBox>
              <S.Title>수험번호 {studentCode}</S.Title>
              <S.Desc>{name}님의 어떤 상태를 수정하실건가요?</S.Desc>
            </S.TitleBox>
          )}
          {showModal === 1 && (
            <S.ContentBox>
              <S.TitleBox style={{ width: '416px' }}>
                <S.Title>수험번호 {studentCode}</S.Title>
                <S.Desc>{name}님의 서류 제출 여부를 선택해주세요</S.Desc>
              </S.TitleBox>
              <C.ModalSubmit handleOptionSelect={handleOptionSelect} />
              <C.ModalButton
                buttonTitle="확인"
                isConfirm={!isButtonClicked}
                onClick={() =>
                  handleModalButtonClick(selectedButtonId, studentCode, '확인')
                }
              />
            </S.ContentBox>
          )}
          {showModal === 2 && (
            <S.ContentBox>
              <S.TitleBox style={{ width: '416px' }}>
                <S.Title>수험번호 {studentCode}</S.Title>
                <S.Desc>{name}님의 1차 합격 여부(서류)를 선택해주세요.</S.Desc>
              </S.TitleBox>
              <C.ModalResult handleOptionSelect={handleOptionSelect} />
              <C.ModalButton
                buttonTitle="확인"
                isConfirm={!isButtonClicked}
                onClick={() =>
                  handleModalButtonClick(selectedButtonId, studentCode, '확인')
                }
              />
            </S.ContentBox>
          )}
          {showModal === 3 && (
            <S.ContentBox>
              <S.TitleBox style={{ width: '26rem' }}>
                <S.Title>수험번호 {studentCode}</S.Title>
                <S.Desc>
                  {name}님의 2차 합격 여부(인적성)를 선택해주세요.
                </S.Desc>
              </S.TitleBox>
              <C.ModalResult handleOptionSelect={handleOptionSelect} />
              <C.ModalButton
                buttonTitle="확인"
                isConfirm={!isButtonClicked}
                onClick={() =>
                  handleModalButtonClick(selectedButtonId, studentCode, '확인')
                }
              />
            </S.ContentBox>
          )}
          {showModal === 4 && (
            <S.ContentBox>
              <S.TitleBox style={{ width: '26rem' }}>
                <S.Title>수험번호 {studentCode}</S.Title>
                <S.Desc>{name}님의 2차 점수(인적성)를 입력해주세요.</S.Desc>
              </S.TitleBox>
              <C.ModalInput setInputValue={setInputValue} />
              <C.ModalButton
                buttonTitle="확인"
                isConfirm={!isButtonClicked}
                onClick={() =>
                  handleModalButtonClick(selectedButtonId, studentCode, '확인')
                }
              />
            </S.ContentBox>
          )}
          {showModalResult ? (
            <></>
          ) : (
            <S.ContentBox>
              <S.ButtonBox>
                <S.ModalOption onClick={() => handleButtonClick(1)}>
                  <I.DocumentsSubmissionStatus
                    isActive={selectedButtonId === 1}
                  />
                </S.ModalOption>
                <S.ModalOption onClick={() => handleButtonClick(2)}>
                  <I.FirstPassStatus isActive={selectedButtonId === 2} />
                </S.ModalOption>
                <S.ModalOption onClick={() => handleButtonClick(3)}>
                  <I.SecondScoringStatus isActive={selectedButtonId === 3} />
                </S.ModalOption>
                <S.ModalOption onClick={() => handleButtonClick(4)}>
                  <I.SecondScoringEntry isActive={selectedButtonId === 4} />
                </S.ModalOption>
              </S.ButtonBox>
              <C.ModalButton
                buttonTitle="다음"
                isConfirm={!isButtonClicked}
                onClick={() =>
                  handleModalButtonClick(selectedButtonId, studentCode, '다음')
                }
              />
            </S.ContentBox>
          )}
        </S.Modal>
      )}
    </>
  );
};

export default Modal;
