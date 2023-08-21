# Hello, GSM
<img width="1000" alt="스크린샷_2023-01-12_오전_10 55 08" src="https://github.com/yoosion030/hello-gsm-front/assets/80191860/81c38142-8e5c-4184-979a-bf5d12c13b9e">

### Description

Hello, GSM은 광주소프트웨어마이스터고등학교 입학 지원시스템입니다.  
불편했던 기존 입학 지원 시스템을 개선하기 위해 더모먼트 팀에서 직접 개발하였습니다.
> 실제 2022년 입학지원기간에 사용하였습니다.  
> 지원 기간에 **1,200명+의 사용자**가 접속하였고, **175+명의 사용자**가 로그인하였습니다.

> **교내 대회 "2022 전공 동아리 연구 활동 발표회"에서 최우수상을 수상하였고, 2022년 사용자들이 만족하여 2023년에도 서비스 사용 예정입니다.**

### GET start

```
- git clone
$ git clone https://github.com/themoment-team/hello-gsm-front.git

- setting project
$ yarn install

- start project
$ yarn workspace [hello-gsm | hello-gsm-admin | hello-gsm-calculate] dev

- build
$ yarn workspace [hello-gsm | hello-gsm-admin | hello-gsm-calculate] build
```

### Skill Set

```
* project skills
    - NextJS
    - Axios
    - Zustand
    - Emotion.js
    - React-hook-form
    - Yarn berry
    - Mono repo

* dev tools
    - Visual Studio Code
    - Prettier
    - ESLint

* deploy
     - Vercel
```

### Directory Structure
```
📦
├─ .github
│  └─ PULL_REQ UEST_TEMPLATE.md
├─ .vscode
├─ .yarn
├─ pacckages
│  ├─ hello-gsm (클라이언트)
│	 │  └─ src
│  │  │  ├─ Api (API 통신)
│  │  │  ├─ Asset 
│  │  │  │  └─ SVG
│  │  │  ├─ components (컴포넌트)
│  │  │  ├─ hooks (커스텀 hook)
│  │  │  ├─ PageContainer (컴포넌트를 모아둔 최종페이지)
│  │  │  ├─ pages (페이지)
│  │  │  ├─ shared (공용 파일)
│  │  │  │  └─ Styles (자주 사용되는 스타일들)
│  │  │  │  └─ baseURL (서버 URL 지정)
│  │  │  │  └─ config (반응형)
│  │  │  ├─ Stores (Zustand 전역 변수)
│  │  │  ├─ type (전역 interface)
│  │  │  ├─ Utils
│  │  │  │  └─ Libs 
│  │  │  │  │   └─ requestApi (Api 통신 틀)
│  │  │  │  │   └─ requestUrl (Api 주소 틀)
│  │  │  │  └─ Calculate (성적 처리 공식들)
│  │  │  └─  middleware (미들웨어)
│  │  ├─  .env.local (환경 변수)
│  │  ├─  next-env.d.ts
│  │  ├─  package.json
│  │  └─  tsconfig.json
│  └─ hello-gsm-admin (관리자)
│  └─ hello-gsm-calculate (모의 성적)
├─ .babelrc
├─ .gitignore
├─ .pnp.cjs
├─ .pnp.loader.mjs
├─ next.config.js
├─ package.json
├─ tsconfig.json
└─ yarn.lock
```
