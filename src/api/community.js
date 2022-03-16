import { axiosRequest } from "helpers/axios";
import getLocalToken from "helpers/getLocalToken";

export async function fetchCommunity() {
  const response = await axiosRequest({
    method: "GET",
    url: "/community",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchJoinCommunity(invitation) {
  const response = await axiosRequest({
    method: "POST",
    url: `/community/invite/${invitation.id}`,
    data: {
      accept: invitation.accept,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchCreateCommunity(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: `/community`,
    data: {
      ...payload,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
