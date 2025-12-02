import { getTokenFromCookie } from "../../auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllArtRequests = async (params = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append("search", params.search);
  if (params.status && params.status !== "all")
    queryParams.append("status", params.status);
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);

  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `/bible-art/admin/get?${queryString}`
    : `/rounds`;

  try {
    const response = await fetch(url + endpoint, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getDetailsById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/bible-art/${id}`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getArtStats = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/bible-art/admin/stats?days=1`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const statusArt = async (type, id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/bible-art/${type}/${id}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
