import type { NextPage } from 'next';
import Image from 'next/image';
import * as S from './style';
import { GoogleLoginButton } from 'components';

const SignInPage: NextPage = () => {
  return (
    <S.SignInPage>
      <S.ContentWrap>
        <S.LoginContent>
          <S.LoginTitleWrap>
            <Image
              src="/favicon.png"
              width={36}
              height={36}
              alt="hellogsm로고"
            />
            <S.AdminTitle>Hello, GSM Admin</S.AdminTitle>
          </S.LoginTitleWrap>
          <S.LoginTitle>로그인</S.LoginTitle>
        </S.LoginContent>
        <GoogleLoginButton>구글계정으로 로그인</GoogleLoginButton>
      </S.ContentWrap>
    </S.SignInPage>
  );
};

export default SignInPage;
