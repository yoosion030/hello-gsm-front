import React, { useState } from 'react';
import * as S from './style';
import * as I from 'assets/svg';
import ModalButton from './ModalButton';
import ModalResult from './ModalResult';
import ModalInput from './ModalInput';
import ModalSubmit from './ModalSubmit';

interface ModalProps {
  studentCode: string;
  name: string;
}

const NewModal: React.FC<ModalProps> = ({ name, studentCode }) => {
  const [isClose, setIsClose] = useState<boolean>(true);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [selectedButtonId, setSelectedButtonId] = useState<string>('0');
  const [showModalResult, setShowModalResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<string>('');

  const handleIsClose = () => setIsClose(prev => !prev);
  const handleOptionSelect = () => {
    setIsClose(true);
  };

  const handleButtonClick = (id: string) => {
    setIsButtonClicked(true);
    setSelectedButtonId(id);
  };

  const handleModalButtonClick = (selectedButtonId: string) => {
    setShowModal(selectedButtonId);
    setIsButtonClicked(false);
    setShowModalResult(true);
    setIsButtonClicked(true);
  };

  return (
    <div>
      {isClose && (
        <S.Modal
          style={{
            width:
              showModal === '1' ||
              showModal === '2' ||
              showModal === '3' ||
              showModal === '4'
                ? '456px'
                : '888px',
          }}
        >
          <S.ModalContent>
            <S.XIcon
              onClick={handleIsClose}
              style={{
                width:
                  showModal === '1' ||
                  showModal === '2' ||
                  showModal === '3' ||
                  showModal === '4'
                    ? '456px'
                    : '888px',
              }}
            >
              <I.XIcon />
            </S.XIcon>
            {showModalResult ? (
              <></>
            ) : (
              <S.TitleBox>
                <S.Title>수험번호 {studentCode}</S.Title>
                <S.Desc>{name}님의 어떤 상태를 수정하실건가요?</S.Desc>
              </S.TitleBox>
            )}
            ;
            {showModal === '1' && (
              <S.ContentBox>
                <S.TitleBox style={{ width: '416px' }}>
                  <S.Title>수험번호 {studentCode}</S.Title>
                  <S.Desc>{name}님의 서류 제출 여부를 선택해주세요</S.Desc>
                </S.TitleBox>
                <ModalSubmit handleOptionSelect={handleOptionSelect} />
                <ModalButton
                  isConfirm={!isButtonClicked}
                  onClick={() => handleModalButtonClick(selectedButtonId)}
                />
              </S.ContentBox>
            )}
            {showModal === '2' && (
              <S.ContentBox>
                <S.TitleBox style={{ width: '416px' }}>
                  <S.Title>수험번호 {studentCode}</S.Title>
                  <S.Desc>
                    {name}님의 1차 합격 여부(서류)를 선택해주세요.
                  </S.Desc>
                </S.TitleBox>
                <ModalResult handleOptionSelect={handleOptionSelect} />
                <ModalButton
                  isConfirm={!isButtonClicked}
                  onClick={() => handleModalButtonClick(selectedButtonId)}
                />
              </S.ContentBox>
            )}
            {showModal === '3' && (
              <S.ContentBox>
                <S.TitleBox style={{ width: '416px' }}>
                  <S.Title>수험번호 {studentCode}</S.Title>
                  <S.Desc>
                    {name}님의 2차 합격 여부(인적성)를 선택해주세요.
                  </S.Desc>
                </S.TitleBox>
                <ModalResult handleOptionSelect={handleOptionSelect} />
                <ModalButton
                  isConfirm={!isButtonClicked}
                  onClick={() => handleModalButtonClick(selectedButtonId)}
                />
              </S.ContentBox>
            )}
            {showModal === '4' && (
              <S.ContentBox>
                <S.TitleBox style={{ width: '416px' }}>
                  <S.Title>수험번호 {studentCode}</S.Title>
                  <S.Desc>{name}님의 2차 점수(인적성)를 입력해주세요.</S.Desc>
                </S.TitleBox>
                <ModalInput />
                <ModalButton
                  isConfirm={!isButtonClicked}
                  onClick={() => handleModalButtonClick(selectedButtonId)}
                />
              </S.ContentBox>
            )}
            {showModalResult ? (
              <></>
            ) : (
              <S.ContentBox>
                <S.ButtonBox>
                  <S.ModalOption onClick={() => handleButtonClick('1')}>
                    <I.DocumentsSubmissionStatus
                      isActive={selectedButtonId !== '1'}
                    />
                  </S.ModalOption>
                  <S.ModalOption onClick={() => handleButtonClick('2')}>
                    <I.firstPassStatus isActive={selectedButtonId !== '2'} />
                  </S.ModalOption>
                  <S.ModalOption onClick={() => handleButtonClick('3')}>
                    <I.secondScoringStatus
                      isActive={selectedButtonId !== '3'}
                    />
                  </S.ModalOption>
                  <S.ModalOption onClick={() => handleButtonClick('4')}>
                    <I.secondScoringEntry isActive={selectedButtonId !== '4'} />
                  </S.ModalOption>
                </S.ButtonBox>
                <ModalButton
                  isConfirm={!isButtonClicked}
                  onClick={() => handleModalButtonClick(selectedButtonId)}
                />
              </S.ContentBox>
            )}
          </S.ModalContent>
        </S.Modal>
      )}
    </div>
  );
};

export default NewModal;
