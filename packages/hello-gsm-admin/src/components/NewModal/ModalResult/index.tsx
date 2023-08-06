import React, { useState } from 'react';
import * as I from 'assets/svg';
import * as S from './style';

interface ModalResultProps {
  handleOptionSelect: (optionId: string) => void;
}

const ModalResult: React.FC<ModalResultProps> = ({ handleOptionSelect }) => {
  const [selectedButtonId, setSelectedButtonId] = useState<string>('0');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false); // Add this state

  const handleButtonClick = (id: string) => {
    setSelectedButtonId(id);
    handleOptionSelect(id);
    setIsOptionSelected(true); // Set isOptionSelected to true when an option is selected
  };

  return (
    <div>
      <S.ModalResult>
        <S.ModalOption onClick={() => handleButtonClick('1')}>
          <I.Pass isActive={selectedButtonId !== '1'} />
        </S.ModalOption>
        <S.ModalOption onClick={() => handleButtonClick('2')}>
          <I.Fail isActive={selectedButtonId !== '2'} />
        </S.ModalOption>
      </S.ModalResult>
    </div>
  );
};

export default ModalResult;
