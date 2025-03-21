# Web Todo

## 프로젝트 소개

- 프로그래머스 데브코스 미션으로 수행한 토이프로젝트입니다.
- 현재 구현 진행중입니다.
  - 주요 기능
    - 회원가입, 로그인, TODO 추가/삭제/상태변경/수정, 팀투두
- 참여
  - 백엔드: [최인애](https://github.com/dev-CIA)
  - 프론트엔드: [손지우](https://github.com/sonjiwoo1215)

## 프로젝트 실행방법

### 프론트엔드

- html 파일 실행

### 백엔드

1. backend 폴더로 이동합니다.

   ```bash
   cd backend
   ```

2. 필요한 패키지를 설치합니다.

   ```bash
   npm install
   ```

3. 데이터베이스 설정을 구성합니다.

   - `src/config/database.ts` 수정 또는 `.env`파일을 추가하여 MariaDB 연결 정보를 입력합니다.

4. 서버를 실행합니다.

   1. 개발 모드로 서버를 실행할 경우

      ```bash
      npm run dev
      ```

   2. 프로덕션 모드로 서버를 실행할 경우

      ```bash
      npm run start
      ```
