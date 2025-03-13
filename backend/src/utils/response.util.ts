import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ERROR_MESSAGES } from "../constants/message.constant";
import { type Response } from "express";

interface ErrorResponse {
  success: false;
  status: number;
  message: string;
  error: string;
}

interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export const createErrorResponse = (
  status: StatusCodes,
  message: string,
  error?: string
): ErrorResponse => ({
  success: false,
  status,
  message,
  error: error || getReasonPhrase(status),
});

export const createSuccessResponse = <T>(
  message: string,
  data?: T
): SuccessResponse<T> => ({
  success: true,
  message,
  ...(data && { data }),
});

export const handleError = (res: Response, error: unknown): void => {
  console.error("Error occurred:", error);

  const errorResponse = createErrorResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    error instanceof Error ? error.message : "Unknown error occurred"
  );

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
};
