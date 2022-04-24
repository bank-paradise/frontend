import { axiosRequest } from "helpers/axios";
import getLocalToken from "helpers/getLocalToken";

export async function fetchLogin(credentials) {
  const response = await axiosRequest(
    {
      method: "POST",
      url: "/auth/login",
      data: {
        ...credentials,
        device_name: navigator.userAgent,
      },
    },
    false
  );

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

export async function fetchEditUser(credentials) {
  const response = await axiosRequest({
    method: "PUT",
    url: "/auth/me",
    data: credentials,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchDeleteUser() {
  const response = await axiosRequest({
    method: "DELETE",
    url: "/auth/me",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchLogout() {
  const response = await axiosRequest({
    method: "POST",
    url: "/auth/logout",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
