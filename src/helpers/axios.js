import axios from "axios";
import { getErrorMessage } from "./errors";

axios.defaults.baseURL = process.env.REACT_APP_API;

export const axiosRequest = async (axiosParams) => {
  try {
    const response = await axios.request(axiosParams);
    return { status: "done", response: response.data };
  } catch (error) {
    const message = error.response.data.error;

    return {
      status: "error",
      response: getErrorMessage(message || "AN_ERROR_HAS_OCCURRED"),
      code: message || "AN_ERROR_HAS_OCCURRED",
    };
  }
};
