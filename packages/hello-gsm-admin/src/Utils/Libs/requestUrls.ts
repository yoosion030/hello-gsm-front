// 회원
export const AuthController = {
  // 각 oauth 로그인 URL 반환
  signin: {
    kakao: () => {
      return `/auth/v1/oauth2/authorization/kakao`;
    },
    google: () => {
      return `/auth/v1/oauth2/authorization/google`;
    },
    github: () => {
      return `/auth/v1/oauth2/authorization/github`;
    },
  },
  // logout URL 반환
  logout: () => {
    return `/auth/v1/logout`;
  },
};

// 유저 상태
export const UserController = {
  // get 특정 사용자 정보 조회하기
  userInfo: (userId: string) => {
    return `/user/v1/user/${userId}`;
  },

  // get 현재 사용자 정보 조회하기
  myInfo: () => {
    return `/user/v1/user/me`;
  },
};

// 유저 신원
export const IdentityController = {
  // get 특정 사용자의 본인인증 정보 조회하기
  getUserIdentity: (userId: string) => {
    return `/identity/v1/identity/${userId}`;
  },
};

// 유저 상태 변경
export const StatusController = {
  // put 유저 상태 변경
  putStatus: (userId: number) => {
    return `/application/v1/status/${userId}`;
  },
};

// 지원자 관리
export const ApplicationController = {
  // get 특정 사용자의 원서 정보 조회하기
  userInformation: (userId: string) => {
    return `/application/v1/application/${userId}`;
  },
  // get 모든 사용자의 원서 정보 조회하기
  allApplication: (page: number, size: number) => {
    return `/application/v1/application/all?page=${page}&size=${size}`;
  },
  // put 특정 사용자의 원서 정보 수정하기
  userApplication: (userId: string) => {
    return `/application/v1/application/${userId}`;
  },
  // get 모든 사용자의 수험표 정보 조회하기
  tickets: () => {
    return `/application/v1/tickets`;
  },
  // excel 문서 이동
  excel: () => {
    return '/application/v1/excel';
  },
  // get 최종제출이 완료된 사용자를 검색
  searchApplication: (
    page: number,
    size: number,
    tag?: string,
    keyword?: string,
  ) => {
    return `/application/v1/application/search?page=${page}&size=${size}${
      tag && keyword ? `&tag=${tag}&keyword=${keyword}` : ''
    }`;
  },
};
