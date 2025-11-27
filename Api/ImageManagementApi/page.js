import { getTokenFromCookie } from "../../auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllImageTableList = async (params = {}) => {
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
  const endpoint = queryString ? `/rounds?${queryString}` : `/rounds`;

  try {
    const response = await fetch(url + endpoint, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getImageStats = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/rounds/stats`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const addImages = async (files) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const formdata = new FormData();
  files.forEach((file) => {
    formdata.append("arts", file, file.name);
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/bible-art/admin/upload`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
