import dayjs from "dayjs";
import cookies from "js-cookie";
import { auth } from "./firebaseConfig";

export const getTokenFromCookie = async () => {
  const cookieString = getToken()

  if (cookieString) {
    const { value, expiry } = JSON.parse(cookieString);

    const expiryDate = dayjs(expiry); // When the token will expire
    const currentDate = dayjs(); // Current date and time
    const differenceInMinutes = expiryDate.diff(currentDate, "minute");
    console.log(differenceInMinutes);
    if (differenceInMinutes <= 15) {
      // Refresh token if it's close to expiration (within 15 mins)
      const refreshedToken = await refreshTokenIfNeeded();
      console.log(refreshedToken);
      return refreshedToken || value; // return refreshed token if available, otherwise return current
    }
    console.log("existing token returned==>", value);
    return value; // return the current token if not near expiry
  }

  return false; // No token found
};

const refreshTokenIfNeeded = async () => {
  try {
    const currentUser = await getAuthCurrentUser();
    if (currentUser) {
      const refreshedToken = await currentUser.getIdToken(true);
      const expiryTime = new Date(Date.now() + 3600 * 1000); // Set expiry for 1 hour from now
      setToken(refreshedToken, expiryTime); // Update cookie with new token and expiry
      return refreshedToken;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
  return null; // Return null if token refresh fails
};

// Retry function for getting auth.currentUser with a retry limit
const getAuthCurrentUser = async (retryCount = 5, delay = 2000) => {
  for (let i = 0; i < retryCount; i++) {
    if (auth.currentUser) {
      console.log("aaaaaaaaaaaaaaaa", auth.currentUser);
      return auth.currentUser;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  console.warn("auth.currentUser is null after maximum retries");
  return null;
};

export const getToken = () => {
  const cookie = cookies.get("ChurchCookie");
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setToken = (token, expiry) => {
  cookies.set(
    "ChurchCookie",
    JSON.stringify({ value: token, expiry }),
    { expires: 365 * 20, secure: true }
  );
};

export const removeToken = () => {
  cookies.remove("ChurchCookie");
  return true;
};
