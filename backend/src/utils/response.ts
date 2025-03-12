import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ERROR_MESSAGES } from "../constants/response-messages";
import { type Response } from "express";

export const createErrorResponse = (
  status: number,
  message: string,
  error?: string
) => ({
  success: false,
  status,
  message,
  error: error || getReasonPhrase(status),
});

export const createSuccessResponse = (message: string, data?: any) => ({
  success: true,
  message,
  ...(data && { data }),
});

export const errorHandler = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);

    const errorResponse = createErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );

    res.status(500).json(errorResponse);
  }
};
