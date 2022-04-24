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

export async function fetchDeleteCommunity() {
  const response = await axiosRequest({
    method: "DELETE",
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

export async function fetchUpdateCommunity(payload) {
  const response = await axiosRequest({
    method: "PUT",
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

export async function fetchsendInvitation(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: `/community/invite`,
    data: {
      ...payload,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchinjectTransaction(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: `/community/transactions/inject`,
    data: {
      ...payload,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchEditRole(payload) {
  const response = await axiosRequest({
    method: "PUT",
    url: `/community/role`,
    data: {
      ...payload,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchKickMember(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: `/community/kick`,
    data: {
      ...payload,
    },
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchInvitations() {
  const response = await axiosRequest({
    method: "GET",
    url: "community/invitations",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchTransactions() {
  const response = await axiosRequest({
    method: "GET",
    url: "community/transactions",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchMembers() {
  const response = await axiosRequest({
    method: "GET",
    url: "community/members",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchAllAccounts() {
  const response = await axiosRequest({
    method: "GET",
    url: "community/accounts/all",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
