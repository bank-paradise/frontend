import { axiosRequest } from "helpers/axios";
import getLocalToken from "helpers/getLocalToken";

export async function fetchBankInformations() {
  const response = await axiosRequest({
    method: "GET",
    url: "/bank",
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchCreateTransaction(transaction) {
  const response = await axiosRequest({
    method: "POST",
    url: "/bank/transaction",
    data: transaction,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
