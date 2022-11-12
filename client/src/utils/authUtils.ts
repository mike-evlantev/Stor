import axios from "axios";
import { IUser } from "../types/IUser";

// Add a global header
// When a token is available it will be sent with every request
export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const loggedInUserFromStorage: IUser = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser") as string)
    : undefined;