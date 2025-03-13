import { StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";
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
  error?: string
): ErrorResponse => {
  const statusConstant = StatusCodes[status];

  return {
    success: false,
    status,
    message:
      ERROR_MESSAGES[statusConstant as keyof typeof StatusCodes] ??
      getReasonPhrase(status),
    error: error || getReasonPhrase(status),
  };
};

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

  if (error instanceof Error) {
    console.log(error.message);

    let statusCode: StatusCodes;

    try {
      statusCode =
        getStatusCode(error.message) ?? StatusCodes.INTERNAL_SERVER_ERROR;
    } catch (err) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    const errorMessage = error.message ?? "Unknown error occurred";
    const errorResponse = createErrorResponse(statusCode, errorMessage);

    res.status(statusCode).json(errorResponse);
  }
};
