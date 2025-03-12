# Todos REST Api

## 기능

- [ ] **회원가입**: 사용자가 계정을 생성할 수 있습니다.
- [ ] **로그인**: 사용자가 로그인하여 인증된 세션을 시작할 수 있습니다.
- [x] **TODO 작성, 수정, 삭제**: 사용자가 Todo 항목을 생성, 수정 및 삭제할 수 있습니다.
- [x] **TODO의 상태 변경**: 사용자가 Todo 항목의 상태를 미완료/완료로 변경할 수 있습니다.
- [ ] **팀 TODO 구현**: 팀원들과 함께 Todo 항목을 관리할 수 있습니다.

## 기술 스택

- TypeScript, Node.js, Express, MariaDB

## 설치 및 실행

1. 필요한 패키지를 설치합니다.

   ```bash
   npm install
   ```

2. 데이터베이스 설정을 구성합니다.

   - `src/config/database.ts` 수정 또는 `.env`파일을 추가하여 MariaDB 연결 정보를 입력합니다.

3. 서버를 실행합니다.

   1. 개발 모드로 서버를 실행할 경우

      ```bash
      npm run dev
      ```

   2. 프로덕션 모드로 서버를 실행할 경우

      ```bash
      npm run start
      ```

## API 문서 & ERD

- API: http://localhost:3010/api-docs/
