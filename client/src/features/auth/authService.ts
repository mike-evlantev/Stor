import axios from "axios";
import { IUser } from "../../types/IUser";
import { setAuthToken } from "../../utils/authUtils";
import { narrowError } from "../../utils/errorUtils";

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

// Reset password
const resetPassword = async (token: string, password: string) => {
    try {
        setAuthToken(token);

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios
            .post(`/api/users/reset/${token}`, { password }, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
            });

        if (response) {
            localStorage.setItem("loggedInUser", JSON.stringify(response));
        }
        return response;
    } catch (error) {
        const message = narrowError(error);
        console.error(message);
    }    
}

// Decode token
const decodeToken = async (token: string) => {
    try {
        setAuthToken(token);
        const response = await axios
            .get(`/api/users/decode/${token}`)
            .then(response => response)
            .catch((error) => {
                return error.response;
            });
        return response;
    } catch (error) {
        const message = narrowError(error);
        console.error(message);
    }    
}

export const authService = {
    register,
    login,
    logout,
    resetPassword,
    decodeToken
}