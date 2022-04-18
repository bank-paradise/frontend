import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "./errors";

axios.defaults.baseURL = process.env.REACT_APP_API;

export const axiosRequest = async (axiosParams) => {
  try {
    const response = await axios.request(axiosParams);
    return { status: "done", response: response.data };
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/login";
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
