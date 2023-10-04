import React, { ButtonHTMLAttributes, useEffect } from 'react';
import * as S from './style';
import useStore from 'Stores/StoreContainer';
interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTitle: '다음' | '확인';
  showModalOption?: number;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  buttonTitle,
  showModalOption,
  ...props
}) => {
  const {
    selectedOption,
    isButtonActive,
    setIsButtonActive,
    isScoreValue,
    isOptionSelect,
  } = useStore();
  useEffect(() => {
    console.log(selectedOption);
    if (buttonTitle === '다음') {
      setIsButtonActive(showModalOption === 0 ? true : false);
    } else {
      setIsButtonActive(false);
      console.log('isOptionSelect');
      console.log(isOptionSelect);
      if (isOptionSelect) {
        console.log('실행전');
        console.log(isButtonActive);
        setIsButtonActive(selectedOption === 0 ? true : false);
        console.log('실행후');
        console.log(isButtonActive);
      }
      if (isScoreValue !== null) {
        setIsButtonActive(false);
      }
    }
  }, [
    buttonTitle,
    showModalOption,
    selectedOption,
    isScoreValue,
    isOptionSelect,
    isButtonActive,
  ]);

  useEffect(() => {
    console.log('new');
    console.log(isOptionSelect);
  }, [isOptionSelect]);
  return (
    <S.ModalButton
      isConfirm={isButtonActive}
      disabled={isButtonActive}
      {...props}
    >
      {buttonTitle}
    </S.ModalButton>
  );
};

export default ModalButton;
