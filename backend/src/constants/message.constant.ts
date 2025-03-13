import { StatusCodes } from "http-status-codes";

export const ERROR_MESSAGES: Partial<Record<keyof typeof StatusCodes, string>> =
  {
    INTERNAL_SERVER_ERROR: "서버 오류가 발생했습니다.",
    NOT_FOUND: "리소스를 찾을 수 없습니다.",
    UNAUTHORIZED: "인증되지 않은 사용자입니다.",
  } as const;

export const SUCCESS_MESSAGES = {
  REGISTER: "회원가입 성공",
  TODO_LIST: "To-do 목록 조회 성공",
  TODO_CREATE: "To-do 생성 성공",
  TODO_STATUS: "To-do 상태 변경 성공",
  TODO_EDIT: "To-do 수정 성공",
  TODO_DELETE: "To-do 삭제 성공",
};
