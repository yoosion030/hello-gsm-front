import styled from '@emotion/styled';

export const FAQBox = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  background: #19132a;
  border: none;
  border-radius: 0.625rem;
  margin: 0.9375rem 0;
  padding: 1.2rem 2.5rem;
  cursor: pointer;
  gap: 1rem;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.h4}
  color: ${({ theme }) => theme.color.white};
  font-weight: 700;

  &::before {
    content: 'Q. ';
    color: ${({ theme }) => theme.color.primary['lime']};
  }
`;

export const IsSearching = styled.span`
  color: ${({ theme }) => theme.color.primary['lime']};
`;

export const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AnswerContent = styled.p`
  color: ${({ theme }) => theme.color.white};
  border-top: 0.8px solid ${({ theme }) => theme.color.white};
  text-align: left;
  padding-top: 1rem;
  width: 100%;
`;
