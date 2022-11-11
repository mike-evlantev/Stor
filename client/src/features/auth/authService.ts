import axios from "axios";
import { IUser } from "../../types/IUser";

const API_URL = "/api/users/";

// Register user
const register = async (userData: Pick<IUser, "email" | "password">) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.post(API_URL, userData, config);
    
    if (data) {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
    }

    return data;
}

// Log in user
const login = async (userData: Pick<IUser, "email" | "password">) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.post(API_URL + "login", userData, config);
    
    if (data) {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
    }

    return data;
}

// Log out user
const logout = () => {
    localStorage.removeItem("loggedInUser");
}

export const authService = {
    register,
    login,
    logout
}