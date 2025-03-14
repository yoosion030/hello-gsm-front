import Link from 'next/link';
import useApplyStore from 'Stores/ApplyStoreContainer';
import * as S from './style';

interface ResultType {
  result: number[];
  userId: string;
}

const ScoreResultModal: React.FC<ResultType> = ({ result, userId }) => {
  const { setShowScoreResult } = useApplyStore();

  return (
    <S.Background>
      <S.ResultSection>
        <S.SubjectSection>
          <S.ResultSubject>교과성적</S.ResultSubject>
          <S.ResultSubject>예체능</S.ResultSubject>
          <S.ResultSubject>비교과 성적</S.ResultSubject>
          <S.ResultTotal>총합</S.ResultTotal>
        </S.SubjectSection>
        <S.SubjectSection>
          {result?.map((res, i) => (
            <S.Score key={i}>{res}</S.Score>
          ))}
        </S.SubjectSection>
        <hr />
        <S.MainDesc>원서를 수정했습니다.</S.MainDesc>
        <S.ConfirmSection>
          <Link href="/" passHref>
            <S.Confirm onClick={setShowScoreResult}>홈으로</S.Confirm>
          </Link>
          <Link href={`/application/${userId}`} passHref>
            <S.Confirm onClick={setShowScoreResult}>출력</S.Confirm>
          </Link>
        </S.ConfirmSection>
      </S.ResultSection>
    </S.Background>
  );
};

export default ScoreResultModal;
