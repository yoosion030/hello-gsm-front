import React, { ButtonHTMLAttributes } from 'react';
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
  return (
    <S.ModalButton isConfirm={showModalOption === 0 ? true : false} {...props}>
      {buttonTitle}
    </S.ModalButton>
  );
};

export default ModalButton;
