import { getTokenFromCookie } from "../../auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllUsers = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/users`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getUserById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/users/get/${id}`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getSingleUserStats = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/matches/admin/matches-played/${id}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getMatchTypes = async (id, type, params = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const queryParams = new URLSearchParams({
    matchType: type,
    ...(params.sort && { sort: params.sort }),
    ...(params.status && params.status !== "all" && { status: params.status }),
    ...(params.page && { page: params.page }),
    ...(params.limit && { limit: params.limit }),
    ...(params.search && { search: params.search }),
  });

  try {
    const response = await fetch(
      url + `/matches/admin/${id}?${queryParams.toString()}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getDailyMatchTableData = async (id,params={}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const queryParams = new URLSearchParams({
   
    ...(params.sort && { sort: params.sort }),
    ...(params.status && params.status !== "all" && { status: params.status }),
    ...(params.page && { page: params.page }),
    ...(params.limit && { limit: params.limit }),
    ...(params.search && { search: params.search }),
  });

  try {
    const response = await fetch(
      url + `/matches/admin/daily/${id}?${queryParams.toString()}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
