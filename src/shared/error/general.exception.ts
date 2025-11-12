import { isAxiosError } from "axios";
import type { ApiResponse } from "../api-response";


export const generalException = (error: any): ApiResponse<any> => {
  if (isAxiosError(error)) {
    return {
      message: error.response?.data.message,
      success: false,
      data: null,
    };
  } else {
    throw error;
  }
}
