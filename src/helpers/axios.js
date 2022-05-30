import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { getErrorMessage } from "./errors";

axios.defaults.baseURL = process.env.REACT_APP_API;

/*
type axiosParams = {
  method: string,
  url: string,
  data?: any,
  headers?: any,
};
*/

export const axiosRequest = async (axiosParams, redirectError = true) => {
  try {
    const response = await axios.request(axiosParams);
    return { status: "done", response: response.data };
  } catch (error) {
    if (error.response.status === 401 && redirectError) {
      window.location.href = "/auth/login";
    }
    const message = error.response
      ? error.response.data.error
      : "AN_ERROR_HAS_OCCURRED";
    return {
      status: "error",
      response: getErrorMessage(message),
      code: message,
    };
  }
};
