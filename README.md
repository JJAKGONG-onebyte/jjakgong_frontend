# 짝공 (Jjakgong) - Frontend

## 1. 프로젝트 소개

> 어디서든 함께할 수 있는 나만의 스터디 짝꿍

## 2. 기술 스택

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Package Manager**: npm

## 3. 디렉터리 구조

```text
jk/
│
├── public/                 # 정적 파일 관리 (favicon, 이미지 등)
│   ├── images/             # HTML에서 직접 참조하는 이미지
│   └── robots.txt
│
├── src/
│   ├── assets/             # 컴포넌트에서 사용하는 이미지, 아이콘, 폰트
│   ├── components/         # 여러 페이지에서 재사용하는 UI 컴포넌트
│   ├── pages/              # 서비스 개별 페이지 화면
│   ├── services/           # 백엔드 API 통신
│   ├── types/              # TypeScript 타입 및 인터페이스 정의
│   └── utils/              # 공통 유틸리티 함수
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 4. 실행 방법

### 4.1 프로젝트 실행

```bash
# 저장소 클론
git clone https://github.com/JJAKGONG-onebyte/jjakgong_frontend.git

# 프로젝트 디렉터리 이동
cd jjakgong_frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버 실행 후 아래 주소에서 서비스를 확인할 수 있습니다.

- 기본 주소: http://localhost:3000

### 4.2 페이지별 확인 방법

개발 서버를 실행한 상태에서 아래 주소로 접속하면 각 페이지를 확인할 수 있습니다.

| 페이지 | 접속 경로 | 설명 |
|---|---|---|
| 학습 화면 A | /studyA | 영상 통화형 학습 화면 |
| 학습 화면 B | /studyB | 자료 집중형 학습 화면 |
| 학습 설정 | /settings | 학습 시간 및 학습 설정 |

> 새로운 페이지가 추가되거나 접속 경로가 변경되면 이 표도 함께 업데이트해주세요.


## 6. 개발 현황

본 프로젝트는 현재 개발 진행 중이며, 페이지별 기능 및 백엔드·AI 서버 연동 사항은 구현 상황에 따라 업데이트됩니다.
