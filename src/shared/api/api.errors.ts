import axios from "axios";
import type { ApiErrorData } from "./api.types";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorData>(error)) {
    const responseData = error.response?.data;

    if (
      typeof responseData?.detail === "string" &&
      responseData.detail.trim()
    ) {
      return responseData.detail;
    }

    if (
      typeof responseData?.message === "string" &&
      responseData.message.trim()
    ) {
      return responseData.message;
    }

    if (error.code === "ECONNABORTED") {
      return "The request took too long. Please try again.";
    }

    if (!error.response) {
      return "Network error. Please check your internet connection.";
    }

    if (error.response.status >= 500) {
      return "Server error. Please try again later.";
    }

    if (error.response.status === 404) {
      return "The requested resource was not found.";
    }

    if (error.response.status >= 400) {
      return "Request failed. Please try again.";
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Unexpected error. Please try again.";
}
