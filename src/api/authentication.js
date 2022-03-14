import { axiosRequest } from "helpers/axios";
import getLocalToken from "helpers/getLocalToken";

export async function fetchLogin(credentials) {
  const response = await axiosRequest({
    method: "POST",
    url: "/auth/login",
    data: {
      ...credentials,
      device_name: navigator.userAgent,
    },
  });

  return response;
}

export async function fetchRegister(credentials) {
  const response = await axiosRequest({
    method: "POST",
    url: "/auth/register",
    data: {
      ...credentials,
      device_name: navigator.userAgent,
    },
  });

  return response;
}

export async function fetchUser(credentials) {
  const response = await axiosRequest({
    method: "POST",
    url: "/auth/me",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
