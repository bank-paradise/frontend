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

export async function fetchCreateCompany(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: "/bank/company",
    data: payload,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchDeleteCompany(company_id) {
  const response = await axiosRequest({
    method: "DELETE",
    url: `/bank/company/${company_id}`,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchCreateTransactionSalary(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: "/bank/company/salary",
    data: payload,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchUpdateSalary(payload) {
  const response = await axiosRequest({
    method: "PUT",
    url: "/bank/company/salary",
    data: payload,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}

export async function fetchAddEmployee(payload) {
  const response = await axiosRequest({
    method: "POST",
    url: "/bank/company/employee",
    data: payload,
    headers: {
      Authorization: getLocalToken(),
    },
  });

  return response;
}
