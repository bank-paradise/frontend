import { axiosRequest } from "helpers/axios";

export async function fetchVersion() {
  const response = await axiosRequest({
    method: "GET",
    url: "/health",
  });

  return response;
}
