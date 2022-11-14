import axios from "axios";
import { narrowError } from "../utils/errorUtils";
import { useAppDispatch } from "./useAppDispatch";
import { alert } from "../features/messages/messagesSlice";
import { IUser } from "../types/IUser";
import { setAuthToken } from "../utils/authUtils";

interface useEmailMethodsResult {
    sendEmail: () => Promise<void>;
}

export const useEmailMethods = (): useEmailMethodsResult => {
    const dispatch = useAppDispatch();
    const email = process.env.REACT_APP_ADMIN_EMAIL as string;
    const password = process.env.REACT_APP_ADMIN_PASSWORD as string;    
    
    const sendEmail = async () => {
        try {
            const token = await getToken({email, password});
            setAuthToken(token);
            const payload = { message: "triggering send email from home component" };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios
                .post("/api/email/send", payload, config)
                .then(response => response.data)
                .catch((error) => {
                    console.error(error);
                });
            return response;
        } catch (error) {
            const message = narrowError(error);
            dispatch(alert({text: message, type: "danger"}));
        }        
    };
    
    return {sendEmail};
}


// Get token
const getToken = async (userData: Pick<IUser, "email" | "password">) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.post("/api/users/login", userData, config);
    return data.token;
}